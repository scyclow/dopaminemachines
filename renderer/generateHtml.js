const fs = require('fs')
const TOKEN_DATA = require('./tokenData.json')

const OUPTPUT_PATH = process.env.OUTPUT_PATH




TOKEN_DATA.map(([tokenId, tokenHash]) => {
  tokenId -= 457000000

  const html = generateHtmlContent(tokenId, tokenHash)

  return fs.writeFileSync(OUTPUT_PATH + `/${tokenId}.html`, html)

})


function generateHtmlContent(tokenId, tokenHash) {
  return `
    <html>
      <body id="#main"></body>
      <script>window.tokenData = { tokenId: ${tokenId}, hash: "${tokenHash}" }</script>
      <script src="./twemoji.min"></script>
      <script src="./min.js"></script>
    </html>
  `
}



