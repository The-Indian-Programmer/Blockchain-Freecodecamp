const {network} = require('hardhat');
const {developmentChains, networkConfig} = require('../helper-hardhat-config');
const verify = require('../utils/verify');

module.exports = async ({getNamedAccounts, deployments}) => {
    const {deployer } = await getNamedAccounts();
    const { deploy, log } = deployments;

    console.log('----------------------------------------------------');

    const networkName = network.name;
    const args = []

    const basicNFT = await deploy('BasicNFT', {
        from: deployer,
        args: args,
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    });


    if (!developmentChains.includes(networkName) && process.env.ETHERSCAN_API_KEY) {
        await verify(basicNFT.address, args);
    }


}