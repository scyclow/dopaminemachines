// standalone versions of smoothSound ("spinny") and blinkCharSound ("blinky") from sound.js,
// with every random choice exposed as a param

const MAJOR_SCALE = [1, 1.125, 1.25, 1.3333, 1.5, 1.6666, 1.875, 2]
const JACK_DUMP_SCALE = [1, 1, 1.25, 1.3333, 1.5, 1.3333, 1.25, 1]
const MAX_VOLUME = 0.04
const STORAGE_KEY = 'nodefdn-audio-v2'

const rnd = (a, b) => a + Math.random() * (b - a)
const prb = p => Math.random() < p
const sample = arr => arr[Math.floor(Math.random() * arr.length)]
const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v))
const chance = (...opts) => {
  const total = opts.reduce((sum, [w]) => sum + w, 0)
  let r = Math.random() * total
  for (const [w, v] of opts) {
    if ((r -= w) < 0) return v
  }
  return opts.at(-1)[1]
}

const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
const noteName = freq => {
  const midi = 69 + 12 * Math.log2(freq / 440)
  const rounded = Math.round(midi)
  const cents = Math.round((midi - rounded) * 100)
  return `${NOTE_NAMES[((rounded % 12) + 12) % 12]}${Math.floor(rounded / 12) - 1}${cents ? ` ${cents > 0 ? '+' : ''}${cents}¢` : ''}`
}
const hz = f => `${Math.round(f)}Hz`
const ms = v => v >= 1000 ? `${(v / 1000).toFixed(2)}s` : `${Math.round(v)}ms`
const fixed = n => v => Number(v).toFixed(n)


const state = {
  root: 440,
}


// AUDIO

let ctx

function createSource(dest, wave, fadeOut = 0.04) {
  const source = ctx.createOscillator()
  const gain = ctx.createGain()

  source.connect(gain).connect(dest)

  gain.gain.value = 0
  source.type = wave
  source.frequency.value = 3000
  source.start()

  const smoothFreq = (value, timeInSeconds = 0.00001) => {
    source.frequency.exponentialRampToValueAtTime(value, ctx.currentTime + timeInSeconds)
  }

  const smoothGain = (value, timeInSeconds = 0.00001) => {
    gain.gain.setTargetAtTime(value, ctx.currentTime, timeInSeconds)
  }

  const kill = () => {
    smoothGain(0, fadeOut)
    setTimeout(() => {
      source.stop()
      gain.disconnect()
    }, fadeOut * 10000)
  }

  return { source, smoothFreq, smoothGain, kill }
}


class Voice {
  constructor(pane, params) {
    this.pane = pane
    this.params = params
    this.timers = new Set()
    this.running = false
  }

  later(fn, wait) {
    const t = setTimeout(() => {
      this.timers.delete(t)
      fn()
    }, wait)
    this.timers.add(t)
  }

  // same as setRunInterval: runs immediately, then every `wait` ms
  every(fn, wait) {
    let i = 0
    const run = () => fn(i++)
    run()
    const t = setInterval(run, wait)
    this.timers.add(t)
  }

  clearTimers() {
    this.timers.forEach(t => {
      clearTimeout(t)
      clearInterval(t)
    })
    this.timers.clear()
  }

  sources() {
    return []
  }

  stop() {
    if (!this.running) return
    this.running = false
    this.clearTimers()
    this.sources().forEach(s => s.kill())
  }

  set(key, value) {
    this.params[key] = value
    if (!this.running) return
    if (key === 'wave') this.sources().forEach(s => s.source.type = value)
    if (key === 'duration') this.schedule()
    this.onSet(key, value)
  }

  onSet() {}
}


// smoothSound: two oscillators a few Hz apart, so they beat against each other
class Spinny extends Voice {
  sources() {
    return [this.src, this.src2]
  }

  vol() {
    return this.params.volume * MAX_VOLUME
  }

  baseFreq() {
    return MAJOR_SCALE[this.params.note] * this.params.octave * state.root
  }

  start() {
    if (this.running) return
    this.running = true
    const { wave } = this.params
    this.src = createSource(this.pane.output, wave, 0.25)
    this.src2 = createSource(this.pane.output, wave, 0.25)
    this.refresh()
    this.src.smoothGain(this.vol(), 0.25)
    this.src2.smoothGain(this.vol(), 0.25)
  }

  refresh() {
    if (!this.running) return
    const f = this.baseFreq()
    this.src.smoothFreq(f)
    this.src2.smoothFreq(f + this.params.beat)
  }

  onSet(key) {
    if (key === 'volume') this.sources().forEach(s => s.smoothGain(this.vol(), 0.05))
    else this.refresh()
  }

  info() {
    const f = this.baseFreq()
    return `${hz(f)} + ${this.params.beat.toFixed(2)}Hz beat · ${noteName(f)}`
  }
}


class Blinky extends Voice {
  sources() {
    return [this.src, this.src2]
  }

  baseFreq() {
    return MAJOR_SCALE[this.params.note] * this.params.octave * state.root
  }

  start() {
    if (this.running) return
    this.running = true
    const { wave } = this.params
    this.src = createSource(this.pane.output, wave)
    this.src2 = createSource(this.pane.output, wave)
    this.schedule()
  }

  schedule() {
    this.clearTimers()
    const interval = this.params.duration / 8

    this.every(i => {
      const { volume, sequence, scale, smooth, twoTone } = this.params
      const vol = volume * MAX_VOLUME

      this.src.smoothGain(vol)
      this.src2.smoothGain(twoTone ? vol : 0)

      let ix
      switch (sequence) {
        case 0: ix = i % 8; break
        case 1: ix = Math.abs(7 - i % 8); break
        case 2: ix = i % 14 < 7 ? i % 14 : Math.abs(7 - i % 7); break
      }

      const ratio = scale === 'jackDump'
        ? JACK_DUMP_SCALE[i % 8] * ((i % 64) < 32 ? 1 : 0.85)
        : MAJOR_SCALE[ix]

      const freq = this.baseFreq() * ratio
      this.src.smoothFreq(freq)
      this.src2.smoothFreq(freq * 2)

      if (!smooth) this.later(() => {
        this.src.smoothGain(0, 0.04)
        this.src2.smoothGain(0, 0.04)
      }, interval * 0.75)
    }, interval)
  }

  onSet(key) {
    const { smooth, twoTone, volume } = this.params
    if (smooth && ['volume', 'smooth', 'twoTone'].includes(key)) {
      this.src.smoothGain(volume * MAX_VOLUME, 0.05)
      this.src2.smoothGain(twoTone ? volume * MAX_VOLUME : 0, 0.05)
    }
  }

  info() {
    const f = this.baseFreq()
    return `${hz(f)} · ${noteName(f)}`
  }
}


// PARAMS

const NOTE_OPTIONS = MAJOR_SCALE.map((r, i) => [i, `${i + 1}${i === 0 ? ' (root)' : i === 7 ? ' (octave)' : ''} ×${r}`])
const OCTAVE_OPTIONS = [[0.125, '×⅛'], [0.25, '×¼'], [0.5, '×½'], [1, '×1'], [2, '×2'], [4, '×4'], [8, '×8']]
const WAVE_OPTIONS = ['square', 'sine', 'sawtooth', 'triangle'].map(w => [w, w])

const COMMON_PARAMS = [
  { key: 'wave', label: 'Wave', type: 'select', options: WAVE_OPTIONS, default: 'square' },
  { key: 'volume', label: 'Volume', type: 'range', min: 0, max: 1, step: 0.01, default: 1, fmt: fixed(2) },
]

const SPINNY_PARAMS = [
  { key: 'note', label: 'Note', type: 'select', options: NOTE_OPTIONS, default: 0 },
  { key: 'octave', label: 'Octave', type: 'select', options: OCTAVE_OPTIONS, default: 1 },
  { key: 'beat', label: 'Beat', type: 'range', min: 0, max: 20, step: 0.01, default: 1, fmt: v => `${Number(v).toFixed(2)}Hz`, hint: 'how far apart the two oscillators are (wobble speed)' },
  ...COMMON_PARAMS,
]

const BLINKY_PARAMS = [
  { key: 'note', label: 'Note', type: 'select', options: NOTE_OPTIONS, default: 0 },
  { key: 'octave', label: 'Octave', type: 'select', options: OCTAVE_OPTIONS, default: 1 },
  { key: 'duration', label: 'Loop', type: 'range', min: 100, max: 8000, step: 10, default: 1000, fmt: ms, hint: '8 notes per loop' },
  { key: 'sequence', label: 'Sequence', type: 'select', options: [[0, 'up'], [1, 'down'], [2, 'up / down']], default: 0 },
  { key: 'scale', label: 'Scale', type: 'select', options: [['major', 'major'], ['jackDump', 'jack dump']], default: 'major' },
  { key: 'smooth', label: 'Smooth', type: 'bool', default: false },
  { key: 'twoTone', label: 'Two tone', type: 'bool', default: false },
  ...COMMON_PARAMS,
]

// same choices smoothSound makes from a spin duration of 750–5000ms
const randomSpinny = () => {
  if (prb(0.3)) return {
    note: 0,
    octave: 0.125,
    beat: Number((state.root / 7.98 - state.root / 8).toFixed(2)),
    wave: 'square',
  }

  const duration = rnd(750, 5000)
  const ix = Math.floor(5 - duration / 1000)
  const [note, octave] = [[0, 0.5], [0, 1], [2, 1], [4, 1], [7, 1]][ix]
  const base = MAJOR_SCALE[note] * octave * state.root
  return {
    note,
    octave,
    beat: Number(clamp(1000000 / (duration * base), 0, 20).toFixed(2)),
    wave: 'square',
  }
}

const randomBlinky = () => {
  const jackDump = prb(0.1)
  return {
    note: Math.floor(rnd(0, 8)),
    octave: chance([5, 1], [3, 2], [1, 0.5], [1, 0.25]),
    duration: Math.round(rnd(500, 2000)),
    sequence: sample([0, 1, 2]),
    scale: jackDump ? 'jackDump' : 'major',
    smooth: !jackDump && prb(0.5),
    twoTone: prb(0.1),
    wave: 'square',
  }
}

// coerce anything pasted in into valid params
function sanitize(schema, raw = {}) {
  const params = { on: raw.on === undefined ? true : !!raw.on }
  schema.forEach(p => {
    const v = raw[p.key]
    if (p.type === 'bool') params[p.key] = v === undefined ? p.default : !!v
    else if (p.type === 'range') params[p.key] = Number.isFinite(Number(v)) && v !== null && v !== '' ? clamp(Number(v), p.min, p.max) : p.default
    else if (p.type === 'select') {
      const match = p.options.find(([o]) => String(o) === String(v))
      params[p.key] = match ? match[0] : p.default
    }
  })
  return params
}


// UI

const el = (tag, attrs = {}, children = []) => {
  const e = document.createElement(tag)
  Object.entries(attrs).forEach(([k, v]) => {
    if (k === 'class') e.className = v
    else if (k.startsWith('on')) e[k] = v
    else if (k in e) e[k] = v
    else e.setAttribute(k, v)
  })
  e.append(...[children].flat())
  return e
}

const toggleButton = (on, onchange) => {
  const $btn = el('button', { class: 'toggleBtn' })
  const set = v => {
    on = v
    $btn.classList.toggle('on', on)
    $btn.textContent = on ? 'ON' : 'OFF'
  }
  $btn.onclick = () => {
    set(!on)
    onchange(on)
  }
  set(on)
  return { $btn, set }
}

function control(p, value, onchange) {
  if (p.type === 'bool') {
    const { $btn, set } = toggleButton(value, onchange)
    return { $control: el('div', {}, $btn), $value: el('span'), refresh: set }
  }

  if (p.type === 'select') {
    const $select = el('select', {}, p.options.map(([v, label]) => el('option', { value: String(v) }, label)))
    $select.value = String(value)
    $select.onchange = () => onchange(p.options[$select.selectedIndex][0])
    return { $control: $select, $value: el('span'), refresh: v => $select.value = String(v) }
  }

  const fmt = p.fmt || (v => v)
  const $value = el('span', { class: 'value mono' }, String(fmt(value)))
  const $input = el('input', { type: 'range', min: p.min, max: p.max, step: p.step, value })
  $input.oninput = () => {
    $value.textContent = fmt($input.value)
    onchange(Number($input.value))
  }
  // double click resets to default
  $input.ondblclick = () => {
    $input.value = p.default
    $input.oninput()
  }
  return {
    $control: $input,
    $value,
    refresh: v => {
      $input.value = v
      $value.textContent = fmt(v)
    }
  }
}


class Pane {
  constructor($el, { key, title, name, VoiceClass, schema, randomize, defaults }) {
    Object.assign(this, { $el, key, title, name, VoiceClass, schema, randomize, defaults })
    this.on = false
    this.volume = 1
    this.pan = 0
    this.voices = []
    this.dirty = false
    this.render()
  }

  render() {
    const { $btn: $on } = toggleButton(this.on, v => this.setOn(v))
    this.$volValue = el('span', { class: 'value mono' }, this.volume.toFixed(2))
    this.$vol = el('input', { type: 'range', min: 0, max: 2, step: 0.01, value: this.volume })
    this.$vol.oninput = () => this.setVolume(Number(this.$vol.value))
    this.$vol.ondblclick = () => this.setVolume(1)

    this.$panValue = el('span', { class: 'value mono' }, this.pan.toFixed(2))
    this.$pan = el('input', { type: 'range', min: -1, max: 1, step: 0.01, value: this.pan })
    this.$pan.oninput = () => this.setPan(Number(this.$pan.value))
    this.$pan.ondblclick = () => this.setPan(0)

    this.$voices = el('div', { class: 'voices' })
    this.$config = el('textarea', { class: 'mono', spellcheck: false, rows: 12 })
    this.$config.oninput = () => this.setDirty(true)
    this.$error = el('p', { class: 'error' })

    this.$el.append(
      el('div', { class: 'paneHeader' }, [
        el('h2', {}, this.title),
        $on,
        el('div', { class: 'masters' }, [
          el('label', { class: 'master' }, ['volume', this.$vol, this.$volValue]),
          el('label', { class: 'master' }, ['pan', this.$pan, this.$panValue]),
        ]),
      ]),
      el('div', { class: 'row' }, [
        el('button', { class: 'primary', onclick: () => this.addVoice(sanitize(this.schema, {})) }, '+ Add'),
        el('button', { onclick: () => this.addVoice(sanitize(this.schema, this.randomize())) }, '+ Add random'),
      ]),
      this.$voices,
      el('div', { class: 'configBox' }, [
        el('h3', {}, ['Config ', el('span', { class: 'dim' }, '(paste JSON + import)')]),
        this.$config,
        el('div', { class: 'row' }, [
          el('button', { class: 'primary', onclick: () => this.importConfig() }, 'Import'),
          el('button', { onclick: () => this.copyConfig() }, 'Copy'),
          el('button', { onclick: () => this.setDirty(false) }, 'Revert'),
          el('button', { onclick: () => this.loadDefaults() }, 'Load defaults'),
        ]),
        this.$error,
      ]),
    )
  }

  // AUDIO

  connect() {
    this.output = ctx.createGain()
    this.output.gain.value = this.on ? this.volume : 0
    this.panner = new StereoPannerNode(ctx, { pan: this.pan })
    this.output.connect(this.panner).connect(ctx.destination)
    this.voices.forEach(v => this.sync(v))
  }

  sync(voice) {
    if (ctx && this.on && voice.params.on) voice.start()
    else voice.stop()
  }

  setOn(on) {
    this.on = on
    this.$el.classList.toggle('active', on)
    if (this.output) this.output.gain.setTargetAtTime(on ? this.volume : 0, ctx.currentTime, 0.05)
    this.voices.forEach(v => this.sync(v))
  }

  setPan(pan) {
    this.pan = pan
    this.$pan.value = pan
    this.$panValue.textContent = pan.toFixed(2)
    if (this.panner) this.panner.pan.setTargetAtTime(pan, ctx.currentTime, 0.02)
    this.changed()
  }

  setVolume(volume) {
    this.volume = volume
    this.$vol.value = volume
    this.$volValue.textContent = volume.toFixed(2)
    if (this.output && this.on) this.output.gain.setTargetAtTime(volume, ctx.currentTime, 0.05)
    this.changed()
  }

  // VOICES

  addVoice(params) {
    const voice = new this.VoiceClass(this, params)
    this.voices.push(voice)
    this.renderVoice(voice)
    this.sync(voice)
    this.changed()
    return voice
  }

  removeVoice(voice) {
    voice.stop()
    voice.$card.remove()
    this.voices = this.voices.filter(v => v !== voice)
    this.renumber()
    this.changed()
  }

  setVoiceOn(voice, on) {
    voice.params.on = on
    voice.setOnButton(on)
    voice.$card.classList.toggle('off', !on)
    this.sync(voice)
    this.changed()
  }

  renumber() {
    this.voices.forEach((v, i) => v.$name.textContent = `${this.name} ${i + 1}`)
  }

  renderVoice(voice) {
    const { $btn: $on, set } = toggleButton(voice.params.on, on => this.setVoiceOn(voice, on))
    voice.setOnButton = set
    voice.$name = el('span', { class: 'name' })
    voice.$info = el('span', { class: 'info mono dim' })
    voice.refreshers = {}

    const $params = el('div', { class: 'params' })
    this.schema.forEach(p => {
      const { $control, $value, refresh } = control(p, voice.params[p.key], v => {
        voice.set(p.key, v)
        this.renderInfo(voice)
        this.changed()
      })
      voice.refreshers[p.key] = refresh
      $params.append(el('label', { title: p.hint || '' }, p.label), $control, $value)
    })

    const randomizeVoice = () => {
      Object.entries(this.randomize()).forEach(([k, v]) => {
        voice.set(k, v)
        voice.refreshers[k](v)
      })
      this.renderInfo(voice)
      this.changed()
    }

    voice.$card = el('div', { class: `voice${voice.params.on ? '' : ' off'}` }, [
      el('div', { class: 'voiceHeader' }, [
        el('span', { class: 'handle', title: 'drag to reorder', onpointerdown: () => {
          voice.$card.draggable = true
          document.addEventListener('pointerup', () => {
            if (!this.dragging) voice.$card.draggable = false
          }, { once: true })
        } }, '⠿'),
        $on,
        voice.$name,
        voice.$info,
        el('button', { class: 'small', onclick: randomizeVoice, title: 'randomize like the algo does (keeps volume)' }, 'rand'),
        el('button', { class: 'small', onclick: () => this.addVoice({ ...voice.params }) }, 'dup'),
        el('button', { class: 'small', onclick: () => this.removeVoice(voice) }, '×'),
      ]),
      $params,
    ])

    this.dragEvents(voice)
    this.$voices.append(voice.$card)
    this.renumber()
    this.renderInfo(voice)
  }

  // cards only become draggable while the handle is held, so sliders etc still work
  dragEvents(voice) {
    const $card = voice.$card

    $card.ondragstart = e => {
      this.dragging = voice
      $card.classList.add('dragging')
      e.dataTransfer.effectAllowed = 'move'
      e.dataTransfer.setData('text/plain', '')
    }

    $card.ondragover = e => {
      if (!this.dragging || this.dragging === voice) return
      e.preventDefault()
      const { top, height } = $card.getBoundingClientRect()
      const after = e.clientY > top + height / 2
      $card[after ? 'after' : 'before'](this.dragging.$card)
    }

    $card.ondrop = e => e.preventDefault()

    $card.ondragend = () => {
      $card.draggable = false
      $card.classList.remove('dragging')
      this.dragging = null
      this.voices = [...this.$voices.children].map($c => this.voices.find(v => v.$card === $c))
      this.renumber()
      this.changed()
    }

  }

  renderInfo(voice) {
    voice.$info.textContent = voice.info()
  }

  // CONFIG

  config() {
    return {
      volume: this.volume,
      pan: this.pan,
      sounds: this.voices.map(v => ({ ...v.params })),
    }
  }

  configText() {
    const { volume, pan, sounds } = this.config()
    // one sound per line so it stays readable
    return `{\n  "volume": ${volume},\n  "pan": ${pan},\n  "sounds": [\n${sounds.map(s => `    ${JSON.stringify(s)}`).join(',\n')}\n  ]\n}`
  }

  setDirty(dirty) {
    this.dirty = dirty
    this.$config.classList.toggle('dirty', dirty)
    if (!dirty) {
      this.$error.textContent = ''
      this.$config.value = this.configText()
    }
  }

  changed() {
    if (!this.dirty) this.$config.value = this.configText()
    save()
  }

  load(config = {}) {
    this.voices.forEach(v => {
      v.stop()
      v.$card.remove()
    })
    this.voices = []

    const sounds = Array.isArray(config) ? config : config.sounds || []
    if (!Array.isArray(config) && config.volume !== undefined) {
      const volume = Number(config.volume)
      if (!Number.isFinite(volume)) throw new Error('volume must be a number')
      this.setVolume(clamp(volume, 0, 2))
    }
    if (!Array.isArray(config) && config.pan !== undefined) {
      const pan = Number(config.pan)
      if (!Number.isFinite(pan)) throw new Error('pan must be a number')
      this.setPan(clamp(pan, -1, 1))
    }
    sounds.forEach(s => this.addVoice(sanitize(this.schema, s)))
    this.changed()
  }

  importConfig() {
    try {
      const config = JSON.parse(this.$config.value)
      if (typeof config !== 'object' || config === null) throw new Error('config must be an object or array')
      this.load(config)
      this.setDirty(false)
    } catch (e) {
      this.$error.textContent = e.message
    }
  }

  loadDefaults() {
    this.load(structuredClone(this.defaults))
    this.setDirty(false)
  }

  async copyConfig() {
    try {
      await navigator.clipboard.writeText(this.$config.value)
    } catch (e) {
      this.$config.select()
      document.execCommand('copy')
    }
  }
}


const CHANNEL_1_DEFAULTS = {
  volume: 1,
  pan: -1,
  sounds: [
    { on: true, note: 0, octave: 0.125, beat: 0.14, wave: 'square', volume: 1 },
    { on: true, note: 0, octave: 0.25, beat: 0.38, wave: 'square', volume: 0.61 },
    { on: true, note: 0, octave: 0.5, beat: 0.44, wave: 'square', volume: 0.44 },
    { on: true, note: 0, octave: 1, beat: 1.97, wave: 'square', volume: 0.56 },
    { on: true, note: 4, octave: 1, beat: 1, wave: 'square', volume: 0.24 },
    { on: true, note: 0, octave: 2, beat: 0.59, wave: 'square', volume: 0.3 },
    { on: true, note: 4, octave: 1, beat: 2.07, wave: 'square', volume: 0.21 },
    { on: true, note: 0, octave: 1, beat: 3.56, wave: 'square', volume: 0.33 },
    { on: true, note: 2, octave: 1, beat: 1, wave: 'square', volume: 0.27 },
  ],
}

const CHANNEL_2_DEFAULTS = {
  volume: 0.6,
  pan: 1,
  sounds: [
    { on: true, note: 0, octave: 1, duration: 1000, sequence: 0, scale: 'major', smooth: true, twoTone: false, wave: 'square', volume: 1 },
    { on: true, note: 0, octave: 1, duration: 1830, sequence: 2, scale: 'major', smooth: false, twoTone: false, wave: 'square', volume: 1 },
    { on: true, note: 0, octave: 1, duration: 930, sequence: 1, scale: 'major', smooth: false, twoTone: false, wave: 'square', volume: 0.9 },
    { on: true, note: 0, octave: 2, duration: 710, sequence: 1, scale: 'major', smooth: false, twoTone: false, wave: 'square', volume: 0.66 },
    { on: true, note: 0, octave: 0.125, duration: 1990, sequence: 0, scale: 'major', smooth: false, twoTone: false, wave: 'square', volume: 0.82 },
  ],
}

const spinny = new Pane(document.getElementById('spinny'), {
  key: 'spinny',
  title: 'Channel 1',
  name: 'Sound',
  defaults: CHANNEL_1_DEFAULTS,
  VoiceClass: Spinny,
  schema: SPINNY_PARAMS,
  randomize: randomSpinny,
})

const blinky = new Pane(document.getElementById('blinky'), {
  key: 'blinky',
  title: 'Channel 2',
  name: 'Sound',
  defaults: CHANNEL_2_DEFAULTS,
  VoiceClass: Blinky,
  schema: BLINKY_PARAMS,
  randomize: randomBlinky,
})

const panes = [spinny, blinky]


// ROOT

const $root = document.getElementById('root')
const $rootRange = document.getElementById('rootRange')

function setRoot(root) {
  if (!Number.isFinite(root) || root <= 0) return
  state.root = root
  $root.value = root.toFixed(2)
  $rootRange.value = root
  panes.forEach(p => p.voices.forEach(v => {
    p.renderInfo(v)
    v.refresh?.()
  }))
  save()
}

$root.onchange = () => setRoot(Number($root.value))
$rootRange.oninput = () => setRoot(Number($rootRange.value))


// PERSISTENCE

let loading = true
function save() {
  if (loading) return
  localStorage.setItem(STORAGE_KEY, JSON.stringify({
    root: state.root,
    spinny: spinny.config(),
    blinky: blinky.config(),
  }))
}

try {
  const saved = JSON.parse(localStorage.getItem(STORAGE_KEY))
  if (saved) {
    setRoot(Number(saved.root) || state.root)
    spinny.load(saved.spinny)
    blinky.load(saved.blinky)
  }
} catch (e) {
  console.error('could not load saved audio config', e)
}

if (!spinny.voices.length) spinny.load(structuredClone(CHANNEL_1_DEFAULTS))
if (!blinky.voices.length) blinky.load(structuredClone(CHANNEL_2_DEFAULTS))
setRoot(state.root)
loading = false
save()


// browsers need a gesture before audio can start
function initAudio() {
  if (!ctx) {
    ctx = new AudioContext()
    panes.forEach(p => p.connect())
  }
  if (ctx.state === 'suspended') ctx.resume()
}

document.addEventListener('pointerdown', initAudio, true)
document.addEventListener('keydown', initAudio, true)
