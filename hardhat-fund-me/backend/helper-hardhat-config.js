const networkConfig = {
    31337: { // hardhat local network
        name: "hardhat",
        priceFeed: "",
    },
    11155111: {
        name: "sepolia",
        ethUsdPriceFeed: "0x694AA1769357215DE4FAC081bf1f309aDC325306",
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
const DECIMALS = "8";
const INITIAL_ANSWERS = "20000000000";

module.exports = {
    networkConfig,
    developmentChains,
    DECIMALS,
    INITIAL_ANSWERS,
}