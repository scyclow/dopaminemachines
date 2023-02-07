function triggerSound() {
  const startingFreq = rnd(1000, 3000)
  const soundDuration = rnd(750, 1500)

  const vMin = rnd(5, 450)
  const vMax = vMin + rnd(5, 450)
  const v1 = rnd(vMin, vMax)
  const v2 = rnd(vMin, vMax)
  const v3 = rnd(vMin, vMax)

  const t1 = rnd(0.5, 1)
  const t2 = rnd(0.5, 1)
  const t3 = rnd(0.5, 1)

  const dur2 = rnd(0.1, 0.5)
  const dur3 = rnd(0.5, 1)

  const durOffset = prb(0.25) ? rnd : () => 1


  const smoothTo = (obj, ctx) => (value, timeInSeconds) => {
    obj.exponentialRampToValueAtTime(value, ctx.currentTime + timeInSeconds)
  }
  function createSource(freq = 500, volume = 0.04) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const ctx = new AudioContext();

    const source = ctx.createOscillator();
    const gain = ctx.createGain();

    source.connect(gain)
    gain.connect(ctx.destination)

    gain.gain.value = volume
    source.type = 'square'
    source.frequency.value = startingFreq
    source.start()

    return { source, gain, ctx };
  }

  const MAX_VOLUME = 0.01;
  const { source: source1, gain: gain1, ctx: ctx1 } = createSource(1, 0.00000001)
  const { source: source2, gain: gain2, ctx: ctx2 } = createSource(1, 0.00000001)
  const { source: source3, gain: gain3, ctx: ctx3 } = createSource(1, 0.00000001)

  // function triggerOscillator() {
  //   const v = rnd(vMin, vMax)
  //   const t = rnd(0.5, 1)
  //   const dur = rnd(0.1, 0.5)


  //   const { source, gain, ctx } = createSource(0, 0.00000001)

  //   const smoothGain = smoothTo(gain.gain, ctx)
  //   const smoothFreq = smoothTo(source.frequency, ctx)
  //   smoothGain(MAX_VOLUME, 0.15)
  //   const setFreq = () => {
  //     smoothFreq(source.frequency.value * 2 || startingFreq, rnd(0.1, 0.3))
  //     setTimeout(() => smoothFreq(v, t))
  //   }

  //   setTimeout(() => {
  //     setFreq()
  //     setInterval(setFreq, soundDuration)
  //   }, soundDuration * dur)
  // }

  // times(rndint(1, 5), triggerOscillator)

  const smoothGain1 = smoothTo(gain1.gain, ctx1)
  const smoothFreq1 = smoothTo(source1.frequency, ctx1)

  const smoothGain2 = smoothTo(gain2.gain, ctx2)
  const smoothFreq2 = smoothTo(source2.frequency, ctx2)

  const smoothGain3 = smoothTo(gain3.gain, ctx3)
  const smoothFreq3 = smoothTo(source3.frequency, ctx3)

  smoothGain1(MAX_VOLUME, 0.15)
  smoothGain2(MAX_VOLUME, 0.15)
  smoothGain3(MAX_VOLUME, 0.15)


  const setFreq1 = () => {
    smoothFreq1(source3.frequency.value * 2 || startingFreq, rnd(0.1, 0.3))
    setTimeout(() => smoothFreq1(v1, t1))
  }

  const setFreq2 = () => {
    smoothFreq2(source1.frequency.value * 2 || startingFreq, rnd(0.1, 0.3))
    setTimeout(() => smoothFreq2(v2, t2))
  }

  const setFreq3 = () => {
    smoothFreq3(source2.frequency.value * 2 || startingFreq, rnd(0.1, 0.3))
    setTimeout(() => smoothFreq3(v3, t3))
  }




  setFreq1()
  setInterval(setFreq1, soundDuration * durOffset())

  setTimeout(() => {
    setFreq2()
    setInterval(setFreq2, soundDuration * durOffset())
  }, soundDuration * dur2)

  setTimeout(() => {
    setFreq3()
    setInterval(setFreq3, soundDuration * durOffset())
  }, soundDuration * dur3)
}

for (let ch of document.getElementsByClassName('clickhere')) {
  ch.onclick = () => {triggerSound()}
}