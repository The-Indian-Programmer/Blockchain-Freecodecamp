const {network, ethers, getNamedAccounts, deployments} = require("hardhat");

async function mintAndList() {

    const NFT_PRICE = ethers.utils.parseEther("0.01");

    await deployments.fixture(["all"]);
    const basicNftAddress = (await deployments.get("BasicNFT")).address;
    const basicNft = await ethers.getContractAt("BasicNFT", basicNftAddress);

    const nftMarketPlaceAddress = (await deployments.get("NftMarketPlace")).address;
    const nftMarketPlace = await ethers.getContractAt("NftMarketPlace", nftMarketPlaceAddress);

    console.log('--------- MINTING NFT ---------');
    const [deployer] = await ethers.getSigners();


    const mintNft = await basicNft.mintNft();
    const mintNftTx = await mintNft.wait(1);
    const tokenId = mintNftTx.events[0].args[2].toString();


    console.log('--------- APPROVING NFT ---------');
    const approveNft = await basicNft.approve(nftMarketPlaceAddress, tokenId);
    await approveNft.wait(1);

    console.log('--------- LISTING NFT ---------');
    const listNFTItem = await nftMarketPlace.listNFTItem(basicNftAddress, tokenId, NFT_PRICE);
    await listNFTItem.wait(1);


    console.log('--------- GETTING NFT ITEM ---------');
    const nftListing = await nftMarketPlace.getListing(basicNftAddress, tokenId);
    // console.log(nftListing);
}

mintAndList().then(() => process.exit(0)).catch(error => {
    console.error(error);
    process.exit(1);
})