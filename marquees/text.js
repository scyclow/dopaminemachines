
// const word = (txt, slow, margin=1, fontSize=1) =>
const wordExt = (txt, margin=0, fontSize=1) =>
  $.span(txt, {
    style: `
      margin-right: ${
        margin
      }em;
      font-size: ${fontSize}em;
    `
  })

const word = txt => wordExt(txt)

const emoji = e => wordExt(e, 0.2, 0.9)

const emojis = es => es.split(' ').map(emoji)

const hasEmoji = txt => emojiList.map(e => e.innerHTML).some(e => (typeof txt === 'string' ? txt : txt.innerHTML).includes(e))



const money1 = emojis(`💸 💰 💎 👑 💍 🪙`)
const money2 = emojis(`🤑 💷 💴 💵 💶 💲 💸 💰`)
const moneyFull = emojis(`💹 📈`, ...money1, ...money2)
const fruit1 = emojis(`🍒 🍉 🍇 🍋 🍯`)
const fruit2 = emojis(`🍆 🍑 🌶`)
const booze = emojis(`🍻 🍾 🥂`)
const hot = emojis(`🌶 🔥 ❤️‍🔥 🌋`)
const lucky = [...emojis(`🍀 🎰 🔔 🚨 🎁 🥇 🌟 ❓`), ...fruit1, ...money1]
const drugs = [...emojis(`🎄 🍄 ❄️ 😵‍💫`), ...booze]
const party = [...emojis(`🎉 🕺 💃 🎊 🥳 🎈`), ...booze]
const energy = emojis(`💫 🔥 🚀 ⚡️ ✨`)
const explosion1 = emojis(`💥 🤯 🧨 💣`)
const explosionFull = [...explosion1, ...energy, ...emojis(`🌋 ☄️`)]
const sexy = [...emojis(`🦄 🌈 💋 💦 😍 ❤️‍🔥 ❤️`), ...fruit2]
const yummy = [...emojis(`🍬 🍭 🎂 🍫 🍦 🍄`), ...fruit1, ...fruit2]
const usa = emojis(`🏎 🇺🇸 ★`)
const relaxing = emojis(`🏖 🏄‍♂️`)
const funny = emojis(`🐄 🤡 💩 😂`)
const symbols = emojis(`★ → ←`)
const lunar = emojis(`🌜 🌛 🌝 🌞 🌎 🌟`, ...energy)
const colorful = [...emojis(`🍭 🎨 🌈 🦄 🎉`), ...fruit1]
const loud = [...emojis(`‼️ ❗️ 🔊`), ...explosion1]
// const misc = emojis(`✨ 🙌 🤩 💪 ⚠️`)
const computer = emojis(`👨‍💻 🧑‍💻 👩‍💻 🕸 👁 👁‍🗨 🌎`)
// const maybe = emojis(`🔟 📛`)
const commonEmojis = emojis(`💸 🤑 🔥 😂 💥`)
const excitingMisc = emojis(`🙌 🤩 ‼️`)

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
  loud,
  computer,
  excitingMisc,
  commonEmojis,
  // misc,
  // maybe,
]

const emojiList = emojiLists.flat().map(e => e.innerHTML)


const withEmoji = (txt, possibleEmojis, emojiProb=1) => !hasEmoji(txt) && prb(emojiProb)
  ? $.span([
    txt,
    $.span(sample(possibleEmojis), {style: 'margin-left: 0.5em'})
  ])
  : txt

const withEmojiLazy = (possibleEmojis, emojiProb) => txt => withEmoji(txt, possibleEmojis, emojiProb)


const luckyText = [
  'WINNER',
  'LUCKY',
  'CONGRATULATIONS',
  'WIN BIG',
  'MEGA WIN',
  'JACKPOT',
  'HIT IT BIG',
  '777',
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
]

const sexyText = [
  'SEXY',
  'XXX',
  'HOT',
  'SO HOT',
  'SPICY',
  'SO SEXY',
  'PURE BLISS',
]

const gains = [
  'THROBBING GAINS',
  'MASSIVE GAINS',
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
  'HOTTEST ART AROUND'
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
  'HOLY COW',
]

const funText = [
  'FUN',
  'LOL',
  'WAGMI',
  'WTF',
  'SO COOL',
  'I LOVE IT',
  'HA HA HA HA',
]

const crypto = [
  `ALPHA`,
  `NEW PARADIGM`,
  'DEGEN',
  'NFTs',
  'CRYPTO',
  'MAKE FAST CASH NOW',
  'WAGMI',
  'GRAIL',
  `THIS NFT SELLS ITSELF`,
  'STRAIGHT TO THE MOON',
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
]

const textList = textLists.flat()

const emojiTextRelationships = {
  single: {
    'CASH COW': [emoji`🐄`, ...money2],
    'YIELD EXPLOSION': explosion1,
    'HOTTEST ART AROUND': emojis(`🎨 🔥`),
    'SUPERCHARGED': emojis(`⚡️`),
    'HOLY COW': emojis(`🐄`),
    'STRAIGHT TO THE MOON': emojis(`🌜 🌛 🌝 🚀`),
    'THROBBING GAINS': emojis(`💪`),
    'MASSIVE GAINS': emojis(`💪`)
  },
  group: [
    [luckyText, lucky],
    [dealsText, money2],
    [cashText, moneyFull],
    [sexyText, sexy],
    [hotText, hot],
    [excitingText, [...explosionFull, ...hot, ...loud, ...excitingMisc]],
    [funText, funny],
    [crypto, [...moneyFull, ...energy]],
    [disclaimer, emojis(`⚠️ 🚨`)],
  ]
}



function chooseEmojiForText(txt, selectionPrb=0.1, returnAll=false) {

  if (emojiTextRelationships.single[txt] && prb(selectionPrb)) {
    return returnAll ? emojiTextRelationships.single[txt] : sample(emojiTextRelationships.single[txt])
  }

  for (let [texts, emojis] of emojiTextRelationships.group) {
    if (texts.includes(txt)) {
      return prb(selectionPrb)
        ? returnAll ? emojis : sample(emojis)
        : undefined
    }
  }
}






function sampleContent() {
  return (prb(0.3) && _content.emojis.length) || !_content.text.length
    ? sample(_content.emojis)
    : sample(_content.text)
}

function chooseContent() {
  const contentSample = { text: [], emojis: [] }
  const content = { text: [], emojis: [] }

  const sections = chance(
    [35, 1],
    [30, 2],
    [25, 3],
    [10, 0] // everything
  )

  if (sections) {
    times(sections, s => {
      const textSample = sample(textLists)
      contentSample.text.push(textSample)

      const matchingEmojiSample = emojiTextRelationships.group.find(g => g[0] === textSample)
      const emojiSample = matchingEmojiSample && prb(0.5) ? matchingEmojiSample[1] : sample(emojiLists)
      contentSample.emojis.push(emojiSample)
    })
  } else {
    contentSample.text = textLists
    contentSample.emojis = emojiLists
  }


  const selections = chance(
    [15, 1],
    [25, 2],
    [35, 3],
    [10, 4],
    [10, 5],
    [5, 0], // everything
  )


  if (selections) {
    times(selections, s => {
      content.text.push(sample(contentSample.text))
      content.emojis.push(sample(contentSample.emojis))
    })
  } else {
    content.text = contentSample.text
    content.emojis = contentSample.emojis
  }


  content.text = content.text.flat().map(c => word(c + (prb(0.25) ? '!' : '')))
  content.emojis = showEmojis ? content.emojis.flat() : []
  return content
}

const _content = chooseContent()
const content = [..._content.text, ..._content.emojis]




const adjustCharLength = (txt, pairedEmoji) => {
  let lenText = txt;
  [...emojiList, '&lt;', '&gt;'].forEach(c => lenText = lenText.replaceAll(c, '1'))
  return lenText.length + (!!pairedEmoji ? 3 : 0)
}