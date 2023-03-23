
function calculateFeatures(tokenData) {
  const min = Math.min
const max = Math.max
const abs = Math.abs
const round = Math.round
const int = parseInt
const btwn = (mn, mx, val) => max(mn, min(mx, val))
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

function setRunInterval(fn, interval) {
  let i = 0
  fn(i)
  return setInterval(() => {
    i++
    fn(i)
  }, interval)
}

function getLocalStorage(key) {
  try {
    return JSON.parse(window?.localStorage?.getItem(key))
  } catch (e) {
    console.log(e)
  }
}

let IS_HEADLESS = false
let TWEMOJI_PRESENT = false
const $ = (elem, prop, value) => {}


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

const cols = 60
const rows = 48


let LAST_PAUSED
let PAUSED = getLocalStorage('__DOPAMINE_IS_PAUSED__') || false
let USE_EMOJI_POLYFILL = TWEMOJI_PRESENT && (
  IS_HEADLESS
  || getLocalStorage('__DOPAMINE_EMOJI_TOGGLE__')
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
  [62, 1], // anything goes              TODO: maybe make it so there are fewer vertical marquees
  [4, 2],  // anything goes (micro/large)
  [7, 3],  // anything goes (lean rows)  TODO: maybe have this instead of 5?
  [2, 4],  // macro
  [8, 5],  // even rows                   TODO: make 16, 24 less likely
  [5, 6],  // even cols
  [5, 7],  // perfect grid                TODO: maybe include some marquees in there
  [2, 8],  // imperfect grid
  [5, 9],  // anything goes micro, varying size
)


const sidewaysPrb = prb(0.4) ? 0 : rnd(0.5, 1)
const thinSidewaysPrb = layoutStyle !== 6 ? 0.95 : chance(
  [9, 0.5],
  [9, 0.95],
  [2, 0],
)

const sectionAnimation = prb(0.95) ? '' : sample([
    'borderBlink',
    'blink',
    'updown',
    'dance',
    'growShrink',
    'spin',
    'hPivot',
    'vPivot',
    'breathe',
  ])

const sectionAnimationDirection = chance(
  [1, () => 'normal'],
  [1, () => 'reverse'],
  [1, () => prb(0.5) ? 'normal' : 'reverse'],
)

const sectionAnimationDuration = () => rnd(2, sectionAnimation === 'blink' ? 5 : 17)


const marqueeAnimationRate = chance(
  [85, 0],
  [20, rnd(.25, .5)],
  [5, 1],
)

const shadowType = chance(
  [4, 1],
  [4, 2],
  [4, 3],
  [4, 4],
  [4, 5],
  [2, 6],
  [2, 7],
  [4, 8],
  [2, 9],
)


const showEmojis = prb(0.5)


const getShadowColor = (h, l=50) => `hsl(${h%360}deg, 100%, ${l}%)`
const getShadowText = (h, polyfillShadow) => {
  const shadowColor = shadowType === 8 ? '#fff' : getShadowColor(h+90, 20)

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
      times(4, s => `${s/20 - 0.1}em ${s/20 - 0.1}em 0 ${getShadowColor(h + 180 + s*30)}`) :

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




const pairedEmojiPrb = chance(
  [2, 0],
  [1, 0.5],
  [1, 1],
)


const upsideDownRate = chance(
  [9, 0],
  [1, rnd(0.1, 0.3)]
)

const lineRotation = chance(
  [92, () => prb(upsideDownRate) ? 180 : 0],
  [6, () => rnd(20)],
  [2, () => rnd(20, 180)],
)

const freeFloating = ![0, 180].includes(lineRotation())

const threeDRotations = lineRotation() <= 20 && lineRotation() && prb(0.3333)


const gradientBg = prb(0.2)

const bgType = chance(
  [57, 0],
  [10, 1], // empty
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

const bw = prb(0.15)
const sH = rnd(360)

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


const franticVoice = prb(0.1)


const randomHue = prb(0.02)

const chooseHue = () => randomHue ? rnd(360) : sH + sample(possibleHues) % 360


const chooseAltHue = (h) => {
  const alt = chooseHue()
  return h === alt ? chooseAltHue(h) : alt
}


const hideBg = freeFloating ? prb(0.5) : false
const showBorder = freeFloating ? prb(0.5) : prb(0.3333)

const borderStyle = chance(
  [1, () => 'solid'],
  [1, () => 'dashed'],
  [1, () => 'dotted'],
  [1, () => 'double'],
)


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


function starburstBg(h, rSpan, cSpan) {
  if (!prb(starburstBgPrb) || rSpan < 4) return

  const aspectRatio = cSpan/rSpan

  const h2 = chooseHue()

  const bwc = prb(0.5) ? { bg: '#000', text: '#fff' } : { bg: '#fff', text: '#000' }
  const c1 = bw ? bwc.text : `hsl(${h}deg, 100%, 50%)`
  let c2 = bw ? bwc.bg : `hsl(${h2}deg, 100%, 50%)`
  c2 =
    bgType === 1 ? '#000' :
    c1 === c2 ? '#fff' :
    c2

  const deg = chance(
    [2, 2],
    [10, 5],
    // [8, 10],
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
  }

  .viewerMode {
    cursor: none;
    pointer-events: none;
  }

  .viewerMode .sectionContainer:hover {
    filter: invert(${invertAll ? 1 : 0});
  }

  .pauseAll *, .pauseAll *::before {
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

`)

const smoothTo = (obj, ctx) => (value, timeInSeconds=0.00001) => {
  obj.exponentialRampToValueAtTime(value, ctx.currentTime + timeInSeconds)
}

let START_TIME = Date.now()
const MAX_VOLUME = 0.04

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
  source.type = waveType
  source.frequency.value = 3000
  source.start()

  const smoothFreq = (value, timeInSeconds=0.00001) => {
    if (PAUSED) return
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


  return { source, gain, panner, ctx, smoothFreq, smoothGain, smoothPanner };
}

const BASE_FREQ = rnd(250, 500)
const MAJOR_SCALE = [1, 1.125, 1.25, 1.3333, 1.5, 1.6666, 1.875, 2]
const HEXATONIC_SCALE = [1, 1.125, 1.25, 1.5, 1.75, 2]
const JACK_DUMP_SCALE = [1, 1, 1.25, 1.3333, 1.5, 1.3333, 1.25, 1]


const getLoopsAtTime = (t, delay, duration) => (t - (START_TIME - delay)) / duration

function sirenSound({ delay, duration }, gainAdj=1, waveType='square', freqAdj=1) {
  let freqMax = freqAdj * sample(MAJOR_SCALE) * BASE_FREQ // 500
  let freqMin = freqAdj * freqMax / 5
  if (prb(0.5)) [freqMax, freqMin] = [freqMin, freqMax]

  const freqDiff = freqMax - freqMin
  const introTimeMs = 250
  gainAdj = min(1, gainAdj)

  const halfLoopsAtTime = time => 2 * (time - START_TIME + delay) / duration
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
    smoothGain(MAX_VOLUME * gainAdj)
    smoothFreq(getFreqAtTime(Date.now() + introTimeMs), 0.25)

    setTimeout(() => {
      const timeUntilNextHalfLoop = (1 - halfLoopsAtTime(Date.now() + extraDelay) % 1) * duration/2
      smoothFreq(getFreqAtTime(Date.now() + timeUntilNextHalfLoop), timeUntilNextHalfLoop/1000)

      setTimeout(() => {
        setRunInterval((i) => {
          smoothFreq(
            getFreqAtTime(Date.now() + duration/2 + extraDelay),
            i % 2 ? duration/2000 : duration/brokenDivisor
          )
        }, duration/2)
      }, timeUntilNextHalfLoop)
    }, introTimeMs)


    return () => smoothGain(0, 0.04)
  }

}


function shrinkCharSound({delay, duration}) {
  const start1 = sirenSound({duration, delay}, 0.75, 'sine')
  const start2 = sirenSound({duration, delay: delay + duration*0.25 }, 0.75, 'sine', 0.5)
  const start3 = sirenSound({duration, delay: delay + duration*0.5 }, 0.75, 'sine', 0.5)
  const start4 = sirenSound({duration, delay: delay + duration*0.75 }, 0.75, 'sine', 0.5)

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

  delay = delay

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

    setTimeout(() => {
      const timeUntilNextThird = ((1 - (getLoopsAtTime(Date.now() + extraDelay, delay, duration) % 1)) % 0.3333) * duration
      smoothFreq(getFreqAtTime(Date.now() + timeUntilNextThird + extraDelay), timeUntilNextThird/1000)

      setTimeout(() => {
        setRunInterval((i) => {
          smoothFreq(getFreqAtTime(Date.now() + duration/3 + extraDelay), duration/3000)
        }, duration/3)

      }, timeUntilNextThird)

    }, introTimeMs)

    return () => smoothGain(0, 0.04)
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

    if (isLow) {
      src1.smoothFreq(BASE_FREQ/8)
      src2.smoothFreq(BASE_FREQ/7.98)

    } else {
      const offset = 1000000 / (duration * baseFreq)
      src1.smoothFreq(baseFreq)
      src2.smoothFreq(baseFreq + offset)
    }

    src1.smoothGain(MAX_VOLUME * volAdj, 0.25)
    src2.smoothGain(MAX_VOLUME * volAdj, 0.25)


    return () => {
      src1.smoothGain(0, 0.25)
      src2.smoothGain(0, 0.25)
    }
  }
}

function ticktockSound(args) {
  const baseFreq = BASE_FREQ * sample([1, 0.5, 2])

  const duration = args.duration
  const delay = args.delay || 0

  const interval = duration / 2

  const scale = sample(MAJOR_SCALE)

  const upScale = sample(MAJOR_SCALE)


  return (extraDelay=0) => {
    const { smoothFreq, smoothGain } = createSource()
    const { smoothFreq: smoothFreq2, smoothGain: smoothGain2 } = createSource()

    const timeUntilNextNote = ((1 - (getLoopsAtTime(Date.now(), delay, duration) % 1)) % (1/2)) * duration
    let int
    setTimeout(() => {
      int = setRunInterval((i) => {
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

    }, timeUntilNextNote)

    return () => {
      smoothGain(0, 0.03)
      smoothGain2(0, 0.03)
      clearInterval(int)
    }
  }
}


function blinkCharSound(args, seq=null) {
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

  const duration = args.duration ? map(args.duration, 750, 5000, 500, 2000) : rnd(500, 2000)

  const interval = duration / 8

  return (extraDelay=0) => {
    const { smoothFreq, smoothGain } = createSource()
    const src2 = createSource()

    if (isSmooth) {
      smoothGain(MAX_VOLUME)
      if (twoTone) src2.smoothGain(MAX_VOLUME)
    }

    let int = setRunInterval((i) => {
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

    return () => {
      smoothGain(0, 0.04)
      if (twoTone) src2.smoothGain(0, 0.04)
      clearInterval(int)
    }
  }
}

function hexSound(args) {
  const baseFreq = BASE_FREQ

  const duration = args.duration
  const delay = args.delay || 0

  const interval = duration / 6

  const scale = sample(MAJOR_SCALE)

  return (extraDelay=0) => {
    const { smoothFreq, smoothGain } = createSource()
    const { smoothFreq: smoothFreq2, smoothGain: smoothGain2 } = createSource()
    const timeUntilNextNote = ((1 - (getLoopsAtTime(Date.now(), delay, duration) % 1)) % (1/6)) * duration

    let int
    setTimeout(() => {
      int = setRunInterval((i) => {

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
      clearInterval(int)
      smoothGain(0, 0.03)
      smoothGain2(0, 0.03)
    }
  }
}




function climbSound(args) {
  const baseFreq = sample(HEXATONIC_SCALE) * BASE_FREQ * 1.5

  const duration = args.duration
  const delay = args.delay || 0


  const interval = duration / 4


  return (extraDelay=0) => {
    const { smoothFreq, smoothGain } = createSource()
    const timeUntilNextNote = ((1 - (getLoopsAtTime(Date.now(), delay, duration) % 1)) % (1/4)) * duration

    let int
    setTimeout(() => {
      int = setRunInterval((i) => {
        smoothGain(MAX_VOLUME)

        const ix = args.duration === 1 ? i%4 : 3 - i%4
        smoothFreq(baseFreq * HEXATONIC_SCALE[ix])

        setTimeout(() => smoothGain(0, 0.05), interval*0.75 + extraDelay)
      }, duration/4)

    }, timeUntilNextNote + extraDelay*4)

    return () => {
      clearInterval(int)
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
    const { smoothFreq, smoothGain, smoothPanner, panner } = createSource()
    const timeUntilNextQuarter = ((1 - (getLoopsAtTime(Date.now(), delay, duration) % 1)) % 0.25) * duration

    smoothGain(MAX_VOLUME)
    smoothFreq(getFreqAtTime(Date.now() + timeUntilNextQuarter), timeUntilNextQuarter/1000)

    setTimeout(() => {
      setRunInterval(i => {
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

    return () => smoothGain(0, 0.04)
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

    setTimeout(() => {
      setRunInterval(i => {
        src1.smoothFreq(getFreqAtTime(Date.now() + extraDelay, i), introTimeMs/1000)
        src2.smoothFreq(getFreqAtTime(Date.now() + extraDelay, i)*1.3333, introTimeMs/1000)
        src3.smoothFreq(getFreqAtTime(Date.now() + extraDelay, i)*1.6666, introTimeMs/1000)
      }, duration/2)
    }, timeUntilNextHalf)

    return () => {
      src1.smoothGain(0, 0.04)
      src2.smoothGain(0, 0.04)
      src3.smoothGain(0, 0.04)
    }
  }
}






let voices;
const getVoices = () => {
  try {
    voices = window.speechSynthesis.getVoices()
    setTimeout(() => {
      if (!voices.length) getVoices()
    }, 200)
  } catch(e) {
    console.log(e)
  }
}
getVoices()

let utteranceQueue = []
let utterancePriority = null



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
    txt = utteranceQueue.splice(ix, 1)[0] || ''
  }

  if (franticVoice) txt.pitch = sample(MAJOR_SCALE)

  window.speechSynthesis.speak(txt)

  txt.onend = () => {
    if (utteranceQueue.length) triggerUtterance()
  }
}


const stopUtter = txt => {
  utteranceQueue = utteranceQueue.filter(u => u.text !== txt.toLowerCase())
  utterancePriority = null
}

const utter = (txt, t=1, i=7) => {
  try {
    let a = new window.SpeechSynthesisUtterance(txt.toLowerCase())
    a.voice = voices[0]
    const startingQueue = utteranceQueue.length
    times(t, () => {
      utteranceQueue.push(a)
    })
    utterancePriority = a
    if (!startingQueue) triggerUtterance()
  } catch (b) {

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
    ${(() => {
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

    })()}
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
    100% {transform: scale(0%) rotate(70deg)}
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
    return msgAnimation(
      $.span(
        child,
        { style: `margin-left: ${(isEmoji || j > 0) ? 0.2 : 1}em; font-size: ${isEmoji ? 0.9 : 1}em;` }
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

// const wave = (grandChild, args={}) => {
//   const delay = args.delay || 0

//   return dance(updown(grandChild, { style: `font-size: 10vmin`, delay: 200 + delay }), args)
// }


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


const doubleSpin = (grandChild, args={}) => {
  const shadow = spin(grandChild.cloneNode(true), {
    ...args,
    style: `position: absolute; opacity: 0.5`,
    delay: args.delay + args.duration*0.15,
  })
  return [
    shadow,
    spin(grandChild, args)
  ]
}


const withTrails = (grandChild, args={}) => {
  const shadows = 5
  return times(shadows, t => {
    const shadow = grandChild.cloneNode(true)
    if (t < shadows-1) $(shadow, 'position', 'absolute')
    $(shadow, 'opacity', 1/shadows + t/shadows )
    $(shadow, 'animation-delay', `${-args.delay + args.duration * 0.025 * (shadows-t)}ms`)
    $(shadow, 'text-shadow', `0 0 0.${0.25/shadows * (shadows-t)}em`)
    return shadow
  })
}



const bgAnimation = (className, rSpan, cSpan, args={}) => $.div([], {
    class: className,
    style: `
      border: 1vmin ${borderStyle()};
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

function spinningBgMultiple(rSpan, cSpan) {
  const direction = prb(0.5) ? 1 : -1
  const duration = rnd(750, 3000)
  return times(2, i => bgAnimation('spinningBorder',rSpan, cSpan, {
    delay: i * 500,
    duration,
    direction
  }))
}

function shrinkingSpinningBgMultiple(rSpan, cSpan) {
  const direction = prb(0.5) ? 1 : -1
  const duration = rnd(750, 3000)
  return times(4, i => bgAnimation('shrinkingSpinningBorder',rSpan, cSpan, {
    delay: i * 500,
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
    style: `
      transform: scale(${0.95 - i/squares});
    `
  }))
}

const bgAnimationFn = sample([
  colorShiftingBgMultiple,
  staticBgsMultiple,
  shrinkingBgSingle,
  shrinkingBgMultiple,
  // spinningBgMultiple,
  shrinkingSpinningBgMultiple,
])

function withBgAnimation(child, rSpan, cSpan) {
  const aspectRatio = cSpan / rSpan
  const invalidAspectRatio = aspectRatio > 3 || aspectRatio < 0.3333

  if (bgAnimationFn !== colorShiftingBgMultiple && invalidAspectRatio) return child

  return [
    ...(
      prb(bgAnimationPrb)
        ? bgAnimationFn(rSpan, cSpan)
        : []
    ),
    child
  ]

}



function genericCharacterComponent(name, durMin, durMax) {
  return (children, args={}) => {
    const splitAnimation = txt => {
      const duration = args.duration ? map(args.duration, 750, 5000, durMin, durMax) : rnd(durMin, durMax)
      const split = txt.split('')

      return split.map((c, i) => $.span(c, {
        class: name,
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
          style: `
            display: inline-block;
            margin-left: 0.25em;
            margin-right: 0.25em;
          `
        }
      )
    ), { style: `display: inline-block;` })
  }
}


const updownChars = genericCharacterComponent('updownChars', 100, 500)
const shrinkChars = genericCharacterComponent('growShrinkShort', 100, 300)
const blinkChars = genericCharacterComponent('blink', 50, 200)




css(`
  .text {
    font-size: 1em;
  }

  .emoji {
    margin-right: 0.3em;
    font-size: ${USE_EMOJI_POLYFILL ? 0.8 : 0.9}em;
  }

  .animationContainer .emoji,
  .animationGridContainer .emoji
  {
    margin-right: 0;
  }

  .emojiPolyfill {
    width: 1em;
    height: 1em;
    transform: translateY(7%);
  }

`)

const wordExt = (txt, className) => $.span(txt, { class: className })

const word = txt => wordExt(txt, 'text content')

const emoji = e => wordExt(e, 'emoji content')

const emojis = es => es.split(' ').map(emoji)

const elementIsEmoji = elem => {
  if (Array.isArray(elem)) return false
  return (
    elem.getElementsByClassName('emoji').length
    || elem.className.includes('emoji')
  )
}

let emojiOverride, textOverride

try {
  emojiOverride = queryParams?.emojis?.split(',').map(decodeURI).map(emoji)
  textOverride = queryParams?.text?.split(',').map(decodeURI)
  if (textOverride || emojiOverride) console.log(textOverride, emojiOverride)
} catch (e) {}



const money1 = emojis(`💸 💰 💎 👑 💍 🪙`)
const money2 = emojis(`🤑 💷 💴 💵 💶 💲 💸 💰`)
const moneyFull = [...emojis(`💹 📈 💯`), ...money1, ...money2]
const fruit1 = emojis(`🍒 🍉 🍇 🍋 🍯`)
const fruit2 = emojis(`🍆 🍑 🌶`)
const booze = emojis(`🍻 🍾 🥂`)
const hot = emojis(`🌶 🔥 ❤️‍🔥 🌋`)
const lucky = [...emojis(`🍀 🎰 🔔 🚨 🎁 🥇 🌟 ❓`), ...fruit1, ...money1]
const drugs = [...emojis(`🎄 🍄 ❄️ 😵‍💫`), ...booze]
const party = [...emojis(`🎉 🕺 💃 🎊 🥳 🎈`), ...booze]
const energy = emojis(`💫 🔥 🚀 ⚡️ ✨`)
const explosion1 = emojis(`💥 🤯 🧨 💣`)
const explosionFull = [...explosion1, ...energy, ...emojis(`🌋 ☄️`)]
const sexy = [...emojis(`🦄 🌈 💋 💦 😍 ❤️‍🔥 ❤️`), ...fruit2]
const yummy = [...emojis(`🍬 🍭 🎂 🍫 🍦 🍄`), ...fruit1, ...fruit2]
const usa = emojis(`🏎 🇺🇸 ★`)
const relaxing = emojis(`🏖 🏄‍♂️`)
const funny = emojis(`🐄 🤡 💩 😂`)
const symbols = emojis(`★ → ←`)
const lunar = emojis(`🌜 🌛 🌝 🌞 🌎 🌟`, ...energy)
const colorful = [...emojis(`🍭 🎨 🌈 🦄 🎉`), ...fruit1]
const loud = [...emojis(`‼️ ❗️ 🔊`), ...explosion1]
const computer = [sample(emojis(`👨‍💻 🧑‍💻 👩‍💻`)), ...emojis(`🕸 👁 👁‍🗨 🌎`)]
// const maybe = emojis(`🔟 📛`)
const commonEmojis = emojis(`💸 🤑 🔥 😂 💥`)
const excitingMisc = emojis(`🙌 🤩 ‼️ 🏃 😃`)
const misc = emojis(`💪 ⚠️ 🐂 🤲 🐐`)

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
  relaxing,
  funny,
  symbols,
  lunar,
  colorful,
  loud,
  computer,
  excitingMisc,
  commonEmojis,
  // misc,
  // maybe,
]

const emojiList = [...emojiLists, misc].flat().map(e => e.innerHTML)


const withEmoji = (txt, possibleEmojis, emojiProb=1) => !hasEmoji(txt) && prb(emojiProb)
  ? $.span([
    txt,
    $.span(sample(possibleEmojis), {style: 'margin-left: 0.5em'})
  ])
  : txt

const withEmojiLazy = (possibleEmojis, emojiProb) => txt => withEmoji(txt, possibleEmojis, emojiProb)


/*
  boost, frenzy, multiplier, infinite, joy, certified, passion

   */

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
  'SENSATIONAL'
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
  'TREASURE TROVE'
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
  'PASSION'
]

const gains = [
  'THROBBING GAINS',
  'MASSIVE GAINS',
  'WHOPPING GAINS',
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
  `DON'T WAIT`
]
const hotText = [
  'TOO HOT TO HANDLE',
  'SO HOT',
  'HOT STUFF',
  'SIZZLING',
  'HOTTEST ART AROUND',
  'ELECTRIC',
  'ECSTACY',
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
  'DOPAMINE RUSH'
]

const funText = [
  'FUN',
  'LOL',
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
  '100%'
]

const disclaimer = [
  `WHAT YOU SEE IS WHAT YOU GET`,
  'NFA',
  'NOT FINANCIAL ADVICE',
  'WARNING',
  'DANGER ZONE',
  'DO YOUR OWN RESEARCH',
  'DYOR',
  'ALL NATURAL',
  'SAFE + SECURE',
  `BY USING THIS WEBSITE YOU AGREE TO IT'S TERMS OF SERVICE`,
  `PAST PERFORMANCE DOES NOT GUARANTEE FUTURE RESULTS`,
]

const affirmations = [
  `THIS IS GOING TO BE HUGE`,
  `OPPORTUNITY OF A LIFETIME`,
  `YOU WON'T BELIEVE THIS!`,
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
  'CHAMPION',
  'GREATEST OF ALL TIME'
]


const textLists = [
  luckyText,
  dealsText,
  cashText,
  sexyText,
  gains,
  fomo,
  hotText,
  excitingText,
  funText,
  crypto,
  disclaimer,
  affirmations,
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
    'JUICY': fruit1,
    'ALL NATURAL': fruit1,
    'PURE ENERGY': energy,
    [`RUN, DON'T WALK`]: emojis(`🏃`),
    'MIND = BLOWN': emojis(`🤯`),
    '100%': emojis(`💯`),
    'GREATEST OF ALL TIME': emojis(`🐐`)
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
  ]
}



function chooseEmojiForText(txt, selectionPrb=0.1) {
  if (prb(selectionPrb) && emojiTextRelationships.single[txt]) {
    return sample(emojiOverride || emojiTextRelationships.single[txt])
  } else {
    sample([])
  }

  for (let [texts, emojis] of emojiTextRelationships.group) {
    if (texts.includes(txt)) {
      const e = sample(emojiOverride || emojis)
      return prb(selectionPrb) ? e : undefined
    }
  }
}






function sampleContent() {
  const showEmojis = (prb(0.3) && _content.emojis.length) || !_content.text.length
  const e = sample(_content.emojis)

  const mainContent = showEmojis ? e : sample(_content.text)
  let replacementContent = showEmojis ? e : sample((textOverride||[]).map(c => word(c)))
  if (!textOverride) {
    replacementContent = mainContent
  }


  return [mainContent, replacementContent]
}

function chooseContent() {
  const contentSample = { text: [], emojis: [] }
  const content = { text: [], emojis: [] }

  const sections = chance(
    [35, 1],
    [30, 2],
    [25, 3],
    [10, 0] // everything
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

  content.text = content.text.flat().map(c => word(c + (prb(0.25) ? '!' : '')))
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

  .animationGridContainer {
    line-height: 1;
  }
`)

function createSound(animation, params, isGrid, extraDelay=0) {
  let fn

  if (animation === spin) {
    fn = smoothSound

  } else if ([vPivot, hPivot, dance, updownLong, growShrink, breathe].includes(animation)) {
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

  } else if ([hSiren, vSiren, wave].includes(animation)) {
    fn = sirenSound

  } else if ([hFlip, vFlip].includes(animation)) {
    fn = flipSound

  } else if (blinkChars === animation) {
    fn = blinkCharSound

  } else if (blink === animation) {
    fn = isGrid ? blinkCharSound : ticktockSound

  } else if ([shrinkChars, updownChars].includes(animation)) {
    fn = shrinkCharSound

  } else if (animation === hexagon) {
    fn = prb(0.5) ? hexSound : sirenSound

  } else if (animation === climb) {
    fn = climbSound
  }

  return fn({ ...params, delay: params.delay + extraDelay })

}

let sectionCount = 0
function sectionContainer(child, rSpan, cSpan, h, txtH, onclick) {
  const bwc = prb(0.5) ? { bg: '#000', text: '#fff' } : { bg: '#fff', text: '#000' }
  const txtColor = bw ? bwc.text : getColorFromHue(txtH)
  const bgColor = bw ? bwc.bg : getBgColor(h)


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
    colorBlink
  ].filter(iden).join(' ')

  const container = $.div(
    withBgAnimation(child, rSpan, cSpan),
    {
      class: classes,
      style: `
        border-style: ${borderStyle()};
        ${showBorder ? `border-width: ${borderWidth}vmin; box-sizing: border-box;` : 'border-width: 0;'}
        grid-column: span ${cSpan};
        grid-row: span ${rSpan};
        background: ${(hideBg ? 'none' : bgColor)};
        color: ${txtColor};
        ${fontStyle};
        transform: ${rotation};
        animation-delay: -${rnd(5)}s;
        animation-direction: ${rotateColor ? 'normal' : sectionAnimationDirection()};
        animation-duration: ${rotateColor ? '25' : sectionAnimationDuration()}s;
      `
    }
  )

  let isFullScreen
  const canFullScreen = prb(0.01)
  container.onclick = () => {
    onclick()

    try {
      if (canFullScreen) {
        const method = isFullScreen ? 'remove' : 'add'
        container.classList[method]('fullScreen')
        console.log(isFullScreen, container.classList)
        isFullScreen = !isFullScreen
      }

      const childContent = child.getElementsByClassName('content')[0].innerHTML
      if (childContent.includes('FAST CASH')) window.open('http://fastcashmoneyplus.biz', '_blank')
    } catch (e) {}
  }

  sectionCount++

  return container
}










function marqueeContainter(rSpan, cSpan) {
  let [child, replacementChild] = sampleContent()
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

  const r = rnd(750, 1500)
  const d = map(sideways ? cSpan/cols : rSpan/rows, 0, 1, 0.5, 20)
  const duration = rnd(d, 100) * slow * speed
  const delay = duration/5 + rnd(duration/5)

  const showLeftRight = cSpan/rSpan >= 6 && prb(0.1)
  const showTrails = showLeftRight && prb(0.5)


  const isEmoji = elementIsEmoji(child)
  const clonedNode = $.span(child.cloneNode(true), {
    class: isEmoji ? 'emojiShadow' : '',
    style: getShadow(txtH, !isEmoji),
    'data-h': txtH,
  })

  const childWithPairedEmoji = pairedEmoji
    ? [
      clonedNode,
      $.span(pairedEmoji, {
        class: 'emojiShadow',
        style: `margin-left: 1em; ${getShadow(txtH, false)}`,
        'data-h': txtH,
      })
    ]
    : clonedNode

  const childEl = showLeftRight
    ? leftRight(childWithPairedEmoji, {
        style: `font-size: ${height};`,
        duration: r * slow * speed,
        delay,
        showTrails
      })
    : marquee(childWithPairedEmoji, {
        style: `
          font-size: ${sideways ? width : height};
        `,
        direction: posOrNeg(),
        delay,
        duration,
        sideways,
        msgAnimation
      })

  const params = { duration: r * slow * speed / 2, delay, showTrails }
  const playSound = zoomSound({ ...params, switchChannels: true })

  let stopSound = []
  const ignoreStop = prb(0.1)

  let talkingActive = false

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
          ? zoomSound({ ...params, switchChannels: true })(20)
          : playSound(20)
        if (!ignoreStop) stopSound.push(sound2)
      }

    } else {
      if (talkingActive) {
        stopUtter(child.innerHTML)
        talkingActive = false
      } else {
        utter(child.innerHTML, 30, 7)
        talkingActive = true
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






function animationContainer(rSpan, cSpan) {
  let [child, replacementChild] = sampleContent()
  if (textOverride) child = replacementChild

  const height = `calc(${100*rSpan/rows}vh)`
  const width = `calc(${100*cSpan/cols}vw)`
  const h = chooseHue()
  const txtH = chooseAltHue(h)

  const ignoreCharAnimation = [...emojiList, '<<<<', '>>>>'].includes(child.innerHTML.replace('!', ''))

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
    prb(0.5) && breathe,
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
      'data-h': h,
      style: `
        height: ${100*rSpan/rows}vh;
        font-size: ${fontSize};
        ${getShadow(h, !ignoreCharAnimation)}
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
    // createSound(animation, primaryAnimationParams)
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

function animationGridContainer(rSpan, cSpan) {
  const child = sample(_content.emojis)

  if (!child) return animationContainer(rSpan, cSpan)

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
      'data-h': h,
      style: `
        font-size: ${100*min(rSpan/(r*rows), cSpan/(c*cols*1.2))}vmin;
        height: ${100*rSpan/rows}vh;
        width: ${100*cSpan/cols}vw;
        display: grid;
        align-items: center;
        justify-items: center;
        grid-template-rows: repeat(${r}, 1fr);
        grid-template-columns: repeat(${c}, 1fr);
        ${getShadow(h, false)}
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







/*

LAYOUTS
  - anything goes
      const colMin = 1
      const rowMin = 1
      const colMax = colCells
      const rowMax = rowCells

  - anything goes (lean big)
      const colMin = 12

      const rowMin = chance(
        [1, sample([24, 48])],
        [3, sample([6, 8, 12, 16])],
        [5, sample([2, 3, 4])],
        [1, 1],
      )

  - scrunched up
      const getSpan = (minCells, cellsLeft, maxCells) => {
        const span = rndint(min(minCells, cellsLeft), cellsLeft)
        return (cellsLeft - span < minCells) ? cellsLeft : span
      }

  - even rows

  - even cols
    (still have some non-sideways marquees)

  - perfect grid

  - imperfect grid
      const colMin = 1
      const rowMin = 1
      const colMax = int(colCells/6)
      const rowMax = int(rowCells/6)



*/



function flexSection(rowCells, colCells) {

  const cells = {}
  times(rowCells, r => cells[r] = [])

  const marquees = []

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
    const rSize = sample([1, 2, 3, 4, 6, 8, 12, 16, 24])
    rowMin = rSize
    rowMax = rSize

    colMin = 12
    colMax = colCells

  } else if (layoutStyle === 6) {
    const cSize = sample([2, 3, 4, 6, 10, 15])
    colMin = cSize
    colMax = cSize

    rowMin = prb(0.5) ? 16 : rowCells
    rowMax = rowCells

  } else if (layoutStyle === 7) {
    const cellSize = sample([3, 4, 6, 12, 16])
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
    if (
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


    marquees.push(
      aspectRatio < 1.25 && aspectRatio > 0.8 ?
        prb(0.25) ? animationContainer(rSpan, cSpan) : animationGridContainer(rSpan, cSpan) :

      aspectRatio < 2 && aspectRatio > 0.5 && prb(0.5) ?
        animationContainer(rSpan, cSpan) :

      marqueeContainter(rSpan, cSpan)
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
    marquees,
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

  const usedContent = Array.from(
    new Set(
      Array.from(main.getElementsByClassName('content')).map(e => e.innerHTML)
    )
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
  features['Font Weight'] = fontWeight

  return features
}
