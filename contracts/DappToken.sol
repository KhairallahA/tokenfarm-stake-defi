// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract DappToken is ERC20 {
    constructor() 
        ERC20("Dapp Token", "DAPP") 
    {
        _mint(msg.sender, 1000000 * 10 ** decimals());
    }
}