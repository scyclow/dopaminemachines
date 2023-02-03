css`
  .marquee {
    overflow: hidden;
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
  .marqueeReverse {
    animation: MarqueeReverse 50s linear infinite;
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

  @keyframes MarqueeReverse {
    0% {
      transform: translate3d(0%, 0, 0);
    }

    100% {
      transform: translate3d(-50%, 0, 0);
    }
  }
`

const marquee = (text, args={}) => {
  const className = args.className || ''
  const style = args.style || ''
  const direction = args.direction || 1
  const delay = args.delay || 0
  const duration = args.duration || 1

  const wordWrap = args.wordWrap || iden
  const charWrap = args.charWrap || iden
  const wrap = (t) => wordWrap(charWrap(t))
  return `
    <div class="marquee ${className}" style="${style}">
      <div
        class="marqueeInner ${direction === 1 ? 'marqueeForward' : 'marqueeReverse'} "
        style="animation-delay: ${Math.floor(delay)}ms; animation-duration: ${duration*50}s;"
      >
        <span>${wrap(times(40, _ => text).join(''))}</span>
      </div>
    </div>
  `
}