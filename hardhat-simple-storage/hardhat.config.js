require("@nomiclabs/hardhat-waffle")
require("@nomiclabs/hardhat-etherscan")
// require("hardhat-deploy")
require("solidity-coverage")
require("hardhat-gas-reporter")
// require("hardhat-contract-sizer")
require("dotenv").config()

require("./tasks/block-number")


let {LOCALHOST_PRIVATE_KEY, LOCALHOST_RPC_URL, SEPOLIA_RPC_URL, PRIVATE_KEY, PRIVATE_KEY_PASSWORD, ETHERSCAN_API_KEY, COINMARKETCAP_API_KEY} = process.env;


module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    "localhost":{
      chainId: 1337,
      url: LOCALHOST_RPC_URL,
      accounts: [LOCALHOST_PRIVATE_KEY],
    },
    "sepolia" : {
      chainId: 11155111,
      url: SEPOLIA_RPC_URL,
      accounts: [PRIVATE_KEY],
    },
    "hardhat-node" : {
      chainId: 31337,
      url: "http://localhost:8545",
    }
  },
  solidity: "0.8.7",
  etherscan: {
    apiKey: 'V8A7TQIGGU1NUUGUX6EH3D8UCAIKMCTJ27',
  },
  gasReporter: {
    currency: 'USD',
    gasPrice: 100,
    outputFile: 'gas-report.txt',
    enabled: true,
  }
  
};
