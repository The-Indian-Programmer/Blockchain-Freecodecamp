const { assert, expect } = require("chai");
const {
  developmentChains,
  networkConfig,
} = require("../../helper-hardhat-config");
const { network, ethers, getNamedAccounts, deployments } = require("hardhat");

const networkName = network.name;
const chainId = network.config.chainId;

!developmentChains.includes(networkName)
  ? describe.skip
  : describe("Raffle Unit Tests", async function () {
      /* Deploy the contract before any test runs */
      let raffle,
        raffleContract,
        raffleContractAddress,
        vrfCoordinatorV2Mock,
        vrfCoordinatorV2MockAddress,
        raffleEnterFee,
        contractOwner,
        interval,
        accounts;

      beforeEach(async () => {
        const { deploy, log } = deployments;
        contractOwner = (await getNamedAccounts()).deployer;
        accounts = await ethers.getSigners();

        const player = accounts[0];

        await deployments.fixture(["all"]);
        raffleContractAddress = (await deployments.get("Raffle")).address;
        raffleContract = await ethers.getContractAt(
          "Raffle",
          raffleContractAddress
        );

        raffle = raffleContract.connect(player);

        raffleEnterFee = await raffleContract.getEnteranceFee();
        interval = await raffleContract.getTimeInterval();

        vrfCoordinatorV2MockAddress = (
          await deployments.get("VRFCoordinatorV2Mock")
        ).address;

        vrfCoordinatorV2Mock = await ethers.getContractAt(
          "VRFCoordinatorV2Mock",
          vrfCoordinatorV2MockAddress
        );
      });

      /* Constructor accepts the correct arguments */

      describe("constructor", async () => {
        it("Should accept the correct arguments", async () => {
          // const { deploy, log } = deployments;
          // expect(raffleContract.address).to.not.equal(0);
          const raffleState = await raffle.getRaffleState();
          const numwords = await raffle.getNumWords();

          expect(raffleState).to.equal(0);
          expect(interval).to.equal(networkConfig[chainId].interval);
          expect(numwords).to.equal(2);
        });
      });

      /* Enter to the raffle */

      describe("enterRaffle", async () => {
        it("Revert when you don't pay enough", async () => {
          const payAmount = ethers.utils.parseEther("0.001");
          await expect(
            raffle.enterRaffle({ value: payAmount })
          ).to.be.revertedWith("Raffle_NotEnoughFee");
        });

        it("Record player when the enter raffle", async () => {
          expect(await raffle.getParticipants()).to.have.lengthOf(0);
          await raffle.enterRaffle({ value: raffleEnterFee });
          const player = await raffle.getParticipant(0);
          assert.equal(player, contractOwner);
        });
        it("Emits the correct event", async () => {
          await expect(raffle.enterRaffle({ value: raffleEnterFee }))
            .to.emit(raffle, "Raffle_Entered")
            .withArgs(contractOwner, raffleEnterFee);
        });
        it("Revert when the raffle is not open", async () => {
          await raffle.enterRaffle({ value: raffleEnterFee });
          await network.provider.send("evm_increaseTime", [
            interval.toNumber() + 1,
          ]);

          await network.provider.send("evm_mine", []);

          // We pretend to be the chainlink keeper
          await raffle.performUpkeep([]);
          await expect(
            raffle.enterRaffle({ value: raffleEnterFee })
          ).to.be.revertedWith("Raffle_NotOpen");
        });
      });

      /* Check up keep */
      describe("checkUpkeep", async () => {
        it("Should return false if have not sent any ETH", async () => {
          await network.provider.send("evm_increaseTime", [
            interval.toNumber() + 1,
          ]);
          await network.provider.send("evm_mine", []);
          const { upkeepNeeded } = await raffle.callStatic.checkUpkeep([]);
          expect(upkeepNeeded).to.equal(false);
        });
        it("Should return false if raffle not opened", async () => {
          await raffle.enterRaffle({ value: raffleEnterFee });
          await network.provider.send("evm_increaseTime", [
            interval.toNumber() + 1,
          ]);
          await network.provider.send("evm_mine", []);
          await raffle.performUpkeep([]);
          const { upkeepNeeded } = await raffle.callStatic.checkUpkeep([]);
          expect(upkeepNeeded).to.equal(false);
        });
        it("Should return false if time has not passed", async () => {
          await raffle.enterRaffle({ value: raffleEnterFee });
          const { upkeepNeeded } = await raffle.callStatic.checkUpkeep([]);
          expect(upkeepNeeded).to.equal(false);
        });
        it("Should return true if time has passed, has players, and is Open", async () => {
          await raffle.enterRaffle({ value: raffleEnterFee });
          await network.provider.send("evm_increaseTime", [
            interval.toNumber() + 1,
          ]);
          await network.provider.send("evm_mine", []);
          const { upkeepNeeded } = await raffle.callStatic.checkUpkeep([]);
          expect(upkeepNeeded).to.equal(true);
        });
      });

      /* Perform upkeep */
      describe("performUpkeep", function () {
        it("can only run if checkupkeep is true", async () => {
          await raffle.enterRaffle({ value: raffleEnterFee });
          await network.provider.send("evm_increaseTime", [
            interval.toNumber() + 1,
          ]);
          await network.provider.request({ method: "evm_mine", params: [] });
          const tx = await raffle.performUpkeep("0x");
          assert(tx);
        });
        it("reverts if checkup is false", async () => {
          await expect(raffle.performUpkeep("0x")).to.be.revertedWith(
            "Raffle_NotUpKeepNeeded"
          );
        });
        it("updates the raffle state and emits a requestId", async () => {
          // Too many asserts in this test!
          await raffle.enterRaffle({ value: raffleEnterFee });
          await network.provider.send("evm_increaseTime", [
            interval.toNumber() + 1,
          ]);
          await network.provider.request({ method: "evm_mine", params: [] });
          const txResponse = await raffle.performUpkeep("0x"); // emits requestId
          const txReceipt = await txResponse.wait(1); // waits 1 block
          const raffleState = await raffle.getRaffleState(); // updates state
          const requestId = txReceipt.events[1].args.requestId;
          assert(requestId.toNumber() > 0);
          assert(raffleState == 1); // 0 = open, 1 = calculating
        });
      });

      /* Fullfill random words */
      describe("fulfillRandomWords", async () => {
        beforeEach(async function () {
          await raffle.enterRaffle({ value: raffleEnterFee });
          await network.provider.send("evm_increaseTime", [
            interval.toNumber() + 1,
          ]);
          await network.provider.send("evm_mine", []);
        });
        it("can only be called after performupkeep", async () => {
          // await expect(vrfCoordinatorV2Mock.fulfillRandomWords(0, raffle.address)).to.be.revertedWith("nonexistent request");
          // await expect(vrfCoordinatorV2Mock.fulfillRandomWords(1, raffle.address)).to.be.revertedWith("nonexistent request");
        });

        it("picks the winner, resets the lottery, and sends the money to the winner", async function () {
          const totalAdditionalAccount = 3;
          const startingAccountIndex = 2;
          // const account = await ethers.getSigners();
          for (
            let index = startingAccountIndex;
            index < totalAdditionalAccount + startingAccountIndex;
            index++
          ) {
            raffle = await raffleContract.connect(accounts[index]);
            const enterRaffle = await raffle.enterRaffle({
              value: raffleEnterFee,
            });
            await enterRaffle.wait(1);
          }
          const startingTimeStamp = await raffle.getLastTimeStamp();
          // console.log(accounts[0].address);
          await new Promise(async (resolve, reject) => {
            console.log("Waiting for the winner");
            let winnerStartingBalance;

            try {
              const tx = await raffle.performUpkeep([]);
              const txReceipt = await tx.wait(1);

              winnerStartingBalance = await accounts[
                startingAccountIndex
              ].getBalance();

              const requestId = txReceipt.events[1].args.requestId;
              await vrfCoordinatorV2Mock.fulfillRandomWords(
                requestId,
                raffle.address
              );
            } catch (error) {
              console.log({ error });
              reject(error);
            }

            raffle.once("Raffle_PickedRandomWinner", async () => {
              console.log("Found the winner");
              try {
                const recentWinner = await raffle.getRecentWinner();
                // console.log("recentWinner", recentWinner);

                const raffleState = await raffle.getRaffleState();
                const lastTimeStamp = await raffle.getLastTimeStamp();
                const numberOfParticipants = await raffle.getParticipants();
                const winnerEndingBalance = await accounts[
                  startingAccountIndex
                ].getBalance();
                assert.equal(raffleState, 0);
                assert(lastTimeStamp > startingTimeStamp);
                assert.equal(numberOfParticipants, 0);
                assert.equal(
                  recentWinner,
                  accounts[startingAccountIndex].address
                );

                assert.equal(
                  winnerEndingBalance.toString(),
                  winnerStartingBalance.add(
                    raffleEnterFee
                      .mul(totalAdditionalAccount)
                      .add(raffleEnterFee)
                      .toString()
                  )
                );
                resolve();
              } catch (error) {
                reject(error);
              }
              resolve();
            });
          });
        });
      });
    });
