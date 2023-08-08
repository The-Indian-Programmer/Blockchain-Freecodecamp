const { assert, expect } = require('chai');
const { deployments, ethers, getNamedAccounts } = require('hardhat');
const { developmentChains } = require('../../helper-hardhat-config');

!developmentChains.includes(network.name)
    ? describe.skip
    : describe('FundMe', function () {
    let fundMe
          let mockV3Aggregator
          let deployer
          const sendValue = ethers.utils.parseEther("1")
          beforeEach(async () => {
              // const accounts = await ethers.getSigners()
              // deployer = accounts[0]
              deployer = (await getNamedAccounts()).deployer
              await deployments.fixture(["all"])
              fundMe = await ethers.getContractAt("FundMe", deployer)
              mockV3Aggregator = await ethers.getContractAt("MockV3Aggregator", deployer)
              console.log(fundMe.address)
          })

          describe("constructor", function () {
              it("sets the aggregator addresses correctly", async () => {
                  const response = await fundMe.s_priceFeed()
                //   assert.equal(response, mockV3Aggregator.address)
              })
          })
})