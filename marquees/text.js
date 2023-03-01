
// const word = (txt, slow, margin=1, fontSize=1) =>
const wordExt = (txt, margin=1, fontSize=1) =>
  $.span(txt, {
    style: `
      margin-right: ${
        // margin
        0
      }em;
      font-size: ${fontSize}em;
    `
  })

const word = txt => wordExt(txt)


// `
//   <span style="margin-right: ${margin}em; font-size: ${fontSize}em" ${slow ? `slow=${slow.toFixed(1)}` : ''}>
//     ${txt}
//   </span>
// `

const emoji = e => word(e, 0.1, 0.9)

const emojis = es => es.split(' ').map(emoji)



/*
  content categories
    - sexy
    - exciting
    - fearful
    - money

*/

const money1 = emojis(`💸 💰 💎 👑 💍 🪙`)
const moneyFull = emojis(`🤑 💶 💲 💹 📈 💷 💴 💵`, ...money1)
const fruit1 = emojis(`🍒 🍉 🍇 🍋 🍯`)
const fruit2 = emojis(`🍆 🍑 🌶`)
const booze = emojis(`🍻 🍾 🥂`)
const hot = emojis(`🌶 🔥 ❤️‍🔥 🌋`)
const lucky = [...emojis(`🍀 🎰 🔔 🚨 🎁 🥇 🌟`), ...fruit1, ...money1]
const drugs = [...emojis(`🎄 🍄 ❄️ 😵‍💫`), ...booze]
const party = [...emojis(`🎉 🕺 💃 🎊 🥳 🎈`), ...booze]
const energy = emojis(`💫 🔥 🚀 ⚡️`)
const explosion1 = emojis(`💥 🤯 🧨 💣`)
const explosionFull = [...explosion1, ...energy, ...emojis(`🌋 ☄️`)]
const sexy = [...emojis(`🦄 🌈 💋 💦 😍 ❤️‍🔥 ❤️`), ...fruit2]
const yummy = [...emojis(`🍬 🍭 🎂 🍫 🍦 🍄`), ...fruit1, ...fruit2]
const usa = emojis(`🏎 🇺🇸 ★`)
const relaxing = emojis(`🏖 🏄‍♂️`)
const funny = emojis(`🐄 🤡 💩 😂`)
const symbols = emojis(`★ → ←`)
const lunar = emojis(`🌜 🌛 🌝 🌞 🐄 🌎 🌟`, ...energy)
const colorful = [...emojis(`🍭 🎨 🌈 🦄 🎉`), ...fruit1]
const attention = emojis(`‼️ ❗️ ❓`)
const loud = [...emojis(`‼️ ❗️ 🔊`), ...explosion1]
const misc = emojis(`✨ 🙌 🤩 💪 ⚠️`)
const computer = emojis(`👨‍💻 🧑‍💻 👩‍💻 🕸 👁 👁‍🗨 🌎`)
const maybe = emojis(`🔟 📛`)
const commonEmojis = emojis(`💸 🤑 🔥 😂 💥`)

const emojiLists = [
  moneyFull,
  booze,
  hot,
  lucky,
  drugs,
  party,
  energy,
  explosion1,
  explosionFull,
  sexy,
  yummy,
  usa,
  relaxing,
  funny,
  symbols,
  lunar,
  colorful,
  attention,
  loud,
  misc,
  computer,
  maybe,
  commonEmojis,
]

const emojiList = emojiLists.flat().map(e => e.innerHTML)



const luckyText = [
  'WINNER',
  'LUCKY',
  'CONGRATULATIONS',
  'WIN BIG',
  'MEGA WIN',
  'JACKPOT',
  'HIT IT BIG',
  '777',
  [...lucky]
]
const dealsText = [
  'DEAL OF THE CENTURY',
  'DEALS',
  'WHAT A BARGAIN',
  'WHAT A DEAL',
  'BARGAIN',
  'BUY NOW',
  'CHEAP',
  'SO CHEAP',
  'SELL OUT',
  'GOOD PRICES',
  'CRAZY DEALS',
  'NEW',
  'INSANE PRICES',
  'LIMITED TIME OFFER',
  'FREE',
  'DEALS',
]
const cashText = [
  `Do you CRAVE YIELD?`,
  `MAKE GENERATIONAL WEALTH NOW`,
  'MAKE FAST CASH NOW',
  'MAKE CASH FAST',
  'GOLD MINE',
  'FAST CASH',
  '$$$$',
  'CASH COW',
  'MILLIONAIRE',
  'BILLIONAIRE',
  'TRILLIONAIRE',
  'PUMP + DUMP',
  'CRYPTO FORTUNE',
  'GET RICH QUICK',
  `YIELD EXPLOSION`,
  [...moneyFull]
]
const sexyText = [
  'SEXY',
  'XXX',
  'HOT',
  'SO HOT',
  'SPICY',
  'SO SEXY',
  'PURE BLISS',
  [...sexy]
]
const gains = [
  'THROBBING GAINS',
  'MASSIVE GAINS',
  [emoji`💪`]
]
const fomo = [
  `THINGS ARE MOVING FAST`,
  `Stop THROWING YOUR MONEY AWAY`,
  `DON'T MISS OUT`,
  `YOU CAN'T AFFORD TO PASS THIS UP`,
  `ACT NOW (Before It's Too Late)`,
  'FEAR OF MISSING OUT',
  'FEAR UNCERTAINTY DOUBT',
  'FOMO',
  'FUD',
  `THIS WON'T LAST`,
  'TIME IS RUNNING OUT',
  'ACT NOW',
  `DON'T WAIT`
]
const hotText = [
  'TOO HOT TO HANDLE',
  'SO HOT',
  'HOT STUFF',
  'SIZZLING',
  'HOTTEST ART AROUND',
  [...hot]
]
const excitingText = [
  'FRESH',
  'UNBELIEVABLE',
  'BELIEVE THE HYPE',
  'WOW',
  'OMG',
  'HYPE',
  'AMAZING',
  'INCREDIBLE',
  'EXCITING',
  'THRILLING',
  'HOLY MOLY',
  'WHAT A THRILL',
  'HIGH OCTANE',
  `SUPERCHARGED`,
  [...explosionFull, ...hot, ...lucky, ...loud]
]
const funText = [
  'FUN',
  'LOL',
  'WAGMI',
  'WTF',
  'SO COOL',
  'I LOVE IT',
  'HA HA HA HA',
  [...funny]
]
const crypto = [
  `NEW PARADIGM`,
  'DEGEN',
  'NFTs',
  'CRYPTO',
  'MAKE FAST CASH NOW',
  'WAGMI',
  'GRAIL',
  `THIS NFT SELLS ITSELF`,
  'STRAIGHT TO THE MOON',
  [...moneyFull, ...energy, ...lunar]
]
const disclaimer = [
  `WHAT YOU SEE IS WHAT YOU GET`,
  'NFA',
  'NOT FINANCIAL ADVICE',
  'WARNING',
  'DANGER ZONE',
  'DO YOUR OWN RESEARCH',
  'DYOR',
  'SAFE + SECURE',
  `BY USING THIS WEBSITE YOU AGREE TO IT'S TERMS OF SERVICE`,
  `PAST PERFORMANCE DOES NOT GUARANTEE FUTURE RESULTS`,
  [emoji`⚠️`]
]
const affirmations = [
  `THIS IS GOING TO BE HUGE`,
  `OPPORTUNITY OF A LIFETIME`,
  `YOU WON'T BELIEVE THIS!`,
  `THIS IS THE REAL DEAL`,
  `PAY ATTENTION`,
  `I COULDN'T BELIEVE IT EITHER`,
  'YOU DESERVE IT',
  'TOO GOOD TO BE TRUE',
  'YOU ONLY LIVE ONCE',
  'YOLO',
  `NEVER LOOKED SO GOOD`
]

const pairings = [
  [word`CASH COW`, emoji`🐄`],
  [word`YIELD EXPLOSION`, ...explosion1],
  [word`SUPERCHARGED`, ...energy],
  [word`STRAIGHT TO THE MOON`, ...lunar],
  [word`HOTTEST ART AROUND`, ...hot, emoji`🎨`]
]

const textLists = [
  luckyText,
  dealsText,
  cashText,
  sexyText,
  gains,
  fomo,
  hotText,
  excitingText,
  funText,
  crypto,
  disclaimer,
  affirmations,
  // pairings,
]

const textList = textLists.flat()

const emojiPresenceProb = 0.35

const prbWeightedContent = (showEmojis) => {
  const textPrb = textLists.map(c => [c.length, c])
  const emojiPrb = emojiLists.map(c => [c.length, c])
  const pairingPrb = pairings.map(c => [c.length, c])

  return showEmojis
    ? chance(...textPrb, ...emojiPrb, ...pairingPrb)
    : chance(...textPrb).filter(x => !Array.isArray(x))
}


function chooseContent() {
  let contentSample = []
  let content = []

  const sections = chance(
    [35, 1],
    [30, 2],
    [25, 3],
    [10, 0] // everything
  )

  const selections = chance(
    [15, 1],
    [25, 2],
    [35, 3],
    [10, 4],
    [10, 5],
    [5, 0], // everything
  )

  const showEmojis = prb(emojiPresenceProb)

  if (sections) {
    times(sections, s => contentSample.push(prbWeightedContent(showEmojis)))
  } else {
    contentSample = [...textLists, ...emojiLists]
  }

  if (selections) {
    times(selections, s => content.push(sample(contentSample.flat())))
  } else {
    content = contentSample.flat()
  }

  const output = content.map(c => {
    if (Array.isArray(c)) return sample(c)
    if (typeof c === 'string') return word(c + (prb(0.25) ? '!' : ''))
    return c
  })

  return output
}

const content = chooseContent()



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


const adjustCharLength = txt => {
  let lenText = txt;
  [...emojiList, '&lt;', '&gt;'].forEach(c => lenText = lenText.replaceAll(c, '1'))
  return lenText.length
}