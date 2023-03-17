function sectionContainer(child, rSpan, cSpan, h, txtH, onclick) {
  const bwc = prb(0.5) ? { bg: '#000', text: '#fff' } : { bg: '#fff', text: '#000' }
  const txtColor = bw ? bwc.text : `hsl(${txtH}deg, ${sat}%, 50%)`
  const bgColor = bw ? bwc.bg : getBgColor(h)


  const rotation = threeDRotations
    ? `perspective(500px) rotate3d(1,1,0.5,${lineRotation()}deg)`
    : `rotate(${lineRotation()}deg)`

  const fontStyle = prb(italicRate) ? 'font-style: italic;' : ''

  const borderWidth = min(rSpan, cSpan) * .05
  const rotateColor = prb(rotateColorPrb)

  const container = $.div(
    withBgAnimation(child, rSpan, cSpan),
    {
      class: `sectionContainer ${conicalBg(h, rSpan, cSpan) || ''} ${sectionAnimation} ${rotateColor ? ' fullColorRotate' : ''}`,
      style: `
        border-style: ${borderStyle()};
        ${showBorder ? `border-width: ${borderWidth}vmin; box-sizing: border-box;` : 'border-width: 0;'}
        grid-column: span ${cSpan};
        grid-row: span ${rSpan};
        background: ${(hideBg ? 'none' : bgColor)};
        color: ${txtColor};
        ${fontStyle};
        transform: ${rotation};
        animation-delay: -${rnd(5)}s;
        animation-direction: ${rotateColor ?'normal' : sectionAnimationDirection()};
        animation-duration: ${rotateColor ? '25' : sectionAnimationDuration()}s;
      `
    }
  )

  container.onclick = onclick
  return container
}










function marqueeContainter(rSpan, cSpan, sideways=false) {
  const child = sampleContent()
  const pairedEmoji = chooseEmojiForText(child.innerHTML, pairedEmojiPrb)
  const height = `calc(${100*rSpan/rows}vh)`
  const width = `calc(${100*cSpan/cols}vw)`
  const slow = 1 + adjustCharLength(child.innerHTML, pairedEmoji)/9

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

  const childWithPairedEmoji = pairedEmoji
    ? [
      child.cloneNode(true),
      $.span(pairedEmoji, { style: `margin-left: 1em;`})
    ]
    : child.cloneNode(true)

  const childEl = showLeftRight
    ? leftRight(childWithPairedEmoji, {
        style: `font-size: ${height}; text-shadow: ${getShadow(txtH)};`,
        duration: r * slow * speed,
        delay,
        showTrails
      })
    : marquee(childWithPairedEmoji, {
        style: `
          font-size: ${sideways ? width : height};
          text-shadow: ${getShadow(txtH)};
        `,
        direction: posOrNeg(),
        delay,
        duration,
        sideways,
        msgAnimation
      })

  return sectionContainer(childEl, rSpan, cSpan, h, txtH, () => {
    if (showLeftRight) {
      zoomSound({duration: r * slow * speed / 2, delay, showTrails})
      if (showTrails) zoomSound({duration: r * slow * speed / 2, delay: delay + 20, showTrails})

    } else {
      utter(child.innerHTML, 30, 7)
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



function playSound(animation, params, isGrid, extraDelay=0) {
  params = { ...params, delay: params.delay + extraDelay }
  if (animation === spin) {
    smoothSound(params)
  } else if ([vPivot, hPivot, dance, updownLong, growShrink, breathe].includes(animation)) {

    chance(
      [4, () => sirenSound({
        ...params,
        duration: params.duration/2,
      })],
      [4, () => zoomSound({
        ...params,
        delay: params.delay + params.duration/4,
        duration: params.duration/2
      })],
      [2, () => carSirenSound(params)],
      [1, () => ticktockSound(params)]
    )()



  // TODO hSiren/vSiren should also be able ot be smooth sound
  // TODO blinking sound every rotation
  } else if ([hSiren, vSiren, wave].includes(animation)) {
    sirenSound(params)
  } else if ([hFlip, vFlip].includes(animation)) {
    flipSound(params)

  } else if (blinkChars === animation) {
    blinkCharSound(params)
  } else if (blink === animation) {
    if (isGrid) blinkCharSound(params)
    else ticktockSound(params)
  } else if ([shrinkChars, updownChars].includes(animation)) {
    shrinkCharSound(params)
  } else if (animation === hexagon) {
    prb(0.5) ? hexSound(params) : sirenSound(params)
  } else if (animation === climb) {
    climbSound(params)
  // } else if (animation === updownLong) {
  //   zoomSound({
  //     ...primaryAnimationParams,
  //     delay: primaryAnimationParams.delay + primaryAnimationParams.duration/4,
  //     duration: primaryAnimationParams.duration/2
  //   })
  }

}



function animationContainer(rSpan, cSpan) {
  const child = sampleContent()
  const height = `calc(${100*rSpan/rows}vh)`
  const width = `calc(${100*cSpan/cols}vw)`
  const h = chooseHue()
  const txtH = chooseAltHue(h)

  const ignoreCharAnimation = [...emojiList, '<<<<', '>>>>'].includes(child.innerHTML.replace('!', ''))

  const animation = sample([
    dance, //
    growShrink, //
    spin, //
    hSiren, //
    vSiren, //
    hPivot, //
    vPivot, //
    vFlip, //
    hFlip, //
    updownLong, //
    climb, //
    // wave,
    blink,
    hexagon, //
    prb(0.5) && breathe,
    !ignoreCharAnimation && updownChars,
    !ignoreCharAnimation && blinkChars, //
    !ignoreCharAnimation && shrinkChars, //
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

  const childEl = $.div(
    secondAnimation(
      animation(
        child.cloneNode(true),
        primaryAnimationParams
      ),
      {
        delay: rnd(3500),
        duration: rnd(750, 5000),
        showTrails: primaryAnimationParams.showTrails
      }
    ),
    {
      class: 'animationContainer',
      style: `
        height: ${100*rSpan/rows}vh;
        font-size: ${fontSize};
        text-shadow: ${getShadow(h)};
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
      `,
    }
  )



  return sectionContainer(childEl, rSpan, cSpan, h, txtH, () => {
    playSound(animation, primaryAnimationParams)
    if (primaryAnimationParams.showTrails && animation !== blinkChars) {
      playSound(animation, primaryAnimationParams, false, 10)
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

function animationGridContainer(rSpan, cSpan) {
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
      class: 'animationGridContainer',
      style: `
        font-size: ${100*min(rSpan/rows, cSpan/cols)/min(r, c)}vmin;
        text-shadow: ${getShadow(h)};
        height: ${100*rSpan/rows}vh;
        width: ${100*cSpan/cols}vw;
        display: grid;
        align-items: center;
        justify-items: center;
        grid-template-rows: repeat(${r}, 1fr);
        grid-template-columns: repeat(${c}, 1fr);
      `,
    }
  )

  return sectionContainer(childEl, rSpan, cSpan, h, txtH, () => {
    const params = {
        delay: duration*delayFactor,
        duration,
      }
    playSound(animation, params, true, )
    if (animation !== blink) playSound(animation, params, true, duration/2)
  })
}







const evenRows = prb(0.15)
const evenCols = prb(0.05)






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
    colMin = colCells * (5/12)
    rowMin = rowCells * (5/12)
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
    if (layoutStyle === 2) {
      if (prb(0.9)) {
        if (prb(0.2)) {
          adjColMax = sample([1, 2])
        } else {
          adjRowMax = sample([1, 2])
        }
      }
    }
    const colsLeft = min(findNextFilledCol(rCursor, cCursor) - cCursor, adjColMax)
    const rowsLeft = max(1, min(rowCells - rCursor, adjRowMax))

    const cSpan = getSpan(colMin, colsLeft, colCells)
    const rSpan = getSpan(rowMin, rowsLeft, rowCells)

    const aspectRatio = cSpan / rSpan

    const sideways = aspectRatio < 0.333 || prb(sidewaysPrb) && aspectRatio < 1.2

    marquees.push(
      aspectRatio < 1.25 && aspectRatio > 0.8 ?
        prb(0.25) ? animationContainer(rSpan, cSpan) : animationGridContainer(rSpan, cSpan) :

      aspectRatio < 2 && aspectRatio > 0.5 && prb(0.5) ?
        animationContainer(rSpan, cSpan) :

      marqueeContainter(rSpan, cSpan, sideways)
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
