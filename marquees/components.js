css`

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

`

function marquee(children, args) {
  const className = args.className || ''
  const style = args.style || ''
  const direction = args.direction || 1
  const delay = args.delay || 0
  const duration = args.duration || 1
  const sideways = args.sideways || false

  const inner = $.div(
    times(40, _ => children),
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




// unused?
const updown = (txt) => txt
  .split('')
  .map((c, i) => `
    <span class="updown" style="animation-delay: -${i* 400}ms">${c}</span>
  `)
  .join('')

