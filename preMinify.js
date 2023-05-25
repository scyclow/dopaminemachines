const fs = require('fs')
// const uglify = require('uglify-js')
// const uglfyConfig = require('./uglify.config.json')

const utils = fs.readFileSync('./dev/utils.js', 'utf8')
const $ = fs.readFileSync('./dev/$.js', 'utf8')
const globals = fs.readFileSync('./dev/globals.js', 'utf8')
const sound = fs.readFileSync('./dev/sound.js', 'utf8')
const components = fs.readFileSync('./dev/components.js', 'utf8')
const text = fs.readFileSync('./dev/text.js', 'utf8')
const sections = fs.readFileSync('./dev/sections.js', 'utf8')
const index = fs.readFileSync('./dev/index.js', 'utf8')


const script = [utils, $, globals, sound, components, text, sections, index].join('\n')

// console.log('uglifying')
// console.log(script)
// const uglified = uglify.minify(script, uglfyConfig)

fs.writeFileSync('./dev/preMin.js', script)
