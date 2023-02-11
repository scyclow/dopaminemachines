css`

  .animatingComponent {
    display: inline-block;
  }

  .marquee-container {
    overflow: hidden;
    display: flex;
    align-items: center;
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


  .updown {
    animation: UpDown 2s ease-in-out infinite;
    display: inline-block;
  }

  @keyframes UpDown {
    0%, 100% {
      transform: translate3d(0%, 10%, 0);
    }

    50% {
      transform: translate3d(0%, -10%, 0);
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

  .dance {
    animation: Dance 2000ms cubic-bezier(0.58, 0.06, 0.44, 0.98) infinite;
  }

  @keyframes Dance {
    0%, 100% {
      transform: rotate(20deg) translateY(-10%);
    }
    50% {
      transform: rotate(-20deg) translateY(-10%);
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
    0%, 100% {
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
`

function marquee(children, args={}) {
  const className = args.className || ''
  const style = args.style || ''
  const direction = args.direction || 1
  const delay = args.delay || 0
  const duration = args.duration || 1
  const sideways = args.sideways || false
  const msgAnimation = args.msgAnimation || iden

  const inner = $.div(
    times(40, i => msgAnimation(children.cloneNode(true), {delay: i * 100})),
    {
      class: `marqueeInner marqueeForward`,
      style: `
        animation-delay: ${Math.floor(delay)}ms;
        animation-duration: ${duration*50}s;
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

    return $.div(children, {
      class: `${name} ${className} animatingComponent`,
      style: `
        animation-duration: ${duration}ms;
        animation-delay: -${delay}ms;
        ${style}
      `
    })
  }
}

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

const leftRightParent = genericAnimatingComponent('leftRight')
const leftRight = (grandChild, args={}) => {
  const duration = args.duration || 1000
  const delay = args.delay || 0

  const child = $.div(grandChild, { style: `animation-duration: ${duration}ms; animation-delay: -${delay}ms;` })
  return leftRightParent(child, args)
}





// unused?
const updown = (txt) => txt
  .split('')
  .map((c, i) => `
    <span class="updown" style="animation-delay: -${i* 400}ms">${c}</span>
  `)
  .join('')

