const networkConfig = {
    31337: { // hardhat local network
        name: "hardhat",
        priceFeed: "",
    },
    11155111: {
        name: "sepolia test network",
        priceFeed: "0x1a81afB8146aeFfCFc5E50e8479e826E7D55b910",
    },
    1337: { // ganache local network
        name: "localhost",
        priceFeed: "",
    },
    5: { // goerli test network
        name: "goerli",
        priceFeed: "0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e",
    },

};

const developmentChains = ["hardhat", "localhost"];
const DECIMALS = 8;
const INITIAL_ANSWERS = 20000000000;

module.exports = {
    networkConfig,
    developmentChains,
    DECIMALS,
    INITIAL_ANSWERS,
}