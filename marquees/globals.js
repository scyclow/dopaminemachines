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

const animation = chance(
  [1, 'borderBlink'],
  [1, 'blink'],
  [1, 'rotate'],
  [1, 'updown'],
  [32, ''],
)

const animationDirection = chance(
  [1, () => 'normal'],
  [1, () => 'reverse'],
  [1, () => prb(0.5) ? 'normal' : 'reverse'],
)

const animationDuration = chance(
  [1, () => animation === 'blink' ? 3 : 5],
  [1, () => animation === 'blink' ? 1.5 : 2],
  [1, () => animation === 'blink' ? rnd(0.5, 5) : rnd(0.25, 20)],
)

const borderStyle = chance(
  [1, () => 'solid'],
  [1, () => 'dashed'],
  [1, () => 'dotted'],
  [1, () => 'double'],
  [1, () => sample(['solid', 'dashed', 'dotted', 'double'])],
)

const shadowType = chance(
  [1, 1],
  [1, 2],
  [1, 3],
  [1, 4],
  [1, 5],
  [1, 6],
)

const showBorder = prb(0.1)
const rotateColor = rows < 11 && prb(0.05)

const deepShadows = prb(0.1)
const gradientBg = prb(0.2)

const lineRotation = chance(
  [80, () => 0],
  [5, () => rnd(20)],
  [13, () => rnd(20, 180)],
  [2, () => 180],
)

const freeFloating = ![0, 180].includes(lineRotation())

const hideBg = freeFloating ? prb(0.5) : false
const threeDRotations = (freeFloating && prb(0.15)) || prb(0.01)


const bw = prb(0.1)
const sH = rnd(360)

const chooseHue = sample([
  () => rnd(360),
  () => sH + sample([0, 180]) % 360,
  () => sH + sample([60, 120, 240, 300]) % 360,
  () => sH + sample([0, 120, 150]) % 360,
  () => sH + sample([0, 120, 240]) % 360,
  () => sH + sample([0, 150, 210]) % 360,
  () => sH + sample([0, 150, 180, 210]) % 360,
  () => sH + sample([0, 75]) % 360,
])

const chooseAltHue = (h) => {
  const alt = chooseHue()
  return h === alt ? chooseAltHue(h) : alt
}


function getBgColor(h) {
  const bg1 = `hsl(${h}deg, ${sat}%, 50%)`
  const bg2 = `hsl(${h+sample([60, 120, 180])}deg, ${sat}%, 50%)`

  return gradientBg ? `linear-gradient(to right, ${bg1} , ${bg2})` : bg1
}

const bgColor = 'none'//sample([`hsl(${chooseHue()}deg, ${sat}%, 50%)`, `#fff`, `#000`])
css(`
  * {
    font-family: ${fontFamily};
    font-weight: ${fontWeight};
  }

  body {
    background: ${bgColor};
  }
`)
