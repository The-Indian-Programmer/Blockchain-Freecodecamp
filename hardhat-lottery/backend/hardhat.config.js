require("@nomiclabs/hardhat-waffle")
require("@nomiclabs/hardhat-etherscan")
require("hardhat-deploy")
require("solidity-coverage")
require("hardhat-gas-reporter")
require("hardhat-contract-sizer")
require("dotenv").config()




let { LOCALHOST_PRIVATE_KEY, LOCALHOST_RPC_URL, SEPOLIA_RPC_URL, PRIVATE_KEY, PRIVATE_KEY_PASSWORD, ETHERSCAN_API_KEY, COINMARKETCAP_API_KEY } = process.env;
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "hardhat",
  solidity: "0.8.7",
  networks: {
    "hardhat": {
      chainId: 31337,
      // gasPrice: 130000000000,
    },
    "localhost": {
      chainId: 1337,
      url: LOCALHOST_RPC_URL,
      accounts: [LOCALHOST_PRIVATE_KEY],
    },
    "sepolia": {
      chainId: 11155111,
      url: SEPOLIA_RPC_URL,
      accounts: [PRIVATE_KEY],
      blockConfirmations: 6,
    },
  },
  namedAccounts: {
    deployer: {
      default: 0,
      1: 0,
    },
    player2: {
      default: 1,
    },
    player2: {
      default: 2,
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
};
