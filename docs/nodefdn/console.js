import { $ } from './$.js'

const SERVER = new URLSearchParams(location.search).get('server') || location.origin

const SURFACES = ['entrance-led', 'cube-1', 'cube-2', 'cube-3', 'cube-4']

const DEFAULT_LAYOUTS = {
  'entrance-led': 'more-is-more',
  'cube-1': 'anything-goes',
  'cube-2': 'grid',
  'cube-3': 'rows',
  'cube-4': 'less-is-more',
}

const LAYOUT_NAMES = {
  'random': 'Random (algo weights)',
  'anything-goes': 'Anything Goes',
  'more-is-more': 'More is More',
  'grid': 'Grid',
  'rows': 'Rows',
  'less-is-more': 'Less is More',
}

const SAMPLE_NAMES = {
  'lucky': 'Lucky',
  'deals': 'Deals',
  'cash': 'Cash',
  'sexy': 'Sexy',
  'fomo': 'FOMO',
  'hot': 'Hot Stuff',
  'exciting': 'Exciting',
  'fun': 'Fun',
  'crypto': 'Crypto',
  'disclaimer': 'Not Financial Advice',
  'affirmations': 'Positivity',
  'www': 'World Wide Web',
  'sports': 'Sports',
}

const EMOJI_NAMES = {
  'default': 'Default (algo)',
  'on': 'On',
  'off': 'Off',
}

const TOGGLE_NAMES = {
  overdrive: 'Overdrive',
  paused: 'Paused',
  anhedonic: 'Anhedonic',
  invert: 'Invert',
  emoji: 'Emoji polyfill',
}

const $status = $.id('status')
const $hash = $.id('hash')
const $newHash = $.id('newHash')
const $savedHashes = $.id('savedHashes')
const $saveHash = $.id('saveHash')
const $deleteSaved = $.id('deleteSaved')
const $tokenId = $.id('tokenId')
const $samples = $.id('samples')
const $emojis = $.id('emojis')
const $error = $.id('error')
const $layouts = $.id('layouts')
const $toggles = $.id('toggles')
const $clients = $.id('clients')
const $pageCount = $.id('pageCount')
const $reloadAll = $.id('reloadAll')
const $urls = $.id('urls')

let state


async function post(endpoint, body = {}) {
  try {
    const res = await fetch(`${SERVER}/api/${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.error)
    $error.textContent = ''
    return data
  } catch (e) {
    $error.textContent = e.message
    if (state) render(state)
  }
}

const update = body => post('state', body)


// content
const $sampleInputs = {}

Object.entries(SAMPLE_NAMES).forEach(([value, name], i) => {
  const $input = document.createElement('input')
  $input.type = 'checkbox'
  $input.onchange = () => update({
    samples: Object.keys($sampleInputs).filter(s => $sampleInputs[s].checked)
  })

  const $label = document.createElement('label')
  $label.append($input, `${i}: ${name}`)

  $sampleInputs[value] = $input
  $samples.append($label)
})

Object.entries(EMOJI_NAMES).forEach(([value, name]) => $emojis.append(new Option(name, value)))

$emojis.onchange = () => update({ emojis: $emojis.value })


// layouts
const $layoutSelects = {}
const $layoutCounts = {}

SURFACES.forEach(surface => {
  const $select = document.createElement('select')
  $select.id = `layout-${surface}`

  const defaultName = LAYOUT_NAMES[DEFAULT_LAYOUTS[surface]]
  $select.append(new Option(`Default (${defaultName})`, 'default'))
  Object.entries(LAYOUT_NAMES).forEach(([value, name]) => $select.append(new Option(name, value)))

  $select.onchange = () => update({ layouts: { [surface]: $select.value } })

  const $label = document.createElement('label')
  $label.htmlFor = $select.id
  $label.textContent = surface

  const $count = $.span('', { class: 'pageCount' })
  const $open = $.a('open ↗', { href: `./?surface=${surface}`, target: '_blank' })

  $layoutSelects[surface] = $select
  $layoutCounts[surface] = $count
  $layouts.append($label, $select, $count, $open)
})


// toggles
const $toggleInputs = {}

Object.entries(TOGGLE_NAMES).forEach(([toggle, name]) => {
  const $input = document.createElement('input')
  $input.type = 'checkbox'
  $input.onchange = () => update({ toggles: { [toggle]: $input.checked } })

  const $label = document.createElement('label')
  $label.append($input, name)

  $toggleInputs[toggle] = $input
  $toggles.append($label)
})


// hash
$newHash.onclick = () => post('hash')

$hash.onkeydown = e => {
  if (e.key === 'Enter') $hash.blur()
  if (e.key === 'Escape') {
    $hash.value = state.hash
    $hash.blur()
  }
}
$hash.onchange = () => update({ hash: $hash.value.trim() })

$tokenId.onchange = () => update({ tokenId: Number($tokenId.value) })


// saved hashes
$saveHash.onclick = () => {
  const existing = state.savedHashes?.find(s => s.hash === state.hash)
  const name = prompt(existing ? 'Update this saved hash with the current samples. Name (optional)' : 'Name this hash (optional)', existing?.name || '')
  if (name !== null) post('saved', { name })
}

$deleteSaved.onclick = () => {
  const saved = state.savedHashes?.find(s => s.hash === $savedHashes.value)
  if (saved && confirm(`Delete saved hash "${saved.name || saved.hash}"?`)) post('saved/delete', { hash: saved.hash })
}

$savedHashes.onchange = () => {
  const saved = state.savedHashes?.find(s => s.hash === $savedHashes.value)
  if (saved) update({ hash: saved.hash, tokenId: saved.tokenId, samples: saved.samples || [] })
}

function renderSavedHashes(savedHashes = []) {
  $savedHashes.innerHTML = ''
  $savedHashes.append(new Option(savedHashes.length ? `Saved hashes (${savedHashes.length})` : 'No saved hashes', ''))
  savedHashes.forEach(s => {
    const date = new Date(s.savedAt).toLocaleString()
    const label = s.name ? `${s.name} — ${s.hash.slice(0, 10)}…` : `${s.hash.slice(0, 18)}…`
    const samples = s.samples?.length ? s.samples.map(sample => SAMPLE_NAMES[sample]).join(', ') : 'random samples'
    $savedHashes.append(new Option(`${label} [${samples}] (${date})`, s.hash))
  })

  const current = savedHashes.find(s => s.hash === state.hash)
  $savedHashes.value = current ? current.hash : ''
  $deleteSaved.disabled = !current
  $saveHash.textContent = current ? 'Update' : 'Save'
}

$reloadAll.onclick = () => post('reload')


function render(s) {
  state = s
  if (document.activeElement !== $hash) $hash.value = s.hash
  if (document.activeElement !== $tokenId) $tokenId.value = s.tokenId
  Object.entries($sampleInputs).forEach(([value, $input]) => $input.checked = (s.samples || []).includes(value))
  $emojis.value = s.emojis || 'default'
  renderSavedHashes(s.savedHashes)
  renderUrls(s)
  SURFACES.forEach(surface => $layoutSelects[surface].value = s.layouts[surface] || 'default')
  Object.entries($toggleInputs).forEach(([toggle, $input]) => $input.checked = !!s.toggles[toggle])
}

function queryParamsFor(s, surface) {
  const qp = new URLSearchParams({ surface, hash: s.hash, tokenId: s.tokenId })

  const layout = s.layouts[surface]
  if (layout && layout !== 'default') qp.set('layout', layout)

  const sampleIds = Object.keys(SAMPLE_NAMES)
  if (s.samples?.length) qp.set('samples', s.samples.map(sample => sampleIds.indexOf(sample)).join(','))

  if (s.emojis && s.emojis !== 'default') qp.set('showEmojis', s.emojis)

  const modes = Object.keys(s.toggles).filter(t => s.toggles[t])
  if (modes.length) qp.set('modes', modes.join(','))

  // keep commas readable
  return qp.toString().replaceAll('%2C', ',')
}

function renderUrls(s) {
  $urls.innerHTML = ''
  SURFACES.forEach(surface => {
    const url = new URL(`./?${queryParamsFor(s, surface)}`, location.href).href

    const $copy = document.createElement('button')
    $copy.textContent = 'Copy'
    $copy.onclick = async () => {
      await navigator.clipboard.writeText(url)
      $copy.textContent = 'Copied'
      setTimeout(() => $copy.textContent = 'Copy', 1200)
    }

    $urls.append($.span(surface), $.create('code')(url), $copy)
  })
}

function renderClients(clients) {
  const pages = clients.filter(c => c.role === 'page')
  $pageCount.textContent = `(${pages.length})`

  SURFACES.forEach(surface => {
    const count = pages.filter(c => c.surface === surface).length
    $layoutCounts[surface].textContent = count ? `${count} live` : 'offline'
    $layoutCounts[surface].classList.toggle('live', count > 0)
  })

  $clients.innerHTML = ''
  if (!pages.length) $clients.append($.li('No pages connected'))
  pages.forEach(c => {
    const since = new Date(c.connectedAt).toLocaleTimeString()
    $clients.append($.li(`${c.surface || '(no surface)'} — connected ${since}`))
  })
}


function connect() {
  const ws = new WebSocket(`${SERVER.replace(/^http/, 'ws')}/api/ws?role=console`)

  ws.onopen = () => {
    $status.textContent = 'connected'
    $status.classList.add('connected')
  }

  ws.onclose = () => {
    $status.textContent = 'disconnected — retrying…'
    $status.classList.remove('connected')
    setTimeout(connect, 1000)
  }

  ws.onmessage = e => {
    const msg = JSON.parse(e.data)
    if (msg.type === 'state') render(msg.state)
    else if (msg.type === 'clients') renderClients(msg.clients)
  }
}

connect()
