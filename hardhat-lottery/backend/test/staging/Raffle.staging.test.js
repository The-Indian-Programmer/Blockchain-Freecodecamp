const { assert, expect } = require("chai");
const {
  developmentChains,
  networkConfig,
} = require("../../helper-hardhat-config");
const { network, ethers, getNamedAccounts, deployments } = require("hardhat");

const networkName = network.name;
const chainId = network.config.chainId;

developmentChains.includes(networkName)
  ? describe.skip
  : describe("Raffle Unit Tests", async function () {
      let raffle, raffleEnterFee, interval, deployer, raffleContractAddress;

      beforeEach(async () => {
        const { deploy, log } = deployments;
        deployer = (await getNamedAccounts()).deployer;
        raffleContractAddress = (await deployments.get("Raffle")).address;
        raffle = await ethers.getContractAt("Raffle", raffleContractAddress);

        raffleEnterFee = await raffle.getEnteranceFee();
        interval = await raffle.getTimeInterval();
      });

      describe("Fullfill random words", async () => {
        it("works with live chainlink keepers and chainlink vrf", async () => {
            const startingTimeStamp = await raffle.getLastTimeStamp();
            const accounts = await ethers.getSigners();

            await new Promise((resolve, reject) => {
                raffle.once("Raffle_PickedRandomWinner", async () => {
                    console.log("Winner Picked event fired");

                    try {
                        const recentWinner = await raffle.getRecentWinner();
                        const raffleState = await raffle.getRaffleState();
                        const winnerBalance = await accounts[0].getBalance();
                        const endTimestamp = await raffle.getLastTimeStamp(); 
                        resolve();
                    } catch (error) {
                        console.log({error});
                        reject(error);
                    }
                });
            });

            await raffle.enterRaffle({value: raffleEnterFee});
        })
      });
    });
