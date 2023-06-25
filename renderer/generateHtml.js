const fs = require('fs')
const calcFeatures = require('../calculateFeatures.js')
const getPageData = require('../getPageData.js')
const TOKEN_DATA = require('./tokenData.json')

const OUTPUT_PATH = process.env.OUTPUT_PATH


TOKEN_DATA.map(([tokenId, hash]) => {
  tokenId -= 457000000

  const html = generateHtmlContent(tokenId, hash)

  return fs.writeFileSync(OUTPUT_PATH + `/${tokenId}.html`, html)

})


fs.writeFileSync(OUTPUT_PATH + `/explore.html`,
`<!DOCTYPE html>
<html>
<head>

  <link rel="shortcut icon" type="image/x-icon" href="data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMSAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiMwMDAiPjwvcmVjdD48L3N2Zz4=">

  <meta charset="utf-8">
  <title>Dopamine Machine Explorer</title>

  <meta name="google" content="notranslate" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <meta name="description" content="Dopamine Machine Explorer">
  <meta name="keywords" content="dopamine machines, dopamine machine, dopamine, machine, nft, nfts, exciting, art, website, art blocks, crypto, fastcash, ethereum, steviep, steve pikelny, pikelny">

  <meta name="twitter:image" content="https://dopaminemachines.website/explore.png">
  <meta name="twitter:image:alt" content="Dopamine Machine Explorer">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:creator" content="@steviepxyz">
  <meta name="twitter:site" content="@steviepxyz">
  <meta property="twitter:description" content="Dopamine Machine Explorer">

  <meta name="og:image" property="og:image" content="https://dopaminemachines.website/explore.png">
  <meta name="og:image:alt" content="Dopamine Machine Explorer">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://dopaminemachines.website/explore">
  <meta property="og:title" content="Dopamine Machine Explorer">
  <meta property="og:site_name" content="Dopamine Machine Explorer">
  <meta property="og:description" content="Dopamine Machine Explorer">

  <style>
    * {
      margin: 0; padding:0;
      background: #000;
      color: #fff;
      font-family: sans-serif
    }

    a, a:visited {
      color: #fff;
    }

    h1, h2 {
      text-align: center;
      margin: 0.5em;
    }

    section {
      padding: 1em;
    }

    pre {
      font-family: monospace;
    }

    .page {
      border: 1px dashed;
      padding: 1em;
      margin: 1em auto;
      max-width: 700px;
    }
  </style>
</head>
<body>
<h1>Dopamine Machine Explorer</h1>
<h2>Switch Dopamine Machines with the '[' and ']' keys.</h2>
<h2>Go to a random Dopamine Machine with the 'r' key.</h2>
<div style=" font-size: 0.75em; max-width: 260px; margin: auto; margin-top: 3em">
  <h2 style="text-align: center; margin-bottom: 0.5em; text-decoration: underline;">Standard Controls:</h2>
  <h2 style="text-align: left; font-family: monospace">[D] ⬇️ Download HTML</h2>
  <h2 style="text-align: left; font-family: monospace">[O] ⚠️ Overdrive</h2>
  <h2 style="text-align: left; font-family: monospace">[P] ✋ Pause</h2>
  <h2 style="text-align: left; font-family: monospace">[A] 😐 Anti-Anxiety Mode</h2>
  <h2 style="text-align: left; font-family: monospace">[M] 🐁 Mouse Hide</h2>
  <h2 style="text-align: left; font-family: monospace">[I] ↔️ Invert</h2>
  <h2 style="text-align: left; font-family: monospace">[N] 🙈 No Distraction Mode</h2>
  <h2 style="text-align: left; font-family: monospace">[E] 🙃 Emoji Polyfill Toggle</h2>
  <h2 style="text-align: left; font-family: monospace">[⬅️/⬆️/➡️] 🗣 Change Voice</h2>
  <h3 style="text-align: left; font-family: monospace">URL COMMANDS:  \`\${url}?text=\${encodeURI('FIRST OVERRIDE,SECOND OVERRIDE')}&emojis=\${encodeURI('🦞,🐙')}&keys=a,i&voice=daniel\`</h3>
</div>

<section>
${TOKEN_DATA.map(([tokenId, hash]) => {
  tokenId -= 457000000

  const {features, pageName} = getPageData({tokenId, hash})



  return `
    <div class="page">
      <h3>[${tokenId}]</h3>
      <a href="./${tokenId}">${pageName}</a>
      <pre>${JSON.stringify({
        LAYOUT: features.Layout,
        BASE_HUES: features['Base Hues'],
        BACKGROUND: features['Background'],
        SAMPLES: Object.keys(features)
          .filter(key => key.includes('_Sample:'))
          .filter(key => !!features[key])
          .map(key => key.replace('_Sample: ', '')),
      }, null, 4)}</pre>
    </div>
  `
}).join('')}
</section>

</body>

  <script>
    document.addEventListener('keydown', (e) => {
      if (e.key === '[') {
        window.location.href = './776'
      }
      else if (e.key === ']') {
        window.location.href = './0'
      }

      else if (e.key === 'r') {
        window.location.href = './${parseInt(Math.random() * 777)}'
      }
    })
  </script>
</html>
`)



function generateHtmlContent(tokenId, hash) {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <body id="#main"></body>
  <script>window.tokenData = { tokenId: ${tokenId}, hash: "${hash.replace('\n', '')}" }</script>
  <script src="./twemoji.min.js"></script>
  <script src="./min.js"></script>
  <script>
    document.addEventListener('keydown', (e) => {
      if (e.key === '[') {
        window.location.href = './${tokenId > 0 ? tokenId - 1 : 776}'
      }
      else if (e.key === ']') {
        window.location.href = './${tokenId < 776 ? tokenId + 1 : 0}'
      }

      else if (e.key === 'r') {
        window.location.href = './' + parseInt(Math.random() * 777)
      }
    })
  </script>
</html>`
}



