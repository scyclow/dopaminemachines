
function calculateFeatures(tokenData) {
  const min = Math.min
const max = Math.max
const abs = Math.abs
const round = Math.round
const int = parseInt
const map = (val, low, high, mn, mx) => mn < mx
  ? mn + ((val - low)/(high-low)) * (mx - mn)
  : mn - ((val - low)/(high-low)) * (mn - mx)

let __randomSeed = int(tokenData.hash.slice(50, 58), 16)

let rCount = 0
function rnd(mn, mx) {
  rCount++
  __randomSeed ^= __randomSeed << 13
  __randomSeed ^= __randomSeed >> 17
  __randomSeed ^= __randomSeed << 5
  const out = (((__randomSeed < 0) ? ~__randomSeed + 1 : __randomSeed) % 1000) / 1000
  if (mx != null) return mn + out * (mx - mn)
  else if (mn != null) return out * mn
  else return out
}

const iden = x => x
const rndint = (mn, mx) => int(rnd(mn, mx))
const prb = x => rnd() < x
const posOrNeg = () => prb(0.5) ? 1 : -1
const sample = (a) => a[Math.floor(rnd(a.length))]
const noop = () => {}

function chance(...chances) {
  const total = chances.reduce((t, c) => t + c[0], 0)
  const seed = rnd()
  let sum = 0
  for (let i = 0; i < chances.length; i++) {
    const val =
      chances[i][0] === true ? 1
      : chances[i][0] === false ? 0
      : chances[i][0]
    sum += val / total
    if (seed <= sum && chances[i][0]) return chances[i][1]
  }
}

function times(t, fn) {
  const out = []
  for (let i = 0; i < t; i++) out.push(fn(i))
  return out
}

const allRunningIntervals = []
function setRunInterval(fn, ms, i=0) {
  const run = () => {
    fn(i)
    i++
  }

  run()

  let isCleared = false

  let interval = setInterval(run, ms)

  const newInterval = (ms) => {
    if (isCleared) return
    clearInterval(interval)
    interval = setInterval(run, ms)
  }

  const stopInterval = () => {
    if (!isCleared) {
      clearInterval(interval)
      isCleared = true
    }
  }

  allRunningIntervals.push({
    newInterval,
    stopInterval,
    originalMs: ms
  })

  return stopInterval
}


let IS_HEADLESS = false
let TWEMOJI_PRESENT = false
const $ = (elem, prop, value) => {}

$.cls = (elem, selector) => Array.isArray(elem)
  ? elem.map(e => $.cls(e, selector)).flat()
  : Array.from(elem.getElementsByClassName(selector))


$.render = (e, children) => {
  // if (!children) return
  // else if (typeof children === 'string') e.innerHTML = children
  // else if (Array.isArray(children)) {
  //   if (typeof children[0] === 'string') {
  //     children.forEach(child => {
  //       e.innerHTML += (
  //         typeof child === 'string' ? child : child.outerHTML
  //       )
  //     })
  //   } else {
  //     e.append(...children.flat())
  //   }
  // }
  // else {
  //   e.append(children)
  // }
}


$.create = elType => (children, attrs={}) => {
  let classes = (attrs.class || '').split(' ')
  return {
    elType,
    attrs,
    children,
    classList: {
      add(cls) {
        classes.push(cls)
      },
      remove(cls) {
        classes = classes.filter(c => c !== cls)
      }
    },
    get className(){
      return classes.join(' ')
    },
    get innerHTML() {
      return typeof children === 'string' ? children : JSON.stringify(children)
    },
    cloneNode() {
      return Object.assign({}, this)
    },
    getElementsByClassName(className) {
      const elements = []

      const collectElements = children => {
        if (Array.isArray(children)) {
          children.forEach(child => {
            collectElements(child)
          })
        } else if (typeof children === 'object') {
          if (children.className.includes(className)) {
            elements.push(children)
          }
          if (children.children) collectElements(children.children)
        }
      }

      collectElements(this.children)

      // if (Array.isArray(this.children)) {
      //   this.children.forEach(child => {
      //     const e = child.getElementsByClassName(className)
      //     elements.push(e)
      //   })
      // } else if (typeof this.children === 'object') {
      //   // console.log(className, '||', this.children.className)
      //   if (this.children.className.includes(className)) elements.push(this.children)

      //   if (Array.isArray(this.children.children)) {
      //     this.children.children.forEach(child => {
      //       const e = child.getElementsByClassName(className)
      //       elements.push(e)
      //     })
      //   } else if (typeof this.children.children === 'object') {
      //     this.children.getElementsByClassName(className)
      //   }
      // }

      return elements.flat()
    }

  }
  // const e = document.createElement(elType)
  // $.render(e, children)

  // Object.keys(attrs).forEach(a => {
  //   e.setAttribute(a, attrs[a])
  // })

  // return e
}

$.a = $.create('a')
$.div = $.create('div')
$.span = $.create('span')
$.main = $.create('main')
$.section = $.create('section')




const $html = {}
const $head = {}

const queryParams = {}




const addMetaTag = (args) => {
  // const meta = document.createElement('meta')
  // Object.keys(args).forEach(arg => {
  //   meta[arg] = args[arg]
  // })

  // document.head.appendChild(meta)
}

function css(style) {
  // const s = document.createElement('style')
  // s.innerHTML = style
  // document.head.appendChild(s)
}


function setMetadata(title) {
  $html.translate = false
  $html.lang = 'en'
  $html.className = 'notranslate'

  document.title = title

  addMetaTag({ name: 'google', content: 'notranslate'})
  addMetaTag({ charset: 'utf-8' })

  console.log(title)
}

const ls = {
  get(key) {},
  set(key, value) {}
}

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

let START_TIME = Date.now()
const MAX_VOLUME = 0.04

const allSources = []
function createSource(waveType = 'square') {
  const AudioContext = window.AudioContext || window.webkitAudioContext
  const ctx = new AudioContext()

  const source = ctx.createOscillator()
  const gain = ctx.createGain()
  const panner = new StereoPannerNode(ctx)

  source.connect(gain)
  gain.connect(panner)
  panner.connect(ctx.destination)

  gain.gain.value = 0
  source.type = ANHEDONIC ? 'sine' : waveType
  source.frequency.value = 3000
  source.start()

  const smoothFreq = (value, timeInSeconds=0.00001, overridePaused=false) => {
    if (PAUSED && !overridePaused) return
    source.frequency.exponentialRampToValueAtTime(
      value,
      ctx.currentTime + timeInSeconds
    )
  }

  const smoothPanner = (value, timeInSeconds=0.00001) => {
    if (PAUSED) return
    panner.pan.exponentialRampToValueAtTime(
      value,
      ctx.currentTime + timeInSeconds
    )
  }

  const smoothGain = (value, timeInSeconds=0.00001) => {
    if (PAUSED) return
    gain.gain.setTargetAtTime(
      min(value, MAX_VOLUME),
      ctx.currentTime,
      timeInSeconds
    )
  }

  const src = { source, gain, smoothFreq, smoothGain, smoothPanner, originalSrcType: source.type }

  allSources.push(src)

  return src
}

function sourcesToAnhedonicMode() {
  allSources.forEach(src => {
    if (src.gain.gain.value > 0) {
      src.source.type = 'sine'
    }
  })
}

function sourcesToNormalMode() {
  allSources.forEach(src => {
    if (src.gain.gain.value > 0) {
      src.source.type = src.originalSrcType
    }
  })
}

function soundOverdrive(factor=1) {
  allRunningIntervals.forEach(i => {
    i.newInterval(i.originalMs/factor)
  })
}

const BASE_FREQ = rnd(250, 500)
const MAJOR_SCALE = [1, 1.125, 1.25, 1.3333, 1.5, 1.6666, 1.875, 2]
const HEXATONIC_SCALE = [1, 1.125, 1.25, 1.5, 1.75, 2]
const JACK_DUMP_SCALE = [1, 1, 1.25, 1.3333, 1.5, 1.3333, 1.25, 1]


const getLoopsAtTime = (t, delay, duration) => (OVERDRIVE ? 8 : 1) * (t - (START_TIME - delay)) / duration


function sirenSound({ delay, duration }, waveType='square', freqAdj=1) {
  let freqMax = freqAdj * sample(MAJOR_SCALE) * BASE_FREQ
  let freqMin = freqAdj * freqMax / 5
  if (prb(0.5)) [freqMax, freqMin] = [freqMin, freqMax]

  const freqDiff = freqMax - freqMin
  const introTimeMs = 250

  const halfLoopsAtTime = time => 2 * getLoopsAtTime(time, delay, duration)
  const getDirectionAtTime = time => int(halfLoopsAtTime(time)) % 2 ? 1 : -1

  const getFreqAtTime = time => {
    const directionAtTime = getDirectionAtTime(time)
    const halfLoopsLeft = halfLoopsAtTime(time) % 1
    const timeDiff = halfLoopsLeft * freqDiff

    if (directionAtTime === 1) {
      return freqMin + timeDiff
    } else {
      return freqMax - timeDiff
    }
  }

  const brokenDivisor = prb(0.1) ? rnd(1000, 2500) : 2000
  return (extraDelay=0) => {
    const { smoothFreq, smoothGain } = createSource(waveType)
    smoothGain(MAX_VOLUME)
    smoothFreq(getFreqAtTime(Date.now() + introTimeMs), 0.25)

    let stopInterval
    setTimeout(() => {
      const timeUntilNextHalfLoop = (1 - halfLoopsAtTime(Date.now() + extraDelay) % 1) * duration/2
      smoothFreq(getFreqAtTime(Date.now() + timeUntilNextHalfLoop), timeUntilNextHalfLoop/1000)

      setTimeout(() => {
        stopInterval = setRunInterval((i) => {
          smoothFreq(
            getFreqAtTime(Date.now() + duration/2 + extraDelay),
            i % 2 ? duration/2000 : duration/brokenDivisor
          )
        }, duration/16)
      }, timeUntilNextHalfLoop)
    }, introTimeMs)


    return () => {
      smoothGain(0, 0.04)
      if (stopInterval) stopInterval()
    }
  }
}


function shrinkCharSound({delay, duration}) {
  const start1 = sirenSound({duration, delay}, 'sine')
  const start2 = sirenSound({duration, delay: delay + duration*0.25 }, 'sine', 0.5)
  const start3 = sirenSound({duration, delay: delay + duration*0.5 }, 'sine', 0.5)
  const start4 = sirenSound({duration, delay: delay + duration*0.75 }, 'sine', 0.5)

  return () => {
    const src1 = createSource('sine')
    const src2 = createSource('sine')

    src1.smoothFreq(BASE_FREQ/2)
    src2.smoothFreq(BASE_FREQ/1.98)
    src1.smoothGain(MAX_VOLUME, 0.1)
    src2.smoothGain(MAX_VOLUME, 0.1)

    const stop1 = start1()
    const stop2 = start2()
    const stop3 = start3()
    const stop4 = start4()
    return () => {
      src1.smoothGain(0, 0.1)
      src2.smoothGain(0, 0.1)
      stop1()
      stop2()
      stop3()
      stop4()
    }
  }
}

function flipSound({ delay, duration }) {
  const freqMax = sample(MAJOR_SCALE) * BASE_FREQ * 8// 500
  const freqMin = freqMax / 3
  const freqDiff = freqMax - freqMin
  const introTimeMs = 250

  const getFreqAtTime = (t) => {
    const loops = getLoopsAtTime(t, delay, duration)
    const loopProgress = loops % 1

    if (loopProgress < 0.3333) {
      return map(loopProgress, 0, 0.3333, freqMin, BASE_FREQ)
    } else if (loopProgress < 0.6666) {
      return map(loopProgress, 0.3333, 0.6666 , BASE_FREQ, freqMax)
    } else {
      return map(loopProgress, 0.6666, 1, freqMax, freqMin)
    }
  }

  return (extraDelay=0) => {
    const { smoothFreq, smoothGain } = createSource()
    smoothGain(MAX_VOLUME)
    smoothFreq(getFreqAtTime(Date.now() + introTimeMs), introTimeMs/1000)

    let stopInterval
    setTimeout(() => {
      const timeUntilNextThird = ((1 - (getLoopsAtTime(Date.now() + extraDelay, delay, duration) % 1)) % 0.3333) * duration
      smoothFreq(getFreqAtTime(Date.now() + timeUntilNextThird + extraDelay), timeUntilNextThird/1000)

      setTimeout(() => {
        stopInterval = setRunInterval((i) => {
          smoothFreq(getFreqAtTime(Date.now() + duration/3 + extraDelay), duration/3000)
        }, duration/24)

      }, timeUntilNextThird)

    }, introTimeMs)

    return () => {
      smoothGain(0, 0.04)
      if (stopInterval) stopInterval()
    }
  }
}

function smoothSound({delay, duration}) {
  const ix = int(map(duration, 0, 5000, 5, 0))
  const baseFreq = BASE_FREQ * [0.5, 1, 1.25, 1.5, 2][ix]
  const isLow = prb(0.3)
  const volAdj = isLow ? 1 : 0.8

  return (extraDelay=0) => {
    const src1 = createSource()
    const src2 = createSource()

    let f1, f2
    if (isLow) {
      f1 = BASE_FREQ/8
      f2 = BASE_FREQ/7.98
    } else {
      const offset = 1000000 / (duration * baseFreq)
      f1 = baseFreq
      f2 = baseFreq + offset
    }

    src1.smoothFreq(f1)
    const stopInterval = setRunInterval(() => {
      if (PAUSED || OVERDRIVE) {
        src2.smoothFreq(f1, 0.00001, true)
      } else {
        src2.smoothFreq(f2)
      }
    }, 500)

    src1.smoothGain(MAX_VOLUME * volAdj, 0.25)
    src2.smoothGain(MAX_VOLUME * volAdj, 0.25)

    return () => {
      if (stopInterval) stopInterval()
      src1.smoothGain(0, 0.25)
      src2.smoothGain(0, 0.25)
    }
  }
}

function ticktockSound({duration, delay}) {
  const baseFreq = BASE_FREQ * sample([1, 0.5, 2])
  const interval = duration / 2

  const upScale = sample(MAJOR_SCALE)

  return (extraDelay=0) => {
    const { smoothFreq, smoothGain } = createSource()
    const { smoothFreq: smoothFreq2, smoothGain: smoothGain2 } = createSource()

    const timeUntilNextNote = ((1 - (getLoopsAtTime(Date.now(), delay, duration) % 1)) % (1/2)) * duration
    let stopInterval
    setTimeout(() => {
      stopInterval = setRunInterval((i) => {
        smoothGain(MAX_VOLUME, 0.03)
        smoothGain2(MAX_VOLUME, 0.03)

        if (i%2) {
          smoothFreq(baseFreq, 0.1)
          smoothFreq2(baseFreq+5, 0.1)

        } else {
          smoothFreq(baseFreq*upScale, 0.1)
          smoothFreq2(baseFreq * upScale+5, 0.1)
        }

        setTimeout(() => smoothGain(0, 0.05), interval*0.25)
        setTimeout(() => smoothGain2(0, 0.05), interval*0.25)

      }, interval)
      if (OVERDRIVE) soundOverdrive(6)

    }, timeUntilNextNote)

    return () => {
      smoothGain(0, 0.03)
      smoothGain2(0, 0.03)
      if (stopInterval) stopInterval()
    }
  }
}


function blinkCharSound({duration, delay}, seq=null) {
  const sequence = sample([0, 1, 2])
  const jackDumpScale = prb(0.1)
  const isSmooth = !jackDumpScale && prb(0.5)
  const twoTone = prb(0.1)

  const baseFreq = sample(MAJOR_SCALE) * BASE_FREQ * chance(
    [5, 1],
    [3, 2],
    [1, 0.5],
    [1, 0.25],
  )

  const ttMult = sample([2, 1.5, 1.3333])
  duration = duration ? map(duration, 750, 5000, 500, 2000) : rnd(500, 2000)
  const interval = duration / 8

  return (extraDelay=0) => {
    const { smoothFreq, smoothGain } = createSource()
    const src2 = createSource()

    if (isSmooth) {
      smoothGain(MAX_VOLUME)
      if (twoTone) src2.smoothGain(MAX_VOLUME)
    }

    const stopInterval = setRunInterval((i) => {
      if (!isSmooth) {
        smoothGain(MAX_VOLUME)
        if (twoTone) src2.smoothGain(MAX_VOLUME)
      }

      let ix
      switch (sequence) {
        case 0: ix = i%8; break
        case 1: ix = abs(7 - i%8); break
        case 2: ix = i%14 < 7 ? i%14 : abs(7 - i%7); break
      }

      const freq = jackDumpScale
        ? JACK_DUMP_SCALE[i%8] * ((i % 64) < 32 ? 1 : 0.85)
        : MAJOR_SCALE[ix]

      smoothFreq(baseFreq * freq)
      if (twoTone) src2.smoothFreq(baseFreq * freq*ttMult)

      if (!isSmooth) setTimeout(() => {
        smoothGain(0, 0.04)
         if (twoTone)  src2.smoothGain(0, 0.04)
      }, interval*0.75)
    }, interval)

    if (OVERDRIVE) soundOverdrive(6)

    return () => {
      smoothGain(0, 0.04)
      if (twoTone) src2.smoothGain(0, 0.04)
      if (stopInterval) stopInterval()
    }
  }
}

function hexSound({duration, delay}) {
  const baseFreq = BASE_FREQ
  const interval = duration / 6
  const scale = sample(MAJOR_SCALE)

  return (extraDelay=0) => {
    const { smoothFreq, smoothGain } = createSource()
    const { smoothFreq: smoothFreq2, smoothGain: smoothGain2 } = createSource()
    const timeUntilNextNote = ((1 - (getLoopsAtTime(Date.now(), delay, duration) % 1)) % (1/6)) * duration

    let stopInterval
    setTimeout(() => {
      stopInterval = setRunInterval((i) => {
        smoothFreq(baseFreq * 8)
        smoothFreq2(baseFreq * 8)
        smoothGain(MAX_VOLUME, 0.03)
        smoothGain2(MAX_VOLUME, 0.03)

        smoothFreq(baseFreq/4, 0.25)
        smoothFreq2(baseFreq/4, 0.25)

        setTimeout(() => smoothGain(0, 0.05), interval*0.25 + extraDelay)
        setTimeout(() => smoothGain2(0, 0.05), interval*0.25 + extraDelay)
      }, interval)

    }, timeUntilNextNote)

    return () => {
      if (stopInterval) stopInterval()
      smoothGain(0, 0.03)
      smoothGain2(0, 0.03)
    }
  }
}


function climbSound({ duration, delay }) {
  const baseFreq = sample(HEXATONIC_SCALE) * BASE_FREQ
  const interval = duration / 4

  return (extraDelay=0) => {
    const { smoothFreq, smoothGain } = createSource()
    const timeUntilNextNote = ((1 - (getLoopsAtTime(Date.now(), delay, duration) % 1)) % (1/4)) * duration

    let stopInterval
    setTimeout(() => {
      stopInterval = setRunInterval((i) => {
        smoothGain(MAX_VOLUME)

        const ix = duration === 1 ? i%4 : 3 - i%4
        smoothFreq(baseFreq * HEXATONIC_SCALE[ix])

        setTimeout(() => smoothGain(0, 0.05), interval*0.75 + extraDelay)
      }, duration/4)

      if (OVERDRIVE) soundOverdrive(6)

    }, timeUntilNextNote + extraDelay*4)

    return () => {
      if (stopInterval) stopInterval()
      smoothGain(0, 0.04)
    }
  }
}

function zoomSound({duration, delay, switchChannels}) {
  const freqMax = sample(MAJOR_SCALE) * BASE_FREQ * 4
  const freqMin = freqMax / 16
  const freqDiff = freqMax - freqMin
  const introTimeMs = 250

  const getFreqAtTime = (t) => {
    const loops = getLoopsAtTime(t, delay, duration)
    const loopProgress = loops % 1

    if (loopProgress < 0.25) {
      return freqMin
    } else if (loopProgress < 0.5) {
      return map(loopProgress, 0.25, 0.5, freqMin, freqMax)
    } else {
      return map(loopProgress, 0.5, 1, freqMax, 1)
    }
  }


  return (extraDelay=0) => {
    const { smoothFreq, smoothGain, smoothPanner } = createSource()
    const timeUntilNextQuarter = ((1 - (getLoopsAtTime(Date.now(), delay, duration) % 1)) % 0.25) * duration

    smoothGain(MAX_VOLUME)
    smoothFreq(getFreqAtTime(Date.now() + timeUntilNextQuarter), timeUntilNextQuarter/1000)

    let stopInterval
    setTimeout(() => {
      stopInterval = setRunInterval(i => {
        smoothFreq(getFreqAtTime(Date.now() + duration/4 + extraDelay), duration/4000)
      }, duration/4)

      if (switchChannels) {
        const startingAdj = int(getLoopsAtTime(Date.now(), delay, duration)) % 2 ? 150 : 50

        setRunInterval(i => {
          const p = map((i + startingAdj)%200, 0, 200, 0, Math.PI)
          const val = 2 * (Math.sin(p) - 0.5)
          smoothPanner(val)
        }, duration/100)
      }
    }, timeUntilNextQuarter)

    return () => {
      smoothGain(0, 0.04)
      if (stopInterval) stopInterval()
    }
  }
}


function carSirenSound({duration, delay}) {
  const baseScale = sample(MAJOR_SCALE)
  const freqMax = baseScale * BASE_FREQ / 2
  const x = sample(MAJOR_SCALE.filter(s => s !== baseScale))

  const freqMin = freqMax / x
  const freqDiff = freqMax - freqMin
  const introTimeMs = 250

  const getFreqAtTime = t => {
    const loopProgress = getLoopsAtTime(t + introTimeMs, delay, duration) % 1
    return (loopProgress < 0.25 || loopProgress > 0.75) ? freqMin : freqMax
  }

  return (extraDelay=0) => {
    const src1 = createSource()
    const src2 = createSource()
    const src3 = createSource()

    src1.smoothGain(MAX_VOLUME*0.85)
    src2.smoothGain(MAX_VOLUME*0.85)
    src3.smoothGain(MAX_VOLUME*0.85)

    const timeUntilNextHalf = ((1 - (getLoopsAtTime(Date.now() + introTimeMs, delay, duration) % 1)) % 0.5) * duration

    src1.smoothFreq(getFreqAtTime(Date.now()), timeUntilNextHalf/1000)
    src2.smoothFreq(getFreqAtTime(Date.now())*1.3333, timeUntilNextHalf/1000)
    src3.smoothFreq(getFreqAtTime(Date.now())*1.6666, timeUntilNextHalf/1000)

    let stopInterval
    setTimeout(() => {
      stopInterval = setRunInterval(i => {
        src1.smoothFreq(getFreqAtTime(Date.now() + extraDelay, i), introTimeMs/1000)
        src2.smoothFreq(getFreqAtTime(Date.now() + extraDelay, i)*1.3333, introTimeMs/1000)
        src3.smoothFreq(getFreqAtTime(Date.now() + extraDelay, i)*1.6666, introTimeMs/1000)
      }, duration/2)
    }, timeUntilNextHalf)

    return () => {
      src1.smoothGain(0, 0.04)
      src2.smoothGain(0, 0.04)
      src3.smoothGain(0, 0.04)
      if (stopInterval) stopInterval()
    }
  }
}

function singleSound() {
  const startFreq = rndint(1000, 4000)
  const playSound = () => {
    const { smoothFreq, smoothGain } = createSource()
    smoothGain(MAX_VOLUME)
    smoothFreq(startFreq, 0.05)
    setTimeout(() => {
      smoothFreq(0.1, 1)
    }, 50)

    return () => {
      playSound()
    }
  }
  return playSound
}



let voices
let ACTIVE_VOICE_IX = 0
const filterVoices = (voices) => {
  const matchingVoiceLang = v => v.lang && v.lang.includes(queryParams.voiceLang || 'en-US')
  try {

    let langVoices = voices.filter(matchingVoiceLang)
    langVoices = langVoices.length ? langVoices : voices

    let defaultVoice = queryParams.voice
      ? voices.find(v => v.voiceURI.toLowerCase().includes(queryParams.voice.toLowerCase()))
      : voices.find(v => v.default)

    if (!matchingVoiceLang(defaultVoice)) defaultVoice = voices.find(matchingVoiceLang)

    return queryParams.voice || !queryParams.voiceLang
      ? [defaultVoice, ...langVoices.slice(1)]
      : langVoices

  } catch (e) {
    return voices
  }
}

function selectVoice(v) {
  ACTIVE_VOICE_IX = voices.length && (v % voices.length)
  console.log('VOICE SELECTED:', voices[ACTIVE_VOICE_IX].voiceURI)
}

const getVoices = () => {
  try {
    voices = window.speechSynthesis.getVoices()
    setTimeout(() => {
      if (!voices.length) getVoices()
      else {
        voices = filterVoices(voices)
      }
    }, 200)
  } catch(e) {
    console.log(e)
  }
}
getVoices()

let utteranceQueue = []
let utterancePriority = null
let activeUtterance

const triggerUtterance = () => {
  if (PAUSED) {
    setTimeout(triggerUtterance, 250)
    return
  }

  const ix = rndint(utteranceQueue.length)

  let txt
  if (utterancePriority) {
    txt = utterancePriority
    utterancePriority = null
  } else {
    txt = utteranceQueue.splice(ix, 1)[0]
  }

  if (!txt) return
  activeUtterance = txt

  txt.volume = 0.88
  txt.voice = voices[ACTIVE_VOICE_IX]

  if (OVERDRIVE) {
    txt.pitch = sample(MAJOR_SCALE)
    txt.volume = 1.1
  } else if (ANHEDONIC) {
    txt.pitch = 1
  } else {
    txt.pitch = 1
  }

  if (ANHEDONIC) {
    txt.rate = 0.7
  } else if (OVERDRIVE) {
    txt.rate = 1.4
  } else {
    txt.rate = 1
  }

  txt.onend = () => {
    if (utteranceQueue.length) triggerUtterance()
  }

  txt.addEventListener('error', (e) => {
    console.error('SpeechSynthesisUtterance error', e)
  })

  window.speechSynthesis.speak(txt)
  setTimeout(() => rescueSS(txt), 6000)
}

let isRescuing
function rescueSS(txt) {
  if (isRescuing) return
  if (activeUtterance === txt) {
    isRescuing = true
    window.speechSynthesis.cancel()
    window.speechSynthesis.speak(txt)
    isRescuing = false
  }
}

const stopUtter = txt => {
  utteranceQueue = utteranceQueue.filter(u => u.text !== txt.toLowerCase())
  utterancePriority = null
}

const utter = (txt, t=1, i=7) => {
  const _t = txt.toLowerCase()
  try {
    const startingQueue = utteranceQueue.length
    times(t, () => {
      utteranceQueue.push(
        new window.SpeechSynthesisUtterance(_t)
      )
    })
    utterancePriority = new window.SpeechSynthesisUtterance(_t)
    if (!startingQueue) triggerUtterance()
  } catch (e) {
    console.log(e)
  }
}

css(`
  .marquee {
    display: inline-block;
    width: 100%;
    box-sizing: border-box;
    line-height: 1;
  }

  .marqueeInner {
    display: inline-flex;
  }

  .marqueeForward {
    animation: Marquee 50s linear infinite;
  }

  .marqueeInner > * {
    display: inline-block;
    white-space: nowrap;
  }

  @keyframes Marquee {
    0% {transform: translate3d(-50%, 0, 0)}
    100% {transform: translate3d(0%, 0, 0)}
  }

  .bgAnimation {
    z-index: -1;
  }

  .updownChars {
    animation: UpDownChars 2s ease-in-out infinite;
    display: inline-block;
  }

  @keyframes UpDownChars {
    0%, 100% {transform: translate3d(0%, 10%, 0)}
    50% {transform: translate3d(0%, -10%, 0)}
  }

  .updownLong {
    height: 100%;
    animation: UpDownLong 1000ms ease-in-out infinite;
  }

  .updownLong > * {
    animation: UpDownLongChild 2000ms ease-in-out infinite;
  }


  @keyframes UpDownLongChild {
    0%, 100% {transform: translateY(0)}
    50% {transform: translateY(-100%)}
  }

  @keyframes UpDownLong {
    0%, 100% {transform: translateY(0)}
    50% {transform: translateY(100%)}
  }

  .blink {
    animation: Blink 1.5s steps(2, start) infinite;
  }

  @keyframes Blink {
    to {
      visibility: hidden;
    }
  }

  .colorChars {
    animation: FullColorRotate 1.5s steps(6, start) infinite;
  }

  .borderBlink {
    border-width: 0.05em;
    animation: BorderBlink 1.5s steps(2, start) infinite;
    box-sizing: border-box;
  }

  @keyframes BorderBlink {
    50% {
      border-style: hidden;
    }
  }

  .colorBlink {
    animation: ColorBlink 4s steps(1, start) infinite;
  }

  @keyframes ColorBlink {
    ${colorBlinkAnim()}
  }

  .fullColorRotate {
    animation: FullColorRotate 25s linear infinite;
  }

  @keyframes FullColorRotate {
    0%, 100% {color: #ff0000}
    17% {color: #ffff00}
    33% {color: #00ff00}
    50% {color: #00ffff}
    66% {color: #0000ff}
    83% {color: #ff00ff}
  }

  .colorShift {
    animation: ColorRotate 25s linear infinite;
  }

  @keyframes ColorRotate {
    0%, 100% {color: #ff0000}
    17% {color: #ffff00}
    33% {color: #00ff00}
    50% {color: #00ffff}
    66% {color: #0000ff}
    83% {color: #ff00ff}
  }

  .dance {
    animation: Dance 2000ms cubic-bezier(0.58, 0.06, 0.44, 0.98) infinite;
  }

  @keyframes Dance {
    0%, 100% {transform: rotate(20deg)}
    50% {transform: rotate(-20deg)}
  }

  .growShrink {
    animation: GrowShrink 2000ms cubic-bezier(0.58, 0.06, 0.44, 0.98) infinite;
  }

  @keyframes GrowShrink {
    0%, 100% {transform: scale(1)}
    50% {transform: scale(0.2)}
  }

  .growShrinkShort {
    animation: GrowShrinkShort 2000ms cubic-bezier(0.58, 0.06, 0.44, 0.98) infinite;
    display: inline-block;
  }

  @keyframes GrowShrinkShort {
    0%, 100% {transform: scale(1)}
    50% {transform: scale(0.75)}
  }


  .spin {
    animation: Spin 2000ms linear infinite;
  }

  @keyframes Spin {
    0% {transform: rotate(0deg)}
    100% {transform: rotate(360deg)}
  }


  .hSiren {
    animation: HSiren 2000ms linear infinite;
  }

  @keyframes HSiren {
    0% {transform: perspective(500px) rotate3d(0,2,0, 0deg) translateZ(100px)}
    100% {transform: perspective(500px) rotate3d(0,2,0, 360deg) translateZ(100px)}
  }

  .vSiren {
    animation: VSiren 2000ms linear infinite;
  }

  @keyframes VSiren {
    0% {transform: perspective(500px) rotate3d(2,0,0, 0deg) translateZ(0.75em)}
    100% {transform: perspective(500px) rotate3d(2,0,0, 360deg) translateZ(0.75em)}
  }

  .vSirenShort {
    animation: VSirenShort 2000ms linear infinite;
  }

  @keyframes VSirenShort {
    0% {transform: perspective(500px) rotate3d(2,0,0, 0deg) translateZ(0.3em)}
    100% {transform: perspective(500px) rotate3d(2,0,0, 360deg) translateZ(0.3em)}
  }



  .hPivot {
    animation: HPivot 2000ms cubic-bezier(0.58, 0.06, 0.44, 0.98) infinite;
  }

  @keyframes HPivot {
    0%, 100% {transform: perspective(500px) rotate3d(0,2,0, 30deg) translateZ(20vmin) scale(0.75)}
    50% {transform: perspective(500px) rotate3d(0,2,0, -30deg) translateZ(20vmin) scale(0.75)}
  }

  .vPivot {
    animation: VPivot 2000ms cubic-bezier(0.58, 0.06, 0.44, 0.98) infinite;
  }


  @keyframes VPivot {
    0%, 100% {transform: perspective(500px) rotate3d(2,0,0, 30deg) translateZ(20vmin) scale(0.5)}
    50% {transform: perspective(500px) rotate3d(2,0,0, -30deg) translateZ(20vmin) scale(0.5)}
  }



  .vFlip {
    animation: VFlip 3500ms cubic-bezier(0.66, 0.05, 0.38, 0.99) infinite;
  }

  @keyframes VFlip {
    0% {transform: perspective(500px) rotate3d(2,0,0, 0deg)}
    100% {transform: perspective(500px) rotate3d(2,0,0, 1800deg)}
  }


  .hFlip {
    animation: HFlip 3500ms cubic-bezier(0.66, 0.05, 0.38, 0.99) infinite;
  }

  @keyframes HFlip {
    0% {transform: perspective(500px) rotate3d(0,2,0, 0deg)}
    100% {transform: perspective(500px) rotate3d(0,2,0, 1800deg)}
  }


  .breathe {
    animation: Breathe 2000ms ease-in-out infinite;
  }

  @keyframes Breathe {
    0%, 100% {transform: scaleX(1) scaleY(1)}
    50% {transform: scaleX(0.8) scaleY(0.9)}
  }


  .flamingHot {
    animation: FlamingHot 2000ms ease-in-out infinite;
  }

  @keyframes FlamingHot {
    0% {
      transform: scale(1) translateY(0);
      opacity: 1;
    }
    75% {
      opacity: 0;
      transform: scale(1.15) translateY(-0.2em);
    }
    80% {
      opacity: 0;
      transform: scale(1) translateY(0);
    }
    100% {
      opacity: 1;
    }
  }

  .leftRight {
    width: 100%;

    animation: LeftRight 2000ms cubic-bezier(0.58, 0.06, 0.44, 0.98) infinite;
    font-size: 10vmin;
  }

  .leftRight > * {
    animation: LeftRightChild 2000ms cubic-bezier(0.58, 0.06, 0.44, 0.98) infinite;
    display: inline-block;
    white-space: nowrap;
  }

  @keyframes LeftRightChild {
    0%, 100% {transform: translateX(0)}
    50% {transform: translateX(-100%)}
  }

  @keyframes LeftRight {
    0%, 100% {transform: translateX(0)}
    50% {transform: translateX(100%)}
  }


  .shrinkingBorder {
    animation: ShrinkingBorder 2000ms linear infinite;
  }
  .spinningBorder {
    animation: Spin 2000ms linear infinite;
  }

  @keyframes ShrinkingBorder {
    0% {transform: scale(105%)}
    100% {transform: scale(0%)}
  }

  .shrinkingSpinningBorder {
    animation: SpinningShrinkingBorder 2000ms linear infinite;
  }

  @keyframes SpinningShrinkingBorder {
    0% {transform: scale(105%) rotate(0deg)}
    100% {transform: scale(0%) rotate(45deg)}
  }

  .wave {
    animation: Wave 4500ms linear infinite;
  }
  .climb {
    animation: Wave 4500ms cubic-bezier(0.66, 0.05, 0.38, 0.99) infinite;
  }

  @keyframes Wave {
    0%, 100% {transform: translate3d(0%, 30%, 0) rotate(0deg)}
    25% {transform: translate3d(0%, 0%, 0) rotate(12deg)}
    50% {transform: translate3d(0%, -30%, 0) rotate(0deg)}
    75% {transform: translate3d(0%, 0%, 0) rotate(-12deg)}
  }


  .hexagon {
    animation: Hexagon 2000ms linear infinite;
  }

  @keyframes Hexagon {
    0%, 100% {transform: translate(0, 0.5em)}
    17% {transform: translate(0.43em, 0.25em)}
    33% {transform: translate(0.43em, -0.25em)}
    50% {transform: translate(0, -0.5em)}
    66% {transform: translate(-0.43em, -0.25em)}
    83% {transform: translate(-0.43em, 0.25em)}
  }
`)

function colorBlinkAnim() {
  const h = chooseHue()
  const start = `
    0%, 100% {
      color: ${getColorFromHue(h)};
      background-color: ${getColorFromHue(h + possibleHues[1])};
    }
  `
  return start + possibleHues.length === 2
    ? `
      50% {
        color: ${getColorFromHue(h + possibleHues[1])};
        background-color: ${getColorFromHue(h)};
      }
    `
    : `
      33% {
        color: ${getColorFromHue(h + possibleHues[1])};
        background-color: ${getColorFromHue(h + possibleHues[2])};
      }

      66% {
        color: ${getColorFromHue(h + possibleHues[2])};
        background-color: ${getColorFromHue(h)};
      }
    `
}

function marquee(children, args={}) {
  const className = args.className || ''
  const style = args.style || ''
  const direction = args.direction || 1
  const delay = args.delay || 0
  const duration = args.duration || 1
  const sideways = args.sideways || false
  const msgAnimation = args.msgAnimation || iden
  const isEmoji = elementIsEmoji(children)

  const repeat = isEmoji ? 60 : 40

  const handleAnimation = (child, i, j) => {
    const isEmoji = elementIsEmoji(child)
    const spacing = ((isEmoji || j > 0) ? 0.1 : 0.5) + 'em'
    return msgAnimation(
      $.span(
        child,
        { style: `
          margin-left: ${spacing};
          margin-right: ${spacing};
          font-size: ${isEmoji ? 0.9 : 1}em;
        ` }
      ).cloneNode(true),
      { delay: i*100 + j/2}
    )
  }



  const inner = $.div(
    times(repeat, i => Array.isArray(children)
      ? children.map((c, j) => handleAnimation(c, i, j))
      : handleAnimation(children, i, 0)
    ).flat(),
    {
      class: `marqueeInner marqueeForward`,
      style: `
        animation-delay: -${delay}s;
        animation-duration: ${duration/(repeat/40)}s;
        animation-direction: ${direction === 1 ? 'normal' : 'reverse'};
      `
    }
  )

  return $.div(
    inner,
    {
      style: style + (sideways ? `transform: rotate(${sample([90, 270])}deg);` : ''),
      class: `component marquee ${className}`,
    }
  )
}


function genericAnimatingComponent(name) {
  return (children, args={}) => {
    const className = args.className || ''
    const style = args.style || ''
    const delay = args.delay || 0
    const duration = args.duration || 1000
    const direction = args.direction || 1

    const trailFn = args.showTrails ? withTrails : iden

    return trailFn(
      $.div(children, {
        class: `${name} ${className} animatingComponent`,
        style: `
          animation-duration: ${duration}ms;
          animation-delay: -${delay}ms;
          animation-direction: ${direction === 1 ? 'normal' : 'reverse'};
          ${style}
        `
      }),
      args
    )
  }
}

const blink = genericAnimatingComponent('blink')
const dance = genericAnimatingComponent('dance')
const growShrink = genericAnimatingComponent('growShrink')
const growShrinkShort = genericAnimatingComponent('growShrinkShort')
const spin = genericAnimatingComponent('spin')
const hSiren = genericAnimatingComponent('hSiren')
const vSiren = genericAnimatingComponent('vSiren')
const vSirenShort = genericAnimatingComponent('vSirenShort')

const hPivot = genericAnimatingComponent('hPivot')
const vPivot = genericAnimatingComponent('vPivot')

const vFlip = genericAnimatingComponent('vFlip')
const hFlip = genericAnimatingComponent('hFlip')

const wave = genericAnimatingComponent('wave')
const climb = genericAnimatingComponent('climb')
const hexagon = genericAnimatingComponent('hexagon')
const breathe = genericAnimatingComponent('breathe')

const updownLongParent = genericAnimatingComponent('updownLong')
const updownLong = (grandChild, args={}) => {
  const duration = args.duration || 1000
  const delay = args.delay || 0

  const child = $.div(grandChild, { style: `animation-duration: ${duration}ms; animation-delay: -${delay}ms;` })
  return updownLongParent(child, args)
}

const leftRightParent = genericAnimatingComponent('leftRight')
const leftRight = (grandChild, args={}) => {
  const duration = args.duration || 1000
  const delay = args.delay || 0

  const child = $.div(grandChild, { style: `animation-duration: ${duration}ms; animation-delay: -${delay}ms;` })
  return leftRightParent(child, args)
}


const flamingHotParent = genericAnimatingComponent('flamingHot')
const flamingHot = (grandChild, args={}) => {
  return flamingHotParent(grandChild, {
    ...args,
    showTrails: true,
    baseIsPaused: true,
    delayM: -10
  })
}


const withTrails = (grandChild, args={}) => {
  const shadows = 5
  const delayM = args.delayM || 1
  return times(shadows, t => {
    const shadow = grandChild.cloneNode(true)
    if (t < shadows-1) $(shadow, 'position', 'absolute')
    $(shadow, 'opacity', 1/shadows + t/shadows )
    $(shadow, 'text-shadow', `0 0 0.${0.25/shadows * (shadows-t)}em`)
    if (t === shadows - 1 && args.baseIsPaused) {
      $(shadow, 'animation-play-state', 'paused')
      $(shadow, 'animation-delay', `0ms`)
      $(shadow, 'animation-direction', `normal`)
    } else {
      $(shadow, 'animation-delay', `${-args.delay + args.duration * 0.025 * (shadows-t) * delayM}ms`)
    }
    return shadow
  })
}



const bgAnimation = (className, rSpan, cSpan, args={}) => $.div([], {
    class: className + ' bgAnimation',
    style: `
      border: 1vmin ${borderStyle};
      position: absolute;
      height: ${100*rSpan/rows}vh;
      width: ${100*cSpan/cols}vw;
      animation-delay: -${args.delay || 0}ms;
      animation-duration: ${args.duration || 2000}ms;
      animation-direction: ${args.direction === -1 ? 'reverse' : 'normal'};
      ${args.style || ''}
    `
  })

function staticBgsMultiple(rSpan, cSpan) {
  return times(6, i => bgAnimation('',rSpan, cSpan, { style: `transform: scale(${i/6});`}))
}
function shrinkingBgSingle(rSpan, cSpan) {
  const direction = prb(0.5) ? 1 : -1
  const duration = rnd(750, 3000)
  return [bgAnimation('shrinkingBorder', rSpan, cSpan, {
    duration,
    direction
  })]
}

function shrinkingBgMultiple(rSpan, cSpan) {
  const direction = prb(0.5) ? 1 : -1
  const duration = rnd(750, 3000)
  return times(4, i => bgAnimation('shrinkingBorder',rSpan, cSpan, {
    delay: i * 500,
    duration,
    direction
  }))
}


function shrinkingSpinningBgMultiple(rSpan, cSpan) {
  const direction = prb(0.5) ? 1 : -1
  const duration = rnd(3000, 10000)
  return times(4, i => bgAnimation('shrinkingSpinningBorder',rSpan, cSpan, {
    delay: i * (duration/4),
    duration,
    direction
  }))
}

function colorShiftingBgMultiple(rSpan, cSpan) {
  const direction = prb(0.5) ? 1 : -1
  const duration = rnd(4000, 16000)
  const squares = rndint(8, 20)
  return times(squares, i => bgAnimation('colorShift',rSpan, cSpan, {
    delay: i * 500,
    duration,
    direction,
    style: `transform: scale(${0.95 - i/squares});`
  }))
}

const bgAnimationFn =
  bgAnimationType === 0 ? colorShiftingBgMultiple :
  bgAnimationType === 1 ? staticBgsMultiple :
  bgAnimationType === 2 ? shrinkingBgSingle :
  bgAnimationType === 3 ? shrinkingBgMultiple :
  shrinkingSpinningBgMultiple


let bgAnimationCount = 0
function withBgAnimation(child, rSpan, cSpan) {
  const aspectRatio = cSpan / rSpan
  const invalidAspectRatio = aspectRatio > 3 || aspectRatio < 0.3333

  if (bgAnimationFn !== colorShiftingBgMultiple && invalidAspectRatio) return child

  const hasAnimation = prb(bgAnimationPrb)
  if (hasAnimation) bgAnimationCount++

  return [
    ...(hasAnimation ? bgAnimationFn(rSpan, cSpan) : []),
    child
  ]

}


function genericCharacterComponent(name, durMin, durMax) {
  return (children, args={}) => {
    const splitAnimation = txt => {
      const duration = args.duration ? map(args.duration, 750, 5000, durMin, durMax) : rnd(durMin, durMax)
      const split = txt.split('')

      return split.map((c, i) => $.span(c, {
        class: name + ' charContent',
        style: `
          animation-delay: -${i * duration}ms;
          ${c === ' ' ? 'margin-right: 0.5em;' : ''}
        `
      }))
    }

    const c = prb(0.5) ? [children.innerHTML] : children.innerHTML.split(' ')

    return $.div(
      c.map(txt => $.div(
        splitAnimation(txt),
        {
          class: 'charContentWord',
          style: `
            display: inline-block;
            margin-left: 0.25em;
            margin-right: 0.25em;
          `
        }
      )
    ), {
      class: 'charContentGroup',
      style: `display: inline-block;`
    })
  }
}


const updownChars = genericCharacterComponent('updownChars', 100, 500)
const shrinkChars = genericCharacterComponent('growShrinkShort', 100, 300)
const blinkChars = genericCharacterComponent('blink', 50, 200)
const colorChars = genericCharacterComponent('colorChars', 50, 200)

function getContent(elem) {
  const child = $.cls(elem, 'content')
  if (child.length) {
    if (child[0].childElementCount) return child[0].children[0].alt
    return child[0].innerHTML
  }
  else {
    return $.cls(elem, 'charContentWord').map(w =>
      $.cls(w, 'charContent').map(c => c.innerHTML).join('')
    ).join(' ')
  }
}


const LR_PADDING = 'margin-left: 0.2em; margin-right: 0.2em;'

css(`
  .text {
    font-size: 1em;
  }

  .emoji {
    ${LR_PADDING}
    font-size: ${USE_EMOJI_POLYFILL ? 0.8 : 0.9}em;
  }

  .emojiPolyfill {
    width: 1em;
    height: 1em;
    transform: translateY(7%);
  }
`)

const word = txt => $.span(txt, { class: 'text content' })
const emoji = e => $.span(e, { class: 'emoji content' })
const emojis = es => es.split(' ').map(emoji)

const link = txt => $.a(txt, {
  target: '_blank',
  href: './' + (projectId * 1000000 + rndint(EDITION_SIZE)),
  class: 'text content'
})

const elementIsEmoji = elem => {
  if (Array.isArray(elem)) return false
  return (
    elem.getElementsByClassName('emoji').length
    || elem.className.includes('emoji')
  )
}

let emojiOverride, textOverride

try {
  if (queryParams.emojis) emojiOverride = queryParams.emojis.split(',').map(decodeURI).map(emoji)
  if (queryParams.text) textOverride = queryParams.text.split(',').map(decodeURI)

  if (textOverride || emojiOverride) console.log('OVERRIDES:', textOverride, emojiOverride)
} catch (e) {}



const money1 = emojis(`💸 💰 💎 👑 💍 🪙`)
const money2 = emojis(`🤑 💷 💴 💵 💶 💲 💸 💰`)
const moneyFull = [...emojis(`💹 📈 💯`), ...money1, ...money2]
const fruit1 = emojis(`🍒 🍉 🍇 🍋 🍯`)
const fruit2 = emojis(`🍆 🍑 🌶`)
const miscFood = emojis(`🥕 🍌 🥜 🧀 🍪`)
const booze = emojis(`🍻 🍾 🥂`)
const hot = emojis(`🌶 🔥 ❤️‍🔥 🌋`)
const lucky = [...emojis(`🍀 🎰 🔔 🚨 🎁 🥇 🌟 ❓ 🃏 🎲`), ...fruit1, ...money1]
const drugs = [...emojis(`🎄 🍄 ❄️ 😵‍💫`), ...booze]
const party = [...emojis(`🎉 🕺 💃 🎊 🥳 🎈`), ...booze]
const energy = emojis(`💫 🔥 🚀 ⚡️ ✨`)
const explosion1 = emojis(`💥 🤯 🧨 💣`)
const explosionFull = [...explosion1, ...energy, ...emojis(`🌋 ☄️`)]
const sexy = [...emojis(`🦄 🌈 💋 💦 😍 ❤️‍🔥 ❤️ 🔥 🔞 🌹 🥵`), ...fruit2]
const yummy = [...emojis(`🍬 🍭 🎂 🍫 🍦 🍄`), ...fruit1, ...fruit2, ...miscFood]
const usa = emojis(`🏎 🇺🇸 ★`)
const funny = emojis(`🐄 🤡 💩 😂 🤣`)
const symbols = emojis(`★ → ←`)
const justArrows = emojis(`→ ← → ← → ← 🔴`)
const lunar = emojis(`🌜 🌛 🌝 🌞 🌎 🌟`, ...energy)
const colorful = [...emojis(`🍭 🎨 🌈 🦄 🎉`), ...fruit1]
const loud = [...emojis(`‼️ ❗️ 🔊`), ...explosion1]
const computer = emojis(`👨‍💻 🧑‍💻 👩‍💻 🕸 👁 👁‍🗨 🌎 🤳 🔔 🏄‍♂️ ❤️`)
const commonEmojis = emojis(`💸 🤑 🔥 😂 💥`)
const circusEmojis = emojis(`🎪 🦁 🤡 🏋️ 👯‍♀️ 🤹`)
const excitingMisc = emojis(`🙌 🤩 ‼️ 🏃 😃`)
const hedonicTreadmill = [...emojis(`🐭 🏃`), ...miscFood, ...symbols]
const sportsEmojis = emojis(`🏎️ 🏋🏽 ⛹️‍♂️ 🏟 🏄‍♀️ 🏂 🤾 🏅 🏆 🏃 💪`)
const misc = emojis(`⚠️ 🐂 🤲 🐐 🎸 🚬 🌳`)

const emojiLists = emojiOverride ? [emojiOverride] : [
  moneyFull,
  booze,
  hot,
  lucky,
  drugs,
  party,
  energy,
  explosion1,
  explosionFull,
  sexy,
  yummy,
  usa,
  funny,
  symbols,
  lunar,
  colorful,
  loud,
  computer,
  excitingMisc,
  commonEmojis,
  justArrows,
  hedonicTreadmill,
  circusEmojis,
  sportsEmojis
]

const emojiList = [...emojiLists, misc].flat().map(e => e.innerHTML)


const withEmoji = (txt, possibleEmojis, emojiProb=1) => !hasEmoji(txt) && prb(emojiProb)
  ? $.span([
    txt,
    $.span(sample(possibleEmojis), {style: 'margin-left: 0.5em'})
  ])
  : txt

const withEmojiLazy = (possibleEmojis, emojiProb) => txt => withEmoji(txt, possibleEmojis, emojiProb)


const luckyText = [
  'WINNER',
  'LUCKY',
  'CONGRATULATIONS',
  'WIN BIG',
  'MEGA WIN',
  'JACKPOT',
  'HIT IT BIG',
  '777',
  `YOU CAN'T LOSE`,
  `EVERYONE'S A WINNER`,
  'DOUBLE DOWN',
  'BINGO',
  'MULTIPLIER',
  'SURPRISE',
]

const dealsText = [
  'DEAL OF THE CENTURY',
  'DEALS',
  'DEALS GALORE',
  'WHAT A BARGAIN',
  'WHAT A DEAL',
  'BARGAIN',
  'BUY NOW',
  'CHEAP',
  'SO CHEAP',
  'SELL OUT',
  'GOOD PRICES',
  'CRAZY DEALS',
  'NEW',
  'INSANE PRICES',
  'LIMITED TIME OFFER',
  'FREE',
  'DEALS',
  'UNLIMITED',
  'EXTRA LARGE',
  'NEW AND IMPROVED',
  `RUN, DON'T WALK`,
  'SENSATIONAL',
  'AMAZING SAVINGS',
  'MORE',
  'MORE IS MORE',
  'I WANT MORE',
  'SATISFACTION GUARANTEED',
  'SUPERSIZE'
]

const cashText = [
  `Do you CRAVE YIELD?`,
  `MAKE GENERATIONAL WEALTH NOW`,
  'MAKE FAST CASH NOW',
  'MAKE CASH FAST',
  'GOLD MINE',
  'FAST CASH',
  '$$$$',
  'CASH COW',
  'MILLIONAIRE',
  'BILLIONAIRE',
  'TRILLIONAIRE',
  'PUMP + DUMP',
  'CRYPTO FORTUNE',
  'GET RICH QUICK',
  `YIELD EXPLOSION`,
  'TREASURE TROVE',
  'PROFITS',
  'MONEY MAKING OPPORTUNITY',
]

const sexyText = [
  'SEXY',
  'XXX',
  'HOT',
  'SO HOT',
  'SPICY',
  'SO SEXY',
  'PURE BLISS',
  'DELICIOUS',
  'FORBIDDEN PLEASURES',
  'JUICY',
  'PASSION',
  'ECSTASY',
  'LUST',
  'DESIRE',
  'OBSESSION',
]

const fomo = [
  `THINGS ARE MOVING FAST`,
  `Stop THROWING YOUR MONEY AWAY`,
  `DON'T MISS OUT`,
  `YOU CAN'T AFFORD TO PASS THIS UP`,
  `ACT NOW (Before It's Too Late)`,
  'FEAR OF MISSING OUT',
  'FEAR UNCERTAINTY DOUBT',
  'FOMO',
  'FUD',
  `THIS WON'T LAST`,
  'TIME IS RUNNING OUT',
  'ACT NOW',
  `DON'T WAIT`,
  `THIS IS WHAT YOU'VE BEEN WAITING FOR`,
  `THIS IS GOING TO BE HUGE`,
]
const hotText = [
  'TOO HOT TO HANDLE',
  'SO HOT',
  'HOT STUFF',
  'SIZZLING',
  'HOTTEST ART AROUND',
  'ELECTRIC',
  'WHITE HOT',
]

const excitingText = [
  'FRESH',
  'UNBELIEVABLE',
  'BELIEVE THE HYPE',
  'WOW',
  'OMG',
  'HYPE',
  'AMAZING',
  'INCREDIBLE',
  'EXCITING',
  'ECSTATIC',
  'EUPHORIC',
  'THRILLING',
  'HOLY MOLY',
  'WHAT A THRILL',
  'HIGH OCTANE',
  'HIGH VOLTAGE',
  `SUPERCHARGED`,
  'HOLY COW',
  'BONANZA',
  'PURE ENERGY',
  'PARTY TIME',
  'INSTANT GRATIFICATION',
  'MIND = BLOWN',
  'DOPAMINE RUSH',
  'DOPAMINE BOOST',
  'STARSTRUCK',
  'BLAST OFF',
  'ALL OR NOTHING',
  `LET'S GO`,
  'FRENZY',
  'WILD',
  'DELIGHTFUL',
  'DOPAMINE MACHINE',
]

const funText = [
  'FUN',
  'LOL',
  'ROFL',
  'LMAO',
  'WAGMI',
  'WTF',
  'SO COOL',
  'I LOVE IT',
  'HA HA HA HA',
  'SWEET',
  'DOPE',
]

const crypto = [
  `ALPHA`,
  `NEW PARADIGM`,
  'DEGEN',
  'NFTs',
  'CRYPTO',
  'MAKE FAST CASH NOW',
  'WAGMI',
  'GRAIL',
  `THIS NFT SELLS ITSELF`,
  'STRAIGHT TO THE MOON',
  'BULL MARKET',
  'DIAMOND HANDS',
  'ALL TIME HIGH',
  '100%',
  'THROBBING GAINS',
  'MASSIVE GAINS',
  'WHOPPING GAINS',
  'RARE'
]

const disclaimer = [
  `WHAT YOU SEE IS WHAT YOU GET`,
  'NFA',
  'NOT FINANCIAL ADVICE',
  'WARNING',
  'DANGER ZONE',
  'DO YOUR OWN RESEARCH',
  'DYOR',
  'SAFE + SECURE',
  `PAST PERFORMANCE DOES NOT GUARANTEE FUTURE RESULTS`,
]

const affirmations = [
  `OPPORTUNITY OF A LIFETIME`,
  `YOU WON'T BELIEVE THIS`,
  `THIS IS THE REAL DEAL`,
  `PAY ATTENTION`,
  `I COULDN'T BELIEVE IT EITHER`,
  `YOU'LL LOVE IT`,
  'YOU DESERVE IT',
  'TOO GOOD TO BE TRUE',
  'YOU ONLY LIVE ONCE',
  'YOLO',
  `NEVER LOOKED SO GOOD`,
  'AS GOOD AS IT GETS',
  'FUCK YES',
  'FINALLY',
  'SPECIAL',
  `YOU'RE #1`,
  'THIS ROCKS',
  'ALL NATURAL',
  'EASY AS 1 2 3',
  'HAPPY',
  'REWARDS',
]

const wwwText = [
  'WORLD WIDE WEB',
  'ENGAGEMENT',
  'CLICK HERE',
  'VIRAL',
  'LIKE',
  'TRENDING',
  `BY USING THIS WEBSITE YOU AGREE TO IT'S TERMS OF SERVICE`,
]

const sportsText = [
  'SLAM DUNK',
  'GOAL',
  'HOME RUN',
  'GRAND SLAM',
  'MAKE SOME NOISE',
  `LET'S GO`,
  'POWER PLAY',
  'GREATEST OF ALL TIME',
  'CHAMPION',
  'WINNER',
  'VICTORY LAP',
  'ACTION PACKED',
  'TRIPLE CROWN',
  'ALL STAR',
  'SUPERSTAR',
  'LIGHTNING ROUND',
]


const textLists = [
  luckyText,
  dealsText,
  cashText,
  sexyText,
  fomo,
  hotText,
  excitingText,
  funText,
  crypto,
  disclaimer,
  affirmations,
  wwwText,
  sportsText
]


const emojiTextRelationships = {
  single: {
    'CASH COW': [emoji`🐄`, ...money2],
    'YIELD EXPLOSION': explosion1,
    'HOTTEST ART AROUND': emojis(`🎨 🔥`),
    'SUPERCHARGED': emojis(`⚡️`),
    'HIGH VOLTAGE': emojis(`⚡️`),
    'HOLY COW': emojis(`🐄`),
    'STRAIGHT TO THE MOON': emojis(`🌜 🌛 🌝 🚀`),
    'THROBBING GAINS': emojis(`💪`),
    'MASSIVE GAINS': emojis(`💪`),
    'BULL MARKET': emojis(`🐂`),
    'DIAMOND HANDS': emojis(`💎 🤲`),
    'SWEET': yummy,
    'ELECTRIC': emojis(`⚡️`),
    'LIGHTNING ROUND': emojis(`⚡️`),
    'JUICY': fruit1,
    'ALL NATURAL': fruit1,
    'PURE ENERGY': energy,
    `RUN, DON'T WALK`: emojis(`🏃`),
    'MIND = BLOWN': emojis(`🤯`),
    '100%': emojis(`💯`),
    'GREATEST OF ALL TIME': emojis(`🐐`),
    'STARSTRUCK': emojis(`🤩`),
    'BLAST OFF': emojis(`🚀`),
    'ROFL': emojis(`🤣`),
    'THIS ROCKS': emojis(`🎸`),
  },
  group: [
    [luckyText, lucky],
    [dealsText, money2],
    [cashText, moneyFull],
    [sexyText, sexy],
    [hotText, hot],
    [excitingText, [...explosionFull, ...hot, ...loud, ...excitingMisc]],
    [funText, funny],
    [crypto, [...moneyFull, ...energy]],
    [disclaimer, emojis(`⚠️ 🚨`)],
    [wwwText, computer],
    [sportsText, sportsEmojis]
  ]
}



function chooseEmojiForText(txt, selectionPrb=0.1) {
  if (prb(selectionPrb) && emojiTextRelationships.single[txt]) {
    return sample(emojiOverride || emojiTextRelationships.single[txt])
  } else if (is420) {
    return '🚬'
  }

  for (let [texts, emojis] of emojiTextRelationships.group) {
    if (texts.includes(txt)) {
      const e = sample(emojiOverride || emojis)
      return prb(selectionPrb) ? e : undefined
    }
  }
}




const sampledTextContent = []
const sampledEmojiContent = []

function sampleContent(contentOverride=false, onlyEmojis=false) {
  if (contentOverride) {
    const c = onlyEmojis ? sample(sampledEmojiContent) : sample([...sampledEmojiContent, ...sampledTextContent])
    return [c, c]
  }
  const showEmojis = onlyEmojis || (prb(0.3) && _content.emojis.length) || !_content.text.length
  const e = sample(_content.emojis)

  const mainContent = showEmojis ? e : sample(_content.text)
  let replacementContent = showEmojis ? e : sample((textOverride||[]).map(c => word(c)))
  if (!textOverride) {
    replacementContent = mainContent
  }

  if (showEmojis) {
    sampledEmojiContent.push(mainContent)
  } else {
    sampledTextContent.push(mainContent)
  }

  return [mainContent, replacementContent]
}

const contentSample = { text: [], emojis: [] }

function chooseContent() {
  const content = { text: [], emojis: [] }

  const sections = chance(
    [30, 1],
    [30, 2],
    [25, 3],
    [15, 0] // everything
  )


  if (sections) {
    times(sections, s => {
      const textSample = sample(textLists)
      contentSample.text.push(textSample)

      const matchingEmojiSample = emojiTextRelationships.group.find(g => g[0] === textSample)
      const emojiSample = matchingEmojiSample && prb(0.5) ? matchingEmojiSample[1] : sample(emojiLists)
      contentSample.emojis.push(emojiSample)
    })
  } else {
    contentSample.text = textLists
    contentSample.emojis = emojiLists
  }

  if (is69) {
    contentSample.text = [sexyText]
    contentSample.emojis = [sexy]
  } else if (is420) {
    contentSample.text = [funText]
    contentSample.emojis = emojis('🚬 🌳 🍄 😵‍💫')
  } else if (is100) {
    contentSample.text = ['100%']
    contentSample.emojis = emojis('💯')
  } else if (is666) {
    contentSample.text = [hotText]
    contentSample.emojis = [hot]
  } else if (is7) {
    contentSample.text = [luckyText]
    contentSample.emojis = [lucky]
  }


  const selections = chance(
    [15, 1],
    [25, 2],
    [35, 3],
    [10, 4],
    [10, 5],
    [5, 0], // everything
  )


  if (emojiOverride) contentSample.emojis = emojiOverride

  if (selections) {
    times(selections, s => {
      content.text.push(sample(contentSample.text))
      content.emojis.push(sample(contentSample.emojis))
    })
  } else {
    content.text = contentSample.text
    content.emojis = contentSample.emojis
  }

  const wordify = c => c === 'CLICK HERE'
    ? link(c)
    : word(c + (prb(0.25) ? '!' : ''))

  content.text = content.text
    .flat()
    .map(wordify)
  content.emojis = showEmojis ? content.emojis.flat() : []
  return content
}

const _content = chooseContent()
const content = [..._content.text, ..._content.emojis]



const adjustCharLength = (txt, pairedEmoji) => {
  let lenText = txt;
  emojiList.forEach(c => lenText = lenText.replace(c, '1'))
  return lenText.length + (!!pairedEmoji ? 3 : 0)
}
css(`
  .sectionContainer {
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    user-select: none;
    cursor: pointer;
    transition: 150ms;
    filter: invert(${invertAll ? 1 : 0});
    transition: 250ms;
  }

  .sectionContainer:hover {
    filter: invert(${invertAll ? 0 : 1});
  }

  .sectionContainer:active {
    opacity: 0.5;
  }

  .animationGridContainer {
    line-height: 1;
  }
`)

function createSound(animation, params, isGrid, extraDelay=0) {
  let fn

  if ([spin, flamingHot].includes(animation)) {
    fn = smoothSound

  } else if ([vPivot, hPivot, dance, updownLong, growShrink, breathe, growShrinkShort].includes(animation)) {
    fn = chance(
      [4, (p) => sirenSound({
        ...p,
        duration: p.duration/2,
      })],
      [4, (p) => zoomSound({
        ...p,
        delay: p.delay + p.duration/4,
        duration: p.duration/2
      })],
      [!isGrid && 2, (p) => carSirenSound(p)],
      [!isGrid && 1, (p) => ticktockSound(p)]
    )

  } else if ([hSiren, vSiren, wave, vSirenShort].includes(animation)) {
    fn = sirenSound

  } else if ([hFlip, vFlip].includes(animation)) {
    fn = flipSound

  } else if ([blinkChars, colorChars].includes(animation)) {
    fn = blinkCharSound

  } else if (blink === animation) {
    fn = isGrid ? blinkCharSound : ticktockSound

  } else if ([shrinkChars, updownChars].includes(animation)) {
    fn = shrinkCharSound

  } else if (animation === hexagon) {
    fn = prb(0.5) ? hexSound : sirenSound

  } else if (animation === climb) {
    fn = climbSound

  } else if (animation === iden) {
    fn = singleSound

  } else return


  return fn({ ...params, delay: params.delay + extraDelay || 0 })
}

let sectionCount = 0
function sectionContainer(child, rSpan, cSpan, h, txtH, onclick) {
  const bwc = prb(0.5) ? { bg: '#000', text: '#fff' } : { bg: '#fff', text: '#000' }
  const txtColor = BW ? bwc.text : getColorFromHue(txtH)
  const bgColor = BW ? bwc.bg : getBgColor(h)
  const bgProp = bgColor.length > 200 ? '' : 'background: '

  const rotation = threeDRotations
    ? `perspective(500px) rotate3d(1,1,0.5,${lineRotation()}deg)`
    : `rotate(${lineRotation()}deg)`

  const fontStyle = prb(italicRate) ? 'font-style: italic;' : ''

  const borderWidth = min(rSpan, cSpan) * .05
  const rotateColor = prb(rotateColorPrb) ? 'fullColorRotate' : ''
  const colorBlink = prb(colorBlinkPrb) ? 'colorBlink' : ''

  const classes = [
    'sectionContainer',
    starburstBg(h, rSpan, cSpan),
    rotateColor,
    colorBlink,
    sectionAnimation,
  ].filter(iden).join(' ')

  const container = $.div(
    withBgAnimation(child, rSpan, cSpan),
    {
      class: classes,
      style: `
        border-style: ${borderStyle};
        ${showBorder ? `border-width: ${borderWidth}vmin; box-sizing: border-box;` : 'border-width: 0;'}
        grid-column: span ${cSpan};
        grid-row: span ${rSpan};
        ${bgProp}${(hideBg ? 'none;' : bgColor)};
        color: ${txtColor};
        ${fontStyle}
        transform: ${rotation};
        animation-delay: -${rnd(5)}s;
        animation-direction: ${rotateColor ? 'normal' : sectionAnimationDirection()};
        animation-duration: ${rotateColor ? '25' : sectionAnimationDuration()}s;
      `
    }
  )
  const childContent = getContent(child)

  let isFullScreen, notifyingTimeout
  const canFullScreen = prb(0.01)
  const triggersPopup = prb(0.01)
  const triggersNotifications = prb(0.01)
  container.onclick = () => {
    try {
      onclick()
      if (window.navigator) window.navigator.vibrate(50)

      if (canFullScreen) {
        const method = isFullScreen ? 'remove' : 'add'
        container.classList[method]('fullScreen')
        isFullScreen = !isFullScreen
      }

      console.log('CLICK:',childContent)

      if (triggersNotifications) {
        const setNotification = () => {
          notifyingTimeout = setTimeout(() => {
            new Notification(childContent)
            setNotification()
          }, rndint(100, 10000))
        }

        Notification.requestPermission().then(p => {
          setNotification()
        })

        if (notifyingTimeout) clearTimeout(notifyingTimeout)
      }

      if (navigator.clipboard) navigator.clipboard.writeText(childContent)

      if (childContent.includes('FAST CASH')) setTimeout(() => window.open('http://fastcashmoneyplus.biz', '_blank'))
      if (triggersPopup) setTimeout(() => window.alert(childContent))
    } catch (e) {}
  }

  sectionCount++

  return container
}






const usedAnimations = []

let marqueeCount = 0
function marqueeContainter(rSpan, cSpan, contentOverride=false) {
  marqueeCount++
  let [child, replacementChild] = sampleContent(contentOverride)
  const pairedEmoji = chooseEmojiForText(child.innerHTML, pairedEmojiPrb)

  if (textOverride) child = replacementChild

  const height = `calc(${100*rSpan/rows}vh)`
  const width = `calc(${100*cSpan/cols}vw)`
  const slow = 1 + adjustCharLength(child.innerHTML, pairedEmoji)/9
  const aspectRatio = cSpan / rSpan
  const sideways =
    (prb(thinSidewaysPrb) && aspectRatio < 0.333)
    || (prb(sidewaysPrb) && aspectRatio >= 0.3333 && aspectRatio < 1.2)


  const h = chooseHue()
  const txtH = chooseAltHue(h)

  const canShowAltAnimation = rSpan >= 2 && cSpan/rSpan >= 5
  const msgIsShort = child.innerHTML.length < 8

  const msgAnimation = prb(marqueeAnimationRate) && canShowAltAnimation
    ? chance(
      [1, growShrinkShort],
      [1, vSirenShort],
      [1, blink],
      ...(msgIsShort ? [
        [1, dance],
        [1, spin],
        [1, hSiren],
        [1, hPivot],
        [1, hFlip],
      ] : [])
    )
    : iden

  usedAnimations.push(msgAnimation)

  const r = rnd(750, 1500)
  const d = map(sideways ? cSpan/cols : rSpan/rows, 0, 1, 0.5, 20)
  const duration = rnd(d, 100) * slow * speed
  const delay = duration/5 + rnd(duration/5)

  const showLeftRight = cSpan/rSpan >= 6 && prb(0.1)
  const showTrails = showLeftRight && prb(0.5)


  const isEmoji = elementIsEmoji(child)
  const rotateEmoji = isEmoji && sideways && prb(0.5)

  let emojiStyle = ''

  if (rotateEmoji) {
    emojiStyle = 'transform: rotate(90deg); display: inline-block;'
  }

  if (
    isEmoji && rSpan <= 3
    || rotateEmoji && cSpan <= 3
  ) {
    emojiStyle += LR_PADDING
  }


  const clonedNode = $.span(child.cloneNode(true), {
    class: isEmoji ? 'emojiShadow' : '',
    style: getShadow(txtH, !isEmoji) + emojiStyle,
    'data-h': txtH,
  })

  const childWithPairedEmoji = pairedEmoji
    ? [
      clonedNode,
      $.span(pairedEmoji, {
        class: 'emojiShadow',
        style: `${LR_PADDING} ${getShadow(txtH, false)}`,
        'data-h': txtH,
      })
    ]
    : clonedNode

  const zoomParams = { duration: r * slow * speed / 2, delay, showTrails }

  let childEl, playSound
  if (showLeftRight) {
    usedAnimations.push(leftRight)
    childEl = leftRight(childWithPairedEmoji, {
      style: `font-size: ${height};`,
      duration: r * slow * speed,
      delay,
      showTrails
    })
    playSound = zoomSound({ ...zoomParams, switchChannels: true })
  } else {
    childEl = marquee(childWithPairedEmoji, {
      style: `font-size: ${sideways ? width : height};`,
      direction: posOrNeg(),
      delay,
      duration,
      sideways,
      msgAnimation
    })
    if (msgAnimation !== iden) playSound = createSound(msgAnimation, { duration: 2000 }, true)
  }

  let stopSound = []
  let talkingActive = false
  const ignoreStop = prb(0.1)

  return sectionContainer(childEl, rSpan, cSpan, h, txtH, () => {
    if (showLeftRight) {
      if (stopSound.length) {
        stopSound.forEach(s => s())
        stopSound = []
        return
      }

      const sound1 = playSound()
      if (!ignoreStop) stopSound.push(sound1)

      if (showTrails) {
        const sound2 = ignoreStop
          ? zoomSound({ ...zoomParams, switchChannels: true })(20)
          : playSound(20)
        if (!ignoreStop) stopSound.push(sound2)
      }

    } else {

      if (
        talkingActive
        && utteranceQueue.some(u => u.text === child.innerHTML.toLowerCase())
      ) {
        stopUtter(child.innerHTML)
        talkingActive = false
      } else {
        utter(child.innerHTML, 30, 7)
        talkingActive = true
      }

      if (stopSound.length) {
        stopSound.forEach(s => s())
        stopSound = []
      } else if (playSound) {
        const sound = playSound()
        if (!ignoreStop) stopSound.push(sound)
      }

    }
  })
}






function getFontSize(txt, rSpan, cSpan) {
  const rShare = rSpan/rows
  const cShare = cSpan/cols

  const words = txt.split(' ')
  const longestWord = words.reduce((longest, word) => adjustCharLength(word) > adjustCharLength(longest) ? word : longest, words[0])

  const charCols = adjustCharLength(longestWord)
  const charRows = adjustCharLength(txt)/charCols

  return `calc(min(${rShare/charRows} * 100vh, ${cShare/charCols} * 100vw))`
}




const allPlayingSounds = []

let animationCount = 0
function animationContainer(rSpan, cSpan, contentOverride=false) {
  animationCount++
  let [child, replacementChild] = sampleContent(contentOverride)
  if (textOverride) child = replacementChild

  const height = `calc(${100*rSpan/rows}vh)`
  const width = `calc(${100*cSpan/cols}vw)`
  const h = chooseHue()
  const txtH = chooseAltHue(h)

  const ignoreCharAnimation = emojiList.includes(child.innerHTML.replace('!', ''))

  const disallowColorChars = layoutStyle === 7 && cellSize < 12 && prb(0.8)

  const animation = sample([
    dance,
    growShrink,
    spin,
    hSiren,
    vSiren,
    hPivot,
    vPivot,
    vFlip,
    hFlip,
    updownLong,
    climb,
    blink,
    hexagon,
    flamingHot,
    iden,
    prb(0.5) && breathe,
    !ignoreCharAnimation && !disallowColorChars && colorChars,
    !ignoreCharAnimation && updownChars,
    !ignoreCharAnimation && blinkChars,
    !ignoreCharAnimation && shrinkChars,
  ].filter(iden))

  const words = child.innerHTML.split(' ')
  const shortest = words.reduce((shortest, word) => word.length < shortest.length ? word : shortest , words[0])


  const rowSizeMax = 5.5/(child.innerHTML.length)
  const colSizeMax = 7 *(cSpan/(cols*shortest.length))

  const fontSize = getFontSize(child.innerHTML, rSpan, cSpan)

  const secondAnimation = animation === updownLong || prb(0.75)
    ? iden
    : sample([
      dance,
      growShrink,
      spin,
      hSiren,
      vSiren,
      hPivot,
      vPivot,
      vFlip,
      hFlip,
      climb,
    ])

  usedAnimations.push(animation)
  usedAnimations.push(secondAnimation)

  const primaryAnimationParams = {
    delay: rnd(3500),
    duration: rnd(750, 5000),
    direction: prb(0.5) ? 1 : -1,
    showTrails: prb(0.2)
  }

  const secondaryAnimationParams = {
    delay: rnd(3500),
    duration: rnd(750, 5000),
    showTrails: primaryAnimationParams.showTrails
  }

  const childEl = $.div(
    secondAnimation(
      animation(
        child.cloneNode(true),
        primaryAnimationParams
      ),
      secondaryAnimationParams
    ),
    {
      class: 'animationContainer' + (ignoreCharAnimation ? ' emojiShadow' : ''),
      'data-h': txtH,
      style: `
        height: ${100*rSpan/rows}vh;
        font-size: ${fontSize};
        ${getShadow(txtH, !ignoreCharAnimation)}
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
      `,
    }
  )


  let stopSound = []
  const ignoreStop = prb(0.1)
  const playSound = createSound(animation, primaryAnimationParams)
  const playSecondSound = secondAnimation !== iden
    ? createSound(secondAnimation, secondaryAnimationParams)
    : null

  return sectionContainer(childEl, rSpan, cSpan, h, txtH, () => {
    if (stopSound.length) {
      stopSound.forEach(s => s())
      stopSound = []
      return
    }

    const sound1 = playSound()
    if (!ignoreStop) stopSound.push(sound1)

    if (primaryAnimationParams.showTrails && animation !== blinkChars) {
      // createSound(animation, primaryAnimationParams, false, 10)
      const sound2 = ignoreStop
        ? createSound(animation, primaryAnimationParams)(10)
        : playSound(10)
      if (!ignoreStop) stopSound.push(sound2)
    }

    if (playSecondSound) {
      const sound1 = playSecondSound()
      if (!ignoreStop) stopSound.push(sound1)
    }
  })
}









function getEmojiGrid(rSpan, cSpan) {
  const divisor = rndint(1, min(rSpan/2, cSpan/2))
  return [
    max(1, int(rSpan/divisor)),
    max(1, int(cSpan/divisor))
  ]
}

let gridCount = 0
function animationGridContainer(rSpan, cSpan, contentOverride=false) {
  const [child] = sampleContent(contentOverride, true)

  if (!child) return animationContainer(rSpan, cSpan)
  gridCount++

  const height = `calc(${100*rSpan/rows}vh)`
  const width = `calc(${100*cSpan/cols}vw)`
  const h = chooseHue()
  const txtH = chooseAltHue(h)

  const animation = chance(
    [5, growShrink],
    [4, spin],
    [3, blink],
    [3, vSiren],
    [3, hSiren],
    [3, vFlip],
    [3, hFlip],
    [1, dance],
    [1, wave],
    [1, climb],
  )

  usedAnimations.push(animation)

  const [r, c] = getEmojiGrid(rSpan, cSpan)

  const duration = rnd(750, 5000)
  const delayFactor = rnd(0.5, 2)

  const childEl = $.div(
    times(r*c, i => animation(
      child.cloneNode(true), {
        delay: (i/(r*c))*duration*delayFactor,
        duration,
      }
    )),
    {
      class: 'animationGridContainer emojiShadow',
      'data-h': txtH,
      style: `
        font-size: ${100*min(rSpan/(r*rows), cSpan/(c*cols*1.2))}vmin;
        height: ${100*rSpan/rows}vh;
        width: ${100*cSpan/cols}vw;
        display: grid;
        align-items: center;
        justify-items: center;
        grid-template-rows: repeat(${r}, 1fr);
        grid-template-columns: repeat(${c}, 1fr);
        ${getShadow(txtH, false)}
      `,
    }
  )

  const params = {
    delay: duration*delayFactor,
    duration,
  }

  let stopSound = []
  const ignoreStop = prb(0.1)
  const playSound = createSound(animation, params, true)

  return sectionContainer(childEl, rSpan, cSpan, h, txtH, () => {
    if (stopSound.length) {
      stopSound.forEach(s => s())
      stopSound = []
      return
    }


    const sound1 = playSound()
    if (!ignoreStop) stopSound.push(sound1)

    if (animation !== blink) {
      const sound2 = ignoreStop
        ? createSound(animation, params)(duration/4)
        : playSound(duration/4)
      if (!ignoreStop) stopSound.push(sound2)
    }
  })
}








function flexSection(rowCells, colCells, contentOverride=false) {
  const cells = {}
  times(rowCells, r => cells[r] = [])

  const sections = []

  let colMin, colMax, rowMin, rowMax

  if ([1, 2].includes(layoutStyle)) {
    colMin = 1
    rowMin = 1
    colMax = colCells
    rowMax = rowCells

  } else if (layoutStyle === 3) {
    colMin = 1
    rowMin = 1
    colMax = colCells
    rowMax = int(rowCells/8)

  } else if (layoutStyle === 4) {
    if (prb(0.5)) {
      colMin = colCells * (5/12)
      rowMin = rowCells * (5/12)
    } else {
      colMin = colCells
      rowMin = rowCells
    }
    colMax = colCells
    rowMax = rowCells

  } else if (layoutStyle === 5) {
    rowMin = rowSize
    rowMax = rowSize

    colMin = 12
    colMax = colCells

  } else if (layoutStyle === 6) {
    colMin = colSize
    colMax = colSize

    rowMin = prb(0.5) ? 16 : rowCells
    rowMax = rowCells

  } else if (layoutStyle === 7) {
    colMin = cellSize
    colMax = cellSize
    rowMin = cellSize
    rowMax = cellSize
  } else if (layoutStyle === 8) {
    colMin = 1
    rowMin = 1
    colMax = int(colCells/6)
    rowMax = int(rowCells/6)
  } else if (layoutStyle === 9) {
    const mn = rndint(1, 7)
    colMin = mn
    rowMin = mn
    colMax = colCells
    rowMax = rowCells
  }


  const findNextFilledCol = (rC, cC) => {
    for (let c = cC; c < colCells; c++) {
      if (cells[rC][c]) return c
    }
    return colCells
  }

  const findNextUnfilledCol = (rC, cC) => {
    for (let c = cC; c < colCells; c++) {
      if (!cells[rC][c]) return c
    }

    return colCells
  }


  const getSpan = (minCells, cellsLeft, maxCells) => {
    const span = rndint(min(minCells, cellsLeft), maxCells)
    return (cellsLeft - span < minCells) ? cellsLeft : span
  }


  const fillSection = (rCursor, cCursor) => {
    let adjRowMax = rowMax
    let adjColMax = colMax
    if (layoutStyle === 1 && !sectionCount) {
      if (prb(0.5)) adjRowMax = rowCells/4
      if (prb(0.5)) adjColMax = colCells/4

    } else if (
      (layoutStyle === 2 && prb(0.9))

    ) {
      if (prb(0.2)) {
        adjColMax = sample([1, 2])
      } else {
        adjRowMax = sample([1, 2])
      }

    } else if (layoutStyle === 9) {
      if (prb(0.3)) {
        adjColMax = rndint(1, 7)
      } else {
        adjRowMax = rndint(1, 7)
      }
    }
    const colsLeft = min(findNextFilledCol(rCursor, cCursor) - cCursor, adjColMax)
    const rowsLeft = max(1, min(rowCells - rCursor, adjRowMax))

    const cSpan = getSpan(colMin, colsLeft, colCells)
    const rSpan = getSpan(rowMin, rowsLeft, rowCells)

    const aspectRatio = cSpan / rSpan
    const animationPrb = layoutStyle === 4 ? 0.75 : 0.5

    sections.push(
      aspectRatio < 1.25 && aspectRatio > 0.8

      ? prb(0.75) && _content.emojis.length
        ? animationGridContainer(rSpan, cSpan, contentOverride)
        : animationContainer(rSpan, cSpan, contentOverride)

      : aspectRatio < 2 && aspectRatio > 0.5 && prb(animationPrb) ?
        animationContainer(rSpan, cSpan, contentOverride)

      : marqueeContainter(rSpan, cSpan, contentOverride)
    )

    times(rSpan, r =>
      times(cSpan, c =>
        cells[rCursor+r][cCursor+c] = 1
      )
    )

    return { cSpan, rSpan }
  }

  let rCursor = 0

  while (rCursor < rowCells) {
    let cCursor = findNextUnfilledCol(rCursor, 0)

    while (cCursor < colCells) {
      const { cSpan } = fillSection(rCursor, cCursor)
      cCursor = findNextUnfilledCol(rCursor, cCursor + cSpan)
    }

    rCursor++
  }

  return $.section(
    sections,
    {
      style: `
        width: ${100*colCells/cols}vw;
        height: ${100*rowCells/rows}vh;
        overflow: hidden;
        grid-row: span ${rowCells};
        grid-column: span ${colCells};
        display: grid;
        grid-template-rows: repeat(${rowCells}, 1fr);
        grid-template-columns: repeat(${colCells}, 1fr);
      `
    }
  )
}



  const main = $.main(
    flexSection(rows, cols),
    {
      id: 'main',
      style: `
        height: 100vh;
        width: 100vw;
        overflow: hidden;
        display: grid;
        grid-template-rows: repeat(${rows}, 1fr);
        grid-template-columns: repeat(${cols}, 1fr);
      `
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
    bgType === 0 || BW ? 'Solid' :
    bgType === 1 ? 'Empty' :
    bgType === 2 ? 'Gradient' :
    'ZigZag'



  const shadowLetters = ['', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']

  features['Shadow Style'] = shadowLetters[shadowType]
  features['Font'] = fontFamily
  features['Borders'] = showBorder ? borderStyle : 'none'
  features['Askew'] = freeFloating

  const canSeeBodyBg = freeFloating || bgType === 1
  const bodyBgHasColor = !['#000', '#fff'].includes(bgColor)
  features['Base Hues'] =
    BW ? 0 :
    canSeeBodyBg && bodyBgHasColor && BW ? 1 :
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
    ].map(t => t.replace('!', '')))
  )
  usedContent.forEach(c => features['_Content: ' + c] = true)

  if (usedContent.includes('PARTY TIME')) features['_Sample: PARTY TIME'] = true


  return features
}
