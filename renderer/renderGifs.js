const puppeteer = require('puppeteer')
const fs = require('fs')
const GIFEncoder = require('gifencoder')
const pngFileStream = require('png-file-stream')
const tempdir = require('tempdir')
const ethers = require('ethers')

const STUFF = require('../../DEV_KEYS/stuff.json')




const OUTPUT_PATH = `/Users/steviep/Desktop/dm-gif-promo`
const generateUrl = (hash, tokenId) => `http://localhost:62550?hash=${hash}&tokenId=${tokenId}&text=2%20MORE%20DAYS!`

const AB_CONTRACT = '0x99a9B7c1116f9ceEB1652de04d5969CcE509B069'


const TOKEN_ID_START = 0
const TOKEN_ID_STOP = 12
const PROJECT_ID = 457

// const ITERATION = 8
// const HEIGHT = 256/2
// const WIDTH = HEIGHT * 1.5//456/2
// const FPS = 10
// const DURATION = 5
// const QUALITY = 10

// const ITERATION = '-' + 15
const ITERATION = ''
const HEIGHT = 256
const WIDTH = HEIGHT * 1.625//456/2
const FPS = 12
const DURATION = 5
const QUALITY = 10

const RENDER_LOCAL = true
const RENDER_GIF = true

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





(async function renderThumnails() {
  console.log('%%%%%%%%% START:', new Date, '%%%%%%%%%')
  const startTime = Date.now()

  const THREADS = 4
  const TOTAL_RENDERS = TOKEN_ID_STOP - TOKEN_ID_START
  const Q_LENGTH = TOTAL_RENDERS / THREADS




  const tokenData = await Promise.all(times(THREADS, i => {
    const start = parseInt(i * Q_LENGTH)
    const end = parseInt((i+1) * Q_LENGTH)

    return getTokenData(PROJECT_ID, start, end)
  }))

  fs.writeFileSync(OUTPUT_PATH + '/tokenData.json', JSON.stringify(tokenData.flat()))

  const renderTimes = times(THREADS, async i => {
    return generateAllThumbnails({
      tokenData: tokenData[i],
      projectScript: RENDER_LOCAL ? '' : await getProjectScript(PROJECT_ID),
      width: WIDTH,
      height: HEIGHT,
      fps: FPS,
      duration: DURATION,
      outputPath: OUTPUT_PATH,
      renderLocal: RENDER_LOCAL,
      renderGif: RENDER_GIF,
      thread: i
    })

  })



  try {
    const tokenTimes = (await Promise.all(renderTimes)).flat()

    const totalRenderTime = tokenTimes.reduce((sum, t) => sum + t, 0)
    console.log(`################## Total render time: ${(Date.now() - startTime)/1000}s`)
    console.log(`################## Average render time: ${(totalRenderTime/TOTAL_RENDERS)/1000}s`)

  } catch (e) {
    console.log(e)
    console.log(`################## Total render time: ${(Date.now() - startTime)/1000}s`)
  }
})()






function getTokenData(projectId, idStart=0, idStop=10) {
  const iterations = idStop - idStart

  if (RENDER_LOCAL) return times(iterations, i => {
    const tokenId = projectId * 1_000_000 + i + idStart
    let tokenHash = '0x'
    for (let i = 0; i < 64; i++) {
      tokenHash += Math.floor(Math.random() * 16).toString(16)
    }

    return [tokenId, tokenHash]
  })

  // if (RENDER_LOCAL) return [
  //   [457000000, '0x38c0d49a4868b743d4d0fecac39ca00c5c6439ce8664a7fb51830ea098c59d67'],
  //   [457000001, '0x629d02697199e5428b1e4b1818305fe6c3e840ad3e9b0e51b8eda81cbd150224'],
  //   [457000002, '0x4f489af2c484514fe123d4cd922dde29b7688b43462c7d35b57d0a9b32445c8e'],
  //   [457000003, '0x84d4d099a45d6140130aee7b94c7477ea7114b24575c8e5df796762ce391d3a4'],
  //   [457000004, '0xca36b2ffc6529507d5597f46c72889cbf73d3bcae4966e6603cc6617bffa42da'],
  //   [457000005, '0x927a39e77a75fb5eee0ab84540c52f6ae57e714b89737e09e8838127f91d82b8'],
  //   [457000006, '0x35016896679aade8f828eb60c3d218a72f2e5f7cd29e4b8c6af06002dba8c82c'],
  //   [457000007, '0x046e236ab476e494a71235d521c1a543f399c0cfe0c34842146561016ee7a466'],
  //   [457000008, '0x6e444e0595c85f3f796a53e27d3d1da2f1f5fdd18e5ecb2e023dfe2fd3f172ce'],
  //   [457000009, '0x67789c89bf71d91bba6e42803b5928ddd4706eddef316f2e8836cfce047f740a']
  // ].slice(idStart, idStop)



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


async function generateSingleGif(page, tokenId, w, h, fps, duration, outputPath) {
  try {
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
      await wait(200)

      await element.screenshot({
        path: getWorkdir(new Date().getTime())
      })

      // console.log(`[${tokenId}] ... ${i}`)

      await page.keyboard.press('p')
      await wait(1000/fps)
    }

    console.log(`[${tokenId}] Encoding`)
    const encoder = new GIFEncoder(w, h)

    await pngFileStream(getWorkdir('*'))
      .pipe(encoder.createWriteStream({ repeat: 0, delay: 1000/fps, quality: QUALITY }))
      .pipe(fs.createWriteStream(`${outputPath}/${tokenId}${ITERATION}.gif`));

  } catch (e) {
    console.error(e)
  }
}


async function generateSinglePNG(page, tokenId, outputPath) {
  try {
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


async function generateAllThumbnails({
  tokenData,
  projectScript,
  width,
  height,
  fps,
  duration,
  outputPath,
  renderLocal,
  renderGif,
  thread
}) {
  const renderTimes = []

  console.log('LAUNCHING')
  const browser = await puppeteer.launch()

  console.log('NEW PAGE')
  const page = await browser.newPage()

  console.log(`SETTING VIEWPORT`)
  await page.setViewport({ width, height })



  let i = 1
  for (let [tokenId, tokenHash] of tokenData) {
    const start = Date.now()

    console.log(`================ T:${thread} [${tokenId}] (${(i*100/tokenData.length).toFixed(2)}%) ${new Date} ================`)

    try {
      if (renderLocal) {
        await page.goto(generateUrl(tokenHash, tokenId))
      } else {
        const htmlContent = await generateHtmlContent(projectScript, tokenHash, tokenId)
        await page.setContent(htmlContent)
      }

      if (renderGif) {
        await generateSingleGif(page, tokenId, width, height, fps, duration, outputPath)
      } else {
        await generateSinglePNG(page, tokenId, outputPath)
      }

      const renderTime = Date.now() - start

      console.log('=>', renderTime)
      renderTimes.push(renderTime)
    } catch (e) {
      console.log(e)
      console.log(`>>>>>>>>>>>>>>> RERENDER >>>>>>>>>>>>>>>>>> T:${thread} [${tokenId}] ${new Date}`)
    }
    i++
  }

  return renderTimes



}


async function wait(ms) {
  return new Promise(res => setTimeout(res, ms))
}

function times(t, fn) {
  const out = []
  for (let i = 0; i < t; i++) out.push(fn(i))
  return out
}


