const { network, ethers } = require("hardhat");
const { developmentChains, networkConfig } = require("../helper-hardhat-config");

module.exports = async ({ getNamedAccounts, deployments }) => {
    const {deployer} = await getNamedAccounts();
    const {deploy, log} = deployments;

    let VrfCoordinatorV2Address;
    
    if (developmentChains.includes(network.name)) {
        const vrfCoordinatorV2 = await ethers.getContractAt("VrfCoordinatorV2MockConract");
        VrfCoordinatorV2Address = vrfCoordinatorV2.address;
    } else {
        VrfCoordinatorV2Address = networkConfig[network.config.chainId]["vrfCoordinator"]
    }
    
    let entranceFee = networkConfig[network.config.chainId]["entranceFee"];

    return

    const raffle = await deploy("Raffle", {
        from: deployer,
        args: [],
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    });
};


module.exports.tags = ["all", "raffle"];