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
        default: 0, // here this will by default take the first account as deployer
        1: 0, // similarly on mainnet it will take the first account as deployer. Note though that depending on how hardhat network are configured, the account 0 on one network can be different than on another
    },
    player: {
        default: 1,
    },
},
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
  gasReporter: {
    enabled: true,
    currency: 'USD',
    noColors: true,
    outputFile: 'gas-report.txt',

  }
};
