const puppeteer = require('puppeteer')
const fs = require('fs')
const GIFEncoder = require('gifencoder')
const pngFileStream = require('png-file-stream')
const tempdir = require('tempdir')
const ethers = require('ethers')

const STUFF = require('../../DEV_KEYS/stuff.json')




const OUTPUT_PATH = `/Users/steviep/Desktop/dopamine-machines-final-test`
const RENDER_URL = 'http://localhost:51543'
const generateUrl = (hash, tokenId) => `${RENDER_URL}?hash=${hash}&tokenId=${tokenId}`

const AB_CONTRACT = '0x99a9B7c1116f9ceEB1652de04d5969CcE509B069'

const TOKEN_START = 0
const TOKEN_STOP = 10//777
const PROJECT_ID = 457

const WIDTH = 456
const HEIGHT = 256
const FPS = 24
const DURATION = 5
const QUALITY = 10

const RENDER_LOCAL = true

const abABI = [
  'function tokenIdToHash(uint256 tokenId) view returns (bytes32 hash)',
  'function projectScriptByIndex(uint256 projectId, uint256 index) view returns (string script)',
  'function projectScriptInfo(uint256 projectId) view returns (string memory scriptJSON, uint256 scriptCount, bool useHashString, string memory ipfsHash, bool locked, bool paused)',
]

const provider = RENDER_LOCAL ? null : new ethers.AlchemyProvider(null, STUFF.ALCHEMY_MAINNET_API_KEY)
const ArtBlocksContract = RENDER_LOCAL ? null : new ethers.Contract(AB_CONTRACT, abABI, provider)


if (!fs.existsSync(OUTPUT_PATH)){
  fs.mkdirSync(OUTPUT_PATH);
}

(async () => renderGifs(PROJECT_ID, TOKEN_START, TOKEN_STOP, OUTPUT_PATH))()




async function renderGifs(projectId, idStart, idStop, outputPath) {
  const hashes = await getHashes(projectId, idStart, idStop)
  const projectScript = RENDER_LOCAL ? '' : await getProjectScript(projectId)
  await generateAllGifs(hashes, projectScript, WIDTH, HEIGHT, FPS, DURATION, outputPath)

}





function getHashes(projectId, idStart, idStop) {
  const iterations = idStop - idStart

  if (RENDER_LOCAL) return times(iterations, i => {
    const tokenId = projectId * 1_000_000 + i + idStart
    let tokenHash = '0x'
    for (let i = 0; i < 64; i++) {
      tokenHash += Math.floor(Math.random() * 16).toString(16)
    }

    return [tokenId, tokenHash]
  })



  return Promise.all(
    times(
      iterations,
      async i => {
        const tokenId = projectId * 1_000_000 + i + idStart
        return [
          tokenId,
          await ArtBlocksContract.tokenIdToHash(tokenId)
        ]
      }
    )
  )
}

async function getProjectScript(projectId) {
  const projectScriptInfo = await ArtBlocksContract.projectScriptInfo(projectId)
  const scriptCount = projectScriptInfo.scriptCount.toNumber()

  let projectScript = ''

  for (let i = 0; i < scriptCount; i++) {
    projectScript += await ArtBlocksContract.projectScriptByIndex(projectId, i)
  }

  return projectScript
}


async function generateHtmlContent(projectScript, projectId, tokenId) {
  return `
    <html>
      <body id="#main"></body>
      <script src="https://cdn.jsdelivr.net/npm/twemoji@14.0.2/dist/twemoji.npm.min.js"></script>
      <script>window.tokenData = { hash: "${hash}", tokenId: ${tokenId} }</script>
      <script>${projectScript}</script>
    </html>
  `
}


async function generateSingleGif(page, projectScript, tokenId, tokenHash, w, h, fps, duration, outputPath) {
  try {
    console.log(`================ [${tokenId}] ================`)

    if (RENDER_LOCAL) {
      await page.goto(generateUrl(tokenHash, tokenId))

    } else {
      const htmlContent = await generateHtmlContent(projectScript, tokenHash, tokenId)
      await page.setContent(htmlContent)
    }


    console.log(`[${tokenId}] Waiting for selector`)
    await page.waitForSelector('#main');
    console.log(`[${tokenId}] Getting element`)
    const element = await page.$('#main')

    await wait(100)

    const screenshots = fps * duration
    const workdir = await tempdir()
    const getWorkdir = name => `${workdir}/T${name}.png`


    for (let i = 0; i < screenshots; i++) {
      await page.keyboard.press('p')

      await element.screenshot({
        path: getWorkdir(new Date().getTime())
      })

      console.log(`[${tokenId}] ... ${i}`)

      await page.keyboard.press('p')
      await wait(1000/fps)
    }

    console.log(`[${tokenId}] Encoding`)
    const encoder = new GIFEncoder(w, h)

    await pngFileStream(getWorkdir('*'))
      .pipe(encoder.createWriteStream({ repeat: 0, delay: 1000/fps, quality: QUALITY }))
      .pipe(fs.createWriteStream(`${outputPath}/${tokenId}.gif`));

  } catch (e) {
    console.error(e)
  }
}


async function generateSingleImage(page, tokenId, tokenHash, _, __, outputPath) {
  try {
    console.log(`================ [${tokenId}] ================`)
    await page.goto(generateUrl(tokenHash, tokenId))

    console.log(`[${tokenId}] Waiting for selector`)
    await page.waitForSelector('#main');
    console.log(`[${tokenId}] Getting element`)
    const element = await page.$('#main')

    await wait(100)
    console.log(`[${tokenId}] Screenshot`)

    await element.screenshot({
      path: `${outputPath}/${tokenId}.png`
    })
  } catch (e) {
    console.error(e)
  }
}


async function generateAllGifs(tokens, projectScript, width, height, fps, duration, outputPath) {
  let longestRender = 0
  const startTime = Date.now()
  const renderTimes = []

  console.log('LAUNCHING')
  const browser = await puppeteer.launch()

  console.log('NEW PAGE')
  const page = await browser.newPage()

  console.log(`SETTING VIEWPORT`)
  await page.setViewport({ width, height })

  for (let [tokenId, tokenHash] of tokens) {
    const start = Date.now()
    await generateSingleGif(page, projectScript, tokenId, tokenHash, width, height, fps, duration, outputPath)
    // await generateSingleImage(page, tokenId, tokenHash, fps, duration, outputPath)

    const renderTime = Date.now() - start
    if (renderTime > longestRender) {
      longestRender = renderTime
    }
    renderTimes.push(renderTime)
  }


  const totalRenderTime = renderTimes.reduce((sum, t) => sum + t, 0)
  console.log(`################## Total render time: ${(Date.now() - startTime)/1000}s`)
  console.log(`################## Average render time: ${(totalRenderTime/tokens.length)/1000}s`)
  console.log(`################## Longest render time: ${(longestRender)/1000}s`)
}


async function wait(ms) {
  return new Promise(res => setTimeout(res, ms))
}

function times(t, fn) {
  const out = []
  for (let i = 0; i < t; i++) out.push(fn(i))
  return out
}


