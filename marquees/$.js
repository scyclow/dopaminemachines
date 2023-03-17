
const $ = (elem, prop, value) => elem.style[prop] = value
$.qsa = document.querySelectorAll.bind(document)
$.id = document.getElementById.bind(document)
$.tag = document.getElementsByTagName.bind(document)
$.class = $.cls = (className) => [].slice.call(document.getElementsByClassName(className))

$.toHTML = str => new DOMParser().parseFromString(str, "text/xml")

$.render = (e, children) => {
  if (children.onclick) debugger
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




const $html = $.tag('html')[0]
const $head = document.head




const addMetaTag = (args) => {
  const meta = document.createElement('meta')
  Object.keys(args).forEach(arg => {
    meta[arg] = args[arg]
  })

  $head.appendChild(meta)
}

function css(style) {
  const s = document.createElement('style')
  s.innerHTML = style
  $head.appendChild(s)
}


function setMetadata(title) {
  $html.translate = false
  $html.lang = 'en'
  $html.className = 'notranslate'

  document.title = title

  addMetaTag({ name: 'google', content: 'notranslate'})

  css`* {margin: 0; padding: 0}`

  console.log(title)
}