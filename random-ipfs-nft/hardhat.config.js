/** @type import('hardhat/config').HardhatUserConfig */

require("@nomiclabs/hardhat-waffle");
require("hardhat-gas-reporter");
require("@nomiclabs/hardhat-etherscan");
require("solidity-coverage")
require("hardhat-deploy")
require("dotenv").config();


let { LOCALHOST_PRIVATE_KEY, LOCALHOST_RPC_URL, SEPOLIA_RPC_URL, PRIVATE_KEY, PRIVATE_KEY_PASSWORD, ETHERSCAN_API_KEY, COINMARKETCAP_API_KEY } = process.env;


module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.7",
      },
      {
        version: "0.6.6",
      }

    ],
  },

  namedAccounts: {
    deployer: {
      default: 0,
    },
  },
  networks: {
    "hardhat": {
      chainId: 31337,
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
    }
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
  gasReporter: {
    currency: 'USD',
    gasPrice: 100,
    outputFile: 'gas-report.txt',
    enabled: true,
  }
};
