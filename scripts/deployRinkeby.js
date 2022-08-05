async function main() {
  console.log('0')
  const [owner, bidder1, bidder2] = await ethers.getSigners()
  console.log('1')

  const UncirculatedFactory = await ethers.getContractFactory('UncirculatedFakeInternetMoney', owner)
  Uncirculated = await UncirculatedFactory.deploy()
  console.log('2')
  await Uncirculated.deployed()
  await Uncirculated.connect(owner).mint(owner.address, 0)
  await Uncirculated.connect(owner).mint(owner.address, 20)
  await Uncirculated.connect(owner).mint(owner.address, 21)
  await Uncirculated.connect(owner).mint(owner.address, 22)
  await Uncirculated.connect(owner).mint(owner.address, 23)
  await Uncirculated.connect(owner).mint(owner.address, 24)

  console.log('3')
  const TokenURIFactory = await ethers.getContractFactory('TokenURI', owner)
  const TokenURI = await TokenURIFactory.deploy(Uncirculated.address)
  await TokenURI.deployed()
  console.log('4')


  const MinterFactory = await ethers.getContractFactory('Minter', owner)
  Minter = await MinterFactory.deploy(Uncirculated.address)
  await Minter.deployed()
  console.log('5')


  await Uncirculated.connect(owner).setTokenURIContract(TokenURI.address)
  await Uncirculated.connect(owner).setMintingAddress(Minter.address)

  console.log('6')



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