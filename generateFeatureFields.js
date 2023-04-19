const fs = require('fs')

const content = Array.from(
  new Set(
    ["$$$$","100%","777","ACT NOW","ACT NOW (Before It's Too Late)","ALL NATURAL","ALL OR NOTHING","ALL TIME HIGH","ALPHA","AMAZING","AMAZING SAVINGS","AS GOOD AS IT GETS","BARGAIN","BELIEVE THE HYPE","BILLIONAIRE","BINGO","BLAST OFF","BONANZA","BULL MARKET","BUY NOW","BY USING THIS WEBSITE YOU AGREE TO IT'S TERMS OF SERVICE","CASH COW","CHAMPION","CHEAP","CLICK HERE","CONGRATULATIONS","CRAZY DEALS","CRYPTO","CRYPTO FORTUNE","DANGER ZONE","DEAL OF THE CENTURY","DEALS","DEALS GALORE","DEGEN","DELICIOUS","DESIRE","DIAMOND HANDS","DO YOUR OWN RESEARCH","DON'T MISS OUT","DON'T WAIT","DOPAMINE BOOST","DOPAMINE RUSH","DOPE","DOUBLE DOWN","DYOR","Do you CRAVE YIELD?","ECSTACY","ECSTATIC","ELECTRIC","ENGAGEMENT","EUPHORIC","EVERYONE'S A WINNER","EXCITING","EXTRA LARGE","FAST CASH","FEAR OF MISSING OUT","FEAR UNCERTAINTY DOUBT","FINALLY","FOMO","FORBIDDEN PLEASURES","FREE","FRENZY","FRESH","FUCK YES","FUD","FUN","GET RICH QUICK","GOLD MINE","GOOD PRICES","GRAIL","GREATEST OF ALL TIME","HA HA HA HA","HIGH OCTANE","HIGH VOLTAGE","HIT IT BIG","HOLY COW","HOLY MOLY","HOT","HOT STUFF","HOTTEST ART AROUND","HYPE","I COULDN'T BELIEVE IT EITHER","I LOVE IT","I WANT MORE","INCREDIBLE","INSANE PRICES","INSTANT GRATIFICATION","JACKPOT","JUICY","LET'S GO","LIKE","LIMITED TIME OFFER","LMAO","LOL","LUCKY","LUST","MAKE CASH FAST","MAKE FAST CASH NOW","MAKE GENERATIONAL WEALTH NOW","MASSIVE GAINS","MEGA WIN","MILLIONAIRE","MIND = BLOWN","MORE","MORE IS MORE","MULTIPLIER","NEVER LOOKED SO GOOD","NEW","NEW AND IMPROVED","NEW PARADIGM","NFA","NFTs","NOT FINANCIAL ADVICE","OMG","OPPORTUNITY OF A LIFETIME","PARTY TIME","PASSION","PAST PERFORMANCE DOES NOT GUARANTEE FUTURE RESULTS","PAY ATTENTION","PROFITS","PUMP + DUMP","PURE BLISS","PURE ENERGY","ROFL","RUN, DON'T WALK","SAFE + SECURE","SELL OUT","SENSATIONAL","SEXY","SIZZLING","SO CHEAP","SO COOL","SO HOT","SO SEXY","SPECIAL","SPICY","STARSTRUCK","STRAIGHT TO THE MOON","SUPERCHARGED","SWEET","Stop THROWING YOUR MONEY AWAY","THINGS ARE MOVING FAST","THIS IS GOING TO BE HUGE","THIS IS THE REAL DEAL","THIS IS WHAT YOU'VE BEEN WAITING FOR","THIS NFT SELLS ITSELF","THIS ROCKS","THIS WON'T LAST","THRILLING","THROBBING GAINS","TIME IS RUNNING OUT","TOO GOOD TO BE TRUE","TOO HOT TO HANDLE","TREASURE TROVE","TRENDING","TRILLIONAIRE","UNBELIEVABLE","UNLIMITED","VIRAL","WAGMI","WARNING","WHAT A BARGAIN","WHAT A DEAL","WHAT A THRILL","WHAT YOU SEE IS WHAT YOU GET","WHITE HOT","WHOPPING GAINS","WIN BIG","WINNER","WORLD WIDE WEB","WOW","WTF","XXX","YIELD EXPLOSION","YOLO","YOU CAN'T AFFORD TO PASS THIS UP","YOU CAN'T LOSE","YOU DESERVE IT","YOU ONLY LIVE ONCE","YOU WON'T BELIEVE THIS!","YOU'LL LOVE IT","YOU'RE #1","‼️","←","→","☄️","★","⚠️","⚡️","✨","❄️","❓","❗️","❤️","❤️‍🔥","🃏","🇺🇸","🌈","🌋","🌎","🌛","🌜","🌝","🌞","🌟","🌶","🌹","🍀","🍄","🍆","🍇","🍉","🍋","🍌","🍑","🍒","🍦","🍪","🍫","🍬","🍭","🍯","🍻","🍾","🎁","🎂","🎄","🎈","🎉","🎊","🎨","🎪","🎰","🎲","🎸","🏃","🏄‍♂️","🏋️","🏎","🏎️","🐂","🐄","🐐","🐭","👁","👁‍🗨","👑","👨‍💻","👩‍💻","👯‍♀️","💃","💋","💍","💎","💣","💥","💦","💩","💪","💫","💯","💰","💲","💴","💵","💶","💷","💸","💹","📈","🔊","🔔","🔞","🔥","🔴","🕸","🕺","😂","😃","😍","😵‍💫","🙌","🚀","🚨","🤑","🤡","🤣","🤩","🤯","🤲","🤳","🤹","🥂","🥇","🥕","🥜","🥳","🥵","🦁","🦄","🦍","🧀","🧑‍💻","🧨","🪙"]
    .sort()
  )
)


const features = [
  {
    name: 'Borders',
    type: 'enum',
    options: [
      'none',
      'solid',
      'dashed',
      'dotted',
      'double',
    ],
  },
  {
    name: 'Askew',
    type: 'boolean',
  },
  {
    name: 'Inverted',
    type: 'boolean',
  },
  {
    name: 'Full Hue Rotation',
    type: 'boolean',
  },
  {
    name: 'Layout Type',
    type: 'enum',
    options: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  },
  {
    name: 'Background Type',
    type: 'enum',
    options: [0, 1, 2, 3, 4, 5],
  },
  {
    name: 'Shadow Type',
    type: 'enum',
    options: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  },
  {
    name: 'Hues',
    type: 'enum',
    options: ['???', 1, 2, 3],
  },
  {
    name: 'Font Weight',
    type: 'enum',
    options: [100, 500, 900],
  },
  {
    name: 'Font',
    type: 'enum',
    options: [
      'serif',
      'cursive',
      'monospace',
      'sans-serif',
    ],
  },
  {
    name: 'Random Calls',
    type: 'number',
    max: 5000,
    min: 1,
    step: 1,
  },
  {
    name: 'Sections',
    type: 'number',
    max: 200,
    min: 1,
    step: 1,
  },
  {
    name: 'Marquees',
    type: 'number',
    max: 200,
    min: 1,
    step: 1,
  },
  {
    name: 'Animations',
    type: 'number',
    max: 200,
    min: 1,
    step: 1,
  },
  {
    name: 'Grids',
    type: 'number',
    max: 200,
    min: 1,
    step: 1,
  },
]

const contentSampleCategories = [
  'Exciting',
  'Lucky',
  'Sexy',
  'Party Time',
  'Get Rich Quick',
  'Crypto',
  'Yummy',
  'Fun',
  'Hot Stuff',
  'Not Financial Advice',
  'World Wide Web',
  'Deals',
  'FOMO',
  'Lunar',
  'Positivity',
  'Hedonic Treadmill',
  'Filler',
]

contentSampleCategories.forEach(category => {
  features.push({
    name: 'Content Sample: ' + category,
    type: 'boolean'
  })
})

content.forEach(name => {
  features.push({
    name,
    type: 'boolean',
  })
})


fs.writeFileSync('./featureFields.json', JSON.stringify(features, null, 4))
