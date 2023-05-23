

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


// const prbWeightedContent = (showEmojis) => {
//   const textPrb = textLists.map(c => [c.length, c])
//   const emojiPrb = emojiLists.map(c => [c.length, c])

//   return showEmojis
//     ? chance(...textPrb, ...emojiPrb)
//     : chance(...textPrb).filter(x => !Array.isArray(x))
// }
// function chooseContent2() {
//   let contentSample = []
//   let content = []
//   const sections = chance(
//     [35, 1],
//     [30, 2],
//     [25, 3],
//     [10, 0] // everything
//   )

//   const selections = chance(
//     [15, 1],
//     [25, 2],
//     [35, 3],
//     [10, 4],
//     [10, 5],
//     [5, 0], // everything
//   )

//   console.log(sections, selections)

//   if (sections) {
//     times(sections, s => {
//       const section = chance(
//         [textList.length,
//           sample(textLists)
//         ],
//         [emojiLists.length*1.5,
//           [chance(...emojiLists.map(c => [c.length, c]))]
//         ]
//       )

//       contentSample.push(section)
//     })
//   } else {
//     contentSample = [...textLists, ...emojiLists]
//   }
//   if (selections) {
//     times(selections, s => content.push(sample(contentSample.flat())))
//   } else {
//     content = contentSample.flat()
//   }

//   const output = content.map(c => {
//     // if (Array.isArray(c)) return sample(c)
//     if (typeof c === 'string') return word(c + (prb(0.25) ? '!' : ''))
//     return c
//   })

// // debugger
//   return output.flat()
// }

// function chooseContent() {
//   let contentSample = []
//   let content = []

//   const sections = chance(
//     [35, 1],
//     [30, 2],
//     [25, 3],
//     [10, 0] // everything
//   )

//   const selections = chance(
//     [15, 1],
//     [25, 2],
//     [35, 3],
//     [10, 4],
//     [10, 5],
//     [5, 0], // everything
//   )

//   const showEmojis = prb(emojiPresenceProb)

//   if (sections) {
//     times(sections, s => contentSample.push(prbWeightedContent(showEmojis)))
//   } else {
//     contentSample = [...textLists, ...emojiLists]
//   }

//   if (selections) {
//     times(selections, s => content.push(sample(contentSample.flat())))
//   } else {
//     content = contentSample.flat()
//   }

//   const output = content.map(c => {
//     if (Array.isArray(c)) return sample(c)
//     if (typeof c === 'string') return word(c + (prb(0.25) ? '!' : ''))
//     return c
//   })

//   return output
// }

// const content = chooseContent2()



// const emojiList = `💸 🤑 🔥 😂 💥 🍻 🎉 🕺 💃 🎊 🍾 🥂 🥳 🎈 💶 💰 💎 👑 💍 🎁 🥇 💲 🌟 🚀 🙌 ⚡️ ❤️‍🔥 💫 🚨 🤯 ✨ 🤩 🏎 🔟 🦄 🌈 ❓ 🍀 💪 🌋 🏖 📛 😍 💩 👨‍💻 🧑‍💻 👩‍💻 🌎 🕸 👁 👁‍🗨 → ← ★ ‼️ ❗️ 💋 🍆 🍑 🌶 💥 🍬 🍭 🎂 🍫 🏄‍♂️ 😵‍💫 🤡 ☄️ 🍦 🎨 💷 💴 💵 🧨 💣 💹 🔊 🇺🇸 🌜 🌛 🌝 🌞 🐄 🎰 🍒 🪙 🔔 🍉 🍇 🍋 🎄 🍄 ❄️ 💦 📈`
//   .split(' ')



// sweet money multiplier, electric, boost, champion, forbidden, pure bliss, ecstacy, ecstatic, infinite joy, bonanza, extra, frenzy, treasure, double down, whopping, certified, galore

// const allContent = [
//   [word('→'), word('←')],
//   [word('★', false, 0.5)],
//   [word('$$$$')],
//   [word('$$$$')],
//   [word('$$$$')],
//   [word('$$$$')],
//   [emoji(`💸`)],
//   [emoji(`🤑`)],
//   [emoji(`🔥`)],
//   [emoji(`😂`)],
//   [emoji(`💥`)],
//   emojis(`🍻 🎉 🕺 💃 🎊 🍾 🥂 🥳 🎈`),
//   emojis(`💸 💶 💷 💴 💵 💰 💎 👑 💍 🤑 🎁 🥇 💲 💹 📈`),
//   emojis(`🌟 🚀 🙌 ⚡️ ❤️‍🔥 💫 🚨 💥 🔥 🌋 🤯 ✨ 🤩 🏎 🌞 ☄️ 🧨 💣`),
//   emojis(`🔟 🦄 🌈 ❓ 🍀 💪 🏖 📛 😍 💩 🏄‍♂️ 😵‍💫 🤡 🔊 🇺🇸`),
//   emojis(`🎰 🍒 🪙 🔔 🍉 🍇 🍋`),
//   emojis(`🍬 🍭 🎂 🍫 🍦 🎄 🍄 ❄️`),
//   // emojis(`👨‍💻 🧑‍💻 👩‍💻 🌎 🕸 👁 👁‍🗨`),
//   emojis(`🌎 👁 👁‍🗨`),

//   [word('>>>>'), word('<<<<')],
//   [word('!!!!'), ...emojis(`‼️ ❗️`)],

//   [word(`WINNER`), word(`LOSER`)],
//   [word(`FUN`)],
//   [word(`WOW`)],
//   [word(`NEW`)],
//   [word(`WTF`)],
//   [word(`LOL`)],
//   [word(`OMG`)],
//   [word(`NFTs`)],
//   [word(`HOT!`)],
//   [word(`LUCKY`)],
//   [word(`SEXY`), word(`XXX`), ...emojis(`💋 🍆 🍑 🌶 💦`)],
//   [word(`FREE`)],
//   [word(`FOMO`)],
//   [word(`HYPE`)],
//   [word(`WAGMI`)],
//   [word(`DEALS`)],
//   [word(`FRESH`)],
//   [word(`DEGEN`)],
//   [word(`GRAIL`)],
//   [word(`CRYPTO`)],
//   [word(`SO HOT`)],
//   [word(`SO COOL`)],
//   [word(`BUY NOW`)],
//   [word(`WIN BIG`)],
//   [word(`HIT IT BIG`)],
//   [word(`AMAZING`)],
//   [word(`BARGAIN`)],
//   [word(`WARNING`)],
//   [word(`JACKPOT`)],
//   [word(`ACT NOW`)],
//   [word(`SO CHEAP`)],
//   [word(`SELL OUT`)],
//   [word(`CASH COW`), emoji`🐄`],
//   [word(`SIZZLING`)],
//   [word(`MEGA WIN`)],
//   // [word(`UNDEFINED`)],
//   [word(`HOT STUFF`)],
//   [word(`EXCITING!`)],
//   [word(`THRILLING`)],
//   [word(`HOLY MOLY`)],
//   [word(`FAST CASH`)],
//   [word(`I LOVE IT`)],
//   [word(`GOLD MINE`)],
//   [word(`HA HA HA HA`)],
//   [word(`DYOR`), word(`DO YOUR OWN RESEARCH`, 3)],
//   [word(`NFA`), word(`NOT FINANCIAL ADVICE`, 3)],
//   // [word(`<a class="clickhere">CLICK HERE</a>`)],
//   [word(`DON'T WAIT`, 2)],
//   [word(`PURE BLISS`, 2)],
//   [word(`INCREDIBLE`, 2)],
//   [word(`DANGER ZONE`, 2)],
//   [word(`MILLIONAIRE`, 2)],
//   [word(`BILLIONAIRE`, 2)],
//   [word(`WHAT A DEAL`, 2)],
//   [word(`GOOD PRICES`, 2)],
//   [word(`CRAZY DEALS`, 2)],
//   [word(`PUMP + DUMP`, 2)],
//   [word(`HIGH OCTANE`, 2)],
//   [word(`SUPERCHARGED`, 2), emoji`⚡️`],
//   [word(`UNBELIEVABLE`, 2)],
//   [word(`TRILLIONAIRE`, 2)],
//   [word(`NEW PARADIGM`, 2)],
//   [word(`SAFE + SECURE`, 2)],
//   [word(`PAY ATTENTION`, 2)],
//   [word(`WHAT A THRILL`, 2)],
//   [word(`MASSIVE GAINS`, 2)],
//   [word(`WHAT A BARGAIN`, 2)],
//   [word(`INSANE PRICES!`, 2)],
//   [word(`DON'T MISS OUT`, 2)],
//   [word(`CRYPTO FORTUNE`, 2)],
//   [word(`GET RICH QUICK`, 2)],
//   [word(`YOU DESERVE IT`, 2)],
//   [word(`YIELD EXPLOSION`, 2), emoji`💥`],
//   [word(`THROBBING GAINS`, 2)],
//   [word(`THIS WON'T LAST`, 2)],
//   [word(`CONGRATULATIONS`, 2)],
//   // [word(`<a href="http://fastcashmoneyplus.biz" target="_blank">MAKE FAST CASH NOW</a>`, 3)],
//   [word(`BELIEVE THE HYPE`, 2)],
//   [word(`TOO HOT TO HANDLE`, 3), ...emojis(`🔥 ❤️‍🔥`)],
//   // [word(`SPARK YOUR DESIRE`, 3)],
//   [word(`MAKE FAST CASH NOW`, 3)],
//   [word(`HOTTEST ART AROUND`, 3), emoji`🎨`],
//   [word(`LIMITED TIME OFFER`, 3)],
//   // [word(`PASSION FOR PROFITS`, 3)],
//   [word(`TIME IS RUNNING OUT`, 3)],
//   [word(`TOO GOOD TO BE TRUE`, 3)],
//   [word(`YOU ONLY LIVE ONCE`, 3), word('YOLO')],
//   [word(`FEAR OF MISSING OUT`, 3)],
//   [word(`DEAL OF THE CENTURY`, 3)],
//   [word(`NEVER LOOKED SO GOOD`, 3)],
//   [word(`TOO GOOD TO BE TRUE`, 3)],
//   [word(`STRAIGHT TO THE MOON`, 3), ...emojis(`🌜 🌛 🌝`)],
//   [word(`Do you CRAVE YIELD?`, 3)],
//   [word(`THIS IS THE REAL DEAL`, 3)],
//   [word(`THIS NFT SELLS ITSELF`, 3)],
//   [word(`THINGS ARE MOVING FAST`, 3)],
//   [word(`FEAR UNCERTAINTY DOUBT`, 3)],
//   // [word(`[object HTMLDivElement]`, 3)],
//   [word(`YOU WON'T BELIEVE THIS!`, 3)],
//   [word(`THIS IS GOING TO BE HUGE`, 3.5)],
//   [word(`OPPORTUNITY OF A LIFETIME`, 3.5)],
//   [word(`WHAT YOU SEE IS WHAT YOU GET`, 4)],
//   [word(`MAKE GENERATIONAL WEALTH NOW`, 4)],
//   [word(`I COULDN'T BELIEVE IT EITHER`, 4)],
//   [word(`ACT NOW (Before It's Too Late)`, 4.5)],
//   [word(`Stop THROWING YOUR MONEY AWAY`, 4.5)],
//   [word(`YOU CAN'T AFFORD TO PASS THIS UP`, 4.5)],
//   [word(`PAST PERFORMANCE DOES NOT GUARANTEE FUTURE RESULTS`, 8)],
//   [word(`BY USING THIS WEBSITE YOU AGREE TO IT'S TERMS OF SERVICE`, 8)]
// ]


// const content = chance(
//   [15, allContent.flat()],
//   [15, sample(allContent)],
//   [25, [sample(allContent), sample(allContent)].flat()],
//   [35, [sample(allContent), sample(allContent), sample(allContent)].flat()],
//   // [8, [word(`FEAR`), word(`UNCERTAINTY`), word(`DOUBT`)]],
//   [2, emojis(`💸 🤑 🔥 😂 💥`)]
// )
// .map(c => {
//   if (
//     ![...emojiList, '$$$$', 'XXX', '<<<<', '>>>>', '!!!!'].includes(c.innerHTML)
//     && prb(0.25)
//   ) {
//     c.innerHTML += '!'
//   }

//   return c
// })

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
