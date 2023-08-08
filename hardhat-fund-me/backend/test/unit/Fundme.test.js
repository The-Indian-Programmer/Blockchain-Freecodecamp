const {assert, expect} = require('chai');
const {deployments, ethers, getNamedAccounts} = require('hardhat');

describe('FundMe', function () {
    let fundMe;
    let deployer;
    let mockV3Aggregator;
    beforeEach(async function () {
              deployer = (await getNamedAccounts()).deployer
              await deployments.fixture(["all"])
              fundMe = await ethers.getContractAt("FundMe", deployer)
              mockV3Aggregator = await ethers.getContractAt("MockV3Aggregator",deployer)

    })

    describe('Constructor', function () {
        it("Should set the price feed address", async function () {
            const response = await fundMe.getPriceFeed();
            console.log(response);
            // assert.equal(response , mockV3Aggregator.address);
        })
    })
})