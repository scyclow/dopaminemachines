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

