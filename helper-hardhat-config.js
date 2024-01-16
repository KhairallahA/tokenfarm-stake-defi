const networkConfig = {
    // Sepolia network
    11155111: {
        name: "sepolia",
        // Link Token
        linkToken: "0xf8Fb3713D459D7C1018BD0A49D19b4C44290EBE5",
        // Link price feed
        linkUsdPriceFeed: "0xc59E3633BAAC79493d908e63626716e204A45EdF"
    },
}

const developmentChains = ["hardhat", "localhost"]

module.exports = {
    networkConfig,
    developmentChains
}