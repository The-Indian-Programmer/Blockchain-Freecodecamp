const { assert, expect } = require("chai");
const { developmentChains, networkConfig } = require("../../helper-hardhat-config");
const { network, ethers, getNamedAccounts, deployments } = require("hardhat");

const networkName = network.name;
const chainId = network.config.chainId;

!developmentChains.includes(networkName) ? describe.skip :
    describe("Raffle Unit Tests", async function () {




        /* Deploy the contract before any test runs */
        let raffleContract, raffleContractAddress, vrfCoordinatorV2Mock, vrfCoordinatorV2MockAddress, raffleEnterFee, contractOwner, interval;


        beforeEach(async () => {

            const { deploy, log } = deployments;
            contractOwner = (await getNamedAccounts()).deployer;
            


            await deployments.fixture(["all"]);
            raffleContractAddress = (await deployments.get("Raffle")).address;
            raffleContract = await ethers.getContractAt("Raffle", raffleContractAddress);

            raffleEnterFee = await raffleContract.getEnteranceFee();
            interval = await raffleContract.getTimeInterval();


            vrfCoordinatorV2MockAddress = (await deployments.get("VRFCoordinatorV2Mock")).address;

            vrfCoordinatorV2Mock = await ethers.getContractAt("VRFCoordinatorV2Mock", vrfCoordinatorV2MockAddress);
        });


        /* Constructor accepts the correct arguments */

        describe("constructor", async () => {
            it("Should accept the correct arguments", async () => {
                // const { deploy, log } = deployments;
                // expect(raffleContract.address).to.not.equal(0);
                const raffleState = await raffleContract.getRaffleState();
                const numwords = await raffleContract.getNumWords();

                expect(raffleState).to.equal(0);
                expect(interval).to.equal(networkConfig[chainId].interval);
                expect(numwords).to.equal(2);

            });
        });

        /* Enter to the raffle */

        describe("enterRaffle", async () => {
            it("Revert when you don't pay enough", async () => {
                const payAmount = ethers.utils.parseEther("0.001");
                await expect(raffleContract.enterRaffle({ value: payAmount })).to.be.revertedWith("Raffle_NotEnoughFee");
            });

            it("Record player when the enter raffle", async () => {
                expect(await raffleContract.getParticipants()).to.have.lengthOf(0);
                await raffleContract.enterRaffle({ value: raffleEnterFee });
                const player = await raffleContract.getParticipant(0);
                assert.equal(player, contractOwner);
            });
            it("Emits the correct event", async () => {
                await expect(raffleContract.enterRaffle({ value: raffleEnterFee })).to.emit(raffleContract, "Raffle_Entered").withArgs(contractOwner, raffleEnterFee);
            });
            it("Revert when the raffle is not open", async () => {
                await raffleContract.enterRaffle({ value: raffleEnterFee });
                await network.provider.send("evm_increaseTime", [interval.toNumber() + 1]);
                
                await network.provider.send("evm_mine", []);


                // We pretend to be the chainlink keeper
                await raffleContract.performUpkeep([])
                await expect(raffleContract.enterRaffle({ value: raffleEnterFee })).to.be.revertedWith("Raffle_NotOpen");
            });

        })

        /* Check up keep */
        describe("checkUpkeep", async () => {
            it("Should return false if have not sent any ETH", async () => {
                await network.provider.send("evm_increaseTime", [interval.toNumber() + 1]);
                await network.provider.send("evm_mine", []);
                const {upkeepNeeded} = await raffleContract.callStatic.checkUpkeep([]);
                expect(upkeepNeeded).to.equal(false);
            });
            it("Should return false if raffle not opened", async () => {
                await raffleContract.enterRaffle({ value: raffleEnterFee });
                await network.provider.send("evm_increaseTime", [interval.toNumber() + 1]);
                await network.provider.send("evm_mine", []);
                await raffleContract.performUpkeep([])
                const {upkeepNeeded} = await raffleContract.callStatic.checkUpkeep([]);
                expect(upkeepNeeded).to.equal(false);
            });
            it("Should return false if time has not passed", async () => {
                await raffleContract.enterRaffle({ value: raffleEnterFee });
                const {upkeepNeeded} = await raffleContract.callStatic.checkUpkeep([]);
                expect(upkeepNeeded).to.equal(false);
            });
            it("Should return true if time has passed, has players, and is Open", async () => {
                await raffleContract.enterRaffle({ value: raffleEnterFee });
                await network.provider.send("evm_increaseTime", [interval.toNumber() + 1]);
                await network.provider.send("evm_mine", []);
                const {upkeepNeeded} = await raffleContract.callStatic.checkUpkeep([]);
                expect(upkeepNeeded).to.equal(true);
            });
        });

        /* Perform upkeep */
        describe("performUpkeep", function () {
            it("can only run if checkupkeep is true", async () => {
                await raffleContract.enterRaffle({ value: raffleEnterFee });
                await network.provider.send("evm_increaseTime", [interval.toNumber() + 1])
                await network.provider.request({ method: "evm_mine", params: [] })
                const tx = await raffleContract.performUpkeep("0x") 
                assert(tx)
            })
            it("reverts if checkup is false", async () => {
                await expect(raffleContract.performUpkeep("0x")).to.be.revertedWith( 
                    "Raffle_NotUpKeepNeeded"
                )
            })
            it("updates the raffle state and emits a requestId", async () => {
                // Too many asserts in this test!
                await raffleContract.enterRaffle({ value: raffleEnterFee })
                await network.provider.send("evm_increaseTime", [interval.toNumber() + 1])
                await network.provider.request({ method: "evm_mine", params: [] })
                const txResponse = await raffleContract.performUpkeep("0x") // emits requestId
                const txReceipt = await txResponse.wait(1) // waits 1 block
                const raffleState = await raffleContract.getRaffleState() // updates state
                const requestId = txReceipt.events[1].args.requestId
                assert(requestId.toNumber() > 0)
                assert(raffleState == 1) // 0 = open, 1 = calculating
            })
        })


    });
