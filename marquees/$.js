
const IS_HEADLESS = ((window.navigator || {}).userAgent || []).includes('eadless')
const TWEMOJI_PRESENT = !!window.twemoji


const $ = (elem, prop, value) => elem.style[prop] = value
$.cls = (elem, selector) => Array.isArray(elem)
  ? elem.map(e => $.cls(e, selector)).flat()
  : Array.from(elem.getElementsByClassName(selector))



$.render = (e, children) => {
  if (!children) return
  else if (typeof children === 'string') e.innerHTML = children
  else if (Array.isArray(children)) {
    if (typeof children[0] === 'string') {
      children.forEach(child => {
        e.innerHTML += (
          typeof child === 'string' ? child : child.outerHTML
        )
      })
    } else {
      e.append(...children.flat())
    }
  }
  else {
    e.append(children)
  }
}


$.create = elType => (children, attrs={}) => {
  const e = document.createElement(elType)
  $.render(e, children)

  Object.keys(attrs).forEach(a => {
    e.setAttribute(a, attrs[a])
  })

  return e
}

$.div = $.create('div')
$.span = $.create('span')
$.main = $.create('main')
$.section = $.create('section')


const $html = document.getElementsByTagName('html')[0]
const $head = document.head

let queryParams

try {
  queryParams = window.location.search
    ? window.location.search.replace('?', '').split('&').reduce((params, i) => {
        const [k, v] = i.split('=')
        params[k] = v
        return params
      }, {})
    : {}
} catch (e) {
  queryParams = {}
}




const addMetaTag = (args) => {
  const meta = document.createElement('meta')
  Object.keys(args).forEach(arg => {
    meta[arg] = args[arg]
  })

  document.head.appendChild(meta)
}

function css(style) {
  const s = document.createElement('style')
  s.innerHTML = style
  document.head.appendChild(s)
}


function setMetadata(title) {
  $html.translate = false
  $html.lang = 'en'
  $html.className = 'notranslate'

  document.title = title

  addMetaTag({ name: 'google', content: 'notranslate'})

  console.log(title)
}