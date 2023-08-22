const { network } = require("hardhat");
const { developmentChains } = require("../helper-hardhat-config");
const { verify } = require("../utils/verify");


module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deployer } = await getNamedAccounts();
    const { deploy, log } = deployments;

    const args = []

    const nftMarketplace = await deploy("NftMarketPlace", {
        from: deployer,
        args,
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    });


    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        verify(nftMarketplace.address, args);
    }

    log(`NftMarketplace deployed at ${nftMarketplace.address}`);
}

module.exports.tags = ["all", "NftMarketplace"];