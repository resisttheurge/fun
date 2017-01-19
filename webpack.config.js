'use strict'

const target = 'node'

const entry = ['babel-polyfill', './main.js']

const output = {
  path: './dist',
  filename: 'main.js'
}

const rules = [{
  test: /.js$/,
  exclude: [/node_modules/],
  use: ['babel-loader']
}]

module.exports = {
  target,
  entry,
  output,
  module: {
    rules
  }
}
