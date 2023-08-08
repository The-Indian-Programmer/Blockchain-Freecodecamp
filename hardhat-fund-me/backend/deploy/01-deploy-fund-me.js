

// function deployFundMe() {
//   console.log("Deploying contracts with the account:");
// }


// module.exports = deployFundMe;


// module.exports = async (hre) => {
    //     const { getNamedAccounts, deployments } = hre;
    // }
    
    
const { network } = require("hardhat");
const {networkConfig, developmentChains} = require("../helper-hardhat-config");
const {verify} = require("../utils/verify");
module.exports = async ({ getNamedAccounts, deployments }) => {
    const {deploy, logs} = deployments;
    const {deployer} = await getNamedAccounts();
    const chainId = network.config.chainId;


    // const priceFeedAddress = networkConfig[chainId]["priceFeed"];

    let priceFeedAddress;

    if (developmentChains.includes(network.name)) {
        const ethUsdPriceFeed = await deployments.get("MockV3Aggregator");
        priceFeedAddress = ethUsdPriceFeed.address;
    } else {
        priceFeedAddress = networkConfig[chainId]["priceFeed"];
    }

    const args = [priceFeedAddress];
    const fundMe = await deploy("FundMe", {
        from: deployer,
        args: args, // put the price feed address
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    })

if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) { 
        await verify(fundMe.address, args);
    }
}

module.exports.tags = ["all", "fundme"];