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
const HEXATONIC_SCALE = [1, 1.125, 1.25, 1.5, 1.75, 2]
                        // E G# B E B G#
                        // 1 1.5 1.8877 2 1.8877 1.15
const HEXATONIC_SCALE2 = [1, 1.25, 1.5, 2, 1.5, 1.25]



function sirenSound({ delay, duration }, gainAdj=1, waveType='square', freqAdj=1) {
  const freqMax = freqAdj * sample(MAJOR_SCALE) * BASE_FREQ * 1.5// 500
  const freqMin = freqAdj * freqMax / 3
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

  const { smoothFreq, smoothGain } = createSource(waveType)
  smoothGain(MAX_VOLUME * gainAdj)
  smoothFreq(getFreqAtTime(Date.now() + introTimeMs), 0.25)

  setTimeout(() => {
    const timeUntilNextHalfLoop = (1 - halfLoopsAtTime(Date.now()) % 1) * duration/2
    smoothFreq(getFreqAtTime(Date.now() + timeUntilNextHalfLoop), timeUntilNextHalfLoop/1000)

    setTimeout(() => {
      setRunInterval(() => {
        smoothFreq(getFreqAtTime(Date.now() + duration/2), duration/2000)
      }, duration/2)
    }, timeUntilNextHalfLoop)
  }, introTimeMs)
}


function shrinkCharSound({delay, duration}) {
  sirenSound({duration, delay}, 0.5, 'sine')
  sirenSound({duration, delay: delay + duration*0.25 }, 0.5, 'sine', 0.5)
  sirenSound({duration, delay: delay + duration*0.5 }, 0.5, 'sine', 0.5)
  sirenSound({duration, delay: delay + duration*0.75 }, 0.5, 'sine', 0.5)
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
  smoothFreq(getFreqAtTime(Date.now() + introTimeMs), introTimeMs/1000)

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
  const ix = int(map(duration, 0, 5000, 16, 0))
  const baseFreq = BASE_FREQ * MAJOR_SCALE[ix % 8]
  console.log(baseFreq)
  const { smoothFreq: sF1, smoothGain: sG1 } = createSource()
  sF1(baseFreq)
  sG1(MAX_VOLUME, 0.25)

  const { smoothFreq: sF2, smoothGain: sG2 } = createSource()

  const offset = 1000000 / (duration * baseFreq)
  sF2(baseFreq + offset)
  sG2(MAX_VOLUME, 0.25)
}

function ticktockSound(args) {
  const baseFreq = BASE_FREQ
  const { smoothFreq, smoothGain } = createSource()
  const { smoothFreq: smoothFreq2, smoothGain: smoothGain2 } = createSource()

  const duration = args.duration
  const delay = args.delay || 0

  const getLoopsAtTime = t => (t - (START_TIME - delay)) / duration

  const interval = duration / 2

  const timeUntilNextNote = ((1 - (getLoopsAtTime(Date.now()) % 1)) % (1/2)) * duration
  const scale = sample(MAJOR_SCALE)

  const upScale = sample([1.3333, 1.5, 2])

  setTimeout(() => {
    setRunInterval((i) => {
      smoothGain(MAX_VOLUME, 0.03)
      smoothGain2(MAX_VOLUME, 0.03)

      if (i%2) {
        smoothFreq(baseFreq, 0.1)
        smoothFreq2(baseFreq * upScale, 0.1)

      } else {

        smoothFreq(baseFreq*upScale, 0.1)
        smoothFreq2(baseFreq * upScale**2, 0.1)
      }

      setTimeout(() => smoothGain(0, 0.05), interval*0.25)
      setTimeout(() => smoothGain2(0, 0.05), interval*0.25)

    }, interval)

  }, timeUntilNextNote)
}


function blinkCharSound(args, seq=null) {
  const sequence = sample([0, 1, 2])
  const isSmooth = prb(0.5)

  const baseFreq = sample(MAJOR_SCALE) * BASE_FREQ * 1.5
  const { smoothFreq, smoothGain } = createSource()

  const duration = args.duration ? map(args.duration, 750, 5000, 500, 2000) : rnd(500, 2000)

  const interval = duration / 8

  if (isSmooth) smoothGain(MAX_VOLUME)

  setRunInterval((i) => {
    if (!isSmooth) smoothGain(MAX_VOLUME)

    let ix
    switch (sequence) {
      case 0: ix = i%8; break
      case 1: ix = abs(7 - i%8); break
      case 2: ix = i%14 < 7 ? i%14 : abs(7 - i%7); break
    }

    smoothFreq(baseFreq * MAJOR_SCALE[ix])

    if (!isSmooth) setTimeout(() => smoothGain(0), interval*0.75)
  }, interval)
}

function hexSound(args) {
  const baseFreq = BASE_FREQ
  const { smoothFreq, smoothGain } = createSource()
  const { smoothFreq: smoothFreq2, smoothGain: smoothGain2 } = createSource()

  const duration = args.duration
  const delay = args.delay || 0

  const getLoopsAtTime = t => (t - (START_TIME - delay)) / duration

  const interval = duration / 6

  const timeUntilNextNote = ((1 - (getLoopsAtTime(Date.now()) % 1)) % (1/6)) * duration
  const scale = sample(MAJOR_SCALE)

  setTimeout(() => {
    setRunInterval((i) => {

      smoothFreq(baseFreq * 8)
      smoothFreq2(baseFreq * 8)
      smoothGain(MAX_VOLUME, 0.03)
      smoothGain2(MAX_VOLUME, 0.03)

      smoothFreq(baseFreq/4, 0.25)
      smoothFreq2(baseFreq/4, 0.25)

      setTimeout(() => smoothGain(0, 0.05), interval*0.25)
      setTimeout(() => smoothGain2(0, 0.05), interval*0.25)

    }, interval)

  }, timeUntilNextNote)
}




function climbSound(args) {
  const baseFreq = sample(HEXATONIC_SCALE) * BASE_FREQ * 1.5
  const { smoothFreq, smoothGain } = createSource()

  const duration = args.duration
  const delay = args.delay || 0

  const getLoopsAtTime = t => (t - (START_TIME - delay)) / duration


  const interval = duration / 4

  const timeUntilNextNote = ((1 - (getLoopsAtTime(Date.now()) % 1)) % (1/4)) * duration

  setTimeout(() => {
    setRunInterval((i) => {
      smoothGain(MAX_VOLUME)

      const ix = args.duration === 1 ? i%4 : 3 - i%4
      smoothFreq(baseFreq * HEXATONIC_SCALE[ix])

      setTimeout(() => smoothGain(0, 0.05), interval*0.75)
    }, duration/4)

  }, timeUntilNextNote)
}

function zoomSound({duration, delay}) {
  const freqMax = sample(MAJOR_SCALE) * BASE_FREQ * 4
  const freqMin = freqMax / 16
  const freqDiff = freqMax - freqMin
  const introTimeMs = 250
  const { smoothFreq, smoothGain } = createSource()

  const getLoopsAtTime = t => (t - (START_TIME - delay)) / duration

  const getFreqAtTime = (t) => {
    const loops = getLoopsAtTime(t)
    const loopProgress = loops % 1

    if (loopProgress < 0.25) {
      return freqMin
    } else if (loopProgress < 0.5) {
      return map(loopProgress, 0.25, 0.5, freqMin, freqMax)
    } else {
      return map(loopProgress, 0.5, 1, freqMax, 1)
    }
  }

  smoothGain(MAX_VOLUME)

  const timeUntilNextQuarter = ((1 - (getLoopsAtTime(Date.now()) % 1)) % 0.25) * duration

  smoothFreq(getFreqAtTime(Date.now() + timeUntilNextQuarter), timeUntilNextQuarter/1000)

  setTimeout(() => {
    setRunInterval(i => {
      smoothFreq(getFreqAtTime(Date.now() + duration/4), duration/4000)
    }, duration/4)
  }, timeUntilNextQuarter)
}


function carSirenSound({duration, delay}) {
  const freqMax = sample(MAJOR_SCALE) * BASE_FREQ / 2
  const x = sample(MAJOR_SCALE.slice(1))

  const freqMin = freqMax / x
  const freqDiff = freqMax - freqMin
  const introTimeMs = 250

  const getLoopsAtTime = t => (t - (START_TIME - delay)) / duration

  const getFreqAtTime = t => {
    const loopProgress = getLoopsAtTime(t) % 1
    return (loopProgress < 0.25 || loopProgress > 0.75) ? freqMin : freqMax
  }


  const { smoothFreq, smoothGain } = createSource()

  smoothGain(MAX_VOLUME)

  const timeUntilNextHalf = ((1 - (getLoopsAtTime(Date.now() + introTimeMs) % 1)) % 0.5) * duration

  smoothFreq(getFreqAtTime(Date.now() + timeUntilNextHalf), timeUntilNextHalf/1000)

  setTimeout(() => {
    setRunInterval(i => {
      smoothFreq(getFreqAtTime(Date.now() + introTimeMs, i), introTimeMs/1000)
    }, duration/2)
  }, timeUntilNextHalf)



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


