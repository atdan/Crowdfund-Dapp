const { ethers } = require('hardhat')
const fs = require('fs')

async function main() {
  const taxFee = 5
  const contract_name = 'CrowdFund'

  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const balance = await deployer.getBalance();
  console.log("Account balance:", balance.toString());


  const Contract = await ethers.getContractFactory(contract_name)
  const contract = await Contract.deploy(taxFee)

  await contract.deployed()

  const address = JSON.stringify({ address: contract.address }, null, 4)
  fs.writeFile('./src/abis/contractAddress.json', address, 'utf8', (err) => {
    if (err) {
      console.error(err)
      return
    }
    console.log('Deployed contract address', contract.address)
  })
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
