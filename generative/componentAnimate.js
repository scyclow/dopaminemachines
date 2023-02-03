css`
  @keyframes ExpandContract {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(0.2);
    }
  }

  @keyframes Dance {
    0%, 100% {
      transform: rotate(20deg) translateY(-10%);
    }
    50% {
      transform: rotate(-20deg) translateY(-10%);
    }
  }

  @keyframes Spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`


function ExpandContract(children, args={}) {
  const speed = args.speed || 2000
  const delay = args.delay || 0
  return `
    <div
      style="
        animation: ExpandContract ${speed}ms cubic-bezier(0.58, 0.06, 0.44, 0.98) infinite;
        animation-delay: -${delay}ms
      "
    >
      ${children}
    </div>
  `
}


function Dance(children, args={}) {
  const speed = args.speed || 2000
  const delay = args.delay || 0
  return `
    <div
      style="
        animation: Dance ${speed}ms cubic-bezier(0.58, 0.06, 0.44, 0.98) infinite;
        animation-delay: -${delay}ms
      "
    >
      ${children}
    </div>
  `
}

function Spin(children, args={}) {
  const speed = args.speed || 2000
  const delay = args.delay || 0
  const direction = args.direction || 1
  return `
    <div
      style="
        animation: Spin ${speed}ms linear infinite;
        animation-delay: -${delay}ms;
        animation-direction: ${direction === 1 ? 'normal' : 'reverse'};
      "
    >
      ${children}
    </div>
  `
}
