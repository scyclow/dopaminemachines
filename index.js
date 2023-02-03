
function setup() {

}


function init() {
  setMetadata()



  const $main = $.main(
    times(200,
      t => $.div(0, {style: `background: hsl(${rnd(360)}deg, 100%, 50%); height: 50px;`})
    ),
    { style: `
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
    `}
  )
  $.render($body, $main)

}

setup()
init()


