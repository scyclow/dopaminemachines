

  /*
    Potential layouts

    Quarter components
      [Q || dynamic] [Q || dynamic]
      [Q || dynamic] [Q || dynamic]

    News Layout
      [H              ]
      [content  ][  Ad]
      [content  ][  Ad]
      [content  ][  Ad]

    Social Layout



    news component
    <container width/height based on grid>
      <header width/height based on content></header>
      <content fills remaining space></content>
    </container>



    quarter components
      grid of emojis/symbols, size wave
      grid of emojis/symbols, rotating wave
      one big emoji/symbol, grow/shrink
      emoji(s)/symbol(s) bounce around
      single emoji/symbol rotating


    marquee varient
      if r > c
        bounce left<>right
      if c > r
        bounce up<>down


  */



  function shortComponentContainer(size) {}

  function tallComponentContainer(size) {}

  function normalComponentContainer(children, size, style) {
    return $.section(
      children, {
        class: 'normalComponentContainer',
        style: `
          overflow: hidden;
          grid-row: span ${size*rows};
          grid-column: span ${size*cols};
          display: inline-flex;
          align-items: center;
          justify-content: center;
          ${style || ''}
        `
      }
    )
  }
  function flexboxSection(children, size, style='') {
    return $.div(children, {
      style: `
        grid-row: span ${size*rows};
        grid-column: span ${size*cols};
        display: flex;
        align-items: center;
        justify-content: center;
        ${style || ''}
      `
    })
  }




  function singleGrowShrinkDance(content, size, delay=0) {
    return growShrink(dance(content, { style: `font-size: ${size*50}vmin` }), {delay})
  }


  function multipleGrowShrinkDance(content, size) {
    const children = times(20, t => growShrink(
      dance(
        content, {
          style: `font-size: ${size*20}vmin;`,
          delay: t*200/20
        }), {
        delay: (t*1000)/20
      })
    )

    return $.div(children, {
      style: `
        height: ${size*100}vh;
        width: ${size*125}vw;
        display: grid;
        grid-template-rows: repeat(4, 1fr);
        grid-template-columns: repeat(5, 1fr);
        align-items: center;
        justify-items: center;
      `
    })
  }


  function multipleGrowShrinkDance2(content, size, cells) {
    const totalCells = cells * cells * 1.25
    const children = times(totalCells, t => growShrink(
      dance(
        content, {
          style: `font-size: ${size*20 * (20/totalCells)}vmin;`,
          delay: t*200/totalCells
        }), {
        delay: (t*1000)/totalCells
      })
    )


    return $.div(children, {
      style: `
        height: ${size*100}vh;
        width: ${size*125}vw;
        display: grid;
        grid-template-rows: repeat(${cells}, 1fr);
        grid-template-columns: repeat(${int(cells*1.25)}, 1fr);
        align-items: center;
        justify-items: center;
      `
    })
  }



  function singleSpin(content, size) {
    return spin(content, { style: `font-size: ${size*50}vmin` })
  }

  function singlePivot(content, size) {
    return pivot(content, { style: `font-size: ${size*40}vmin` })
  }

  function singleLeftRight(content, size) {
    return leftRight(content, { style: `font-size: ${size*30}vmin`, duration: 2000 })
  }




  function comment(size) {
    return $.div([
        $.div('🙂'),
        $.div('Wow, what a great comment!')
      ], {
        style:`
          border: 2px solid black;
          border-radius: 4px;
          padding: 1em;
          display: flex;
          align-items: center;
        `
      }
    )
  }









  function socialLayout(size) {
    return $.section([
        $.div(
          [],
          {
            style: `
              grid-column: span 3;
              border: 3px solid black;
              display: flex;
              flex-direction: column;
              align-items: center;
              overflow: scroll;
            `
          }
        ),



        $.div([
          comment(0.5),
          comment(0.5),
          comment(0.5),
          comment(0.5),
          comment(0.5),
        ], {
          style: `
            grid-column: span 5;
            border: 3px solid black;
            display: flex;
            flex-direction: column;
            align-items: center;
            overflow: scroll;
          `
        }
      ),



        $.div(times(10, t => {
          const child = sample(content)

          return growShrink(child, {delay:rnd(1000), duration: rnd(500, 4000) ,style: `font-size: ${20-child.length/6}vmin`})
        }), {
            style: `
              grid-column: span 2;
              border: 3px solid black;
              display: flex;
              flex-direction: column;
              align-items: center;
              overflow: scroll;
            `
          }),
      ], {
      style: `
        overflow: hidden;
        grid-row: span ${size*rows};
        grid-column: span ${size*cols};
        display: grid;
        grid-template-rows: 1fr;
        grid-template-columns: repeat(10, 1fr);
      `
    })
  }



  function componentViewerSection(size, content, delay) {
    return $.section(
      normalComponentContainer(

        (wave('HOLY MOLY', { style: `font-size: 10vmin`, duration: 2000 })),
        // vSiren('WOW', { style: `font-size: 10vmin`}),
        size,
        `
          background: radial-gradient(#fff 0%, #eee 40%, #bbb 70%, #000 150%);
        `
      )
      // flexSection(rows*size, cols*size)


      , {
        style: `
          border: 1px solid red;
          overflow: hidden;
          grid-row: span ${size*rows};
          grid-column: span ${size*cols};
          display: grid;
          grid-template-rows: repeat(${size*rows}, 1fr);
          grid-template-columns: repeat(${size*cols}, 1fr);
        `
      }
    )
  }
