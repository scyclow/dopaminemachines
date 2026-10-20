const params = new URLSearchParams(location.search)
const surface = params.get('surface')
const SERVER = params.get('server') || location.origin

const TOGGLE_KEYS = {
  overdrive: 'o',
  paused: 'p',
  anhedonic: 'a',
  invert: 'i',
  emoji: 'e',
}

// same order as textLists in min.js, so ?samples=0,12 is lucky + sports
const SAMPLES = ['lucky', 'deals', 'cash', 'sexy', 'fomo', 'hot', 'exciting', 'fun', 'crypto', 'disclaimer', 'affirmations', 'www', 'sports']

let loadedState
let emojiOn = false
let ready = false

const randomHash = () => '0x' + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('')

// query params take precedence over the console's state, for this page only.
// the console's "URLs" section generates these
function applyUrlOverrides(state) {
  const s = {
    ...state,
    layouts: { ...state.layouts },
    toggles: { ...state.toggles },
  }

  if (params.has('hash')) s.hash = params.get('hash')
  if (params.has('tokenId')) s.tokenId = Number(params.get('tokenId'))
  if (params.has('layout') && surface) s.layouts[surface] = params.get('layout')
  if (params.has('samples')) s.samples = params.get('samples').split(',').map(i => SAMPLES[Number(i)]).filter(Boolean)
  if (params.has('showEmojis')) s.emojis = params.get('showEmojis')
  if (params.has('modes')) {
    const modes = params.get('modes').split(',')
    s.toggles = Object.fromEntries(Object.keys(TOGGLE_KEYS).map(t => [t, modes.includes(t)]))
  }

  return s
}

async function fetchState() {
  try {
    const res = await fetch(`${SERVER}/api/state`, { signal: AbortSignal.timeout(2000) })
    return await res.json()
  } catch (e) {
    console.log('nodefdn server unavailable, using query params / random hash')
    return null
  }
}

// min.js keeps these as top level globals, or inside its onload closure (emoji)
const currentToggles = () => ({
  overdrive: !!OVERDRIVE,
  paused: !!PAUSED,
  anhedonic: !!ANHEDONIC,
  invert: !!INVERT_ALL,
  emoji: emojiOn,
})

function syncToggles(toggles) {
  if (!ready) return
  const current = currentToggles()
  Object.entries(TOGGLE_KEYS).forEach(([toggle, key]) => {
    if (toggle in toggles && !!toggles[toggle] !== current[toggle]) {
      document.onkeydown({ key })
      if (toggle === 'emoji') emojiOn = !emojiOn
    }
  })
}

function needsReload(state) {
  return state.hash !== loadedState.hash
    || state.tokenId !== loadedState.tokenId
    || JSON.stringify(state.samples) !== JSON.stringify(loadedState.samples)
    || state.emojis !== loadedState.emojis
    || state.layouts?.[surface] !== loadedState.layouts?.[surface]
}

function connect() {
  const ws = new WebSocket(`${SERVER.replace(/^http/, 'ws')}/api/ws?role=page&surface=${encodeURIComponent(surface || '')}`)

  ws.onclose = () => setTimeout(connect, 1000)

  ws.onmessage = e => {
    const msg = JSON.parse(e.data)

    if (msg.type === 'reload') location.reload()
    else if (msg.type === 'state') {
      const state = applyUrlOverrides(msg.state)
      if (needsReload(state)) location.reload()
      else syncToggles(state.toggles)
    }
  }
}

function loadAlgo(state) {
  window.tokenData = {
    hash: state.hash,
    tokenId: String(state.tokenId),
  }

  window.NODEFDN_SAMPLES = state.samples
  window.NODEFDN_EMOJIS = state.emojis

  if (state.layouts) {
    window.NODEFDN_LAYOUTS = Object.fromEntries(
      Object.entries(state.layouts).filter(([_, layout]) => layout !== 'default')
    )
  }

  console.log(tokenData.hash)

  const $script = document.createElement('script')
  $script.src = './min.js'
  $script.onload = () => {
    const algoOnload = window.onload
    const start = () => {
      algoOnload()
      emojiOn = USE_EMOJI_POLYFILL
      ready = true
      if (state.toggles) syncToggles(state.toggles)
    }

    if (document.readyState === 'complete') start()
    else window.onload = start
  }
  document.head.appendChild($script)
}


const serverState = await fetchState()

if (serverState) {
  loadedState = applyUrlOverrides(serverState)
  loadAlgo(loadedState)
  connect()
} else {
  loadAlgo(applyUrlOverrides({
    hash: randomHash(),
    tokenId: 999000000 + Math.floor(Math.random() * 1000),
    samples: [],
    emojis: 'default',
    layouts: {},
    toggles: Object.fromEntries(Object.keys(TOGGLE_KEYS).map(t => [t, false])),
  }))
}
