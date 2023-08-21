const { expect, assert } = require("chai");

describe("BasicNFT Contract", function () {
  let BasicNFT;
  let basicNFT;
  let owner;
  let addr1;

  beforeEach(async function () {
    [owner, addr1] = await ethers.getSigners();
    BasicNFT = await ethers.getContractFactory("BasicNFT"); // Replace with your contract name
    basicNFT = await BasicNFT.deploy();
    await basicNFT.deployed();
  });

  it("Should deploy with the correct name and symbol", async function () {
    const name = await basicNFT.name();
    const symbol = await basicNFT.symbol();

    assert(name, "BasicNFT");
    assert(symbol, "BNFT");
  });

  it("Should mint NFTs and update tokenCounter", async function () {
    const initialCounter = await basicNFT.getTokenCounter();
    await basicNFT.connect(addr1).mintNft();
    const newCounter = await basicNFT.getTokenCounter();

    assert(newCounter, initialCounter + 1);
  });

  it("Should return correct token URI", async function () {
    const tokenId = 0; // Assuming the first token is minted
    const expectedTokenURI = "ipfs://bafybeig37ioir76s7mg5oobetncojcm3c3hxasyd4rvid4jqhy4gkaheg4/?filename=0-PUG.json";

    const tokenURI = await basicNFT.tokenURI(tokenId);

    expect(tokenURI).to.equal(expectedTokenURI);
  });


});
