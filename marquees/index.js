
function generateMain(id, contentOverride=false) {
  return $.main(
    flexSection(rows, cols, contentOverride),
    {
      id: `main`,
      class: `projection-plane-${id}`,
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
}

function renderMain(main) {
  document.body.innerHTML = ''
  $.render(document.body, main)
}

const main = generateMain(1)

projectionPages['1'] = main
projectionPages.pagesRendered = false

const usedContent = Array.from(
  new Set([
    ...$.cls(main, 'content').map(e => e.innerHTML),
    ...$.cls(main, 'charContentGroup').map(getContent)
  ])
)

window.onload = () => {
  setMetadata(usedContent.join(' '), bgColor)
  renderMain(main)

  if (PAUSED) {
    LAST_PAUSED = Date.now()
    document.body.classList.add('pauseAll')
  }

  let usingEmojiPolyfill = USE_EMOJI_POLYFILL
  let isFullScreen = false
  let isHidingMouse = false

  const keyevent = (key) => {
    // DOWNLOAD HTML
    if (key === 'd') {
      const a = document.createElement('a')
      a.href = 'data:text/html;charset=UTF-8,' + encodeURIComponent(document.documentElement.outerHTML)
      a.download = usedContent.join(' ').replaceAll(' ', '-') + '.html'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    }

    // OVERDRIVE
    else if (key === 'o') {
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
    else if (key === 'p') {
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
    else if (key === 'a') {
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
    else if (key === 'm') {
      if (isHidingMouse) {
        document.exitPointerLock()
        document.body.classList.remove('viewerMode')
      } else {
        document.body.classList.add('viewerMode')
        document.body.requestPointerLock()
      }
      isHidingMouse = !isHidingMouse
    }

    else if (key === 'i') {
      if (INVERT_ALL) {
        document.body.classList.remove('invertAll')
      } else {
        document.body.classList.add('invertAll')
      }

      INVERT_ALL = !INVERT_ALL
    }

    // NO DISTRACTION MODE
    else if (key === 'n') {
      if (isFullScreen) document.exitFullscreen()
      else document.body.requestFullscreen({ navigationUI: 'hide' })

      isFullScreen = !isFullScreen
    }


    // TOGGLE EMOJIS
    else if (key === 'e') {
      const emojiShadows = $.cls(document, 'emojiShadow')

      if (usingEmojiPolyfill) {
        Array.from(document.getElementsByTagName('img')).forEach(img => {
          img.replaceWith(img.alt)
        })
        emojiShadows.forEach(e => {
          e.style.textShadow = getTextShadowValue(Number(e.dataset.h) || 0)
          e.style.filter = ''
        })
      } else if (window.twemoji) {
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

    else if (['1', '2', '3', '4', '5', '6', '7'].includes(key)) {
      if (!projectionPages.pagesRendered) {
        projectionPages['2'] = generateMain(2, true)
        projectionPages['3'] = generateMain(3, true)
        projectionPages['4'] = generateMain(4, true)
        projectionPages['5'] = generateMain(5, true)
        projectionPages['6'] = generateMain(6, true)
        projectionPages.pagesRendered = true
      }

      if (key === '7') {
        renderMain(projectionPages['1'])
        $.render(document.body, projectionPages['2'])
        $.render(document.body, projectionPages['3'])
        $.render(document.body, projectionPages['4'])
        $.render(document.body, projectionPages['5'])
        $.render(document.body, projectionPages['6'])
      } else {
        renderMain(projectionPages[key])
      }
      START_TIME = Date.now()
    }

    else if (key === '0') {
      renderMain('')
    }
  }
  document.onkeydown = e => keyevent(e.key)

  if (queryParams.keys) queryParams.keys.split(',').filter(k => !['d', 'o'].includes(k)).forEach(keyevent)

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
