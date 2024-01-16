const { ethers } = require("hardhat")

async function dappToken() {
  const DappToken = await ethers.getContractFactory("DappToken")
  const dappToken = await DappToken.deploy()

  await dappToken.deployed()

  console.log(`The DappToken Address: ${dappToken.address}`)

  return dappToken
}

module.exports = {
  dappToken
}
