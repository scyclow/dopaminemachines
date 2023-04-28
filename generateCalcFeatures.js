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


  const features = [...emojiList, ...textLists.flat()].reduce((f, t) => {
    f['_Content: ' + t] = false
    return f
  }, {})


  features['Layout Style'] =
    layoutStyle === 1 ? 'Anything Goes' :
    layoutStyle === 4 ? 'Less is More' :
    layoutStyle === 2 || layoutStyle === 9 ? 'More is More' :
    layoutStyle === 3 || layoutStyle === 5 ? 'Horizontal' :
    layoutStyle === 6 ? 'Vertical' :
    'Grid'

  features['Background Style'] =
    hideBg ? 'Empty' :
    bgType === 0 || bw ? 'Solid' :
    bgType === 1 ? 'Empty' :
    bgType === 2 ? 'Gradient' :
    'ZigZag'



  features['Shadow Style'] = shadowType
  features['Font'] = fontFamily
  features['Borders'] = showBorder ? borderStyle : 'none'
  features['Askew'] = freeFloating

  const canSeeBodyBg = freeFloating || bgType === 1
  const bodyBgHasColor = !['#000', '#fff'].includes(bgColor)
  features['Base Hues'] =
    bw ? 0 :
    canSeeBodyBg && bodyBgHasColor && bw ? 1 :
    possibleHues[1] < 1 ? 1 :
    randomHue ? '???' :
    possibleHues.length


  features['Inverted'] = invertAll
  features['Random Calls'] = rCount
  features['Sections'] = sectionCount
  features['Marquees'] = marqueeCount
  features['Animations'] = animationCount
  features['Grids'] = gridCount
  features['Font Weight'] = fontWeight
  features['Full Hue Rotation'] = fullHueRotation
  features['BG Boxes'] = bgAnimationCount
  features['Starbursts'] = starburstCount
  features['Section Animation'] = !!sectionAnimation


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
    if ([sportsText, sportsEmojis].includes(s)) return 'Sports'
    return 'Misc.'
  }

  const usedContentSamples = [...contentSample.text, ...(showEmojis ? contentSample.emojis : [])].map(classifySample)

  features['_Sample: Exciting'] = usedContentSamples.includes('Exciting')
  features['_Sample: Lucky'] = usedContentSamples.includes('Lucky')
  features['_Sample: Sexy'] = usedContentSamples.includes('Sexy')
  features['_Sample: Party Time'] = usedContentSamples.includes('Party Time')
  features['_Sample: Get Rich Quick'] = usedContentSamples.includes('Get Rich Quick')
  features['_Sample: Yummy'] = usedContentSamples.includes('Yummy')
  features['_Sample: Fun'] = usedContentSamples.includes('Fun')
  features['_Sample: Sports'] = usedContentSamples.includes('Sports')
  features['_Sample: Hot Stuff'] = usedContentSamples.includes('Hot Stuff')
  features['_Sample: Not Financial Advice'] = usedContentSamples.includes('Not Financial Advice')
  features['_Sample: World Wide Web'] = usedContentSamples.includes('World Wide Web')
  features['_Sample: Deals'] = usedContentSamples.includes('Deals')
  features['_Sample: FOMO'] = usedContentSamples.includes('FOMO')
  features['_Sample: Lunar'] = usedContentSamples.includes('Lunar')
  features['_Sample: Positivity'] = usedContentSamples.includes('Positivity')
  features['_Sample: Hedonic Treadmill'] = usedContentSamples.includes('Hedonic Treadmill')
  features['_Sample: Filler'] = usedContentSamples.includes('Filler')
  features['_Sample: Misc.'] = usedContentSamples.includes('Misc.')


  const usedAnimationsUnique = Array.from(new Set(usedAnimations.filter(a => a !== iden)))


  features['_Animation: Up-Down'] = usedAnimationsUnique.includes(updownLong)
  features['_Animation: Left-Right'] = usedAnimationsUnique.includes(leftRight)
  features['_Animation: Grow-Shrink'] = usedAnimationsUnique.includes(growShrink) || usedAnimationsUnique.includes(growShrinkShort)
  features['_Animation: Blink'] = usedAnimationsUnique.includes(blink)
  features['_Animation: Dance'] = usedAnimationsUnique.includes(dance)
  features['_Animation: Spin'] = usedAnimationsUnique.includes(spin)
  features['_Animation: Wave'] = usedAnimationsUnique.includes(wave)
  features['_Animation: Climb'] = usedAnimationsUnique.includes(climb)
  features['_Animation: Hexagon'] = usedAnimationsUnique.includes(hexagon)
  features['_Animation: Breathe'] = usedAnimationsUnique.includes(breathe)
  features['_Animation: Flaming Hot'] = usedAnimationsUnique.includes(flamingHot)
  features['_Animation: Horizontal Siren'] = usedAnimationsUnique.includes(hSiren)
  features['_Animation: Vertical Siren'] = usedAnimationsUnique.includes(vSiren) || usedAnimationsUnique.includes(vSirenShort)
  features['_Animation: Horizontal Pivot'] = usedAnimationsUnique.includes(hPivot)
  features['_Animation: Vertical Pivot'] = usedAnimationsUnique.includes(vPivot)
  features['_Animation: Horizontal Flip'] = usedAnimationsUnique.includes(hFlip)
  features['_Animation: Vertical Flip'] = usedAnimationsUnique.includes(vFlip)
  features['_Animation: Color Characters'] = usedAnimationsUnique.includes(colorChars)
  features['_Animation: Up-Down Characters'] = usedAnimationsUnique.includes(updownChars)
  features['_Animation: Blinking Characters'] = usedAnimationsUnique.includes(blinkChars)
  features['_Animation: Shrinking Characters'] = usedAnimationsUnique.includes(shrinkChars)

  const usedContent = Array.from(
    new Set([
      ...$.cls(main, 'content').map(e => e.innerHTML),
      ...$.cls(main, 'charContentGroup').map(getContent)
    ])
  )
  usedContent.forEach(c => features['_Content: ' + c] = true)

  if (usedContent.includes('PARTY TIME')) features['_Sample: PARTY TIME'] = true

`


const script = [utils, mock$, globals, sound, components, text, sections, calcFeatures].join('\n')


const funcString = `
function calculateFeatures(tokenData) {
  ${script}
  return features
}
`

fs.writeFileSync('./calculateFeatures.js', funcString)

