
const word = (txt, slow, margin=1, fontSize=1) => `
  <span style="margin-right: ${margin}em; font-size: ${fontSize}em" ${slow ? `slow=${slow.toFixed(1)}` : ''}>
    ${txt}
  </span>
`

const emoji = e => word(e, 1, 0.1, 0.9)

const emojis = es => es.split(' ').map(emoji)



/*
  content categories
    - sexy
    - exciting
    - fearful
    - money

*/

const allContent = [
  ['→', '←'],
  [word('★', false, 0.5)],
  ['$$$$'],
  ['$$$$'],
  ['$$$$'],
  ['$$$$'],
  [emoji(`💸`)],
  [emoji(`🤑`)],
  [emoji(`🔥`)],
  [emoji(`😂`)],
  [emoji(`💥`)],
  emojis(`🍻 🎉 🕺 💃 🎊 🍾 🥂 🥳 🎈`),
  emojis(`💸 💶 💰 💎 👑 💍 🤑 🎁 🥇 💲`),
  emojis(`🌟 🚀 🙌 ⚡️ ❤️‍🔥 💫 🚨 💥 🔥 🤯 ✨ 🤩 🏎`),
  emojis(`🔟 🦄 🌈 ❓ 🍀 💪 🌋 🏖 📛 😍 💩`),
  emojis(`👨‍💻 🧑‍💻 👩‍💻 🌎 🕸 👁 👁‍🗨`),

  ['>>>>', '<<<<'],
  ['!!!!', ...emojis(`‼️ ❗️`)],

  [word(`WINNER`), word(`LOSER`)],
  [word(`FUN`)],
  [word(`WOW`)],
  [word(`WOW!`)],
  [word(`NFTs`)],
  [word(`HOT!`)],
  [word(`LUCKY`)],
  [word(`SEXY`), word(`XXX`), ...emojis(`💋 🍆 🍑`)],
  [word(`FREE`)],
  [word(`FOMO`)],
  [word(`DEALS`)],
  [word(`DEGEN`)],
  [word(`CRYPTO`)],
  [word(`SO HOT`)],
  [word(`SO COOL`)],
  [word(`BUY NOW`)],
  [word(`AMAZING!`)],
  [word(`BARGAIN`)],
  [word(`WARNING`)],
  [word(`JACKPOT`)],
  [word(`ACT NOW`)],
  [word(`EXCITING!`)],
  [word(`MILLIONAIRE`)],
  [word(`BILLIONAIRE`)],
  [word(`TRILLIONAIRE`)],
  [word(`WTF`), word(`LOL`), word(`OMG`), word(`WAGMI`)],
  [word(`DYOR`), word(`DO YOUR OWN RESEARCH`, 3)],
  [word(`NFA`), word(`NOT FINANCIAL ADVICE`, 3)],
  // [word(`<a class="clickhere">CLICK HERE</a>`)],
  [word(`DON'T WAIT`, 2)],
  [word(`DANGER ZONE`, 2)],
  [word(`WHAT A DEAL!`, 2)],
  [word(`CRAZY DEALS!`, 2)],
  [word(`SAFE + SECURE`, 2)],
  [word(`UNBELIEVABLE!`, 2)],
  [word(`INSANE PRICES!`, 2)],
  [word(`DON'T MISS OUT`, 2)],
  [word(`CRYPTO FORTUNE`, 2)],
  [word(`GET RICH QUICK`, 2)],
  [word(`YIELD EXPLOSION`, 2)],
  [word(`THROBBING GAINS`, 2)],
  [word(`THIS WON'T LAST`, 2)],
  [word(`CONGRATULATIONS`, 2)],
  // [word(`<a href="http://fastcashmoneyplus.biz" target="_blank">MAKE FAST CASH NOW</a>`, 3)],
  [word(`MAKE FAST CASH NOW`, 3)],
  [word(`HOTTEST ART AROUND`, 3)],
  [word(`TOO GOOD TO BE TRUE`, 3)],
  [word(`FEAR OF MISSING OUT`, 3)],
  [word(`DEAL OF THE CENTURY`, 3)],
  [word(`NEVER LOOKED SO GOOD`, 3)],
  [word(`TOO GOOD TO BE TRUE!`, 3)],
  [word(`Do you CRAVE YIELD?!`, 3)],
  [word(`THINGS ARE MOVING FAST`, 3)],
  [word(`FEAR UNCERTAINTY DOUBT`, 3)],
  [word(`[object HTMLDivElement]`, 3)],
  [word(`YOU WON'T BELIEVE THIS!`, 3)],
  [word(`OPPORTUNITY OF A LIFETIME`, 3.5)],
  [word(`MAKE GENERATIONAL WEALTH NOW`, 4)],
  [word(`I COULDN'T BELIEVE IT EITHER!`, 4)],
  [word(`ACT NOW (Before It's Too Late)`, 4.5)],
  [word(`Stop THROWING YOUR MONEY AWAY!`, 4.5)],
  [word(`YOU CAN'T AFFORD TO PASS THIS UP`, 4.5)],
  [word(`PAST PERFORMANCE DOES NOT GUARANTEE FUTURE RESULTS`, 8)],
  [word(`BY USING THIS WEBSITE YOU AGREE TO IT'S TERMS OF SERVICE`, 8)]
]


const content = chance(
  [15, allContent.flat()],
  [15, sample(allContent)],
  [25, [sample(allContent), sample(allContent)].flat()],
  [35, [sample(allContent), sample(allContent), sample(allContent)].flat()],
  [8, [word(`FEAR`), word(`UNCERTAINTY`), word(`DOUBT`)]],
  [2, emojis(`💸 🤑 🔥 😂 💥`)]
)