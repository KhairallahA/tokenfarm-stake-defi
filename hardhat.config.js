require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config({ path: ".env" });

const QUICKNODE_HTTPS_URL = process.env.QUICKNODE_HTTPS_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;

module.exports = {
  defaultNetwork: "hardhat",
  allowUnlimitedContractSize: true,
  solidity: {
    compilers: [
      {
        version: "0.8.22",
      },
      {
        version: "0.8.20",
      },
    ],
  },
  networks: {
    sepolia: {
      url: QUICKNODE_HTTPS_URL,
      accounts: [PRIVATE_KEY],
      chainId: 11155111
    },
  },
  namedAccounts: {
    deployer: {
      default: 0, // here this will by default take the first account as deployer
      1: 0, // similarly on mainnet it will take the first account as deployer. Note though that depending on how hardhat network are configured, the account 0 on one network can be different than on another
    },
  },
  gasReporter: {
    enabled: true,
    currency: "USD",
    outputFile: "gas-report.txt",
    noColors: true,
    // coinmarketcap: COINMARKETCAP_API_KEY,
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  }
};
