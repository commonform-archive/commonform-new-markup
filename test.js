var tape = require('tape')
var parse = require('.')

var IN = '\x0F'
var OUT = '\x0E'

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

  test.deepEqual(
    parse('\\\\' + IN + '\\\\b' + OUT),
    { content: [
      { form: {
        content: [
          { form: { content: [ 'b' ] } } ] } } ] })

  test.deepEqual(
    parse('\\\\' + IN + '\\\\b\n\\\\c' + OUT),
    { content: [
      { form: {
        content: [
          { form: { content: [ 'b' ] } },
          { form: { content: [ 'c' ] } } ] } } ] })

  test.deepEqual(
    parse('\\\\a' + IN + '\\\\b\n\\\\c' + OUT),
    { content: [
      { form: {
        content: [
          'a',
          { form: { content: [ 'b' ] } },
          { form: { content: [ 'c' ] } } ] } } ] })

  test.end() })
