css(`
  .sectionContainer {
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    user-select: none;
    cursor: pointer;
    transition: 150ms;
    filter: invert(${invertAll ? 1 : 0});
    transition: 250ms;
  }

  .sectionContainer:hover {
    filter: invert(${invertAll ? 0 : 1});
  }

  .sectionContainer:active {
    opacity: 0.5;
  }

  .animationGridContainer {
    line-height: 1;
  }
`)

function createSound(animation, params, isGrid, extraDelay=0) {
  let fn

  if (animation === spin) {
    fn = smoothSound

  } else if ([vPivot, hPivot, dance, updownLong, growShrink, breathe, growShrinkShort].includes(animation)) {
    fn = chance(
      [4, (p) => sirenSound({
        ...p,
        duration: p.duration/2,
      })],
      [4, (p) => zoomSound({
        ...p,
        delay: p.delay + p.duration/4,
        duration: p.duration/2
      })],
      [!isGrid && 2, (p) => carSirenSound(p)],
      [!isGrid && 1, (p) => ticktockSound(p)]
    )

  } else if ([hSiren, vSiren, wave, vSirenShort].includes(animation)) {
    fn = sirenSound

  } else if ([hFlip, vFlip].includes(animation)) {
    fn = flipSound

  } else if (blinkChars === animation) {
    fn = blinkCharSound

  } else if (blink === animation) {
    fn = isGrid ? blinkCharSound : ticktockSound

  } else if ([shrinkChars, updownChars].includes(animation)) {
    fn = shrinkCharSound

  } else if (animation === hexagon) {
    fn = prb(0.5) ? hexSound : sirenSound

  } else if (animation === climb) {
    fn = climbSound

  } else if (animation === iden) {
    fn = singleSound

  } else return


  return fn({ ...params, delay: params.delay + extraDelay || 0 })

}

let sectionCount = 0
function sectionContainer(child, rSpan, cSpan, h, txtH, onclick) {
  const bwc = prb(0.5) ? { bg: '#000', text: '#fff' } : { bg: '#fff', text: '#000' }
  const txtColor = bw ? bwc.text : getColorFromHue(txtH)
  const bgColor = bw ? bwc.bg : getBgColor(h)


  const rotation = threeDRotations
    ? `perspective(500px) rotate3d(1,1,0.5,${lineRotation()}deg)`
    : `rotate(${lineRotation()}deg)`

  const fontStyle = prb(italicRate) ? 'font-style: italic;' : ''

  const borderWidth = min(rSpan, cSpan) * .05
  const rotateColor = prb(rotateColorPrb) ? 'fullColorRotate' : ''
  const colorBlink = prb(colorBlinkPrb) ? 'colorBlink' : ''

  const classes = [
    'sectionContainer',
    starburstBg(h, rSpan, cSpan),
    rotateColor,
    colorBlink,
    sectionAnimation,
  ].filter(iden).join(' ')

  const container = $.div(
    withBgAnimation(child, rSpan, cSpan),
    {
      class: classes,
      style: `
        border-style: ${borderStyle};
        ${showBorder ? `border-width: ${borderWidth}vmin; box-sizing: border-box;` : 'border-width: 0;'}
        grid-column: span ${cSpan};
        grid-row: span ${rSpan};
        background: ${(hideBg ? 'none' : bgColor)};
        color: ${txtColor};
        ${fontStyle};
        transform: ${rotation};
        animation-delay: -${rnd(5)}s;
        animation-direction: ${rotateColor ? 'normal' : sectionAnimationDirection()};
        animation-duration: ${rotateColor ? '25' : sectionAnimationDuration()}s;
      `
    }
  )

  let isFullScreen, notifyingTimeout
  const canFullScreen = prb(0.01)
  const triggersPopup = prb(0.01)
  const triggersNotifications = prb(0.01)
  container.onclick = () => {
    onclick()

    try {
      if (window.navigator) window.navigator.vibrate(50)

      if (canFullScreen) {
        const method = isFullScreen ? 'remove' : 'add'
        container.classList[method]('fullScreen')
        isFullScreen = !isFullScreen
      }

      const childContent = getContent(child)
      console.log('CLICK:',childContent)

      if (triggersNotifications) {
        const setNotification = () => {
          notifyingTimeout = setTimeout(() => {
            new Notification(childContent)
            setNotification()
          }, rndint(100, 10000))
        }

        Notification.requestPermission().then(p => {
          setNotification()
        })

        if (notifyingTimeout) clearTimeout(notifyingTimeout)
      }

      if (navigator.clipboard) navigator.clipboard.writeText(childContent)

      if (childContent.includes('FAST CASH')) window.open('http://fastcashmoneyplus.biz', '_blank')
      if (triggersPopup) setTimeout(() => window.alert(childContent))
    } catch (e) {}
  }

  sectionCount++

  return container
}









let marqueeCount = 0
function marqueeContainter(rSpan, cSpan) {
  marqueeCount++
  let [child, replacementChild] = sampleContent()
  const pairedEmoji = chooseEmojiForText(child.innerHTML, pairedEmojiPrb)

  if (textOverride) child = replacementChild

  const height = `calc(${100*rSpan/rows}vh)`
  const width = `calc(${100*cSpan/cols}vw)`
  const slow = 1 + adjustCharLength(child.innerHTML, pairedEmoji)/9
  const aspectRatio = cSpan / rSpan
  const sideways =
    (prb(thinSidewaysPrb) && aspectRatio < 0.333)
    || (prb(sidewaysPrb) && aspectRatio >= 0.3333 && aspectRatio < 1.2)


  const h = chooseHue()
  const txtH = chooseAltHue(h)

  const canShowAltAnimation = rSpan >= 2 && cSpan/rSpan >= 5
  const msgIsShort = child.innerHTML.length < 8

  const msgAnimation = prb(marqueeAnimationRate) && canShowAltAnimation
    ? chance(
      [1, growShrinkShort],
      [1, vSirenShort],
      [1, blink],
      ...(msgIsShort ? [
        [1, dance],
        [1, spin],
        [1, hSiren],
        [1, hPivot],
        [1, hFlip],
      ] : [])
    )
    : iden

  const r = rnd(750, 1500)
  const d = map(sideways ? cSpan/cols : rSpan/rows, 0, 1, 0.5, 20)
  const duration = rnd(d, 100) * slow * speed
  const delay = duration/5 + rnd(duration/5)

  const showLeftRight = cSpan/rSpan >= 6 && prb(0.1)
  const showTrails = showLeftRight && prb(0.5)


  const isEmoji = elementIsEmoji(child)
  const clonedNode = $.span(child.cloneNode(true), {
    class: isEmoji ? 'emojiShadow' : '',
    style: getShadow(txtH, !isEmoji),
    'data-h': txtH,
  })

  const childWithPairedEmoji = pairedEmoji
    ? [
      clonedNode,
      $.span(pairedEmoji, {
        class: 'emojiShadow',
        style: `margin-left: 1em; ${getShadow(txtH, false)}`,
        'data-h': txtH,
      })
    ]
    : clonedNode

  const zoomParams = { duration: r * slow * speed / 2, delay, showTrails }

  let childEl, playSound
  if (showLeftRight) {
    childEl = leftRight(childWithPairedEmoji, {
      style: `font-size: ${height};`,
      duration: r * slow * speed,
      delay,
      showTrails
    })
    playSound = zoomSound({ ...zoomParams, switchChannels: true })
  } else {
    childEl = marquee(childWithPairedEmoji, {
      style: `font-size: ${sideways ? width : height};`,
      direction: posOrNeg(),
      delay,
      duration,
      sideways,
      msgAnimation
    })
    if (msgAnimation !== iden) playSound = createSound(msgAnimation, { duration: 2000 }, true)
  }

  let stopSound = []
  let talkingActive = false
  const ignoreStop = prb(0.1)

  return sectionContainer(childEl, rSpan, cSpan, h, txtH, () => {
    if (showLeftRight) {
      if (stopSound.length) {
        stopSound.forEach(s => s())
        stopSound = []
        return
      }

      const sound1 = playSound()
      if (!ignoreStop) stopSound.push(sound1)

      if (showTrails) {
        const sound2 = ignoreStop
          ? zoomSound({ ...zoomParams, switchChannels: true })(20)
          : playSound(20)
        if (!ignoreStop) stopSound.push(sound2)
      }

    } else {
      if (talkingActive && !ignoreStop) {
        stopUtter(child.innerHTML)
        talkingActive = false
      } else {
        utter(child.innerHTML, 30, 7)
        talkingActive = true
      }

      if (stopSound.length) {
        stopSound.forEach(s => s())
        stopSound = []
      } else if (playSound) {
        const sound = playSound()
        if (!ignoreStop) stopSound.push(sound)
      }

    }
  })
}






function getFontSize(txt, rSpan, cSpan) {
  const rShare = rSpan/rows
  const cShare = cSpan/cols

  const words = txt.split(' ')
  const longestWord = words.reduce((longest, word) => adjustCharLength(word) > adjustCharLength(longest) ? word : longest, words[0])

  const charCols = adjustCharLength(longestWord)
  const charRows = adjustCharLength(txt)/charCols

  return `calc(min(${rShare/charRows} * 100vh, ${cShare/charCols} * 100vw))`
}




const allPlayingSounds = []

let animationCount = 0
function animationContainer(rSpan, cSpan) {
  animationCount++
  let [child, replacementChild] = sampleContent()
  if (textOverride) child = replacementChild

  const height = `calc(${100*rSpan/rows}vh)`
  const width = `calc(${100*cSpan/cols}vw)`
  const h = chooseHue()
  const txtH = chooseAltHue(h)

  const ignoreCharAnimation = [...emojiList, '<<<<', '>>>>'].includes(child.innerHTML.replace('!', ''))

  const animation = sample([
    dance,
    growShrink,
    spin,
    hSiren,
    vSiren,
    hPivot,
    vPivot,
    vFlip,
    hFlip,
    updownLong,
    climb,
    blink,
    hexagon,
    iden,
    prb(0.5) && breathe,
    !ignoreCharAnimation && updownChars,
    !ignoreCharAnimation && blinkChars,
    !ignoreCharAnimation && shrinkChars,
  ].filter(iden))

  const words = child.innerHTML.split(' ')
  const shortest = words.reduce((shortest, word) => word.length < shortest.length ? word : shortest , words[0])


  const rowSizeMax = 5.5/(child.innerHTML.length)
  const colSizeMax = 7 *(cSpan/(cols*shortest.length))

  const fontSize = getFontSize(child.innerHTML, rSpan, cSpan)

  const secondAnimation = animation === updownLong || prb(0.75)
    ? iden
    : sample([
      dance,
      growShrink,
      spin,
      hSiren,
      vSiren,
      hPivot,
      vPivot,
      vFlip,
      hFlip,
      climb,
    ])

  const primaryAnimationParams = {
    delay: rnd(3500),
    duration: rnd(750, 5000),
    direction: prb(0.5) ? 1 : -1,
    showTrails: prb(0.2)
  }

  const secondaryAnimationParams = {
    delay: rnd(3500),
    duration: rnd(750, 5000),
    showTrails: primaryAnimationParams.showTrails
  }

  const childEl = $.div(
    secondAnimation(
      animation(
        child.cloneNode(true),
        primaryAnimationParams
      ),
      secondaryAnimationParams
    ),
    {
      class: 'animationContainer' + (ignoreCharAnimation ? ' emojiShadow' : ''),
      'data-h': h,
      style: `
        height: ${100*rSpan/rows}vh;
        font-size: ${fontSize};
        ${getShadow(h, !ignoreCharAnimation)}
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
      `,
    }
  )


  let stopSound = []
  const ignoreStop = prb(0.1)
  const playSound = createSound(animation, primaryAnimationParams)
  const playSecondSound = secondAnimation !== iden
    ? createSound(secondAnimation, secondaryAnimationParams)
    : null

  return sectionContainer(childEl, rSpan, cSpan, h, txtH, () => {
    if (stopSound.length) {
      stopSound.forEach(s => s())
      stopSound = []
      return
    }

    const sound1 = playSound()
    if (!ignoreStop) stopSound.push(sound1)

    if (primaryAnimationParams.showTrails && animation !== blinkChars) {
      // createSound(animation, primaryAnimationParams, false, 10)
      const sound2 = ignoreStop
        ? createSound(animation, primaryAnimationParams)(10)
        : playSound(10)
      if (!ignoreStop) stopSound.push(sound2)
    }

    if (playSecondSound) {
      const sound1 = playSecondSound()
      if (!ignoreStop) stopSound.push(sound1)
    }
  })
}












function getEmojiGrid(rSpan, cSpan) {
  const divisor = rndint(1, min(rSpan/2, cSpan/2))
  return [
    max(1, int(rSpan/divisor)),
    max(1, int(cSpan/divisor))
  ]
}

let gridCount = 0
function animationGridContainer(rSpan, cSpan) {
  gridCount++
  const child = sample(_content.emojis)

  if (!child) return animationContainer(rSpan, cSpan)

  const height = `calc(${100*rSpan/rows}vh)`
  const width = `calc(${100*cSpan/cols}vw)`
  const h = chooseHue()
  const txtH = chooseAltHue(h)

  const animation = chance(
    [5, growShrink],
    [4, spin],
    [3, blink],
    [3, vSiren],
    [3, hSiren],
    [3, vFlip],
    [3, hFlip],
    [1, dance],
    [1, wave],
    [1, climb],
  )

  const [r, c] = getEmojiGrid(rSpan, cSpan)

  const duration = rnd(750, 5000)
  const delayFactor = rnd(0.5, 2)

  const childEl = $.div(
    times(r*c, i => animation(
      child.cloneNode(true), {
        delay: (i/(r*c))*duration*delayFactor,
        duration,
      }
    )),
    {
      class: 'animationGridContainer emojiShadow',
      'data-h': h,
      style: `
        font-size: ${100*min(rSpan/(r*rows), cSpan/(c*cols*1.2))}vmin;
        height: ${100*rSpan/rows}vh;
        width: ${100*cSpan/cols}vw;
        display: grid;
        align-items: center;
        justify-items: center;
        grid-template-rows: repeat(${r}, 1fr);
        grid-template-columns: repeat(${c}, 1fr);
        ${getShadow(h, false)}
      `,
    }
  )

  const params = {
    delay: duration*delayFactor,
    duration,
  }

  let stopSound = []
  const ignoreStop = prb(0.1)
  const playSound = createSound(animation, params, true)

  return sectionContainer(childEl, rSpan, cSpan, h, txtH, () => {
    if (stopSound.length) {
      stopSound.forEach(s => s())
      stopSound = []
      return
    }


    const sound1 = playSound()
    if (!ignoreStop) stopSound.push(sound1)

    if (animation !== blink) {
      const sound2 = ignoreStop
        ? createSound(animation, params)(duration/4)
        : playSound(duration/4)
      if (!ignoreStop) stopSound.push(sound2)
    }
  })
}







/*

LAYOUTS
  - anything goes
      const colMin = 1
      const rowMin = 1
      const colMax = colCells
      const rowMax = rowCells

  - anything goes (lean big)
      const colMin = 12

      const rowMin = chance(
        [1, sample([24, 48])],
        [3, sample([6, 8, 12, 16])],
        [5, sample([2, 3, 4])],
        [1, 1],
      )

  - scrunched up
      const getSpan = (minCells, cellsLeft, maxCells) => {
        const span = rndint(min(minCells, cellsLeft), cellsLeft)
        return (cellsLeft - span < minCells) ? cellsLeft : span
      }

  - even rows

  - even cols
    (still have some non-sideways marquees)

  - perfect grid

  - imperfect grid
      const colMin = 1
      const rowMin = 1
      const colMax = int(colCells/6)
      const rowMax = int(rowCells/6)



*/



function flexSection(rowCells, colCells) {

  const cells = {}
  times(rowCells, r => cells[r] = [])

  const marquees = []

  let colMin, colMax, rowMin, rowMax

  if ([1, 2].includes(layoutStyle)) {
    colMin = 1
    rowMin = 1
    colMax = colCells
    rowMax = rowCells

  } else if (layoutStyle === 3) {
    colMin = 1
    rowMin = 1
    colMax = colCells
    rowMax = int(rowCells/8)

  } else if (layoutStyle === 4) {
    if (prb(0.5)) {
      colMin = colCells * (5/12)
      rowMin = rowCells * (5/12)
    } else {
      colMin = colCells
      rowMin = rowCells
    }
    colMax = colCells
    rowMax = rowCells

  } else if (layoutStyle === 5) {
    const rSize = sample([1, 2, 3, 4, 6, 8, 12, 16, 24])
    rowMin = rSize
    rowMax = rSize

    colMin = 12
    colMax = colCells

  } else if (layoutStyle === 6) {
    const cSize = sample([2, 3, 4, 6, 10, 15])
    colMin = cSize
    colMax = cSize

    rowMin = prb(0.5) ? 16 : rowCells
    rowMax = rowCells

  } else if (layoutStyle === 7) {
    const cellSize = sample([3, 4, 6, 12, 16])
    colMin = cellSize
    colMax = cellSize
    rowMin = cellSize
    rowMax = cellSize
  } else if (layoutStyle === 8) {
    colMin = 1
    rowMin = 1
    colMax = int(colCells/6)
    rowMax = int(rowCells/6)
  } else if (layoutStyle === 9) {
    const mn = rndint(1, 7)
    colMin = mn
    rowMin = mn
    colMax = colCells
    rowMax = rowCells
  }


  const findNextFilledCol = (rC, cC) => {
    for (let c = cC; c < colCells; c++) {
      if (cells[rC][c]) return c
    }
    return colCells
  }

  const findNextUnfilledCol = (rC, cC) => {
    for (let c = cC; c < colCells; c++) {
      if (!cells[rC][c]) return c
    }

    return colCells
  }


  const getSpan = (minCells, cellsLeft, maxCells) => {
    const span = rndint(min(minCells, cellsLeft), maxCells)
    return (cellsLeft - span < minCells) ? cellsLeft : span
  }


  const fillSection = (rCursor, cCursor) => {
    let adjRowMax = rowMax
    let adjColMax = colMax
    if (layoutStyle === 1 && !sectionCount) {
      if (prb(0.5)) adjRowMax = rowCells/4
      if (prb(0.5)) adjColMax = colCells/4

    } else if (
      (layoutStyle === 2 && prb(0.9))

    ) {
      if (prb(0.2)) {
        adjColMax = sample([1, 2])
      } else {
        adjRowMax = sample([1, 2])
      }

    } else if (layoutStyle === 9) {
      if (prb(0.3)) {
        adjColMax = rndint(1, 7)
      } else {
        adjRowMax = rndint(1, 7)
      }
    }
    const colsLeft = min(findNextFilledCol(rCursor, cCursor) - cCursor, adjColMax)
    const rowsLeft = max(1, min(rowCells - rCursor, adjRowMax))

    const cSpan = getSpan(colMin, colsLeft, colCells)
    const rSpan = getSpan(rowMin, rowsLeft, rowCells)

    const aspectRatio = cSpan / rSpan


    marquees.push(
      aspectRatio < 1.25 && aspectRatio > 0.8 ?
        prb(0.25) ? animationContainer(rSpan, cSpan) : animationGridContainer(rSpan, cSpan) :

      aspectRatio < 2 && aspectRatio > 0.5 && prb(0.5) ?
        animationContainer(rSpan, cSpan) :

      marqueeContainter(rSpan, cSpan)
    )

    times(rSpan, r =>
      times(cSpan, c =>
        cells[rCursor+r][cCursor+c] = 1
      )
    )

    return { cSpan, rSpan }
  }

  let rCursor = 0

  while (rCursor < rowCells) {
    let cCursor = findNextUnfilledCol(rCursor, 0)

    while (cCursor < colCells) {
      const { cSpan } = fillSection(rCursor, cCursor)
      cCursor = findNextUnfilledCol(rCursor, cCursor + cSpan)
    }

    rCursor++
  }

  return $.section(
    marquees,
    {
      style: `
        width: ${100*colCells/cols}vw;
        height: ${100*rowCells/rows}vh;
        overflow: hidden;
        grid-row: span ${rowCells};
        grid-column: span ${colCells};
        display: grid;
        grid-template-rows: repeat(${rowCells}, 1fr);
        grid-template-columns: repeat(${colCells}, 1fr);
      `
    }
  )
}

