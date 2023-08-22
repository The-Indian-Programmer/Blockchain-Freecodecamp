const { assert } = require("chai");
const { network, ethers, run } = require("hardhat");
const { developmentChains } = require("../helper-hardhat-config");

!developmentChains.includes(network.name) 
    ? describe.skip 
    : describe("NftMarketPlace", function () {
    
    let nftMarketPlace;
});