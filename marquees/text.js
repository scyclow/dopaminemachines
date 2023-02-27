
const word = (txt, slow, margin=1, fontSize=1) =>
  $.span(txt, {
    style: `
      margin-right: ${
        // margin
        0
      }em;
      font-size: ${fontSize}em;
    `
  })


// `
//   <span style="margin-right: ${margin}em; font-size: ${fontSize}em" ${slow ? `slow=${slow.toFixed(1)}` : ''}>
//     ${txt}
//   </span>
// `

const emoji = e => word(e, 1, 0.1, 0.9)

const emojis = es => es.split(' ').map(emoji)



/*
  content categories
    - sexy
    - exciting
    - fearful
    - money

*/

const emojiList = `💸 🤑 🔥 😂 💥 🍻 🎉 🕺 💃 🎊 🍾 🥂 🥳 🎈 💸 💶 💰 💎 👑 💍 🤑 🎁 🥇 💲 🌟 🚀 🙌 ⚡️ ❤️‍🔥 💫 🚨 💥 🔥 🤯 ✨ 🤩 🏎 🔟 🦄 🌈 ❓ 🍀 💪 🌋 🏖 📛 😍 💩 👨‍💻 🧑‍💻 👩‍💻 🌎 🕸 👁 👁‍🗨 → ← ★ ‼️ ❗️ 💋 🍆 🍑 🌶 💥 🍬 🍭 🎂 🍫 🏄‍♂️ 😵‍💫 🤡 ☄️ 🍦 🎨 💷 💴 💵 🧨 💣 💹 🔊 🇺🇸 🌜 🌛 🌝 🌞 🐄 🎰 🍒 🪙 🔔 🍉 🍇 🍋`
  .split(' ')



  // money multiplier, electric, boost, champion, forbidden, pure bliss, ecstacy, ecstatic, infinite joy, bonanza, extra, frenzy, treasure, double down, whopping, certified, galore

const allContent = [
  [word('→'), word('←')],
  [word('★', false, 0.5)],
  [word('$$$$')],
  [word('$$$$')],
  [word('$$$$')],
  [word('$$$$')],
  [emoji(`💸`)],
  [emoji(`🤑`)],
  [emoji(`🔥`)],
  [emoji(`😂`)],
  [emoji(`💥`)],
  emojis(`🍻 🎉 🕺 💃 🎊 🍾 🥂 🥳 🎈`),
  emojis(`💸 💶 💷 💴 💵 💰 💎 👑 💍 🤑 🎁 🥇 💲 💹 📈`),
  emojis(`🌟 🚀 🙌 ⚡️ ❤️‍🔥 💫 🚨 💥 🔥 🌋 🤯 ✨ 🤩 🏎 🌞 ☄️ 🧨 💣`),
  emojis(`🔟 🦄 🌈 ❓ 🍀 💪 🏖 📛 😍 💩 🏄‍♂️ 😵‍💫 🤡 🔊 🇺🇸`),
  emojis(`🎰 🍒 🪙 🔔 🍉 🍇 🍋`),
  emojis(`🍬 🍭 🎂 🍫 🍦`),
  // emojis(`👨‍💻 🧑‍💻 👩‍💻 🌎 🕸 👁 👁‍🗨`),
  emojis(`🌎 👁 👁‍🗨`),

  [word('>>>>'), word('<<<<')],
  [word('!!!!'), ...emojis(`‼️ ❗️`)],

  [word(`WINNER`), word(`LOSER`)],
  [word(`FUN`)],
  [word(`WOW`)],
  [word(`NEW`)],
  [word(`NFTs`)],
  [word(`HOT!`)],
  [word(`LUCKY`)],
  [word(`SEXY`), word(`XXX`), ...emojis(`💋 🍆 🍑 🌶`)],
  [word(`FREE`)],
  [word(`FOMO`)],
  [word(`HYPE`)],
  [word(`DEALS`)],
  [word(`FRESH`)],
  [word(`DEGEN`)],
  [word(`GRAIL`)],
  [word(`CRYPTO`)],
  [word(`SO HOT`)],
  [word(`SO COOL`)],
  [word(`BUY NOW`)],
  [word(`WIN BIG`)],
  [word(`HIT IT BIG`)],
  [word(`AMAZING`)],
  [word(`BARGAIN`)],
  [word(`WARNING`)],
  [word(`JACKPOT`)],
  [word(`ACT NOW`)],
  [word(`SO CHEAP`)],
  [word(`SELL OUT`)],
  [word(`CASH COW`), emoji`🐄`],
  [word(`SIZZLING`)],
  [word(`MEGA WIN`)],
  // [word(`UNDEFINED`)],
  [word(`HOT STUFF`)],
  [word(`EXCITING!`)],
  [word(`THRILLING`)],
  [word(`HOLY MOLY`)],
  [word(`FAST CASH`)],
  [word(`I LOVE IT`)],
  [word(`GOLD MINE`)],
  [word(`HA HA HA HA`)],
  [word(`WTF`), word(`LOL`), word(`OMG`), word(`WAGMI`)],
  [word(`DYOR`), word(`DO YOUR OWN RESEARCH`, 3)],
  [word(`NFA`), word(`NOT FINANCIAL ADVICE`, 3)],
  // [word(`<a class="clickhere">CLICK HERE</a>`)],
  [word(`DON'T WAIT`, 2)],
  [word(`PURE BLISS`, 2)],
  [word(`INCREDIBLE`, 2)],
  [word(`DANGER ZONE`, 2)],
  [word(`MILLIONAIRE`, 2)],
  [word(`BILLIONAIRE`, 2)],
  [word(`WHAT A DEAL`, 2)],
  [word(`GOOD PRICES`, 2)],
  [word(`CRAZY DEALS`, 2)],
  [word(`PUMP + DUMP`, 2)],
  [word(`HIGH OCTANE`, 2)],
  [word(`SUPERCHARGED`, 2), emoji`⚡️`],
  [word(`UNBELIEVABLE`, 2)],
  [word(`TRILLIONAIRE`, 2)],
  [word(`NEW PARADIGM`, 2)],
  [word(`SAFE + SECURE`, 2)],
  [word(`PAY ATTENTION`, 2)],
  [word(`WHAT A THRILL`, 2)],
  [word(`MASSIVE GAINS`, 2)],
  [word(`WHAT A BARGAIN`, 2)],
  [word(`INSANE PRICES!`, 2)],
  [word(`DON'T MISS OUT`, 2)],
  [word(`CRYPTO FORTUNE`, 2)],
  [word(`GET RICH QUICK`, 2)],
  [word(`YOU DESERVE IT`, 2)],
  [word(`YIELD EXPLOSION`, 2), emoji`💥`],
  [word(`THROBBING GAINS`, 2)],
  [word(`THIS WON'T LAST`, 2)],
  [word(`CONGRATULATIONS`, 2)],
  // [word(`<a href="http://fastcashmoneyplus.biz" target="_blank">MAKE FAST CASH NOW</a>`, 3)],
  [word(`BELIEVE THE HYPE`, 2)],
  [word(`TOO HOT TO HANDLE`, 3), ...emojis(`🔥 ❤️‍🔥`)],
  // [word(`SPARK YOUR DESIRE`, 3)],
  [word(`MAKE FAST CASH NOW`, 3)],
  [word(`HOTTEST ART AROUND`, 3), emoji`🎨`],
  [word(`LIMITED TIME OFFER`, 3)],
  // [word(`PASSION FOR PROFITS`, 3)],
  [word(`TIME IS RUNNING OUT`, 3)],
  [word(`TOO GOOD TO BE TRUE`, 3)],
  [word(`YOU ONLY LIVE ONCE`, 3), word('YOLO')],
  [word(`FEAR OF MISSING OUT`, 3)],
  [word(`DEAL OF THE CENTURY`, 3)],
  [word(`NEVER LOOKED SO GOOD`, 3)],
  [word(`TOO GOOD TO BE TRUE`, 3)],
  [word(`STRAIGHT TO THE MOON`, 3), ...emojis(`🌜 🌛 🌝`)],
  [word(`Do you CRAVE YIELD?`, 3)],
  [word(`THIS IS THE REAL DEAL`, 3)],
  [word(`THIS NFT SELLS ITSELF`, 3)],
  [word(`THINGS ARE MOVING FAST`, 3)],
  [word(`FEAR UNCERTAINTY DOUBT`, 3)],
  // [word(`[object HTMLDivElement]`, 3)],
  [word(`YOU WON'T BELIEVE THIS!`, 3)],
  [word(`THIS IS GOING TO BE HUGE`, 3.5)],
  [word(`OPPORTUNITY OF A LIFETIME`, 3.5)],
  [word(`WHAT YOU SEE IS WHAT YOU GET`, 4)],
  [word(`MAKE GENERATIONAL WEALTH NOW`, 4)],
  [word(`I COULDN'T BELIEVE IT EITHER`, 4)],
  [word(`ACT NOW (Before It's Too Late)`, 4.5)],
  [word(`Stop THROWING YOUR MONEY AWAY`, 4.5)],
  [word(`YOU CAN'T AFFORD TO PASS THIS UP`, 4.5)],
  [word(`PAST PERFORMANCE DOES NOT GUARANTEE FUTURE RESULTS`, 8)],
  [word(`BY USING THIS WEBSITE YOU AGREE TO IT'S TERMS OF SERVICE`, 8)]
]

const content = chance(
  [15, allContent.flat()],
  [15, sample(allContent)],
  [25, [sample(allContent), sample(allContent)].flat()],
  [35, [sample(allContent), sample(allContent), sample(allContent)].flat()],
  // [8, [word(`FEAR`), word(`UNCERTAINTY`), word(`DOUBT`)]],
  [2, emojis(`💸 🤑 🔥 😂 💥`)]
)
.map(c => {
  if (
    ![...emojiList, '$$$$', 'XXX', '<<<<', '>>>>', '!!!!'].includes(c.innerHTML)
    && prb(0.25)
  ) {
    c.innerHTML += '!'
  }

  return c
})


const adjustCharLength = txt => {
  let lenText = txt;
  [...emojiList, '&lt;', '&gt;'].forEach(c => lenText = lenText.replaceAll(c, '1'))
  return lenText.length
}