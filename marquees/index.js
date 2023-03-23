

const main = $.main(
  flexSection(rows, cols),
  {
    id: 'main',
    style: `
      height: 100vh;
      width: 100vw;
      overflow: hidden;
      display: grid;
      grid-template-rows: repeat(${rows}, 1fr);
      grid-template-columns: repeat(${cols}, 1fr);
    `
  }
)

const usedContent = Array.from(
  new Set(
    Array.from(main.getElementsByClassName('content')).map(e => e.innerHTML)

  )
)




window.onload = () => {

  setMetadata(usedContent.join(' '))
  $.render(document.body, main)

  if (PAUSED) {
    LAST_PAUSED = Date.now()
    document.body.classList.add('pauseAll')
  }

  let usingEmojiPolyfill = USE_EMOJI_POLYFILL
  let isFullScreen = false
  let isHidingMouse = false


  document.onkeydown = (event) => {
    // TOGGLE EMOJIS
    if (event.key === 'e') {
      const emojiShadows = Array.from(document.getElementsByClassName('emojiShadow'))

      if (usingEmojiPolyfill) {
        Array.from(document.getElementsByTagName('img')).forEach(img => {
          img.replaceWith(img.alt)
        })
        emojiShadows.forEach(e => {
          e.style.textShadow = getTextShadowValue(Number(e.dataset.h) || 0)
          e.style.filter = ''
        })
      } else {
        twemoji.parse(
          document.body, {
            folder: 'svg',
            ext: '.svg',
            className: 'emojiPolyfill'
          }
        )
        emojiShadows.forEach(e => {
          e.style.filter = getDropShadowValue(Number(e.dataset.h) || 0)
          e.style.textShadow = ''
        })
      }

      usingEmojiPolyfill = !usingEmojiPolyfill

      try {
        window.localStorage.setItem('__DOPAMINE_EMOJI_TOGGLE__', usingEmojiPolyfill)
      } catch(e) {}
    }

    // FULLSCREEN
    else if (event.key === 'f') {
      if (isFullScreen) document.exitFullscreen()
      else document.body.requestFullscreen({ navigationUI: 'hide' })

      isFullScreen = !isFullScreen
    }

    // DOWNLOAD HTML
    else if (event.key === 'h') {
      const a = document.createElement('a')
      a.href = 'data:text/html;charset=UTF-8,' + encodeURIComponent(document.documentElement.outerHTML)
      a.download = usedContent.join(' ').replaceAll(' ', '-') + '.html'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    }

    // HIDE MOUSE
    else if (event.key === 'm') {
      if (isHidingMouse) {
        document.exitPointerLock()
        document.body.classList.remove('viewerMode')
      } else {
        document.body.classList.add('viewerMode')
        document.body.requestPointerLock()
      }
      isHidingMouse = !isHidingMouse
    }

    // PAUSE
    else if (event.key === 'p') {
      if (PAUSED) {
        START_TIME += Date.now() - LAST_PAUSED
        document.body.classList.remove('pauseAll')
      } else {
        LAST_PAUSED = Date.now()
        document.body.classList.add('pauseAll')
      }
      PAUSED = !PAUSED
      try {
        window.localStorage.setItem('__DOPAMINE_IS_PAUSED__', PAUSED)
      } catch(e) {}
    }
  }

  if (USE_EMOJI_POLYFILL && window.twemoji) {
    twemoji.parse(document.body, {
      folder: 'svg',
      ext: '.svg',
      className: 'emojiPolyfill'
    })
  }
}