var tape = require('tape')
var parse = require('.')

tape(function(test) {
  test.deepEqual(
    parse('\\\\test'),
    { content: [ { form: { content: [ 'test' ] } } ] })
  test.end() })
