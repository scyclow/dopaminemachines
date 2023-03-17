// const divisor = window.innerHeight/window.innerWidth > 1.5
//   ? 3
//   : 1

// const cols = int(60/divisor)
const cols = 60
const rows = 48



const sidewaysPrb = prb(0.4) ? 0 : rnd(0.5, 1)

const speed = prb(0.05) ? 100 : 3
const sat = 100
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

const sectionAnimation = chance(
  [5, 'borderBlink'],
  [2, 'blink'],
  [1, 'rotate'],
  [2, 'updown'],
  [90, ''],
)

const animationDirection = chance(
  [1, () => 'normal'],
  [1, () => 'reverse'],
  [1, () => prb(0.5) ? 'normal' : 'reverse'],
)

const animationDuration = chance(
  [1, () => sectionAnimation === 'blink' ? 3 : 5],
  [1, () => sectionAnimation === 'blink' ? 1.5 : 2],
  [1, () => sectionAnimation === 'blink' ? rnd(0.5, 5) : rnd(0.25, 20)],
)


const marqueeAnimationRate = chance(
  [85, 0],
  [20, rnd(.25, .5)],
  [5, 1],
)

const borderStyle = chance(
  [1, () => 'solid'],
  [1, () => 'dashed'],
  [1, () => 'dotted'],
  [1, () => 'double'],
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

const showBorder = prb(0.25)
const rotateColor = rows < 11 && prb(0.05)

const deepShadows = prb(0.1)

const showEmojis = prb(0.5)


const getShadowColor = (h, l=50) => `hsl(${h%360}deg, ${sat}%, ${l}%)`
const getShadow = (h) => {
  const shadowColor = shadowType === 8 ? '#fff' : getShadowColor(h+90, 20)

  return (
    [1, 8].includes(shadowType) ? `
        0.025em 0.025em ${shadowColor},
        -0.025em 0.025em ${shadowColor},
        0.025em -0.025em ${shadowColor},
        -0.025em -0.025em ${shadowColor},
        0.025em 0 ${shadowColor},
        -0.025em 0 ${shadowColor},
        0 -0.025em ${shadowColor},
        0 0.025em ${shadowColor},
        0 0 0.4em ${shadowColor}
    ` :

    shadowType === 2 ?
      `0.05em 0.05em ${shadowColor}` :

    shadowType === 3 ?
      `0.1em 0.1em ${shadowColor}` :

    shadowType === 4 ?
      `0.05em 0.05em ${shadowColor}, 0.1em 0.1em ${getShadowColor(h+270)}` :

    shadowType === 5 ?
      `0 0 0.05em ${shadowColor}` :

    shadowType === 6 ?
      times(4, s => `${s/20 - 0.1}em ${s/20 - 0.1}em ${getShadowColor(h + 180 + s*30)}`).join(', ') :

    shadowType === 7 ?
      `-0.05em -0.05em ${getShadowColor(h+60)}, 0.05em 0.025em ${getShadowColor(h+240)}`

    : '0 0 0.05em #000'
  )
}


const pairedEmojiPrb = chance(
  [2, 0],
  [1, 0.5],
  [1, 1],
)


const lineRotation = chance(
  [90, () => 0],
  [5, () => rnd(20)],
  [4, () => rnd(20, 180)],
  [1, () => 180],
)

const freeFloating = ![0, 180].includes(lineRotation())

const hideBg = freeFloating ? prb(0.5) : false
const threeDRotations = freeFloating && prb(0.02)



const gradientBg = prb(0.2)

const bgType = chance(
  [60, 0],
  [10, 1], // empty
  [20, 2], // radial gradiant
  [5, 3], // zigzag small
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


const franticVoice = prb(0.2)


const randomHue = prb(0.02)

const chooseHue = () => randomHue ? rnd(360) : sH + sample(possibleHues) % 360


const chooseAltHue = (h) => {
  const alt = chooseHue()
  return h === alt ? chooseAltHue(h) : alt
}



const gradientHues = chance(
  [3 - possibleHues.length, possibleHues.slice(1)],
  [1, [30, 330]],
  [1, [60, 300]]
)



// sample([
//   [60, 120, 180],
//   [180],
//   [30, 330],
//   [60, 300],
//   [120, 240],
//   [90, 180, 270],
//   [180, 210, 150],
//   [60, 120, 240, 300],
// ])

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

function getBgColor(h) {
  const bg1 = `hsl(${h}deg, ${sat}%, 50%)`
  const bg2 = `hsl(${h+sample(gradientHues)}deg, ${sat}%, 50%)`

  if (bgType === 1) return 'none;'
  if (bgType === 2) return prb(gradientMix)
    ? `radial-gradient(${bg1}, ${bg2});`
    : `linear-gradient(${rndint(360)}deg, ${bg1}, ${bg2});`
  if (bgType === 3) return zigzagBg(bg1, bg2, 0.25)
  if (bgType === 4) return zigzagBg(bg1, bg2, rnd(8, 16))
  if (bgType === 5) return zigzagBg(bg1, bg2, 1)

  return bg1
}



const conicalBgPrb = chance(
  [8.5, 0],
  [1, 0.2],
  [0.5, 1],
)

const ifAspectRatioLT = (r, amt) => r < amt

function conicalBg(h, rSpan, cSpan) {
  if (!prb(conicalBgPrb) || rSpan < 4) return
  // if (cSpan/rSpan > 20) return

  const aspectRatio = cSpan/rSpan

  const h2 = chooseHue()

  const bwc = prb(0.5) ? { bg: '#000', text: '#fff' } : { bg: '#fff', text: '#000' }
  const c1 = bw ? bwc.text : `hsl(${h}deg, ${sat}%, 50%)`
  let c2 = bw ? bwc.bg : `hsl(${h2}deg, ${sat}%, 50%)`
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
  [bgType !== 1 && 2, `hsl(${chooseHue()}deg, ${sat}%, 50%)`],
  [bgType !== 1 && 1, `#fff`],
  [1, `#000`]
)

css(`
  * {
    font-family: ${fontFamily};
    font-weight: ${fontWeight};
  }

  body {
    background: ${bgColor};
  }
`)