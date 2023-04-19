const fs = require('fs')

const utils = fs.readFileSync('./marquees/utils.js', 'utf8')
const mock$ = fs.readFileSync('./marquees/mock$.js', 'utf8')
const globals = fs.readFileSync('./marquees/globals.js', 'utf8')
const sound = fs.readFileSync('./marquees/sound.js', 'utf8')
const components = fs.readFileSync('./marquees/components.js', 'utf8')
const text = fs.readFileSync('./marquees/text.js', 'utf8')
const sections = fs.readFileSync('./marquees/sections.js', 'utf8')
const calcFeatures = `
  const main = $.main(
    flexSection(rows, cols),
    {
      id: 'main',
      style: \`
        height: 100vh;
        width: 100vw;
        overflow: hidden;
        display: grid;
        grid-template-rows: repeat(\${rows}, 1fr);
        grid-template-columns: repeat(\${cols}, 1fr);
      \`
    }
  )

  const usedContent = Array.from(
    new Set([
      ...$.cls(main, 'content').map(e => e.innerHTML),
      ...$.cls(main, 'charContentGroup').map(getContent)
    ])
  )

  const features = [...emojiList, ...textLists.flat()].reduce((f, t) => {
    f[t] = false
    return f
  }, {})

  usedContent.forEach(c => features[c] = true)

  features['Layout Type'] = layoutStyle
  features['Background Type'] = hideBg ? 'none' : bgType
  features['Shadow Type'] = shadowType
  features['Font'] = fontFamily
  features['Borders'] = showBorder ? borderStyle : 'none'
  features['Askew'] = freeFloating
  features['Hues'] = randomHue ? '???' : possibleHues.length
  if (possibleHues[1] < 1) features['Hues'] = 1
  features['Inverted'] = invertAll
  features['Random Calls'] = rCount
  features['Sections'] = sectionCount
  features['Marquees'] = marqueeCount
  features['Animations'] = animationCount
  features['Grids'] = gridCount
  features['Font Weight'] = fontWeight
  features['Full Hue Rotation'] = fullHueRotation


  function classifySample(s) {
    if ([moneyFull, cashText, crypto].includes(s)) return 'Get Rich Quick'
    if ([lucky, luckyText].includes(s)) return 'Lucky'
    if ([sexy, sexyText].includes(s)) return 'Sexy'
    if ([yummy].includes(s)) return 'Yummy'
    if ([lunar].includes(s)) return 'Lunar'
    if ([computer, wwwText].includes(s)) return 'World Wide Web'
    if ([excitingText, excitingMisc, explosionFull, explosion1, energy, loud, usa].includes(s)) return 'Exciting'
    if ([drugs, party, booze].includes(s)) return 'Party Time'
    if ([funny, funText, colorful, circusEmojis].includes(s)) return 'Fun'
    if ([hot, hotText].includes(s)) return 'Hot Stuff'
    if ([disclaimer].includes(s)) return 'Not Financial Advice'
    if ([affirmations].includes(s)) return 'Positivity'
    if ([dealsText].includes(s)) return 'Deals'
    if ([fomo].includes(s)) return 'FOMO'
    if ([hedonicTreadmill, symbols, justArrows].includes(s)) return 'Hedonic Treadmill'
    return 'Filler'
  }

  const usedContentSamples = [...contentSample.text, ...contentSample.emojis].map(classifySample)

  features['Content Sample: Exciting'] = usedContentSamples.includes('Exciting')
  features['Content Sample: Lucky'] = usedContentSamples.includes('Lucky')
  features['Content Sample: Sexy'] = usedContentSamples.includes('Sexy')
  features['Content Sample: Party Time'] = usedContentSamples.includes('Party Time')
  features['Content Sample: Get Rich Quick'] = usedContentSamples.includes('Get Rich Quick')
  features['Content Sample: Yummy'] = usedContentSamples.includes('Yummy')
  features['Content Sample: Fun'] = usedContentSamples.includes('Fun')
  features['Content Sample: Hot Stuff'] = usedContentSamples.includes('Hot Stuff')
  features['Content Sample: Not Financial Advice'] = usedContentSamples.includes('Not Financial Advice')
  features['Content Sample: World Wide Web'] = usedContentSamples.includes('World Wide Web')
  features['Content Sample: Deals'] = usedContentSamples.includes('Deals')
  features['Content Sample: FOMO'] = usedContentSamples.includes('FOMO')
  features['Content Sample: Lunar'] = usedContentSamples.includes('Lunar')
  features['Content Sample: Positivity'] = usedContentSamples.includes('Positivity')
  features['Content Sample: Hedonic Treadmill'] = usedContentSamples.includes('Hedonic Treadmill')
  features['Content Sample: Filler'] = usedContentSamples.includes('Filler')
`


const script = [utils, mock$, globals, sound, components, text, sections, calcFeatures].join('\n')


const funcString = `
function calculateFeatures(tokenData) {
  ${script}
  return features
}
`

fs.writeFileSync('./calculateFeatures.js', funcString)

