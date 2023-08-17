const networkConfig = {
    11155111: {
        name: 'sepolia',
        vrfCoordinator: '0xE16Df59B887e3Caa439E0b29B42bA2e7976FD8b2',
        entranceFee: ethers.utils.parseEther("0.01"),
        gasLane: "0x474e34a077df58807dbe9c96d3c009b23b3c6d0cce433e59bbf5b34f823bc56c",
        subscriptionId: 4570,
        callbackGasLimit: "500000",
        interval: 60
        
    },
    31337: {
        name: 'hardhat',
        entranceFee: ethers.utils.parseEther("0.01"),
        gasLane: "0x474e34a077df58807dbe9c96d3c009b23b3c6d0cce433e59bbf5b34f823bc56c",
        callbackGasLimit: "500000",
        interval: 60
    },
} 


const developmentChains = ['hardhat', 'localhost']


module.exports = {
    networkConfig,
    developmentChains
}