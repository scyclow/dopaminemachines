const fs = require('fs')

const content = Array.from(
  new Set(
    ["$$$$","100%","777","ACT NOW","ACT NOW (Before It's Too Late)","ACTION PACKED","ALL NATURAL","ALL OR NOTHING","ALL STAR","ALL TIME HIGH","ALPHA","AMAZING","AMAZING SAVINGS","AS GOOD AS IT GETS","BARGAIN","BELIEVE THE HYPE","BILLIONAIRE","BINGO","BLAST OFF","BONANZA","BULL MARKET","BUY NOW","BY USING THIS WEBSITE YOU AGREE TO IT'S TERMS OF SERVICE","CASH COW","CHAMPION","CHEAP","CLICK HERE","CONGRATULATIONS","CRAZY DEALS","CRYPTO","CRYPTO FORTUNE","DANGER ZONE","DEAL OF THE CENTURY","DEALS","DEALS GALORE","DEGEN","DELICIOUS","DELIGHTFUL","DESIRE","DIAMOND HANDS","DO YOUR OWN RESEARCH","DON'T MISS OUT","DON'T WAIT","DOPAMINE BOOST","DOPAMINE MACHINE","DOPAMINE RUSH","DOPE","DOUBLE DOWN","DYOR","Do you CRAVE YIELD?","EASY AS 1 2 3","ECSTASY","ECSTATIC","ELECTRIC","ENGAGEMENT","EUPHORIC","EVERYONE'S A WINNER","EXCITING","EXTRA LARGE","FAST CASH","FEAR OF MISSING OUT","FEAR UNCERTAINTY DOUBT","FINALLY","FOMO","FORBIDDEN PLEASURES","FREE","FRENZY","FRESH","FUCK YES","FUD","FUN","GET RICH QUICK","GOAL","GOLD MINE","GOOD PRICES","GRAIL","GRAND SLAM","GREATEST OF ALL TIME","HA HA HA HA","HAPPY","HIGH OCTANE","HIGH VOLTAGE","HIT IT BIG","HOLY COW","HOLY MOLY","HOME RUN","HOT","HOT STUFF","HOTTEST ART AROUND","HYPE","I COULDN'T BELIEVE IT EITHER","I LOVE IT","I WANT MORE","INCREDIBLE","INSANE PRICES","INSTANT GRATIFICATION","JACKPOT","JUICY","LET'S GO","LIGHTNING ROUND","LIKE","LIMITED TIME OFFER","LMAO","LOL","LUCKY","LUST","MAKE CASH FAST","MAKE FAST CASH NOW","MAKE GENERATIONAL WEALTH NOW","MAKE SOME NOISE","MASSIVE GAINS","MEGA WIN","MILLIONAIRE","MIND = BLOWN","MONEY MAKING OPPORTUNITY","MORE","MORE IS MORE","MULTIPLIER","NEVER LOOKED SO GOOD","NEW","NEW AND IMPROVED","NEW PARADIGM","NFA","NFTs","NOT FINANCIAL ADVICE","OBSESSION","OMG","OPPORTUNITY OF A LIFETIME","PARTY TIME","PASSION","PAST PERFORMANCE DOES NOT GUARANTEE FUTURE RESULTS","PAY ATTENTION","POWER PLAY","PROFITS","PUMP + DUMP","PURE BLISS","PURE ENERGY","RARE","REWARDS","ROFL","RUN, DON'T WALK","SAFE + SECURE","SATISFACTION GUARANTEED","SELL OUT","SENSATIONAL","SEXY","SIZZLING","SLAM DUNK","SO CHEAP","SO COOL","SO HOT","SO SEXY","SPECIAL","SPICY","STARSTRUCK","STRAIGHT TO THE MOON","SUPERCHARGED","SUPERSIZE","SUPERSTAR","SURPRISE","SWEET","Stop THROWING YOUR MONEY AWAY","THINGS ARE MOVING FAST","THIS IS GOING TO BE HUGE","THIS IS THE REAL DEAL","THIS IS WHAT YOU'VE BEEN WAITING FOR","THIS NFT SELLS ITSELF","THIS ROCKS","THIS WON'T LAST","THRILLING","THROBBING GAINS","TIME IS RUNNING OUT","TOO GOOD TO BE TRUE","TOO HOT TO HANDLE","TREASURE TROVE","TRENDING","TRILLIONAIRE","TRIPLE CROWN","UNBELIEVABLE","UNLIMITED","VICTORY LAP","VIRAL","WAGMI","WARNING","WHAT A BARGAIN","WHAT A DEAL","WHAT A THRILL","WHAT YOU SEE IS WHAT YOU GET","WHITE HOT","WHOPPING GAINS","WILD","WIN BIG","WINNER","WORLD WIDE WEB","WOW","WTF","XXX","YIELD EXPLOSION","YOLO","YOU CAN'T AFFORD TO PASS THIS UP","YOU CAN'T LOSE","YOU DESERVE IT","YOU ONLY LIVE ONCE","YOU WON'T BELIEVE THIS","YOU'LL LOVE IT","YOU'RE #1","‼️","←","→","☄️","★","⚠️","⚡️","⛹️‍♂️","✨","❄️","❓","❗️","❤️","❤️‍🔥","🃏","🇺🇸","🌈","🌋","🌎","🌛","🌜","🌝","🌞","🌟","🌳","🌶","🌹","🍀","🍄","🍆","🍇","🍉","🍋","🍌","🍑","🍒","🍦","🍪","🍫","🍬","🍭","🍯","🍻","🍾","🎁","🎂","🎄","🎈","🎉","🎊","🎨","🎪","🎰","🎲","🎸","🏂","🏃","🏄‍♀️","🏄‍♂️","🏅","🏆","🏋🏽","🏋️","🏎","🏎️","🏟","🐂","🐄","🐐","👁","👁‍🗨","👑","👨‍💻","👩‍💻","👯‍♀️","💃","💋","💍","💎","💣","💥","💦","💩","💪","💫","💯","💰","💲","💴","💵","💶","💷","💸","💹","📈","🔊","🔔","🔞","🔥","🔴","🕸","🕺","😂","😃","😍","😵‍💫","🙌","🚀","🚨","🚬","🤑","🤡","🤣","🤩","🤯","🤲","🤳","🤹","🤾","🥂","🥇","🥕","🥜","🥳","🥵","🦁","🦄","🧀","🧑‍💻","🧠","🧨","🪙"]
    .sort()
  )
)


const features = [
  {
    name: 'Layout',
    type: 'enum',
    options: [
      'Anything Goes',
      'Less is More',
      'More is More',
      'Rows',
      'Columns',
      'Grid'
    ],
  },
  {
    name: 'Background',
    type: 'enum',
    options: [
      'Empty',
      'Solid',
      'Gradient',
      'ZigZag'
    ],
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
    name: 'Base Hues',
    type: 'enum',
    options: ['???', 0, 1, 2, 3],
  },
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
    name: 'Shadow Style',
    type: 'enum',
    options: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'],
  },
  {
    name: 'Font Weight',
    type: 'enum',
    options: [100, 500, 900],
  },
  {
    name: 'Box BGs',
    type: 'boolean',
  },
  {
    name: 'Starbursts',
    type: 'boolean',
  },
  {
    name: 'Section Animation',
    type: 'boolean',
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
    name: 'Random Calls',
    type: 'number',
    max: 15000,
    min: 1,
    step: 1,
  },
  {
    name: 'Sections',
    type: 'number',
    max: 320,
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
    max: 320,
    min: 1,
    step: 1,
  },
  {
    name: 'Emoji Groups',
    type: 'number',
    max: 250,
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
  'Sports',
  'Misc.',
]

const animationCategories = [
  'Up-Down',
  'Left-Right',
  'Grow-Shrink',
  'Blink',
  'Dance',
  'Spin',
  'Wave',
  'Climb',
  'Hexagon',
  'Breathe',
  'Flaming Hot',
  'Horizontal Siren',
  'Vertical Siren',
  'Horizontal Pivot',
  'Vertical Pivot',
  'Horizontal Flip',
  'Vertical Flip',
  'Color Characters',
  'Up-Down Characters',
  'Blinking Characters',
  'Shrinking Characters',
]

contentSampleCategories.forEach(category => {
  features.push({
    name: '_Sample: ' + category,
    type: 'boolean'
  })
})

animationCategories.forEach(animation => {
  features.push({
    name: '_Animation: ' + animation,
    type: 'boolean'
  })
})


content.forEach(name => {
  features.push({
    name: '_Content: ' + name,
    type: 'boolean',
  })
})


fs.writeFileSync('./featureFields.json', JSON.stringify(features, null, 4))
