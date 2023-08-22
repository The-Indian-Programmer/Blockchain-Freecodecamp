const { assert } = require("chai");
const { network, ethers, run, getNamedAccounts, deployments } = require("hardhat");
const { developmentChains } = require("../helper-hardhat-config");

!developmentChains.includes(network.name) 
    ? describe.skip 
    : describe("NftMarketPlace", function () {
    
    let nftMarketPlace, basicNft, nftMarketPlaceAddress, basicNftAddress, nftMarketPlaceContract, basicNftContract, deployer, accounts, player;
    const PRICE = ethers.utils.parseEther("0.01");
    const TOKEN_ID = 0;

    beforeEach(async function () {
        deployer = (await getNamedAccounts()).deployer;
        accounts = await ethers.getSigners();
        player = accounts[1];

        await deployments.fixture(["all"]);

        nftMarketPlaceAddress = (await deployments.get("NftMarketPlace")).address;
        nftMarketPlaceContract = await ethers.getContractAt("NftMarketPlace", nftMarketPlaceAddress);
        // nftMarketPlace = await nftMarketPlaceContract.connect(player);

        basicNftAddress = (await deployments.get("BasicNFT")).address;
        basicNftContract = await ethers.getContractAt("BasicNFT", basicNftAddress);
        // basicNft = await basicNftContract.connect(player);

        await basicNftContract.mintNft();
        await basicNftContract.approve(nftMarketPlaceAddress, TOKEN_ID);
    });

    describe("Deployment", function () {
        it("Should set the right owner", async function () {
            assert.equal(await nftMarketPlaceContract.getOwner(), deployer);
        });

        it("Should set the right nft marketplace address", async function () {
            assert.equal(await nftMarketPlaceContract.getMarketPlaceAddress(), nftMarketPlaceAddress);
        });
    });

    describe("List NFT", function () {
        it("Should List NFT", async function () {
            await nftMarketPlaceContract.listNFTItem(basicNftAddress, TOKEN_ID, PRICE);
            const price = await nftMarketPlaceContract.getListingPrice(basicNftAddress, TOKEN_ID);
            const seller = await nftMarketPlaceContract.getListingSeller(basicNftAddress, TOKEN_ID);
            assert.equal(price.toString(), PRICE.toString());
            assert.equal(seller, deployer);
        });

        it("Should not List NFT with the 0 amount", async function () {
            
        });
    });
});