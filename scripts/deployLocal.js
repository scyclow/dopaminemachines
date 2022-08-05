async function main() {
  const [owner, bidder1, bidder2] = await ethers.getSigners()

  const UncirculatedFactory = await ethers.getContractFactory('UncirculatedFakeInternetMoney', owner)
  Uncirculated = await UncirculatedFactory.deploy()
  await Uncirculated.deployed()
  await Uncirculated.connect(owner).mint(owner.address, 0)
  await Uncirculated.connect(owner).mint(owner.address, 20)
  await Uncirculated.connect(owner).mint(owner.address, 21)
  await Uncirculated.connect(owner).mint(owner.address, 22)
  await Uncirculated.connect(owner).mint(owner.address, 23)
  await Uncirculated.connect(owner).mint(owner.address, 24)

  const TokenURIFactory = await ethers.getContractFactory('TokenURI', owner)
  const TokenURI = await TokenURIFactory.deploy(Uncirculated.address)
  await TokenURI.deployed()


  const MinterFactory = await ethers.getContractFactory('Minter', owner)
  Minter = await MinterFactory.deploy(Uncirculated.address)
  await Minter.deployed()


  await Uncirculated.connect(owner).setTokenURIContract(TokenURI.address)
  await Uncirculated.connect(owner).setMintingAddress(Minter.address)


  console.log(`Uncirculated:`, Uncirculated.address)
  console.log(`Minter:`, Minter.address)
  console.log(`TokenURI:`, TokenURI.address)
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });