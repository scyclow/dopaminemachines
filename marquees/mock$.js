
let IS_HEADLESS = false
let TWEMOJI_PRESENT = false
const $ = (elem, prop, value) => {}


$.render = (e, children) => {
  // if (!children) return
  // else if (typeof children === 'string') e.innerHTML = children
  // else if (Array.isArray(children)) {
  //   if (typeof children[0] === 'string') {
  //     children.forEach(child => {
  //       e.innerHTML += (
  //         typeof child === 'string' ? child : child.outerHTML
  //       )
  //     })
  //   } else {
  //     e.append(...children.flat())
  //   }
  // }
  // else {
  //   e.append(children)
  // }
}


$.create = elType => (children, attrs={}) => {
  let classes = (attrs.class || '').split(' ')
  return {
    elType,
    attrs,
    children,
    classList: {
      add(cls) {
        classes.push(cls)
      },
      remove(cls) {
        classes = classes.filter(c => c !== cls)
      }
    },
    get className(){
      return classes.join(' ')
    },
    get innerHTML() {
      return typeof children === 'string' ? children : JSON.stringify(children)
    },
    cloneNode() {
      return Object.assign({}, this)
    },
    getElementsByClassName(className) {
      const elements = []

      const collectElements = children => {
        if (Array.isArray(children)) {
          children.forEach(child => {
            collectElements(child)
          })
        } else if (typeof children === 'object') {
          if (children.className.includes(className)) {
            elements.push(children)
          }
          if (children.children) collectElements(children.children)
        }
      }

      collectElements(this.children)

      // if (Array.isArray(this.children)) {
      //   this.children.forEach(child => {
      //     const e = child.getElementsByClassName(className)
      //     elements.push(e)
      //   })
      // } else if (typeof this.children === 'object') {
      //   // console.log(className, '||', this.children.className)
      //   if (this.children.className.includes(className)) elements.push(this.children)

      //   if (Array.isArray(this.children.children)) {
      //     this.children.children.forEach(child => {
      //       const e = child.getElementsByClassName(className)
      //       elements.push(e)
      //     })
      //   } else if (typeof this.children.children === 'object') {
      //     this.children.getElementsByClassName(className)
      //   }
      // }

      return elements.flat()
    }

  }
  // const e = document.createElement(elType)
  // $.render(e, children)

  // Object.keys(attrs).forEach(a => {
  //   e.setAttribute(a, attrs[a])
  // })

  // return e
}

$.div = $.create('div')
$.span = $.create('span')
$.main = $.create('main')
$.section = $.create('section')




const $html = {}
const $head = {}

const queryParams = {}




const addMetaTag = (args) => {
  // const meta = document.createElement('meta')
  // Object.keys(args).forEach(arg => {
  //   meta[arg] = args[arg]
  // })

  // document.head.appendChild(meta)
}

function css(style) {
  // const s = document.createElement('style')
  // s.innerHTML = style
  // document.head.appendChild(s)
}


function setMetadata(title) {
  $html.translate = false
  $html.lang = 'en'
  $html.className = 'notranslate'

  document.title = title

  addMetaTag({ name: 'google', content: 'notranslate'})
  addMetaTag({ charset: 'utf-8' })

  console.log(title)
}