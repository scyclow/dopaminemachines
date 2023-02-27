
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





$.render($body, main)