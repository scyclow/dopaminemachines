const fs = require('fs')

const content = ["WINNER","LUCKY","CONGRATULATIONS","WIN BIG","MEGA WIN","JACKPOT","HIT IT BIG","777","YOU CAN'T LOSE","EVERYONE'S A WINNER","DOUBLE DOWN","DEAL OF THE CENTURY","DEALS","DEALS GALORE","WHAT A BARGAIN","WHAT A DEAL","BARGAIN","BUY NOW","CHEAP","SO CHEAP","SELL OUT","GOOD PRICES","CRAZY DEALS","NEW","INSANE PRICES","LIMITED TIME OFFER","FREE","DEALS","UNLIMITED","EXTRA LARGE","NEW AND IMPROVED","RUN, DON'T WALK","SENSATIONAL","Do you CRAVE YIELD?","MAKE GENERATIONAL WEALTH NOW","MAKE FAST CASH NOW","MAKE CASH FAST","GOLD MINE","FAST CASH","$$$$","CASH COW","MILLIONAIRE","BILLIONAIRE","TRILLIONAIRE","PUMP + DUMP","CRYPTO FORTUNE","GET RICH QUICK","YIELD EXPLOSION","TREASURE TROVE","SEXY","XXX","HOT","SO HOT","SPICY","SO SEXY","PURE BLISS","DELICIOUS","FORBIDDEN PLEASURES","JUICY","PASSION","THROBBING GAINS","MASSIVE GAINS","WHOPPING GAINS","THINGS ARE MOVING FAST","Stop THROWING YOUR MONEY AWAY","DON'T MISS OUT","YOU CAN'T AFFORD TO PASS THIS UP","ACT NOW (Before It's Too Late)","FEAR OF MISSING OUT","FEAR UNCERTAINTY DOUBT","FOMO","FUD","THIS WON'T LAST","TIME IS RUNNING OUT","ACT NOW","DON'T WAIT","TOO HOT TO HANDLE","SO HOT","HOT STUFF","SIZZLING","HOTTEST ART AROUND","ELECTRIC","ECSTACY","FRESH","UNBELIEVABLE","BELIEVE THE HYPE","WOW","OMG","HYPE","AMAZING","INCREDIBLE","EXCITING","ECSTATIC","THRILLING","HOLY MOLY","WHAT A THRILL","HIGH OCTANE","HIGH VOLTAGE","SUPERCHARGED","HOLY COW","BONANZA","PURE ENERGY","PARTY TIME","INSTANT GRATIFICATION","MIND = BLOWN","DOPAMINE RUSH","FUN","LOL","WAGMI","WTF","SO COOL","I LOVE IT","HA HA HA HA","SWEET","DOPE","ALPHA","NEW PARADIGM","DEGEN","NFTs","CRYPTO","MAKE FAST CASH NOW","WAGMI","GRAIL","THIS NFT SELLS ITSELF","STRAIGHT TO THE MOON","BULL MARKET","DIAMOND HANDS","ALL TIME HIGH","100%","WHAT YOU SEE IS WHAT YOU GET","NFA","NOT FINANCIAL ADVICE","WARNING","DANGER ZONE","DO YOUR OWN RESEARCH","DYOR","ALL NATURAL","SAFE + SECURE","BY USING THIS WEBSITE YOU AGREE TO IT'S TERMS OF SERVICE","PAST PERFORMANCE DOES NOT GUARANTEE FUTURE RESULTS","THIS IS GOING TO BE HUGE","OPPORTUNITY OF A LIFETIME","YOU WON'T BELIEVE THIS!","THIS IS THE REAL DEAL","PAY ATTENTION","I COULDN'T BELIEVE IT EITHER","YOU'LL LOVE IT","YOU DESERVE IT","TOO GOOD TO BE TRUE","YOU ONLY LIVE ONCE","YOLO","NEVER LOOKED SO GOOD","AS GOOD AS IT GETS","FUCK YES","FINALLY","CHAMPION","GREATEST OF ALL TIME","💹","📈","💯","💸","💰","💎","👑","💍","🪙","🤑","💷","💴","💵","💶","💲","💸","💰","🍻","🍾","🥂","🌶","🔥","❤️‍🔥","🌋","🍀","🎰","🔔","🚨","🎁","🥇","🌟","❓","🍒","🍉","🍇","🍋","🍯","💸","💰","💎","👑","💍","🪙","🎄","🍄","❄️","😵‍💫","🍻","🍾","🥂","🎉","🕺","💃","🎊","🥳","🎈","🍻","🍾","🥂","💫","🔥","🚀","⚡️","✨","💥","🤯","🧨","💣","💥","🤯","🧨","💣","💫","🔥","🚀","⚡️","✨","🌋","☄️","🦄","🌈","💋","💦","😍","❤️‍🔥","❤️","🍆","🍑","🌶","🍬","🍭","🎂","🍫","🍦","🍄","🍒","🍉","🍇","🍋","🍯","🍆","🍑","🌶","🏎","🇺🇸","★","🏖","🏄‍♂️","🐄","🤡","💩","😂","★","→","←","🌜","🌛","🌝","🌞","🌎","🌟","🍭","🎨","🌈","🦄","🎉","🍒","🍉","🍇","🍋","🍯","‼️","❗️","🔊","💥","🤯","🧨","💣","👨‍💻","🕸","👁","👁‍🗨","🌎","🙌","🤩","‼️","🏃","💸","🤑","🔥","😂","💥","💪","⚠️","🐂","🤲","🐐","😃"]


const features = [
  {
    name: 'Borders',
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

]

content.forEach(name => {
  features.push({
    name,
    type: 'boolean',
  })
})


fs.writeFileSync('./featureFields.json', JSON.stringify(features, null, 4))
