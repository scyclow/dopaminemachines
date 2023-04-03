

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
  new Set([
    ...$.cls(main, 'content').map(e => e.innerHTML),
    ...$.cls(main, 'charContentGroup').map(getContent)
  ])
)

window.onload = () => {
  document.body.innerHTML = ''
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
    // DOWNLOAD HTML
    if (event.key === 'd') {
      const a = document.createElement('a')
      a.href = 'data:text/html;charset=UTF-8,' + encodeURIComponent(document.documentElement.outerHTML)
      a.download = usedContent.join(' ').replaceAll(' ', '-') + '.html'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    }

    // OVERDRIVE
    else if (event.key === 'o') {
      if (OVERDRIVE) {
        document.body.classList.remove('overdrive')
        allRunningIntervals.forEach(i => {
          i.newInterval(i.originalMs)
        })
      } else {
        document.body.classList.add('overdrive')
        allRunningIntervals.forEach(i => {
          i.newInterval(i.originalMs/6)
        })
      }
      OVERDRIVE = !OVERDRIVE
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

    // ANHEDONIC MODE
    else if (event.key === 'a') {
      if (ANHEDONIC) {
        document.body.classList.remove('anhedonic')
        sourcesToNormalMode()
      } else {
        document.body.classList.add('anhedonic')
        sourcesToAnhedonicMode()
      }
      ANHEDONIC = !ANHEDONIC
    }

    // MOUSE HIDE
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

    else if (event.key === 'i') {
      if (INVERT_ALL) {
        document.body.classList.remove('invertAll')
      } else {
        document.body.classList.add('invertAll')
      }

      INVERT_ALL = !INVERT_ALL
    }

    // NO DISTRACTION MODE
    else if (event.key === 'n') {
      if (isFullScreen) document.exitFullscreen()
      else document.body.requestFullscreen({ navigationUI: 'hide' })

      isFullScreen = !isFullScreen
    }


    // TOGGLE EMOJIS
    else if (event.key === 'e') {
      const emojiShadows = $.cls(document, 'emojiShadow')

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







  }

  if (USE_EMOJI_POLYFILL && window.twemoji) {
    twemoji.parse(document.body, {
      folder: 'svg',
      ext: '.svg',
      className: 'emojiPolyfill'
    })
  }
}

/*
D ownload HTML
O verdrive
P ause
A nhedonic Mode
M ouse Hide
I
N o distraction mode (live view only)
E moji Toggle


Fullscreen
*/
