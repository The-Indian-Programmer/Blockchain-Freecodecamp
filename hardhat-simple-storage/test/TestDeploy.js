const {assert} = require("chai");
const {ethers} = require("hardhat");

describe("SimpleStorage", function () {
  let SimpleStorage, SimpleStorageFactory;

  beforeEach(async function () {
    SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
    SimpleStorage = await SimpleStorageFactory.deploy();
    await SimpleStorage.deployed();
  })

  it("Should start with a favourite number 0", async function () {
      const favouriteNumber = await SimpleStorage.retrieve();
      console.log("favouriteNumber: ", favouriteNumber);
      assert.equal(favouriteNumber, 0);      
  })

  it("Should set the favourite number to 42", async function () {
    const favouriteNumber = await SimpleStorage.retrieve();
    console.log("favouriteNumber: ", favouriteNumber);

    await SimpleStorage.store(42);
    const newFavoriteNumber = await SimpleStorage.retrieve();
    console.log("newFavoriteNumber: ", newFavoriteNumber);

    assert.equal(newFavoriteNumber, 42);
  })
});