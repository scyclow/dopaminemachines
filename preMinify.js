const fs = require('fs')
// const uglify = require('uglify-js')
// const uglfyConfig = require('./uglify.config.json')

const utils = fs.readFileSync('./marquees/utils.js', 'utf8')
const $ = fs.readFileSync('./marquees/$.js', 'utf8')
const globals = fs.readFileSync('./marquees/globals.js', 'utf8')
const sound = fs.readFileSync('./marquees/sound.js', 'utf8')
const components = fs.readFileSync('./marquees/components.js', 'utf8')
const text = fs.readFileSync('./marquees/text.js', 'utf8')
const sections = fs.readFileSync('./marquees/sections.js', 'utf8')
const index = fs.readFileSync('./marquees/index.js', 'utf8')


const script = [utils, $, globals, sound, components, text, sections, index].join('\n')

// console.log('uglifying')
// console.log(script)
// const uglified = uglify.minify(script, uglfyConfig)

fs.writeFileSync('./marquees/preMin.js', script)
