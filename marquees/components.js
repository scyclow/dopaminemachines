css`

  .animatingComponent {
    display: inline-block;
  }

  .sectionContainer {
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .marquee {
    display: inline-block;
    width: 100%;
    box-sizing: border-box;
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
    0% {
      transform: translate3d(-50%, 0, 0);
    }

    100% {
      transform: translate3d(0%, 0, 0);
    }
  }


  .updownChars {
    animation: UpDownChars 2s ease-in-out infinite;
    display: inline-block;
  }

  @keyframes UpDownChars {
    0%, 100% {
      transform: translate3d(0%, 10%, 0);
    }

    50% {
      transform: translate3d(0%, -10%, 0);
    }
  }

  .updown {
    animation: UpDown 1000ms ease-in-out infinite;
  }

  @keyframes UpDown {
    0%, 100% {
      transform: translate3d(0%, 30%, 0);
    }

    50% {
      transform: translate3d(0%, -30%, 0);
    }
  }


  .rotate {
    animation: Rotate 10s linear infinite;
  }

  @keyframes Rotate {
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(360deg);
    }
  }


  .blink {
    animation: Blink 1.5s steps(2, start) infinite;
  }

  @keyframes Blink {
    to {
      visibility: hidden;
    }
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


  .fullColorRotate {
    animation: FullColorRotate 25s linear infinite;
  }

  @keyframes FullColorRotate {
    0% {
      color: #ff0000;
      background-color: #00ffff;
    }

    17% {
      color: #ffff00;
      background-color: #0000ff;
    }

    33% {
      color: #00ff00;
      background-color: #ff00ff;
    }

    50% {
      color: #00ffff;
      background-color: #ff0000;
    }

    66% {
      color: #0000ff;
      background-color: #ffff00;
    }

    83% {
      color: #ff00ff;
      background-color: #00ff00;
    }

    100% {
      color: #ff0000;
      background-color: #00ffff;
    }
  }



  .colorShift {
    animation: ColorRotate 25s linear infinite;
  }

  @keyframes ColorRotate {
    0% {
      color: #ff0000;
    }

    17% {
      color: #ffff00;
    }

    33% {
      color: #00ff00;
    }

    50% {
      color: #00ffff;
    }

    66% {
      color: #0000ff;
    }

    83% {
      color: #ff00ff;
    }

    100% {
      color: #ff0000;
    }
  }

  .dance {
    animation: Dance 2000ms cubic-bezier(0.58, 0.06, 0.44, 0.98) infinite;
  }

  @keyframes Dance {
    0%, 100% {
      transform: rotate(20deg);
    }
    50% {
      transform: rotate(-20deg);
    }
  }

  .growShrink {
    animation: GrowShrink 2000ms cubic-bezier(0.58, 0.06, 0.44, 0.98) infinite;
  }

  @keyframes GrowShrink {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(0.2);
    }
  }

  .growShrinkShort {
    animation: GrowShrinkShort 2000ms cubic-bezier(0.58, 0.06, 0.44, 0.98) infinite;
  }

  @keyframes GrowShrinkShort {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(0.75);
    }
  }


  .spin {
    animation: Spin 2000ms linear infinite;
  }

  @keyframes Spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }


  .hSiren {
    animation: HSiren 2000ms linear infinite;
  }

  @keyframes HSiren {
    0% {
      transform: perspective(500px) rotate3d(0,2,0, 0deg) translateZ(100px);
    }
    100% {
      transform: perspective(500px) rotate3d(0,2,0, 360deg) translateZ(100px);
    }
  }

  .vSiren {
    animation: VSiren 2000ms linear infinite;
  }

  @keyframes VSiren {
    0% {
      transform: perspective(250px) rotate3d(2,0,0, 0deg) translateZ(0.75em);
    }
    100% {
      transform: perspective(250px) rotate3d(2,0,0, 360deg) translateZ(0.75em);
    }
  }

  .vSirenShort {
    animation: VSirenShort 2000ms linear infinite;
  }

  @keyframes VSirenShort {
    0% {
      transform: perspective(250px) rotate3d(2,0,0, 0deg) translateZ(0.3em);
    }
    100% {
      transform: perspective(250px) rotate3d(2,0,0, 360deg) translateZ(0.3em);
    }
  }



  .hPivot {
    animation: HPivot 2000ms cubic-bezier(0.58, 0.06, 0.44, 0.98) infinite;
  }

  @keyframes HPivot {
    0%, 100% {
      transform: perspective(500px) rotate3d(0,2,0, 30deg) translateZ(100px);
    }
    50% {
      transform: perspective(500px) rotate3d(0,2,0, -30deg) translateZ(100px);
    }
  }

  .vPivot {
    animation: VPivot 2000ms cubic-bezier(0.58, 0.06, 0.44, 0.98) infinite;
  }

  @keyframes VPivot {
    0%, 100% {
      transform: perspective(250px) rotate3d(2,0,0, 30deg) translateZ(0.75em);
    }
    50% {
      transform: perspective(250px) rotate3d(2,0,0, -30deg) translateZ(0.75em);
    }
  }



  .vFlip {
    animation: VFlip 3500ms cubic-bezier(0.66, 0.05, 0.38, 0.99) infinite;
  }

  @keyframes VFlip {
    0%, 100% {
      transform: perspective(250px) rotate3d(2,0,0, 0deg);
    }
    100% {
      transform: perspective(250px) rotate3d(2,0,0, 1800deg);
    }
  }


  .hFlip {
    animation: HFlip 3500ms cubic-bezier(0.66, 0.05, 0.38, 0.99) infinite;
  }

  @keyframes HFlip {
    0% {
      transform: perspective(250px) rotate3d(0,2,0, 0deg);
    }
    100% {
      transform: perspective(250px) rotate3d(0,2,0, 1800deg);
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
    0%, 100% {
      transform: translateX(0);
    }
    50% {
      transform: translateX(-100%);
    }
  }

  @keyframes LeftRight {
    0%, 100% {
      transform: translateX(0);
    }
    50% {
      transform: translateX(100%);
    }
  }


  .shrinkingBorder {
    animation: ShrinkingBorder 2000ms linear infinite;
  }
  .spinningBorder {
    animation: Spin 2000ms linear infinite;
  }

  @keyframes ShrinkingBorder {
    0% {
      transform: scale(105%);
    }
    100% {
      transform: scale(0%);
    }
  }

  .shrinkingSpinningBorder {
    animation: SpinningShrinkingBorder 2000ms linear infinite;
  }

  @keyframes SpinningShrinkingBorder {
    0% {
      transform: scale(105%) rotate(0deg);
    }
    100% {
      transform: scale(0%) rotate(90deg);
    }
  }



  .wave {
    animation: Wave 4500ms linear infinite;
  }
  .climb {
    animation: Wave 4500ms cubic-bezier(0.66, 0.05, 0.38, 0.99) infinite;
  }

  @keyframes Wave {
    0%, 100% {
      transform: translate3d(0%, 30%, 0) rotate(0deg);
    }

    25% {
      transform: translate3d(0%, 0%, 0) rotate(12deg);
    }

    50% {
      transform: translate3d(0%, -30%, 0) rotate(0deg);
    }


    75% {
      transform: translate3d(0%, 0%, 0) rotate(-12deg);
    }
  }
`

function marquee(children, args={}) {
  const className = args.className || ''
  const style = args.style || ''
  const direction = args.direction || 1
  const delay = args.delay || 0
  const duration = args.duration || 1
  const sideways = args.sideways || false
  const msgAnimation = args.msgAnimation || iden
  const isEmoji = emojiList.includes(children.innerHTML)

  const repeat = isEmoji ? 80 : 40

  const inner = $.div(
    times(repeat, i => msgAnimation(
      $.span(
        children, {
          style: `margin-left: ${isEmoji ? 0.2 : 1}em; font-size: ${isEmoji ? 0.9 : 1}em;`
        }
      ).cloneNode(true), {
        delay: i * 100,
      }
    )),
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


    return $.div(children, {
      class: `${name} ${className} animatingComponent`,
      style: `
        animation-duration: ${duration}ms;
        animation-delay: -${delay}ms;
        animation-direction: ${direction === 1 ? 'normal' : 'reverse'};
        ${style}
      `
    })
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

const updown = genericAnimatingComponent('updown')
const wave = genericAnimatingComponent('wave')
const climb = genericAnimatingComponent('climb')

// const wave = (grandChild, args={}) => {
//   const delay = args.delay || 0

//   return dance(updown(grandChild, { style: `font-size: 10vmin`, delay: 200 + delay }), args)
// }


const leftRightParent = genericAnimatingComponent('leftRight')
const leftRight = (grandChild, args={}) => {
  const duration = args.duration || 1000
  const delay = args.delay || 0

  const child = $.div(grandChild, { style: `animation-duration: ${duration}ms; animation-delay: -${delay}ms;` })
  return leftRightParent(child, args)
}


const bgAnimationPrb = chance(
  [12, 0],
  [6, rnd(0.25, 0.5)],
  [2, 1],
)
const bgAnimationFn = sample([
  colorShiftingBgMultiple,
  staticBgsMultiple,
  shrinkingBgSingle,
  shrinkingBgMultiple,
  // spinningBgMultiple,
  shrinkingSpinningBgMultiple,
])

const bgAnimation = (className, rSpan, cSpan, args={}) => $.div([], {
    class: className,
    style: `
      border: 1vmin ${borderStyle()};
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

function spinningBgMultiple(rSpan, cSpan) {
  const direction = prb(0.5) ? 1 : -1
  const duration = rnd(750, 3000)
  return times(2, i => bgAnimation('spinningBorder',rSpan, cSpan, {
    delay: i * 500,
    duration,
    direction
  }))
}

function shrinkingSpinningBgMultiple(rSpan, cSpan) {
  const direction = prb(0.5) ? 1 : -1
  const duration = rnd(750, 3000)
  return times(4, i => bgAnimation('shrinkingSpinningBorder',rSpan, cSpan, {
    delay: i * 500,
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
    style: `
      transform: scale(${0.95 - i/squares});
    `
  }))
}


function withBgAnimation(child, rSpan, cSpan) {
  return [
    ...(prb(bgAnimationPrb) ? bgAnimationFn(rSpan, cSpan) : []),
    child
  ]

}




// unused?
const updownChars = (txt) => txt
  .split('')
  .map((c, i) => `
    <span class="updownChars" style="animation-delay: -${i* 400}ms">${c}</span>
  `)
  .join('')

