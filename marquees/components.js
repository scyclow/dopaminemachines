css(`
  .marquee {
    display: inline-block;
    width: 100%;
    box-sizing: border-box;
    line-height: 1;
  }

  .marqueeInner {
    display: inline-flex;
  }

  .marqueeForward {
    animation: Marquee 50s linear infinite;
  }

  .marqueeInner > * {
    display: inline-block;
    white-space: nowrap;
  }

  @keyframes Marquee {
    0% {transform: translate3d(-50%, 0, 0)}
    100% {transform: translate3d(0%, 0, 0)}
  }

  .bgAnimation {
    z-index: -1;
  }

  .updownChars {
    animation: UpDownChars 2s ease-in-out infinite;
    display: inline-block;
  }

  @keyframes UpDownChars {
    0%, 100% {transform: translate3d(0%, 10%, 0)}
    50% {transform: translate3d(0%, -10%, 0)}
  }

  .updownLong {
    height: 100%;
    animation: UpDownLong 1000ms ease-in-out infinite;

  }

  .updownLong > * {
    animation: UpDownLongChild 2000ms ease-in-out infinite;
  }


  @keyframes UpDownLongChild {
    0%, 100% {transform: translateY(0)}
    50% {transform: translateY(-100%)}
  }

  @keyframes UpDownLong {
    0%, 100% {transform: translateY(0)}
    50% {transform: translateY(100%)}
  }

  .blink {
    animation: Blink 1.5s steps(2, start) infinite;
  }

  @keyframes Blink {
    to {
      visibility: hidden;
    }
  }

  .colorChars {
    animation: FullColorRotate 1.5s steps(6, start) infinite;
  }

  .borderBlink {
    border-width: 0.05em;
    animation: BorderBlink 1.5s steps(2, start) infinite;
    box-sizing: border-box;
  }

  @keyframes BorderBlink {
    50% {
      border-style: hidden;
    }
  }

  .colorBlink {
    animation: ColorBlink 4s steps(1, start) infinite;
  }

  @keyframes ColorBlink {
    ${colorBlinkAnim()}
  }

  .fullColorRotate {
    animation: FullColorRotate 25s linear infinite;
  }

  @keyframes FullColorRotate {
    0%, 100% {color: #ff0000}
    17% {color: #ffff00}
    33% {color: #00ff00}
    50% {color: #00ffff}
    66% {color: #0000ff}
    83% {color: #ff00ff}
  }



  .colorShift {
    animation: ColorRotate 25s linear infinite;
  }

  @keyframes ColorRotate {
    0%, 100% {color: #ff0000}
    17% {color: #ffff00}
    33% {color: #00ff00}
    50% {color: #00ffff}
    66% {color: #0000ff}
    83% {color: #ff00ff}
  }

  .dance {
    animation: Dance 2000ms cubic-bezier(0.58, 0.06, 0.44, 0.98) infinite;
  }

  @keyframes Dance {
    0%, 100% {transform: rotate(20deg)}
    50% {transform: rotate(-20deg)}
  }

  .growShrink {
    animation: GrowShrink 2000ms cubic-bezier(0.58, 0.06, 0.44, 0.98) infinite;
  }

  @keyframes GrowShrink {
    0%, 100% {transform: scale(1)}
    50% {transform: scale(0.2)}
  }

  .growShrinkShort {
    animation: GrowShrinkShort 2000ms cubic-bezier(0.58, 0.06, 0.44, 0.98) infinite;
    display: inline-block;
  }

  @keyframes GrowShrinkShort {
    0%, 100% {transform: scale(1)}
    50% {transform: scale(0.75)}
  }


  .spin {
    animation: Spin 2000ms linear infinite;
  }

  @keyframes Spin {
    0% {transform: rotate(0deg)}
    100% {transform: rotate(360deg)}
  }


  .hSiren {
    animation: HSiren 2000ms linear infinite;
  }

  @keyframes HSiren {
    0% {transform: perspective(500px) rotate3d(0,2,0, 0deg) translateZ(100px)}
    100% {transform: perspective(500px) rotate3d(0,2,0, 360deg) translateZ(100px)}
  }

  .vSiren {
    animation: VSiren 2000ms linear infinite;
  }

  @keyframes VSiren {
    0% {transform: perspective(500px) rotate3d(2,0,0, 0deg) translateZ(0.75em)}
    100% {transform: perspective(500px) rotate3d(2,0,0, 360deg) translateZ(0.75em)}
  }

  .vSirenShort {
    animation: VSirenShort 2000ms linear infinite;
  }

  @keyframes VSirenShort {
    0% {transform: perspective(500px) rotate3d(2,0,0, 0deg) translateZ(0.3em)}
    100% {transform: perspective(500px) rotate3d(2,0,0, 360deg) translateZ(0.3em)}
  }



  .hPivot {
    animation: HPivot 2000ms cubic-bezier(0.58, 0.06, 0.44, 0.98) infinite;
  }

  @keyframes HPivot {
    0%, 100% {transform: perspective(500px) rotate3d(0,2,0, 30deg) translateZ(20vmin) scale(0.75)}
    50% {transform: perspective(500px) rotate3d(0,2,0, -30deg) translateZ(20vmin) scale(0.75)}
  }

  .vPivot {
    animation: VPivot 2000ms cubic-bezier(0.58, 0.06, 0.44, 0.98) infinite;
  }


  @keyframes VPivot {
    0%, 100% {transform: perspective(500px) rotate3d(2,0,0, 30deg) translateZ(20vmin) scale(0.5)}
    50% {transform: perspective(500px) rotate3d(2,0,0, -30deg) translateZ(20vmin) scale(0.5)}
  }



  .vFlip {
    animation: VFlip 3500ms cubic-bezier(0.66, 0.05, 0.38, 0.99) infinite;
  }

  @keyframes VFlip {
    0% {transform: perspective(500px) rotate3d(2,0,0, 0deg)}
    100% {transform: perspective(500px) rotate3d(2,0,0, 1800deg)}
  }


  .hFlip {
    animation: HFlip 3500ms cubic-bezier(0.66, 0.05, 0.38, 0.99) infinite;
  }

  @keyframes HFlip {
    0% {transform: perspective(500px) rotate3d(0,2,0, 0deg)}
    100% {transform: perspective(500px) rotate3d(0,2,0, 1800deg)}
  }


  .breathe {
    animation: Breathe 2000ms ease-in-out infinite;
  }

  @keyframes Breathe {
    0%, 100% {transform: scaleX(1) scaleY(1)}
    50% {transform: scaleX(0.8) scaleY(0.9)}
  }


  .flamingHot {
    animation: FlamingHot 2000ms ease-in-out infinite;
  }

  @keyframes FlamingHot {
    0% {
      transform: scale(1) translateY(0);
      opacity: 1;
    }
    75% {
      opacity: 0;
      transform: scale(1.15) translateY(-0.2em);
    }
    80% {
      opacity: 0;
      transform: scale(1) translateY(0);
    }
    100% {
      opacity: 1;
    }
  }

  .leftRight {
    width: 100%;

    animation: LeftRight 2000ms cubic-bezier(0.58, 0.06, 0.44, 0.98) infinite;
    font-size: 10vmin;
  }

  .leftRight > * {
    animation: LeftRightChild 2000ms cubic-bezier(0.58, 0.06, 0.44, 0.98) infinite;
    display: inline-block;
    white-space: nowrap;
  }

  @keyframes LeftRightChild {
    0%, 100% {transform: translateX(0)}
    50% {transform: translateX(-100%)}
  }

  @keyframes LeftRight {
    0%, 100% {transform: translateX(0)}
    50% {transform: translateX(100%)}
  }


  .shrinkingBorder {
    animation: ShrinkingBorder 2000ms linear infinite;
  }
  .spinningBorder {
    animation: Spin 2000ms linear infinite;
  }

  @keyframes ShrinkingBorder {
    0% {transform: scale(105%)}
    100% {transform: scale(0%)}
  }

  .shrinkingSpinningBorder {
    animation: SpinningShrinkingBorder 2000ms linear infinite;
  }

  @keyframes SpinningShrinkingBorder {
    0% {transform: scale(105%) rotate(0deg)}
    100% {transform: scale(0%) rotate(45deg)}
  }

  .wave {
    animation: Wave 4500ms linear infinite;
  }
  .climb {
    animation: Wave 4500ms cubic-bezier(0.66, 0.05, 0.38, 0.99) infinite;
  }

  @keyframes Wave {
    0%, 100% {transform: translate3d(0%, 30%, 0) rotate(0deg)}
    25% {transform: translate3d(0%, 0%, 0) rotate(12deg)}
    50% {transform: translate3d(0%, -30%, 0) rotate(0deg)}
    75% {transform: translate3d(0%, 0%, 0) rotate(-12deg)}
  }


  .hexagon {
    animation: Hexagon 2000ms linear infinite;
  }

  @keyframes Hexagon {
    0%, 100% {transform: translate(0, 0.5em)}
    17% {transform: translate(0.43em, 0.25em)}
    33% {transform: translate(0.43em, -0.25em)}
    50% {transform: translate(0, -0.5em)}
    66% {transform: translate(-0.43em, -0.25em)}
    83% {transform: translate(-0.43em, 0.25em)}
  }
`)

function colorBlinkAnim() {
  const h = chooseHue()
  const start = `
    0%, 100% {
      color: ${getColorFromHue(h)};
      background-color: ${getColorFromHue(h + possibleHues[1])};
    }
  `
  return start + possibleHues.length === 2
    ? `
      50% {
        color: ${getColorFromHue(h + possibleHues[1])};
        background-color: ${getColorFromHue(h)};
      }
    `
    : `
      33% {
        color: ${getColorFromHue(h + possibleHues[1])};
        background-color: ${getColorFromHue(h + possibleHues[2])};
      }

      66% {
        color: ${getColorFromHue(h + possibleHues[2])};
        background-color: ${getColorFromHue(h)};
      }
    `
}

function marquee(children, args={}) {
  const className = args.className || ''
  const style = args.style || ''
  const direction = args.direction || 1
  const delay = args.delay || 0
  const duration = args.duration || 1
  const sideways = args.sideways || false
  const msgAnimation = args.msgAnimation || iden
  const isEmoji = elementIsEmoji(children)


  const repeat = isEmoji ? 60 : 40

  const handleAnimation = (child, i, j) => {
    const isEmoji = elementIsEmoji(child)
    const spacing = ((isEmoji || j > 0) ? 0.1 : 0.5) + 'em'
    return msgAnimation(
      $.span(
        child,
        { style: `
          margin-left: ${spacing};
          margin-right: ${spacing};
          font-size: ${isEmoji ? 0.9 : 1}em;
        ` }
      ).cloneNode(true),
      { delay: i*100 + j/2}
    )
  }



  const inner = $.div(
    times(repeat, i => Array.isArray(children)
      ? children.map((c, j) => handleAnimation(c, i, j))
      : handleAnimation(children, i, 0)
    ).flat(),
    {
      class: `marqueeInner marqueeForward`,
      style: `
        animation-delay: -${delay}s;
        animation-duration: ${duration/(repeat/40)}s;
        animation-direction: ${direction === 1 ? 'normal' : 'reverse'};
      `
    }
  )

  return $.div(
    inner,
    {
      style: style + (sideways ? `transform: rotate(${sample([90, 270])}deg);` : ''),
      class: `component marquee ${className}`,
    }
  )
}


function genericAnimatingComponent(name) {
  return (children, args={}) => {
    const className = args.className || ''
    const style = args.style || ''
    const delay = args.delay || 0
    const duration = args.duration || 1000
    const direction = args.direction || 1

    const trailFn = args.showTrails ? withTrails : iden

    return trailFn(
      $.div(children, {
        class: `${name} ${className} animatingComponent`,
        style: `
          animation-duration: ${duration}ms;
          animation-delay: -${delay}ms;
          animation-direction: ${direction === 1 ? 'normal' : 'reverse'};
          ${style}
        `
      }),
      args
    )
  }
}

const blink = genericAnimatingComponent('blink')
const dance = genericAnimatingComponent('dance')
const growShrink = genericAnimatingComponent('growShrink')
const growShrinkShort = genericAnimatingComponent('growShrinkShort')
const spin = genericAnimatingComponent('spin')
const hSiren = genericAnimatingComponent('hSiren')
const vSiren = genericAnimatingComponent('vSiren')
const vSirenShort = genericAnimatingComponent('vSirenShort')

const hPivot = genericAnimatingComponent('hPivot')
const vPivot = genericAnimatingComponent('vPivot')

const vFlip = genericAnimatingComponent('vFlip')
const hFlip = genericAnimatingComponent('hFlip')

const wave = genericAnimatingComponent('wave')
const climb = genericAnimatingComponent('climb')
const hexagon = genericAnimatingComponent('hexagon')
const breathe = genericAnimatingComponent('breathe')

// const wave = (grandChild, args={}) => {
//   const delay = args.delay || 0

//   return dance(updown(grandChild, { style: `font-size: 10vmin`, delay: 200 + delay }), args)
// }


const updownLongParent = genericAnimatingComponent('updownLong')
const updownLong = (grandChild, args={}) => {
  const duration = args.duration || 1000
  const delay = args.delay || 0

  const child = $.div(grandChild, { style: `animation-duration: ${duration}ms; animation-delay: -${delay}ms;` })
  return updownLongParent(child, args)
}

const leftRightParent = genericAnimatingComponent('leftRight')
const leftRight = (grandChild, args={}) => {
  const duration = args.duration || 1000
  const delay = args.delay || 0

  const child = $.div(grandChild, { style: `animation-duration: ${duration}ms; animation-delay: -${delay}ms;` })
  return leftRightParent(child, args)
}


const flamingHotParent = genericAnimatingComponent('flamingHot')
const flamingHot = (grandChild, args={}) => {
  return flamingHotParent(grandChild, {
    ...args,
    showTrails: true,
    baseIsPaused: true,
    delayM: -10
  })
}


const withTrails = (grandChild, args={}) => {
  const shadows = 5
  const delayM = args.delayM || 1
  return times(shadows, t => {
    const shadow = grandChild.cloneNode(true)
    if (t < shadows-1) $(shadow, 'position', 'absolute')
    $(shadow, 'opacity', 1/shadows + t/shadows )
    $(shadow, 'text-shadow', `0 0 0.${0.25/shadows * (shadows-t)}em`)
    if (t === shadows - 1 && args.baseIsPaused) {
      $(shadow, 'animation-play-state', 'paused')
      $(shadow, 'animation-delay', `0ms`)
      $(shadow, 'animation-direction', `normal`)
    } else {
      $(shadow, 'animation-delay', `${-args.delay + args.duration * 0.025 * (shadows-t) * delayM}ms`)
    }
    return shadow
  })
}



const bgAnimation = (className, rSpan, cSpan, args={}) => $.div([], {
    class: className + ' bgAnimation',
    style: `
      border: 1vmin ${borderStyle};
      position: absolute;
      height: ${100*rSpan/rows}vh;
      width: ${100*cSpan/cols}vw;
      animation-delay: -${args.delay || 0}ms;
      animation-duration: ${args.duration || 2000}ms;
      animation-direction: ${args.direction === -1 ? 'reverse' : 'normal'};
      ${args.style || ''}
    `
  })

function staticBgsMultiple(rSpan, cSpan) {
  return times(6, i => bgAnimation('',rSpan, cSpan, { style: `transform: scale(${i/6});`}))
}
function shrinkingBgSingle(rSpan, cSpan) {
  const direction = prb(0.5) ? 1 : -1
  const duration = rnd(750, 3000)
  return [bgAnimation('shrinkingBorder', rSpan, cSpan, {
    duration,
    direction
  })]
}

function shrinkingBgMultiple(rSpan, cSpan) {
  const direction = prb(0.5) ? 1 : -1
  const duration = rnd(750, 3000)
  return times(4, i => bgAnimation('shrinkingBorder',rSpan, cSpan, {
    delay: i * 500,
    duration,
    direction
  }))
}


function shrinkingSpinningBgMultiple(rSpan, cSpan) {
  const direction = prb(0.5) ? 1 : -1
  const duration = rnd(3000, 10000)
  return times(4, i => bgAnimation('shrinkingSpinningBorder',rSpan, cSpan, {
    delay: i * (duration/4),
    duration,
    direction
  }))
}

function colorShiftingBgMultiple(rSpan, cSpan) {
  const direction = prb(0.5) ? 1 : -1
  const duration = rnd(4000, 16000)
  const squares = rndint(8, 20)
  return times(squares, i => bgAnimation('colorShift',rSpan, cSpan, {
    delay: i * 500,
    duration,
    direction,
    style: `transform: scale(${0.95 - i/squares});`
  }))
}

const bgAnimationFn =
  bgAnimationType === 0 ? colorShiftingBgMultiple :
  bgAnimationType === 1 ? staticBgsMultiple :
  bgAnimationType === 2 ? shrinkingBgSingle :
  bgAnimationType === 3 ? shrinkingBgMultiple :
  shrinkingSpinningBgMultiple


let bgAnimationCount = 0
function withBgAnimation(child, rSpan, cSpan) {
  const aspectRatio = cSpan / rSpan
  const invalidAspectRatio = aspectRatio > 3 || aspectRatio < 0.3333

  if (bgAnimationFn !== colorShiftingBgMultiple && invalidAspectRatio) return child

  const hasAnimation = prb(bgAnimationPrb)
  if (hasAnimation) bgAnimationCount++

  return [
    ...(hasAnimation ? bgAnimationFn(rSpan, cSpan) : []),
    child
  ]

}



function genericCharacterComponent(name, durMin, durMax) {
  return (children, args={}) => {
    const splitAnimation = txt => {
      const duration = args.duration ? map(args.duration, 750, 5000, durMin, durMax) : rnd(durMin, durMax)
      const split = txt.split('')

      return split.map((c, i) => $.span(c, {
        class: name + ' charContent',
        style: `
          animation-delay: -${i * duration}ms;
          ${c === ' ' ? 'margin-right: 0.5em;' : ''}
        `
      }))
    }

    const c = prb(0.5) ? [children.innerHTML] : children.innerHTML.split(' ')

    return $.div(
      c.map(txt => $.div(
        splitAnimation(txt),
        {
          class: 'charContentWord',
          style: `
            display: inline-block;
            margin-left: 0.25em;
            margin-right: 0.25em;
          `
        }
      )
    ), {
      class: 'charContentGroup',
      style: `display: inline-block;`
    })
  }
}


const updownChars = genericCharacterComponent('updownChars', 100, 500)
const shrinkChars = genericCharacterComponent('growShrinkShort', 100, 300)
const blinkChars = genericCharacterComponent('blink', 50, 200)
const colorChars = genericCharacterComponent('colorChars', 50, 200)

function getContent(elem) {
  const child = $.cls(elem, 'content')
  if (child.length) {
    if (child[0].childElementCount) return child[0].children[0].alt
    return child[0].innerHTML
  }
  else {
    return $.cls(elem, 'charContentWord').map(w =>
      $.cls(w, 'charContent').map(c => c.innerHTML).join('')
    ).join(' ')
  }
}

