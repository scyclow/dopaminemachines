let __randomSeed = parseInt(tokenData.hash.slice(50, 58), 16)

function rnd(mn, mx) {
  __randomSeed ^= __randomSeed << 13
  __randomSeed ^= __randomSeed >> 17
  __randomSeed ^= __randomSeed << 5
  const out = (((__randomSeed < 0) ? ~__randomSeed + 1 : __randomSeed) % 1000) / 1000
  if (mx != null) return mn + out * (mx - mn)
  else if (mn != null) return out * mn
  else return out
}

const rndint = (mn, mx) => parseInt(rnd(mn, mx))
const prb = x => rnd() < x
const posOrNeg = () => prb(0.5) ? 1 : -1
const sample = (a) => a[Math.floor(rnd(a.length))]
const iden = x => x

function chance(...chances) {
  const total = chances.reduce((t, c) => t + c[0], 0)
  const seed = rnd()
  let sum = 0
  for (let i = 0; i < chances.length; i++) {
    sum += chances[i][0] / total
    if (seed <= sum) return chances[i][1]
  }
}

function times(t, fn) {
  const out = []
  for (let i = 0; i < t; i++) out.push(fn(i))
  return out
}



// function getXYRotation (deg, radius, cx=0, cy=0) {
//   return [
//     Math.sin(deg) * radius + cx,
//     Math.cos(deg) * radius + cy,
//   ]
// }



// const resetRandomSeed = () => { __randomSeed = parseInt(tokenData.hash.slice(50, 58), 16) }


// const rnd2 = (mn, mx) => {
//   const out = Math.random()
//   if (mx != null) return mn + out * (mx - mn)
//   else if (mn != null) return out * mn
//   else return out
// }



// function hshrnd(h) {
//   const str = tokenData.hash.slice(2 + h*2, 4 + h*2)
//   return parseInt(str, 16) / 255
// }


// const exists = x => !!x
// const last = a => a[a.length-1]
