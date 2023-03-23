
css(`
  .text {
    font-size: 1em;
  }

  .emoji {
    margin-right: 0.3em;
    font-size: ${USE_EMOJI_POLYFILL ? 0.8 : 0.9}em;
  }

  .animationContainer .emoji,
  .animationGridContainer .emoji
  {
    margin-right: 0;
  }

  .emojiPolyfill {
    width: 1em;
    height: 1em;
    transform: translateY(7%);
  }

`)

const wordExt = (txt, className) => $.span(txt, { class: className })

const word = txt => wordExt(txt, 'text content')

const emoji = e => wordExt(e, 'emoji content')

const emojis = es => es.split(' ').map(emoji)

const elementIsEmoji = elem => {
  if (Array.isArray(elem)) return false
  return (
    elem.getElementsByClassName('emoji').length
    || elem.className.includes('emoji')
  )
}

let emojiOverride, textOverride

try {

  emojiOverride = (queryParams.emojis || []).split(',').map(decodeURI).map(emoji)
  textOverride = (queryParams.text || []).split(',').map(decodeURI)
  if (textOverride || emojiOverride) console.log('OVERRIDES:', textOverride, emojiOverride)
} catch (e) {}



const money1 = emojis(`💸 💰 💎 👑 💍 🪙`)
const money2 = emojis(`🤑 💷 💴 💵 💶 💲 💸 💰`)
const moneyFull = [...emojis(`💹 📈 💯`), ...money1, ...money2]
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
const computer = [sample(emojis(`👨‍💻 🧑‍💻 👩‍💻`)), ...emojis(`🕸 👁 👁‍🗨 🌎`)]
// const maybe = emojis(`🔟 📛`)
const commonEmojis = emojis(`💸 🤑 🔥 😂 💥`)
const excitingMisc = emojis(`🙌 🤩 ‼️ 🏃 😃`)
const misc = emojis(`💪 ⚠️ 🐂 🤲 🐐`)

const emojiLists = emojiOverride ? [emojiOverride] : [
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

const emojiList = [...emojiLists, misc].flat().map(e => e.innerHTML)


const withEmoji = (txt, possibleEmojis, emojiProb=1) => !hasEmoji(txt) && prb(emojiProb)
  ? $.span([
    txt,
    $.span(sample(possibleEmojis), {style: 'margin-left: 0.5em'})
  ])
  : txt

const withEmojiLazy = (possibleEmojis, emojiProb) => txt => withEmoji(txt, possibleEmojis, emojiProb)


/*
  boost, frenzy, multiplier, infinite, joy, certified, passion

   */

const luckyText = [
  'WINNER',
  'LUCKY',
  'CONGRATULATIONS',
  'WIN BIG',
  'MEGA WIN',
  'JACKPOT',
  'HIT IT BIG',
  '777',
  `YOU CAN'T LOSE`,
  `EVERYONE'S A WINNER`,
  'DOUBLE DOWN',
]

const dealsText = [
  'DEAL OF THE CENTURY',
  'DEALS',
  'DEALS GALORE',
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
  'UNLIMITED',
  'EXTRA LARGE',
  'NEW AND IMPROVED',
  `RUN, DON'T WALK`,
  'SENSATIONAL'
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
  'TREASURE TROVE'
]

const sexyText = [
  'SEXY',
  'XXX',
  'HOT',
  'SO HOT',
  'SPICY',
  'SO SEXY',
  'PURE BLISS',
  'DELICIOUS',
  'FORBIDDEN PLEASURES',
  'JUICY',
  'PASSION'
]

const gains = [
  'THROBBING GAINS',
  'MASSIVE GAINS',
  'WHOPPING GAINS',
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
  'ELECTRIC',
  'ECSTACY',
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
  'ECSTATIC',
  'THRILLING',
  'HOLY MOLY',
  'WHAT A THRILL',
  'HIGH OCTANE',
  'HIGH VOLTAGE',
  `SUPERCHARGED`,
  'HOLY COW',
  'BONANZA',
  'PURE ENERGY',
  'PARTY TIME',
  'INSTANT GRATIFICATION',
  'MIND = BLOWN',
  'DOPAMINE RUSH'
]

const funText = [
  'FUN',
  'LOL',
  'WAGMI',
  'WTF',
  'SO COOL',
  'I LOVE IT',
  'HA HA HA HA',
  'SWEET',
  'DOPE',
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
  'BULL MARKET',
  'DIAMOND HANDS',
  'ALL TIME HIGH',
  '100%'
]

const disclaimer = [
  `WHAT YOU SEE IS WHAT YOU GET`,
  'NFA',
  'NOT FINANCIAL ADVICE',
  'WARNING',
  'DANGER ZONE',
  'DO YOUR OWN RESEARCH',
  'DYOR',
  'ALL NATURAL',
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
  `YOU'LL LOVE IT`,
  'YOU DESERVE IT',
  'TOO GOOD TO BE TRUE',
  'YOU ONLY LIVE ONCE',
  'YOLO',
  `NEVER LOOKED SO GOOD`,
  'AS GOOD AS IT GETS',
  'FUCK YES',
  'FINALLY',
  'CHAMPION',
  'GREATEST OF ALL TIME'
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


const emojiTextRelationships = {
  single: {
    'CASH COW': [emoji`🐄`, ...money2],
    'YIELD EXPLOSION': explosion1,
    'HOTTEST ART AROUND': emojis(`🎨 🔥`),
    'SUPERCHARGED': emojis(`⚡️`),
    'HIGH VOLTAGE': emojis(`⚡️`),
    'HOLY COW': emojis(`🐄`),
    'STRAIGHT TO THE MOON': emojis(`🌜 🌛 🌝 🚀`),
    'THROBBING GAINS': emojis(`💪`),
    'MASSIVE GAINS': emojis(`💪`),
    'BULL MARKET': emojis(`🐂`),
    'DIAMOND HANDS': emojis(`💎 🤲`),
    'SWEET': yummy,
    'ELECTRIC': emojis(`⚡️`),
    'JUICY': fruit1,
    'ALL NATURAL': fruit1,
    'PURE ENERGY': energy,
    [`RUN, DON'T WALK`]: emojis(`🏃`),
    'MIND = BLOWN': emojis(`🤯`),
    '100%': emojis(`💯`),
    'GREATEST OF ALL TIME': emojis(`🐐`)
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



function chooseEmojiForText(txt, selectionPrb=0.1) {
  if (prb(selectionPrb) && emojiTextRelationships.single[txt]) {
    return sample(emojiOverride || emojiTextRelationships.single[txt])
  } else {
    sample([])
  }

  for (let [texts, emojis] of emojiTextRelationships.group) {
    if (texts.includes(txt)) {
      const e = sample(emojiOverride || emojis)
      return prb(selectionPrb) ? e : undefined
    }
  }
}






function sampleContent() {
  const showEmojis = (prb(0.3) && _content.emojis.length) || !_content.text.length
  const e = sample(_content.emojis)

  const mainContent = showEmojis ? e : sample(_content.text)
  let replacementContent = showEmojis ? e : sample((textOverride||[]).map(c => word(c)))
  if (!textOverride) {
    replacementContent = mainContent
  }


  return [mainContent, replacementContent]
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


  if (emojiOverride) contentSample.emojis = emojiOverride

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
  emojiList.forEach(c => lenText = lenText.replace(c, '1'))
  return lenText.length + (!!pairedEmoji ? 3 : 0)
}