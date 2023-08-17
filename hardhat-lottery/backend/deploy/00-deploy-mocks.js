const { network, ethers } = require('hardhat');
const {developmentChains} = require('../helper-hardhat-config.js');


const BASE_FEES = ethers.utils.parseEther("0.25"); // 0.25 LInk for per request
const GAS_PRICE_LINK = 1e9; // 20 gwei
module.exports = async ({ getNamedAccounts, deployments }) => {
    const {deployer} = await getNamedAccounts();
    const {deploy, log} = deployments;
    const args = [BASE_FEES, GAS_PRICE_LINK];

    let netWorkName = network.name;
    let chainId = network.config.chainId;


    if (developmentChains.includes(netWorkName)) {
        console.log("Local network detected, Skipping raffle deployment on a development network");

        
        await deploy("VrfCoordinatorV2MockConract", {
            from: deployer,
            log: true,
            args: args,
        });
        
        console.log("VrfCoordinatorV2Mock deployed to: ", VrfCoordinatorV2Mock.address);

        console.log("----------------------------------------------------------------");

    }
};

module.exports.tags = ["all", "mocks"];