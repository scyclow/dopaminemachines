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





function growShrinkSound({ delay, duration }) {
  const freqMax = 500
  const freqMin = freqMax / 1.2
  const freqDiff = freqMax - freqMin
  const introTimeMs = 250

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

  const { smoothFreq, smoothGain } = createSource()
  smoothGain(MAX_VOLUME)
  smoothFreq(getFreqAtTime(Date.now() + introTimeMs), 0.25)

  setTimeout(() => {
    const timeUntilNextHalfLoop = (1 - halfLoopsAtTime(Date.now()) % 1) * duration/2
    smoothFreq(getFreqAtTime(Date.now() + timeUntilNextHalfLoop), timeUntilNextHalfLoop/1000)

    setTimeout(() => {
      const setFreq = () => {
        console.log(getFreqAtTime(Date.now() + duration/2))
        smoothFreq(getFreqAtTime(Date.now() + duration/2), duration/2000)
      }
      setFreq()
      setInterval(setFreq, duration/2)
    }, timeUntilNextHalfLoop)
  }, introTimeMs)
}

// function flipSound({ delay, duration }) {
//   const freqMax = 500
//   const freqMin = freqMax / 2.5
//   const freqDiff = freqMax - freqMin
//   const introTimeMs = 20

//   const loopsAtTime = time => (time - START_TIME + delay) / duration
//   const thirdLoopsAtTime = time => 3 * (time - START_TIME + delay) / duration

//   const getMagnitudeAtTime = time => {
//     switch (int(thirdLoopsAtTime(time)) % 3) {
//       case 0:
//         return 0.25
//       case 1:
//         return 0.75
//       case 2:
//         return -1
//     }
//   }

//   const getFreqAtTime = time => {
//     const thirdLoopsLeft = thirdLoopsAtTime(time) % 1
//     const timeDiff = thirdLoopsLeft * freqDiff

//     switch (int(thirdLoopsAtTime(time)) % 3) {
//       case 2:
//       console.log(2)
//         return freqMax - timeDiff
//       case 1:
//       console.log(1)
//         return freqMin + timeDiff
//       case 0:
//       console.log(0)
//         return freqMin + timeDiff
//     }
//   }

//   const { smoothFreq, smoothGain } = createSource()
//   smoothGain(MAX_VOLUME)
//   smoothFreq(getFreqAtTime(Date.now() + introTimeMs), introTimeMs/100)

//   setTimeout(() => {
//     const timeUntilNextHalfLoop = (1 - thirdLoopsAtTime(Date.now()) % 1) * duration/3
//     smoothFreq(getFreqAtTime(Date.now() + timeUntilNextHalfLoop), timeUntilNextHalfLoop/1000)

//     setTimeout(() => {
//       const setFreq = () => {
//         smoothFreq(getFreqAtTime(Date.now() + duration/3), duration/3000)
//       }
//       setFreq()
//       setInterval(setFreq, duration/3)
//     }, timeUntilNextHalfLoop)
//   }, introTimeMs)
// }

function smoothSound({delay, duration}) {
  const baseFreq = map(duration/5000, 500, 250)
  const { smoothFreq: sF1, smoothGain: sG1 } = createSource('square')
  sF1(baseFreq)
  sG1(MAX_VOLUME, 0.25)

  const { smoothFreq: sF2, smoothGain: sG2 } = createSource('square')

  const offset = 1000000 / (duration * baseFreq)
  sF2(baseFreq + offset)
  sG2(MAX_VOLUME, 0.25)
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

  console.log(utteranceQueue.length)
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


