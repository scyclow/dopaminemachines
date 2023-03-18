

const main = $.main(
  flexSection(rows, cols) ,
  {
    id: 'main',
    style: `
      height: 100vh;
      width: 100vw;
      overflow: hidden;
      display: grid;
      grid-template-rows: repeat(${rows}, 1fr);
      grid-template-columns: repeat(${cols}, 1fr);
    `
  }
)

const usedContent = Array.from(
  new Set(
    Array.from(main.getElementsByClassName('content')).map(e => e.innerHTML)

  )
)


setMetadata(usedContent.join(' '))




window.onload = () => {

  $.render(document.body, main)

  let usingPolyfill = USE_EMOJI_POLYFILL

  document.onkeydown = (event) => {
    if (event.key === 'e') {
      if (usingPolyfill) {
        Array.from(document.getElementsByTagName('img')).forEach(img => {
          img.replaceWith(img.alt)
        })
      } else {
        twemoji.parse(
          document.body, {
            folder: 'svg',
            ext: '.svg',
            className: 'emojiPolyfill'
          }
        )
      }

      usingPolyfill = !usingPolyfill
    }
  }

  if (USE_EMOJI_POLYFILL) {
    twemoji.parse(document.body, {
      folder: 'svg',
      ext: '.svg',
      className: 'emojiPolyfill'
    })
  }
}