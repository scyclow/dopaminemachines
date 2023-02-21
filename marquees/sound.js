const smoothTo = (obj, ctx) => (value, timeInSeconds=0.00001) => {
  obj.exponentialRampToValueAtTime(value, ctx.currentTime + timeInSeconds)
}

const START_TIME = Date.now()
const MAX_VOLUME = 0.04

function createSource(waveType = 'square') {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  const ctx = new AudioContext();

  const source = ctx.createOscillator();
  const gain = ctx.createGain();

  source.connect(gain)
  gain.connect(ctx.destination)

  gain.gain.value = 0
  source.type = waveType
  source.frequency.value = 3000
  source.start()

  const smoothFreq = (value, timeInSeconds=0.00001) => source.frequency.exponentialRampToValueAtTime(
    value,
    ctx.currentTime + timeInSeconds
  )

  const smoothGain = (value, timeInSeconds=0.00001) => gain.gain.setTargetAtTime(
    min(value, MAX_VOLUME),
    ctx.currentTime,
    timeInSeconds
  )


  return { source, gain, ctx, smoothFreq, smoothGain };
}


function triggerSound() {
  console.log('blah')
  const startingFreq = rnd(1000, 3000)
  const soundDuration = rnd(750, 1500)

  const vMin = rnd(5, 450)
  const vMax = vMin + rnd(5, 450)
  const v1 = rnd(vMin, vMax)
  // const v2 = rnd(vMin, vMax)
  // const v3 = rnd(vMin, vMax)

  const t1 = rnd(0.5, 1)
  // const t2 = rnd(0.5, 1)
  // const t3 = rnd(0.5, 1)

  // const dur2 = rnd(0.1, 0.5)
  // const dur3 = rnd(0.5, 1)

  const durOffset = prb(0.25) ? rnd : () => 1



  const MAX_VOLUME = 0.01;
  const { source: source1, gain: gain1, ctx: ctx1 } = createSource(1, 0.1)


  const smoothGain1 = smoothTo(gain1.gain, ctx1)
  const smoothFreq1 = smoothTo(source1.frequency, ctx1)

  // smoothGain1(MAX_VOLUME, 0.15)

  console.log(gain1.gain)



  const setFreq1 = () => {
    smoothFreq1(source1.frequency.value * 2 || startingFreq, rnd(0.1, 0.3))
    setTimeout(() => smoothFreq1(v1, t1))
  }

  setFreq1()
  setInterval(setFreq1, soundDuration * durOffset())
}



const BASE_FREQ = rnd(250, 500)
const MAJOR_SCALE = [1, 1.125, 1.25, 1.3333, 1.5, 1.6666, 1.875, 2]


function sirenSound({ delay, duration }, gainAdj=1) {
  const freqMax = sample(MAJOR_SCALE) * BASE_FREQ * 1.5// 500
  const freqMin = freqMax / 3
  const freqDiff = freqMax - freqMin
  const introTimeMs = 250
  gainAdj = min(1, gainAdj)

  const halfLoopsAtTime = time => 2 * (time - START_TIME + delay) / duration
  const getDirectionAtTime = time => int(halfLoopsAtTime(time)) % 2 ? 1 : -1

  const getFreqAtTime = time => {

    // return freqMin + (freqMax-freqMin)*Math.sin(time)


    const directionAtTime = getDirectionAtTime(time)
    const halfLoopsLeft = halfLoopsAtTime(time) % 1
    const timeDiff = halfLoopsLeft * freqDiff

    if (directionAtTime === 1) {
      return freqMin + timeDiff
    } else {
      return freqMax - timeDiff
    }
  }

  const { smoothFreq, smoothGain } = createSource()
  smoothGain(MAX_VOLUME * gainAdj)
  smoothFreq(getFreqAtTime(Date.now() + introTimeMs), 0.25)

  setTimeout(() => {
    const timeUntilNextHalfLoop = (1 - halfLoopsAtTime(Date.now()) % 1) * duration/2
    smoothFreq(getFreqAtTime(Date.now() + timeUntilNextHalfLoop), timeUntilNextHalfLoop/1000)

    setTimeout(() => {
      setRunInterval(() => {
        console.log(getFreqAtTime(Date.now() + duration/2))
        smoothFreq(getFreqAtTime(Date.now() + duration/2), duration/2000)
      }, duration/2)
    }, timeUntilNextHalfLoop)
  }, introTimeMs)
}


function shrinkCharSound({delay, duration}) {
  sirenSound({duration, delay}, 0.5)
  sirenSound({duration, delay: delay + duration*0.25 }, 0.5)
  sirenSound({duration, delay: delay + duration*0.5 }, 0.5)
  sirenSound({duration, delay: delay + duration*0.75 }, 0.5)
}

function flipSound({ delay, duration }) {
  const freqMax = sample(MAJOR_SCALE) * BASE_FREQ * 8// 500
  const freqMin = freqMax / 3
  const freqDiff = freqMax - freqMin
  const introTimeMs = 250
  const { smoothFreq, smoothGain } = createSource()

  const getLoopsAtTime = t => (t - (START_TIME - delay)) / duration

  const getFreqAtTime = (t) => {
    const loops = getLoopsAtTime(t)
    const loopProgress = loops % 1

    if (loopProgress < 0.3333) {
      return map(loopProgress, 0, 0.3333, freqMin, BASE_FREQ)
    } else if (loopProgress < 0.6666) {
      return map(loopProgress, 0.3333, 0.6666 , BASE_FREQ, freqMax)
    } else {
      return map(loopProgress, 0.6666, 1, freqMax, freqMin)
    }
  }

  smoothGain(MAX_VOLUME)
  smoothFreq(getFreqAtTime(Date.now() + introTimeMs), introTimeMs/100)

  setTimeout(() => {
    const timeUntilNextThird = ((1 - (getLoopsAtTime(Date.now()) % 1)) % 0.3333) * duration
    smoothFreq(getFreqAtTime(Date.now() + timeUntilNextThird), timeUntilNextThird/1000)

    setTimeout(() => {
      setRunInterval((i) => {
        console.log()
        smoothFreq(getFreqAtTime(Date.now() + duration/3), duration/3000)
      }, duration/3)

    }, timeUntilNextThird)

  }, introTimeMs)
}

function smoothSound({delay, duration}) {
  const baseFreq = map(duration, 0, 5000, 500, 250)
  const { smoothFreq: sF1, smoothGain: sG1 } = createSource()
  sF1(baseFreq)
  sG1(MAX_VOLUME, 0.25)

  const { smoothFreq: sF2, smoothGain: sG2 } = createSource()

  const offset = 1000000 / (duration * baseFreq)
  sF2(baseFreq + offset)
  sG2(MAX_VOLUME, 0.25)
}


function blinkCharSound(args) {
  const sequence = sample([0, 1, 2])
  const isSmooth = prb(0.5)

  const baseFreq = sample(MAJOR_SCALE) * BASE_FREQ * 1.5
  const { smoothFreq, smoothGain } = createSource()

  const duration = args.duration ? map(args.duration, 750, 5000, 500, 2000) : rnd(500, 2000)

  const interval = duration / 8
  const majorScale = [1, 1.125, 1.25, 1.3333, 1.5, 1.6666, 1.875, 2]

  if (isSmooth) smoothGain(MAX_VOLUME)

  setRunInterval((i) => {
    if (!isSmooth) smoothGain(MAX_VOLUME)

    let ix
    switch (sequence) {
      case 0: ix = i%8; break
      case 1: ix = abs(7 - i%8); break
      case 2: ix = i%14 < 7 ? i%14 : abs(7 - i%7); break
    }

    smoothFreq(baseFreq * majorScale[ix])

    if (!isSmooth) setTimeout(() => smoothGain(0), interval*0.75)
  }, interval)
}








let voices;
const getVoices = () => {
  try {
    voices = window.speechSynthesis.getVoices()
    setTimeout(() => {
      if (!voices.length) getVoices()
    }, 200)
  } catch(a) {
    console.log(a)
  }
}
getVoices()

const utteranceQueue = []

setInterval(() => {
  if (utteranceQueue.length) {
  }
}, 500)


const triggerUtterance = () => {
  const ix = rndint(utteranceQueue.length)
  const [txt] = utteranceQueue.splice(ix, 1)

  window.speechSynthesis.speak(txt)

  txt.onend = () => {
    if (utteranceQueue.length) triggerUtterance()
  }
}



const utter = (txt, t=1, i=7) => {
  try {
    let a = new window.SpeechSynthesisUtterance(txt.toLowerCase())
    a.voice = voices[0]
    times(t, () => {
      utteranceQueue.push(a)
    })
    triggerUtterance()
  } catch (b) {

  }
}


