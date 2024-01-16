const { ethers, network } = require("hardhat")
const { networkConfig } = require("../helper-hardhat-config")
const { dappToken } = require("./dappToken")

const LINK_TOKEN = networkConfig[network.config.chainId].linkToken
const LINK_TOKEN_PRICE_FEED = networkConfig[network.config.chainId].linkUsdPriceFeed

async function tokenFarm() {
  const [ owner ] = await ethers.getSigners()
  const dToken = await dappToken()
  const TokenFarm = await ethers.getContractFactory("TokenFarm")
  const tokenFarm = await TokenFarm.deploy(dToken.address)
  await tokenFarm.deployed()
  console.log(`The TokenFarm Address: ${tokenFarm.address}`)
  // transfer
  await dToken.transfer(tokenFarm.address, ethers.utils.parseEther("500000"))
  // add DappToken
  await addAllowedTokens(tokenFarm, dToken.address)
  // add LINK Token
  await addAllowedTokens(tokenFarm, LINK_TOKEN)
  // send price feed of LINK token
  await setPriceFeed(tokenFarm, LINK_TOKEN, LINK_TOKEN_PRICE_FEED)
  // approve amount LINK token to stake
  await approveERC20(LINK_TOKEN, ethers.utils.parseEther("500"), tokenFarm, owner)
  // stake tokens
  await stake(tokenFarm, ethers.utils.parseEther("100"), LINK_TOKEN)
  // data
  await getUserDataAndPrice(tokenFarm, LINK_TOKEN, owner)
  // issue tokens
  await issueTokens(tokenFarm)
  await getUserDataAndPrice(tokenFarm, dToken.address, owner)
  // unstake tokens
  await unstake(tokenFarm, LINK_TOKEN)
  await getUserDataAndPrice(tokenFarm, LINK_TOKEN, owner)
}

async function issueTokens(tokenFarm) {
  const txResponse = await tokenFarm.issueTokens()
  await txResponse.wait(1)
  console.log("ISSUED!")
}

async function getUserDataAndPrice(tokenFarm, erc20Token, account) {
  const tokenPrice = await tokenFarm.getTokenPrice(erc20Token)
  const userSingleValue = await tokenFarm.getUserSingleTotalValue(account.address, erc20Token)
  console.log(`Token Price: ${tokenPrice}`)
  console.log(`User Single Value: ${userSingleValue}`)
}

async function unstake(tokenFarm, erc20Token) {
  const txResponse = await tokenFarm.unstakeTokens(erc20Token)
  await txResponse.wait(1)
  console.log("UNSTAKED!")
}

async function stake(tokenFarm, amount, erc20Token) {
  const txResponse = await tokenFarm.stakeTokens(amount, erc20Token)
  await txResponse.wait(1)
  console.log("STAKED!")
}

async function addAllowedTokens(tokenFarm, erc20Token) {
  const txResponse = await tokenFarm.addAllowedTokens(erc20Token)
  await txResponse.wait(1)
  console.log("ADDED TOKEN!")
}

async function setPriceFeed(tokenFarm, erc20Token, priceFeed) {
  const txResponse = await tokenFarm.setPriceFeedContract(erc20Token, priceFeed)
  await txResponse.wait(1)
  console.log("SENT PRICE FEED!")
}

async function approveERC20(token, amount, spenderFarm, account) {
  const erc20Token = await ethers.getContractAt(
    "IERC20",
    token,
    account
  )
  const txResponse = await erc20Token.approve(spenderFarm.address, amount)
  await txResponse.wait(1)
  console.log("APPROVED!")
}

tokenFarm()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })