
const { expect } = require("chai")

const expectFailure = async (fn, err) => {
  let failure
  try {
    await fn()
  } catch (e) {
    failure = e
  }
  expect(failure.message).to.include(err)
}

const num = n => Number(ethers.utils.formatEther(n))

describe('Gov', () => {
  let artist, collector1, collector2, collector3
  let projectEventCalldata
  let WWW, Gov
  before(async () => {
    const signers = await ethers.getSigners()

    artist = signers[0]
    collector1 = signers[1]
    collector2 = signers[2]
    collector3 = signers[3]

    const WWWFactory = await ethers.getContractFactory('WorldWideWeb', artist)
    WWW = await WWWFactory.deploy()
    await WWW.deployed()

    const GovFactory = await ethers.getContractFactory('Gov', artist)
    Gov = await GovFactory.deploy(WWW.address)
    await Gov.deployed()

    await WWW.connect(artist).transferOwnership(Gov.address)


    await WWW.connect(artist).mint(collector1.address, 1)
    await WWW.connect(artist).mint(collector2.address, 2)
    await WWW.connect(artist).mint(collector3.address, 3)
    // await network.provider.send("hardhat_reset", [
    //   {
    //     forking: {
    //       jsonRpcUrl: config.networks.hardhat.forking.url,
    //       blockNumber: config.networks.hardhat.forking.blockNumber,
    //     },
    //   },
    // ])
    projectEventCalldata = WWWFactory.interface.encodeFunctionData('emitProjectEvent', ['event', 'content'])
  })


  it('propose/hashProposal should work', async () => {
    await Gov.connect(collector1).propose(1, WWW.address, 0, projectEventCalldata)
    const proposalId = await Gov.connect(collector2).hashProposal(WWW.address, 0, projectEventCalldata)

    const proposal = await Gov.connect(collector1).proposals(proposalId)

    expect(proposal.executed).to.equal(false)
    expect(proposal.totalVotes.toNumber()).to.equal(1)
    expect(proposal.maxVotes.toNumber()).to.equal(3)
  })

  it('execute should not work before votes are cast', async () => {
    expectFailure(
      () => Gov.connect(collector1).execute(WWW.address, 0, projectEventCalldata),
      'Insufficient votes to execute proposal'
    )

    const proposalId = await Gov.connect(collector2).hashProposal(WWW.address, 0, projectEventCalldata)
    const proposal = await Gov.connect(collector1).proposals(proposalId)

    expect(proposal.executed).to.equal(false)
  })


  it('castVote should work', async () => {
    const proposalId = await Gov.connect(collector2).hashProposal(WWW.address, 0, projectEventCalldata)
    await Gov.connect(collector2).castVote(proposalId, 2, true)
    const proposal = await Gov.connect(collector1).proposals(proposalId)

    expect(proposal.executed).to.equal(false)
    expect(proposal.totalVotes.toNumber()).to.equal(2)
  })

  it('castVote allow unvoting, but not double voting', async () => {
    const proposalId = await Gov.connect(collector2).hashProposal(WWW.address, 0, projectEventCalldata)

    await Gov.connect(collector2).castVote(proposalId, 2, true)
    let proposal = await Gov.connect(collector1).proposals(proposalId)
    expect(proposal.totalVotes.toNumber()).to.equal(2)

    await Gov.connect(collector2).castVote(proposalId, 2, false)
    proposal = await Gov.connect(collector1).proposals(proposalId)
    expect(proposal.totalVotes.toNumber()).to.equal(1)

    await Gov.connect(collector2).castVote(proposalId, 2, false)
    proposal = await Gov.connect(collector1).proposals(proposalId)
    expect(proposal.totalVotes.toNumber()).to.equal(1)

    await Gov.connect(collector2).castVote(proposalId, 2, true)
    proposal = await Gov.connect(collector1).proposals(proposalId)
    expect(proposal.totalVotes.toNumber()).to.equal(2)

    await Gov.connect(collector2).castVote(proposalId, 2, true)
    proposal = await Gov.connect(collector1).proposals(proposalId)
    expect(proposal.totalVotes.toNumber()).to.equal(2)

    await Gov.connect(collector3).castVote(proposalId, 3, false)
    proposal = await Gov.connect(collector1).proposals(proposalId)
    expect(proposal.totalVotes.toNumber()).to.equal(2)
  })

  it('execute should work', async () => {
    const preVoteEvents = await WWW.queryFilter({
      address: WWW.address,
      topics: []
    })

    await Gov.connect(collector1).execute(WWW.address, 0, projectEventCalldata)

    const postVoteEvents = await WWW.queryFilter({
      address: WWW.address,
      topics: []
    })

    expect(postVoteEvents.length).to.equal(preVoteEvents.length + 1)
    expect(postVoteEvents[postVoteEvents.length-1].event).to.equal('ProjectEvent')
  })

  it('execute should not work multiple times', async () => {
    expectFailure(
      () => await Gov.connect(collector1).execute(WWW.address, 0, projectEventCalldata),
      'Proposal has already been executed'
    )
  })

})