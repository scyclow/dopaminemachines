const LR_PADDING = 'margin-left: 0.2em; margin-right: 0.2em;'

css(`
  .text {
    font-size: 1em;
  }

  .emoji {
    ${LR_PADDING}
    font-size: ${USE_EMOJI_POLYFILL ? 0.8 : 0.9}em;
  }

  .emojiPolyfill {
    width: 1em;
    height: 1em;
    transform: translateY(7%);
  }
`)

const word = txt => $.span(txt, { class: 'text content' })
const emoji = e => $.span(e, { class: 'emoji content' })
const emojis = es => es.split(' ').map(emoji)

const link = txt => $.a(txt, {
  target: '_blank',
  href: './' + (projectId * 1000000 + rndint(EDITION_SIZE)),
  class: 'text content'
})

const elementIsEmoji = elem => {
  if (Array.isArray(elem)) return false
  return (
    elem.getElementsByClassName('emoji').length
    || elem.className.includes('emoji')
  )
}

let emojiOverride, textOverride

try {
  if (queryParams.emojis) emojiOverride = queryParams.emojis.split(',').map(decodeURI).map(emoji)
  if (queryParams.text) textOverride = queryParams.text.split(',').map(decodeURI)

  if (textOverride || emojiOverride) console.log('OVERRIDES:', textOverride, emojiOverride)
} catch (e) {}



const money1 = emojis(`💸 💰 💎 👑 💍 🪙`)
const money2 = emojis(`🤑 💷 💴 💵 💶 💲 💸 💰`)
const moneyFull = [...emojis(`💹 📈 💯`), ...money1, ...money2]
const fruit1 = emojis(`🍒 🍉 🍇 🍋 🍯`)
const fruit2 = emojis(`🍆 🍑 🌶`)
const miscFood = emojis(`🥕 🍌 🥜 🧀 🍪`)
const booze = emojis(`🍻 🍾 🥂`)
const hot = emojis(`🌶 🔥 ❤️‍🔥 🌋`)
const lucky = [...emojis(`🍀 🎰 🔔 🚨 🎁 🥇 🌟 ❓ 🃏 🎲`), ...fruit1, ...money1]
const drugs = [...emojis(`🎄 🍄 ❄️ 😵‍💫`), ...booze]
const party = [...emojis(`🎉 🕺 💃 🎊 🥳 🎈`), ...booze]
const energy = emojis(`💫 🔥 🚀 ⚡️ ✨`)
const explosion1 = emojis(`💥 🤯 🧨 💣`)
const explosionFull = [...explosion1, ...energy, ...emojis(`🌋 ☄️`)]
const sexy = [...emojis(`🦄 🌈 💋 💦 😍 ❤️‍🔥 ❤️ 🔥 🔞 🌹 🥵`), ...fruit2]
const yummy = [...emojis(`🍬 🍭 🎂 🍫 🍦 🍄`), ...fruit1, ...fruit2, ...miscFood]
const usa = emojis(`🏎 🇺🇸 ★`)
const funny = emojis(`🐄 🤡 💩 😂 🤣`)
const symbols = emojis(`★ → ←`)
const justArrows = emojis(`→ ← → ← → ← 🔴`)
const lunar = emojis(`🌜 🌛 🌝 🌞 🌎 🌟`, ...energy)
const colorful = [...emojis(`🍭 🎨 🌈 🦄 🎉`), ...fruit1]
const loud = [...emojis(`‼️ ❗️ 🔊`), ...explosion1]
const computer = emojis(`👨‍💻 🧑‍💻 👩‍💻 🕸 👁 👁‍🗨 🌎 🤳 🔔 🏄‍♂️ ❤️`)
const commonEmojis = emojis(`💸 🤑 🔥 😂 💥`)
const circusEmojis = emojis(`🎪 🦁 🤡 🏋️ 👯‍♀️ 🤹`)
const excitingMisc = emojis(`🙌 🤩 ‼️ 🏃 😃`)
const hedonicTreadmill = [...emojis(`🏃`), ...miscFood, ...symbols]
const sportsEmojis = emojis(`🏎️ 🏋🏽 ⛹️‍♂️ 🏟 🏄‍♀️ 🏂 🤾 🏅 🏆 🏃 💪`)
const misc = emojis(`⚠️ 🐂 🤲 🐐 🎸 🚬 🌳`)

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
  funny,
  symbols,
  lunar,
  colorful,
  loud,
  computer,
  excitingMisc,
  commonEmojis,
  justArrows,
  hedonicTreadmill,
  circusEmojis,
  sportsEmojis
]

const emojiList = [...emojiLists, misc].flat().map(e => e.innerHTML)


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
  `YOU CAN'T LOSE`,
  `EVERYONE'S A WINNER`,
  'DOUBLE DOWN',
  'BINGO',
  'MULTIPLIER',
  'SURPRISE',
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
  'SENSATIONAL',
  'AMAZING SAVINGS',
  'MORE',
  'MORE IS MORE',
  'I WANT MORE',
  'SATISFACTION GUARANTEED',
  'SUPERSIZE'
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
  'TREASURE TROVE',
  'PROFITS',
  'MONEY MAKING OPPORTUNITY',
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
  'PASSION',
  'ECSTASY',
  'LUST',
  'DESIRE',
  'OBSESSION',
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
  `DON'T WAIT`,
  `THIS IS WHAT YOU'VE BEEN WAITING FOR`,
  `THIS IS GOING TO BE HUGE`,
]
const hotText = [
  'TOO HOT TO HANDLE',
  'SO HOT',
  'HOT STUFF',
  'SIZZLING',
  'HOTTEST ART AROUND',
  'ELECTRIC',
  'WHITE HOT',
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
  'EUPHORIC',
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
  'DOPAMINE RUSH',
  'DOPAMINE BOOST',
  'STARSTRUCK',
  'BLAST OFF',
  'ALL OR NOTHING',
  `LET'S GO`,
  'FRENZY',
  'WILD',
  'DELIGHTFUL',
  'DOPAMINE MACHINE',
]

const funText = [
  'FUN',
  'LOL',
  'ROFL',
  'LMAO',
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
  '100%',
  'THROBBING GAINS',
  'MASSIVE GAINS',
  'WHOPPING GAINS',
  'RARE'
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
  `PAST PERFORMANCE DOES NOT GUARANTEE FUTURE RESULTS`,
]

const affirmations = [
  `OPPORTUNITY OF A LIFETIME`,
  `YOU WON'T BELIEVE THIS`,
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
  'SPECIAL',
  `YOU'RE #1`,
  'THIS ROCKS',
  'ALL NATURAL',
  'EASY AS 1 2 3',
  'HAPPY',
  'REWARDS',
]

const wwwText = [
  'WORLD WIDE WEB',
  'ENGAGEMENT',
  'CLICK HERE',
  'VIRAL',
  'LIKE',
  'TRENDING',
  `BY USING THIS WEBSITE YOU AGREE TO IT'S TERMS OF SERVICE`,
]

const sportsText = [
  'SLAM DUNK',
  'GOAL',
  'HOME RUN',
  'GRAND SLAM',
  'MAKE SOME NOISE',
  `LET'S GO`,
  'POWER PLAY',
  'GREATEST OF ALL TIME',
  'CHAMPION',
  'WINNER',
  'VICTORY LAP',
  'ACTION PACKED',
  'TRIPLE CROWN',
  'ALL STAR',
  'SUPERSTAR',
  'LIGHTNING ROUND',
]


const textLists = [
  luckyText,
  dealsText,
  cashText,
  sexyText,
  fomo,
  hotText,
  excitingText,
  funText,
  crypto,
  disclaimer,
  affirmations,
  wwwText,
  sportsText
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
    'LIGHTNING ROUND': emojis(`⚡️`),
    'JUICY': fruit1,
    'ALL NATURAL': fruit1,
    'PURE ENERGY': energy,
    "RUN, DON'T WALK": emojis(`🏃`),
    'MIND = BLOWN': emojis(`🤯`),
    '100%': emojis(`💯`),
    'GREATEST OF ALL TIME': emojis(`🐐`),
    'STARSTRUCK': emojis(`🤩`),
    'BLAST OFF': emojis(`🚀`),
    'ROFL': emojis(`🤣`),
    'THIS ROCKS': emojis(`🎸`),
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
    [wwwText, computer],
    [sportsText, sportsEmojis]
  ]
}



function chooseEmojiForText(txt, selectionPrb=0.1) {
  if (prb(selectionPrb) && emojiTextRelationships.single[txt]) {
    return sample(emojiOverride || emojiTextRelationships.single[txt])
  } else if (is420) {
    return '🚬'
  }

  for (let [texts, emojis] of emojiTextRelationships.group) {
    if (texts.includes(txt)) {
      const e = sample(emojiOverride || emojis)
      return prb(selectionPrb) ? e : undefined
    }
  }
}




const sampledTextContent = []
const sampledEmojiContent = []

function sampleContent(contentOverride=false, onlyEmojis=false) {
  if (contentOverride) {
    const c = onlyEmojis ? sample(sampledEmojiContent) : sample([...sampledEmojiContent, ...sampledTextContent])
    return [c, c]
  }
  const showEmojis = onlyEmojis || (prb(0.3) && _content.emojis.length) || !_content.text.length
  const e = sample(_content.emojis)

  const mainContent = showEmojis ? e : sample(_content.text)
  let replacementContent = showEmojis ? e : sample((textOverride||[]).map(c => word(c)))
  if (!textOverride) {
    replacementContent = mainContent
  }

  if (showEmojis) {
    sampledEmojiContent.push(mainContent)
  } else {
    sampledTextContent.push(mainContent)
  }

  return [mainContent, replacementContent]
}

const contentSample = { text: [], emojis: [] }

function chooseContent() {
  const content = { text: [], emojis: [] }

  const sections = chance(
    [30, 1],
    [30, 2],
    [25, 3],
    [15, 0] // everything
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

  if (is69) {
    contentSample.text = [sexyText]
    contentSample.emojis = [sexy]
  } else if (is420) {
    contentSample.text = [funText]
    contentSample.emojis = emojis('🚬 🌳 🍄 😵‍💫')
  } else if (is100) {
    contentSample.text = ['100%']
    contentSample.emojis = emojis('💯')
  } else if (is666) {
    contentSample.text = [hotText]
    contentSample.emojis = [hot]
  } else if (is7) {
    contentSample.text = [luckyText]
    contentSample.emojis = [lucky]
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

  const wordify = c => c === 'CLICK HERE'
    ? link(c)
    : word(c + (prb(0.25) ? '!' : ''))

  content.text = content.text
    .flat()
    .map(wordify)
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