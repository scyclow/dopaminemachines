css`
  .char {
    margin-left: -0.25em;
    display: inline-block;
  }

  @keyframes UpDown {
    0%, 100% {
      transform: translate3d(0%, 20%, 0);
    }

    50% {
      transform: translate3d(0%, -20%, 0);
    }
  }

  @keyframes BigSmall {
    0%, 100% {
      transform: scale(1);
    }

    50% {
      transform: scale(1.2);
    }
  }

  @keyframes FadeInOut {
    0%, 100% {
      opacity: 1;
    }

    50% {
      opacity: 0;
    }
  }

  @keyframes ColorRotate {
    0%, 100% {
      filter: hue-rotate(0deg);
    }

    50% {
      filter: hue-rotate(50deg);
    }
  }
`



function UpDown(speed) {
  return `UpDown ${speed}ms ease-in-out infinite`
}

function ColorRotate(speed) {
  return `ColorRotate ${speed}ms ease-in-out infinite`
}

function FadeInOut(speed) {
  return `FadeInOut ${speed}ms ease-in-out infinite`
}

function BigSmall(speed) {
  return `BigSmall ${speed}ms ease-in-out infinite`
}

function textAnimate(word, animations=[], args={}) {
  const freq = args.freq || 20
  const speed = args.speed || 2000
  // debugger
  return word
    .split('')
    .map((c, i) => c === ' '
      ? `<span class="char" style="width: 0.5em"></span>`
      : `<span
        class="char"
        style="
          animation: ${animations.join(', ')};
          animation-delay: -${(i/freq) * speed }ms;
          ${args.style || ''}
        "
      >${c}</span>
    `)
    .join('')
}