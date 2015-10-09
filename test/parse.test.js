var tape = require('tape')
var parse = require('../parse')
var tokenize = require('../tokenize-lines')

tape('pareser', function(test) {

  test.deepEqual(
    parse(tokenize('a test')),
    { content: [ 'a test' ] })

  test.end() })
