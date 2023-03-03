function sectionContainer(child, rSpan, cSpan, h, txtH, onclick) {
  const bwc = prb(0.5) ? { bg: '#000', text: '#fff' } : { bg: '#fff', text: '#000' }
  const txtColor = bw ? bwc.text : `hsl(${txtH}deg, ${sat}%, 50%)`
  const bgColor = bw ? bwc.bg : getBgColor(h)


  const rotation = threeDRotations
    ? `perspective(500px) rotate3d(1,1,1,${lineRotation()}deg)`
    : `rotate(${lineRotation()}deg)`

  const fontStyle = prb(italicRate) ? 'italic' : 'none'


  const borderWidth = min(rSpan, cSpan) * .05



  const container = $.div(
    withBgAnimation(child, rSpan, cSpan),
    {
      class: `sectionContainer ${conicalBg(h) || ''} ${sectionAnimation} ${rotateColor ? ' fullColorRotate' : ''}`,
      style: `
        border-style: ${borderStyle()};
        ${showBorder ? `border-width: ${borderWidth}vmin; box-sizing: border-box;` : 'border-width: 0;'}
        grid-column: span ${cSpan};
        grid-row: span ${rSpan};
        background: ${(hideBg ? 'none' : bgColor)};
        color: ${txtColor};
        transform: ${rotation};
        font-style: ${fontStyle};
        animation-delay: -${rnd(5)}s;
        animation-direction: ${rotateColor ?'normal' : animationDirection()};
        animation-duration: ${rotateColor ? '25' : animationDuration()}s;
      `
    }
  )

  container.onclick = onclick
  return container
}










function marqueeContainter(rSpan, cSpan) {
  const child = sampleContent()
  const pairedEmoji = chooseEmojiForText(child.innerHTML, pairedEmojiPrb)
  const height = `calc(${100*rSpan/rows}vh)`
  const width = `calc(${100*cSpan/cols}vw)`
  const slow = 1 + adjustCharLength(child.innerHTML, pairedEmoji)/9

  const h = chooseHue()
  const txtH = chooseAltHue(h)


  // const slowIx = child.indexOf('slow="')
  // slowIx !== -1 ? Number(child.slice(slowIx+6, slowIx+9)) : 1

  const canShowAltAnimation = rSpan >= 2 && cSpan/rSpan >= 6 && child.innerHTML.length < 8
  const sideways = prb(sidewaysPrb) && cSpan/rSpan < 1.2

  const msgAnimation = prb(marqueeAnimationRate) && canShowAltAnimation
    ? chance(
      [1, growShrinkShort],
      [1, vSirenShort],
      [1, dance],
      [1, spin],
      [1, hSiren],
      [1, hPivot],
      [1, hFlip],
      [1, blink],
    )
    : iden

  const r = rnd(750, 1500)
  const d = map(sideways ? cSpan/cols : rSpan/rows, 0, 1, 0.5, 20)
  const duration = rnd(d, 100) * slow * speed
  const delay = rnd(duration/2) + (duration / 3)

  const showLeftRight = canShowAltAnimation && prb(0.1)
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
    showLeftRight
      ? zoomSound({duration: r * slow * speed / 2, delay, showTrails})
      : utter(child.innerHTML, 30, 7)
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
    updown, //
    climb, //
    // wave,
    hexagon, //
    !ignoreCharAnimation && updownChars,
    !ignoreCharAnimation && blinkChars, //
    !ignoreCharAnimation && shrinkChars, //
  ].filter(iden))

  const words = child.innerHTML.split(' ')
  const shortest = words.reduce((shortest, word) => word.length < shortest.length ? word : shortest , words[0])


  const rowSizeMax = 5.5/(child.innerHTML.length)
  const colSizeMax = 7 *(cSpan/(cols*shortest.length))

  const fontSize = getFontSize(child.innerHTML, rSpan, cSpan)

  const secondAnimation = prb(0.75) ? iden : sample([
    dance,
    growShrink,
    spin,
    hSiren,
    vSiren,
    hPivot,
    vPivot,
    vFlip,
    hFlip,
    updown,
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
        // font-size: ${fontAdj*100*min(rSpan/rows, cSpan/cols)}vmin;
      style: `
        font-size: ${fontSize};
        text-shadow: ${getShadow(h)};
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
      `,
    }
  )

  const playSound = () => {
    if (animation === spin) {
      smoothSound(primaryAnimationParams)
    } else if ([vPivot, hPivot, dance].includes(animation)) {
      prb(0.5)
        ? sirenSound({
          delay: primaryAnimationParams.delay,
          duration: primaryAnimationParams.duration/2,
        })
        : carSirenSound(primaryAnimationParams)

    // TODO hSiren/vSiren should also be able ot be smooth sound
    // TODO blinking sound every rotation
    } else if ([growShrink, hSiren, vSiren].includes(animation)) {
      sirenSound(primaryAnimationParams)
    } else if ([hFlip, vFlip].includes(animation)) {
      flipSound(primaryAnimationParams)

    } else if (animation === blinkChars) {
      blinkCharSound(primaryAnimationParams)
    } else if ([shrinkChars, updownChars].includes(animation)) {
      shrinkCharSound(primaryAnimationParams)
    } else if (animation === hexagon) {
      prb(0.5) ? hexSound(primaryAnimationParams) : sirenSound(primaryAnimationParams)
    } else if (animation === climb) {
      climbSound(primaryAnimationParams)
    } else if (animation === updown) {
      zoomSound({
        ...primaryAnimationParams,
        delay: primaryAnimationParams.delay + primaryAnimationParams.duration/4,
        duration: primaryAnimationParams.duration/2
      })
    }

  }

  return sectionContainer(childEl, rSpan, cSpan, h, txtH, () => {
    playSound()
    // if (secondAnimation !== iden || primaryAnimationParams.showTrails) playSound()
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

  return sectionContainer(childEl, rSpan, cSpan, h, txtH)
}












function flexSection(rowCells, colCells) {
  let rCursor = 0

  const cells = {}
  times(rowCells, r => cells[r] = [])

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

  const marquees = []

  const colMax = prb(0.05) ? 3 : colCells
  const colMin = 12

  const rowMin = chance(
    [3, sample([24, 48])],
    [3, sample([6, 8, 12, 16])],
    [1, sample([2, 3, 4])],
    [1, 1],
  )
  const rowMax = prb(0.85) ? rowCells : rowMin


  while (rCursor < rowCells) {
    let cCursor = findNextUnfilledCol(rCursor, 0)

    while (cCursor < colCells) {
      const colsLeft = min(findNextFilledCol(rCursor, cCursor) - cCursor, colMax)
      const rowsLeft = min(rowCells - rCursor, rowMax)

      let cSpan = rndint(min(colMin, colsLeft), colsLeft)
      if (colsLeft - cSpan < colMin) cSpan = colsLeft

      const rSpan = rndint(min(rowMin, rowsLeft), max(1, rowsLeft))

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

