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
`


const script = [utils, mock$, globals, sound, components, text, sections, calcFeatures].join('\n')


const funcString = `
function calculateFeatures(tokenData) {
  ${script}
  return features
}
`

fs.writeFileSync('./calculateFeatures.js', funcString)

