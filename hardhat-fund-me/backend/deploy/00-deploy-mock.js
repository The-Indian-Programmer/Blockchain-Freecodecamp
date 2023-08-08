const { network } = require("hardhat");
const { developmentChains, networkConfig, DECIMALS, INITIAL_ANSWERS } = require("../helper-hardhat-config");

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();
    const chainId = network.config.chainId;

    const networkName = networkConfig[chainId]["name"];


    if (developmentChains.includes(networkName)) {
        log("Mock deploy, Local network detected, skipping deployment");
        // const MockV3Aggregator = await deployments.get("MockV3Aggregator");
        await deploy("MockV3Aggregator", {
            contract: "MockV3Aggregator",
            from: deployer,
            args: [DECIMALS, INITIAL_ANSWERS],
            log: true,
        });
        log("----------------------------------------------------------");
    }
    
}


module.exports.tags = ["all", "mocks"];