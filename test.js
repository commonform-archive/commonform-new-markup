var tape = require('tape')
var parse = require('.')

tape(function(test) {

  test.deepEqual(
    parse('\\\\test'),
    { content: [ { form: { content: [ 'test' ] } } ] })

  test.deepEqual(
    parse('\\\\a\n\\\\b'),
    { content: [
      { form: { content: [ 'a' ] } },
      { form: { content: [ 'b' ] } } ] })

  test.deepEqual(
    parse('heading\\\\test'),
    { content: [
      { heading: 'heading',
        form: { content: [ 'test' ] } } ] })

  test.end() })
