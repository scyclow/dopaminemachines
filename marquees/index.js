
setMetadata(content.map(c => c.innerHTML).join(' '))



const main = $.main(
  [
    flexSection(rows, cols)
  ],
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





window.onload = () => {
  $.render(document.body, main)
  if (USE_EMOJI_POLYFILL) {
    twemoji.parse(document.body, {
      folder: 'svg',
      ext: '.svg',
      className: 'emojiPolyfill'
    })
  }
}