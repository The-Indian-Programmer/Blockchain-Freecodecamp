const { ethers, network, run } = require("hardhat");

async function main() {
  const SimpleStorage = await hre.ethers.getContractFactory("SimpleStorage")  
  const simpleStorage= await SimpleStorage.deploy();
  await simpleStorage.deployed();
  console.log(`simple storage deployed: ${simpleStorage.address}` )



  // functiont to verify sepolia contract
  async function verifySepoliaContract(contractAddress, args) {
    console.log("Verifying contract...")
    try {
      const verification = await run("verify:verify", {
        address: contractAddress,
        constructorArguments: args,
      })
    } catch (e) {
      if (e.message.toLowerCase().includes("already verified")) {
        console.log("Already Verified!")
      } else {
        console.log(e)
      }
    }
  }


  if (network.config.chainId == 11155111 && process.env.ETHERSCAN_API_KEY) {
    console.log("Waiting for block confirmations...")
    await simpleStorage.deployTransaction.wait(6)
    // await verifySepoliaContract(simpleStorage.address, [])
  }


  // Interact with the contract
  const currentValue = await simpleStorage.retrieve();
  console.log(`Current value: ${currentValue.toString()}`);

  const tx = await simpleStorage.store(13);
  await tx.wait();
  console.log("Stored 13 into SimpleStorage");
  const newCurrentValue = await simpleStorage.retrieve();
  console.log(`New value: ${newCurrentValue.toString()}`);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });