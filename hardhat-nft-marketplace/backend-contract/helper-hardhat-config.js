const networkConfig = {
    11155111: {
        name: "sepolia",
    },
    31337: {
        name: "hardhat",
    },
    1337: {
        name: "ganache",
    }
}

const developmentChains = ["hardhat", "localhost", "ganache"];

module.exports = {
    developmentChains,
    networkConfig
};