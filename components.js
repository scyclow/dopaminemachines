
const marquee = (text, args) => {
  const className = args.className || ''
  const style = args.style || ''
  const direction = args.direction || 1
  const delay = args.delay || 0
  const duration = args.duration || 1
  return `


    <div class="component marquee ${className}" style="${style}">
      <div
        class="marqueeInner ${direction === 1 ? 'marqueeForward' : 'marqueeReverse'} "
        style="animation-delay: ${Math.floor(delay)}ms; animation-duration: ${duration*50}s;"
      >
        ${times(40, _ => text).join('')}
      </div>
    </div>
  `
}