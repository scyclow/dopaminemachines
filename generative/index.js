css`
  * {
    margin: 0;
    padding: 0;
  }

  body {

  }

  h1 {
    font-size: 9.5em;
    display: inline-block;
    font-family: sans-serif;
  }

  div {
    display: inline-block
  }

  .center {
    padding: 1em;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column
  }
`
const h1 = (c, style='') => `<h1 style="${style}">${c}</h1>`
const div = (c, animations=[]) => `<div style="animation: ${animations.join(',')}">${c}</div>`
const center = (c, style) => `<div class="center" style="${style}">${c}</div>`
const j = (...c) => c.join('')
// document.body.innerHTML = marquee(h1(textAnimate('blah blah blah ', [
//   UpDown(2000),
//   // FadeInOut,
//   ColorRotate(8000)
// ], { freq: 15 })))

// document.body.innerHTML += marquee(h1(textAnimate('blah blah blah ', [
//   UpDown(4000),
//   // FadeInOut,
//   ColorRotate(8000)
// ], { freq: 15 })), { direction: -1})


// document.body.innerHTML = marquee(
//   'You\'ll never make it. ', {
//     duration: 40,
//     wordWrap: h1,
//     charWrap: apply(
//       textAnimate, [
//         UpDown(2000),
//         // FadeInOut,
//         ColorRotate(8000)
//       ],
//       { freq: 15 }
//     )
//   }
// )

document.body.innerHTML = `
  <div style="display: flex; justify-content: center; padding-top: 1em">
    ${
      // center(
      //   j(
      //     ExpandContract(
      //       Dance(h1('WOW'), {speed: 1700}),
      //       { speed: 1700 }
      //     ),
      //     ExpandContract(
      //       Dance(h1('WOW'), {speed: 1700}),
      //       { speed: 1700, delay: 400 }
      //     ),
      //     ExpandContract(
      //       Dance(h1('WOW'), {speed: 1700}),
      //       { speed: 1700, delay: 800 }
      //     ),
      //     ExpandContract(
      //       Dance(h1('WOW'), {speed: 1700}),
      //       { speed: 1700, delay: 1200 }
      //     )
      //   ),
      //   'height: 100vh;'
      // )
      // +
      // center(
      //   j(
      //     ExpandContract(
      //       Dance(h1('WOW'), {speed: 1700}),
      //       { speed: 1700, delay: 200 }
      //     ),
      //     ExpandContract(
      //       Dance(h1('WOW'), {speed: 1700}),
      //       { speed: 1700, delay: 600 }
      //     ),
      //     ExpandContract(
      //       Dance(h1('WOW'), {speed: 1700}),
      //       { speed: 1700, delay: 800 }
      //     ),
      //     ExpandContract(
      //       Dance(h1('WOW'), {speed: 1700}),
      //       { speed: 1700, delay: 1000 }
      //     )
      //   ),
      //   'height: 100vh;'
      // )

      // +
      center(
        j(
          ExpandContract(
            Dance(h1('WOW'), {speed: 1700}),
            { speed: 1700, delay: 400 }
          ),
          ExpandContract(
            Dance(h1('WOW'), {speed: 1700}),
            { speed: 1700, delay: 800 }
          ),
          ExpandContract(
            Dance(h1('WOW'), {speed: 1700}),
            { speed: 1700, delay: 1200 }
          ),
          ExpandContract(
            Dance(h1('WOW'), {speed: 1700}),
            { speed: 1700, delay: 1600 }
          )
        ),
        'height: 100vh;'
      )

    }
  </div>
`


// document.body.innerHTML = center(
//   j(
//       Spin(h1('WOW'), {speed: 1700}),
//       Spin(h1('WOW'), {speed: 1700, direction: -1}),
//       Spin(h1('WOW'), {speed: 1700}),
//       Spin(h1('WOW'), {speed: 1700, direction: -1}),
//   ),
//   'height: 100vh;'
// )

document.body.innerHTML = center(
  // j(
  //     marquee(h1(textAnimate('XXXXXXXXXXXXXXXX', [FadeInOut(2000), BigSmall(1700), ColorRotate(2000)], { freq: 7 }))),
  //     marquee(h1(textAnimate('XXXXXXXXXXXXXXXX', [FadeInOut(2000), BigSmall(1700), ColorRotate(2000)], { freq: 7 }))),
  //     marquee(h1(textAnimate('XXXXXXXXXXXXXXXX', [FadeInOut(2000), BigSmall(1700), ColorRotate(2000)], { freq: 7 }))),
  //     marquee(h1(textAnimate('XXXXXXXXXXXXXXXX', [FadeInOut(2000), BigSmall(1700), ColorRotate(2000)], { freq: 7 }))),
  //     marquee(h1(textAnimate('XXXXXXXXXXXXXXXX', [FadeInOut(2000), BigSmall(1700), ColorRotate(2000)], { freq: 7 }))),

  // ),
  j(
      // marquee(
      //   h1(
      //     textAnimate(
      //       'XXXXXXXXXXXXXXXX',
      //       [FadeInOut(2000), BigSmall(1700), ColorRotate(2000)],
      //       { freq: 7, style: 'color: blue' }
      //     ),
      //   )
      // ),
      marquee(
        h1(
          textAnimate(
            'XXXX',
            [ColorRotate(2000)],
            // [FadeInOut(2000), BigSmall(1700), ColorRotate(2000), UpDown(700)],
            { freq: 7, style: 'color: red' }
          ),
        )
      )
  ),
  'height: 100vh;'
)