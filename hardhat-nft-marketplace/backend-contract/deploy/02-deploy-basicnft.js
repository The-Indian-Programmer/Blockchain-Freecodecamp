const { network } = require("hardhat");
const { developmentChains } = require("../helper-hardhat-config");
const { verify } = require("../utils/verify");


module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deployer } = await getNamedAccounts();
    const { deploy, log } = deployments;

    const args = []

    const BasicNft = await deploy("BasicNFT", {
        from: deployer,
        args,
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    });


    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        verify(BasicNft.address, args);
    }

    log(`BasicNft deployed at ${BasicNft.address}`);
}

module.exports.tags = ["all", "BasicNft"];