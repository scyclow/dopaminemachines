
const $ = (elem, prop, value) => elem.style[prop] = value
$.qsa = document.querySelectorAll.bind(document)
$.id = document.getElementById.bind(document)
$.tag = document.getElementsByTagName.bind(document)
$.class = $.cls = (className) => [].slice.call(document.getElementsByClassName(className))

$.render = (e, children) => {
  if (!children) return
  else if (typeof children === 'string') e.innerHTML = children
  else if (Array.isArray(children)) {
    children.forEach(child => {
      e.innerHTML += (
        typeof child === 'string' ? child : child.outerHTML
      )
    })
  }
  else e.appendChild(children.cloneNode(true))
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
const $body = document.body



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


function setMetadata() {
  $html.translate = false
  $html.lang = 'en'
  $html.className = 'notranslate'

  document.title = 'World Wide Web'

  addMetaTag({ name: 'google', content: 'notranslate'})

  css`
    * {margin: 0; padding: 0}

    .clickhere {
      cursor: pointer;
      text-decoration: underline;
      user-select: none;
    }
  `

  console.log('Welcome to the World Wide Web!')
}