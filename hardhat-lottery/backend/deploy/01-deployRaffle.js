const { network, ethers } = require("hardhat");
const { developmentChains, networkConfig } = require("../helper-hardhat-config");


const VRF_SUB_FUND_AMOUNT = ethers.utils.parseEther("30");
module.exports = async ({ getNamedAccounts, deployments }) => {
    const {deployer} = await getNamedAccounts();
    const {deploy, log} = deployments;

    let VrfCoordinatorV2Address, subscriptionId;
    const chainId = network.config.chainId;

    
    if (developmentChains.includes(network.name)) {
        const contractAddress = (await deployments.get('VRFCoordinatorV2Mock')).address;
        const vrfCoordinatorV2 = await ethers.getContractAt(
            'VRFCoordinatorV2Mock', 
            contractAddress
            );
        VrfCoordinatorV2Address = vrfCoordinatorV2.address;

        // create the subscription
        const transactionResponse = await vrfCoordinatorV2.createSubscription();
        const transactionReceipt = await transactionResponse.wait(1);
        subscriptionId = transactionReceipt.events[0].args.subId;

        
        // Fund the contract with LINK
        await vrfCoordinatorV2.fundSubscription(subscriptionId, VRF_SUB_FUND_AMOUNT);
       
    } else {
        VrfCoordinatorV2Address = networkConfig[chainId]["vrfCoordinator"]
        subscriptionId = networkConfig[chainId]["subscriptionId"]
    }
    
    let entranceFee = networkConfig[chainId]["entranceFee"];
    let gasLane = networkConfig[chainId]["gasLane"];
    let callbackGasLimit = networkConfig[chainId]["callbackGasLimit"];
    let interval = networkConfig[chainId]["interval"];

    const args = [VrfCoordinatorV2Address, entranceFee, gasLane, subscriptionId, callbackGasLimit, interval]


    const raffle = await deploy("Raffle", {
        from: deployer,
        args: args,
        log: true,      
        waitConfirmations: network.config.blockConfirmations || 1,
    });

    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        await hre.run("verify:verify", {
            address: raffle.address,
            constructorArguments: args,
        })
    }
};


module.exports.tags = ["all", "raffle"];