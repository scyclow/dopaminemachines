
const cols = 60
const rows = 48
const EDITION_SIZE = 777

const projectionPages = {}


let LAST_PAUSED, OVERDRIVE, ANHEDONIC, INVERT_ALL
let PAUSED = ls.get('__DOPAMINE_IS_PAUSED__') || false
let USE_EMOJI_POLYFILL = TWEMOJI_PRESENT && (
  IS_HEADLESS
  || ls.get('__DOPAMINE_EMOJI_TOGGLE__')
  || false
)


const speed = prb(0.05) ? 100 : 3

const italicRate = chance(
  [1, rnd()],
  [1, 1],
  [8, 0],
)

const fontWeight = chance(
  [1, 100],
  [8, 500],
  [1, 900],
)

const fontFamily = chance(
  [5, 'serif'],
  [5, 'cursive'],
  [15, 'monospace'],
  [75, 'sans-serif'],
)

const layoutStyle = chance(
  [55, 1], // anything goes
  [6, 2],  // anything goes (micro/large)
  [7, 3],  // anything goes (lean rows)
  [6, 4],  // macro
  [7, 5],  // even rows
  [5, 6],  // even cols
  [6, 7],  // perfect grid
  [3, 8],  // imperfect grid
  [5, 9],  // anything goes micro, varying size
)

const rowSize = sample([1, 2, 3, 4, 6, 8, 12, 16, 24])
const colSize = sample([2, 3, 4, 6, 10, 15])
const cellSize = sample([3, 4, 6, 12, 16])

const sidewaysPrb = prb(0.4) ? 0 : rnd(0.5, 1)
const thinSidewaysPrb = layoutStyle !== 6 ? 0.95 : chance(
  [9, 0.66],
  [9, 0.95],
  [2, 0],
)


const marqueeAnimationRate = chance(
  [85, 0],
  [20, rnd(.25, .5)],
  [5, 1],
)

const tokenId = Number(tokenData.tokenId) % 1000000
const is69 = tokenId === 69
const is7 = [7, 77].includes(tokenId)
const is100 = tokenId === 100
const is420 = tokenId === 420
const is666 = tokenId === 666
const projectId = (Number(tokenData.tokenId) - tokenId) / 1000000
const showEmojis = is100 || is666 || is7 || is420 || is69 || prb(0.5)

const pairedEmojiPrb = chance(
  [2, 0],
  [1, 0.5],
  [1, 1],
)

const upsideDownRate = chance(
  [9, 0],
  [1, rnd(0.1, 0.3)]
)

const mildRotation = () => rnd(20)
mildRotation.isMild = true
const lineRotation = chance(
  [92, () => prb(upsideDownRate) ? 180 : 0],
  [6, mildRotation],
  [2, () => rnd(20, 180)],
)

const freeFloating = ![0, 180].includes(lineRotation())
const threeDRotations = lineRotation.isMild && prb(0.3333)

const bgType = chance(
  [55, 0],
  [12, 1], // empty
  [20, 2], // gradiant
  [8, 3], // zigzag small
  [3, 4], // zigzag large
  [2, 5], // zigzag med
)

const bgAnimationPrb = chance(
  [12, 0],
  [bgType < 3 && 6, rnd(0.25, 0.5)],
  [bgType < 3 && 2, 1],
)

const BW = prb(0.15)
const STARTING_HUE = rnd(360)

const randomHue = prb(0.02)
const chooseHue = () => randomHue ? rnd(360) : STARTING_HUE + sample(possibleHues) % 360

const chooseAltHue = (h) => {
  const alt = chooseHue()
  return h === alt ? chooseAltHue(h) : alt
}

const possibleHues = chance(
  [bgType === 1 && 2, [0, 0.0001]],
  [1, [0, 180]],
  [1, [0, 120, 180]],
  [1, [0, 180, 240]],
  [1, [0, 150]],
  [1, [0, 210]],
  [1, [0, 120, 240]],
  [1, [0, 75]],
)

const shadowType = chance(
  [4, 1],
  [4, 2],
  [BW ? 1 : 4, 3],
  [4, 4],
  [4, 5],
  [2, 6],
  [2, 7],
  [4, 8],
  [2, 9],
)


const defaultShadowLightness = !BW && (prb(0.75) || possibleHues[1] === 75) ? 20 : 50
const getShadowColor = (h, l=50) => `hsl(${h%360}deg, 100%, ${l}%)`
const getShadowText = (h, polyfillShadow) => {
  const shadowColor = shadowType === 8 ? '#fff' : getShadowColor(h+90, defaultShadowLightness)

  const adjustedCoord = polyfillShadow ? 0.0125 : 0.025
  return (
    [1, 8].includes(shadowType) ? [
        `${adjustedCoord}em ${adjustedCoord}em ${shadowColor}`,
        `-${adjustedCoord}em ${adjustedCoord}em ${shadowColor}`,
        `${adjustedCoord}em -${adjustedCoord}em ${shadowColor}`,
        `-${adjustedCoord}em -${adjustedCoord}em ${shadowColor}`,
        `${adjustedCoord}em 0 ${shadowColor}`,
        `-${adjustedCoord}em 0 ${shadowColor}`,
        `0 -${adjustedCoord}em ${shadowColor}`,
        `0 ${adjustedCoord}em ${shadowColor}`,
        `0 0 0.4em ${shadowColor}`,
      ] :

    shadowType === 2 ?
      [`0.05em 0.05em 0 ${shadowColor}`] :

    shadowType === 3 ?
      [`0.1em 0.1em 0 ${shadowColor}`] :

    shadowType === 4 ?
      [
        `0.05em 0.05em 0 ${shadowColor}`,
        `${polyfillShadow ? '0.05em 0.05em' : '0.1em 0.1em'} 0 ${getShadowColor(h+270)}`
      ] :

    shadowType === 5 ?
      [`0 0 0.05em ${shadowColor}`] :

    shadowType === 6 ?
      times(4, s =>
        `${s < 2 ? -0.04 : 0.04}em ${s%2 ? 0.04 : -0.04}em 0 ${getShadowColor(h + 180 + s*30)}`
      ) :

    shadowType === 7 ?
      [
        `-0.05em -0.05em 0 ${getShadowColor(h+60)}`,
        `0.05em 0.025em 0 ${getShadowColor(h+240)}`
      ] :

    ['0 0 0.05em #000']
  )
}

const getDropShadowValue = h => getShadowText(h, true).map(s => `drop-shadow(${s})`).join(' ')
const getTextShadowValue = h => getShadowText(h).join(',')

const getShadow = (h, isText) => USE_EMOJI_POLYFILL && !isText
  ? `filter: ${getDropShadowValue(h)};`
  : `text-shadow: ${getTextShadowValue(h)};`


const hideBg = freeFloating ? prb(0.5) : false
const showBorder = prb(0.5)

const bgAnimationType = chance(
  [3, 0], // colorShiftingBgMultiple
  [2, 1], // staticBgsMultiple
  [2, 2], // shrinkingBgSingle
  [2, 3], // shrinkingBgMultiple
  [1, 4], // shrinkingSpinningBgMultiple
)

const increasedottedBorderStyle = bgAnimationPrb && bgAnimationType  === 0
const borderStyle = chance(
  [4, 'solid'],
  [increasedottedBorderStyle ? 5 : 1, 'dashed'],
  [increasedottedBorderStyle ? 4 : 1, 'dotted'],
  [1, 'double'],
)

const sectionAnimation = prb(0.95) ? '' : sample([
    showBorder && 'borderBlink',
    'blink',
    'dance',
    'growShrink',
    'spin',
    'hPivot',
    'vPivot',
    'breathe',
  ].filter(iden))

const sectionAnimationDirection = chance(
  [1, () => 'normal'],
  [1, () => 'reverse'],
  [1, () => prb(0.5) ? 'normal' : 'reverse'],
)

const sectionAnimationDuration = () => rnd(2, sectionAnimation === 'blink' ? 5 : 17)


const gradientHues = chance(
  [3 - possibleHues.length, possibleHues.slice(1)],
  [1, [30, 330]],
  [1, [60, 300]]
)

const zigzagBg = (bg1, bg2, size) => `
    background-color: ${bg1};
    background-image:
      linear-gradient(135deg, ${bg2} 25%, transparent 25%),
      linear-gradient(225deg, ${bg2} 25%, transparent 25%),
      linear-gradient(45deg, ${bg2} 25%, transparent 25%),
      linear-gradient(315deg, ${bg2} 25%, ${bg1} 25%);
    background-position:  ${size/2}em 0, ${size/2}em 0, 0 0, 0 0;
    background-size: ${size}em ${size}em;
    background-repeat: repeat;
  `

const gradientMix = sample([
  0,  // linear
  1,  // radial
  0.5 // mixed
])

const getColorFromHue = h => `hsl(${h%360}deg, 100%, 50%)`
function getBgColor(h) {
  const bg1 = getColorFromHue(h)
  const bg2 = getColorFromHue(h+sample(gradientHues))

  if (bgType === 1) return 'none;'
  if (bgType === 2) return prb(gradientMix)
    ? `radial-gradient(${bg1}, ${bg2});`
    : `linear-gradient(${rndint(360)}deg, ${bg1}, ${bg2});`
  if (bgType === 3) return zigzagBg(bg1, bg2, 0.25)
  if (bgType === 4) return zigzagBg(bg1, bg2, rnd(8, 16))
  if (bgType === 5) return zigzagBg(bg1, bg2, 1)

  return bg1
}



const starburstBgPrb = chance(
  [8.5, 0],
  [1, 0.2],
  [0.5, 1],
)

let starburstCount = 0
function starburstBg(h, rSpan, cSpan) {
  if (!prb(starburstBgPrb) || rSpan < 4) return

  starburstCount++

  const aspectRatio = cSpan/rSpan

  const h2 = chooseHue()

  const bwc = prb(0.5) ? { bg: '#000', text: '#fff' } : { bg: '#fff', text: '#000' }
  const c1 = BW ? bwc.text : `hsl(${h}deg, 100%, 50%)`
  let c2 = BW ? bwc.bg : `hsl(${h2}deg, 100%, 50%)`
  c2 =
    bgType === 1 ? '#000' :
    c1 === c2 ? '#fff' :
    c2

  const deg = chance(
    [2, 2],
    [10, 5],
    [8, 10],
  )

  const cssClass = `cgBg-${int(h)}-${int(h2)}`

  const size = 128

  css(`
    .${cssClass}::before {
      content: "";
      background: repeating-conic-gradient(${c1} 0deg ${deg}deg,  ${c2} ${deg}deg ${deg*2}deg);
      position: absolute;
      width: ${size}00%;
      height: ${size}00%;
      top: -${size/2 * 100 - 50}%;
      left: -${size/2 * 100 - 50}%;
      z-index: -1;
      animation: BgRotate${deg} ${rnd(1000, 5000)}ms linear infinite;
      animation-direction: ${prb(0.5) ? 'normal' : 'reverse'}
    }

    @keyframes BgRotate${deg} {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(${deg*2}deg);
      }
    }
  `)

  return cssClass
}

const bgColor = chance(
  [bgType !== 1 && 2, `hsl(${chooseHue()}deg, 100%, 50%)`],
  [bgType !== 1 && 1, `#fff`],
  [1, `#000`]
)

const rotateColorPrb = chance(
  [9, 0],
  [1, rnd(0.1, 0.2)],
)

const colorBlinkPrb = chance(
  [95, 0],
  [4, rnd(0.1, 0.2)],
  [1, 1],
)


const fullHueRotation = prb(0.02)
const invertAll = prb(0.02)
css(`
  * {
    margin: 0;
    padding: 0;
    font-family: ${fontFamily};
    font-weight: ${fontWeight};
  }
  body, body::backdrop {
    background: ${bgColor};
    margin: 0;
    ${fullHueRotation ? 'animation: HueRotation 10s linear infinite;' : ''}
  }
  @keyframes HueRotation {
    0% { filter: hue-rotate(0deg) }
    0% { filter: hue-rotate(360deg) }
  }

  .viewerMode {
    cursor: none;
    pointer-events: none;
  }

  .viewerMode .sectionContainer:hover {
    filter: invert(${invertAll ? 1 : 0});
  }

  .pauseAll, .pauseAll *, .pauseAll *::before {
    animation-play-state: paused !important;
  }

  .fullScreen {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100vh;
    width: 100vw;
    z-index: 100;
  }

  .overdrive .marquee * {
    animation-duration: 10s !important;
  }

  .overdrive *::before {
    animation-duration: 100ms !important;
  }

  .overdrive .bgAnimation {
    animation-duration: 300ms !important;
  }

  .overdrive .animatingComponent {
    animation-duration: 250ms !important;
  }
  .overdrive .sectionContainer {
    animation-duration: 750ms !important;
  }
  .overdrive .charContent {
    animation-duration: 205ms !important;
  }

  .overdrive {
    filter: contrast(300%) saturate(300%);
  }

  .anhedonic {
    background: #555;
    filter: blur(0.08vw) saturate(0.15);
  }
  .anhedonic .marquee * {
    animation-duration: 800s !important;
  }
  .anhedonic *::before {
    animation-duration: 3s !important;
  }
  .anhedonic .bgAnimation {
    animation-duration: 12s !important;
  }
  .anhedonic .animatingComponent {
    animation-duration: 16s !important;
  }
  .anhedonic .sectionContainer {
    animation-duration: 32s !important;
  }
  .anhedonic .charContent {
    animation-duration: 2505ms !important;
  }
  .invertAll {
    filter: invert(1);
  }

  ::selection {
    color: #fff;
    background-color: #000;
  }
`)
