const divisor = window.innerHeight/window.innerWidth > 1.5
  ? 3
  : 1

const cols = int(60/divisor)
const rows = 48




// const rows = chance(
//   [1, 1],
//   [3, rndint(2, 10)],
//   [3, rndint(10, 25)],
//   [1, rndint(25, 65)],
// )




const sidewaysPrb = prb(0.5) ? 0 : rnd(0.5, 1)

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
  [3, 'borderBlink'],
  [5, 'blink'],
  [1, 'rotate'],
  [2, 'updown'],
  [89, ''],
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
  [10, rnd(.25, .75)],
  [5, 1],
)

const borderStyle = chance(
  [1, () => 'solid'],
  [1, () => 'dashed'],
  [1, () => 'dotted'],
  [1, () => 'double'],
  [1, () => sample(['solid', 'dashed', 'dotted', 'double'])],
)

const shadowType = chance(
  [2, 1],
  [2, 2],
  [2, 3],
  [2, 4],
  [2, 5],
  [1, 6],
  [2, 7],
)

const showBorder = prb(0.25)
const rotateColor = rows < 11 && prb(0.05)

const deepShadows = prb(0.1)


const getShadowColor = (h, l) => `hsl(${h%360}deg, ${sat}%, ${l}%)`
const getShadow = (h) => {
  const shadowColor = getShadowColor(h+90, 20)

  return (
    shadowType === 1 ? `
        0.025em 0.025em ${shadowColor},
        -0.025em 0.025em ${shadowColor},
        0.025em -0.025em ${shadowColor},
        -0.025em -0.025em ${shadowColor},
        0.025em 0 ${shadowColor},
        -0.025em 0 ${shadowColor},
        0 -0.025em ${shadowColor},
        0 0.025em ${shadowColor},
        0 0 0.1em ${shadowColor}
    ` :

    shadowType === 2 ?
      `0.05em 0.05em ${shadowColor}` :

    shadowType === 3 ?
      `0.1em 0.1em ${shadowColor}` :

    shadowType === 4 ?
      `0.05em 0.05em ${shadowColor}, 0.1em 0.1em ${getShadowColor(h+270, 50)}` :

    shadowType === 5 ?
      `0 0 0.05em ${shadowColor}` :

    shadowType === 6 ?
      times(4, s => `${s/20 - 0.1}em ${s/20 - 0.1}em ${getShadowColor(h + 180 + s*30, 50)}`).join(', ')


    : '0 0 0'
  )
}



const lineRotation = chance(
  [80, () => 0],
  [5, () => rnd(20)],
  [13, () => rnd(20, 180)],
  [2, () => 180],
)

const freeFloating = ![0, 180].includes(lineRotation())

const hideBg = freeFloating ? prb(0.5) : false
const threeDRotations = freeFloating && prb(0.02)


const bw = prb(0.1)
const sH = rnd(360)

const possibleHues = sample([
  [0, 180],
  [60, 120, 240, 300],
  [0, 120, 150],
  [0, 120, 240],
  [0, 150, 210],
  [0, 150, 180, 210],
  [0, 75],
])

const randomHue = prb(0.05)

const chooseHue = () => randomHue ? rnd(360) : sH + sample(possibleHues) % 360


const chooseAltHue = (h) => {
  const alt = chooseHue()
  return h === alt ? chooseAltHue(h) : alt
}

const gradientBg = prb(0.2)

function getBgColor(h) {
  const bg1 = `hsl(${h}deg, ${sat}%, 50%)`
  const bg2 = `hsl(${h+sample([60, 120, 180])}deg, ${sat}%, 50%)`

  // return gradientBg ? `linear-gradient(to right, ${bg1} , ${bg2})` : bg1
  return gradientBg ? `radial-gradient(${bg1}, ${bg2});` : bg1
}

const bgColor = sample([`hsl(${chooseHue()}deg, ${sat}%, 50%)`, `#fff`, `#000`])
css(`
  * {
    font-family: ${fontFamily};
    font-weight: ${fontWeight};
  }

  body {
    background: ${bgColor};
  }
`)
