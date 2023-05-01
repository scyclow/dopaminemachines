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
