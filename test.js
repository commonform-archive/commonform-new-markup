var tape = require('tape')
var fs = require('fs')
var pegjs = require('pegjs')

var parser = pegjs.buildParser(fs.readFileSync('parser.pegjs').toString())

function parse(input) {
  try {
    return parser.parse(input) }
  catch (e) {
    console.error(e)
    throw e } }

var IN = '>'
var DE = '<'

tape(function(test) {

  test.deepEqual(
    parse('test'),
    { content: [ 'test' ] })

  test.deepEqual(
    parse(IN + '\\\\test' + DE),
    { content: [ { form: { content: [ 'test' ] } } ] })

  test.deepEqual(
    parse(IN + 'heading\\\\test' + DE),
    { content: [
      { heading: 'heading',
        form: { content: [ 'test' ] } } ] },
    'with heading')

  test.deepEqual(
    parse(IN + '\\\\' + IN + '\\\\b' + DE + DE),
    { content: [
      { form: {
        content: [
          { form: { content: [ 'b' ] } } ] } } ] },
    'first element is child')

  test.deepEqual(
    parse(IN + '\\\\' + IN + '\\\\b\n\\\\c' + DE + DE),
    { content: [
      { form: {
        content: [
          { form: { content: [ 'b' ] } },
          { form: { content: [ 'c' ] } } ] } } ] },
    'consecutive nested children')

  test.deepEqual(
    parse(IN + '\\\\a\n\\\\b' + DE),
    { content: [
      { form: { content: [ 'a' ] } },
      { form: { content: [ 'b' ] } } ] },
    'consecutive children')

  test.deepEqual(
    parse(IN + '\\\\a' + IN + '\\\\b\n\\\\c' + DE + DE),
    // parse(
      // IN +
        // '\\\\' +
        // 'a' +
        // IN +
          // '\\\\' + 'b' + '\n' +
          // '\\\\' + 'c' +
        // DE
        // +
      // DE
    // ),
    { content: [
      { form: {
        content: [
          'a',
          { form: { content: [ 'b' ] } },
          { form: { content: [ 'c' ] } } ] } } ] },
    'consecutive children after par')

  return test.end()

  test.deepEqual(
    parse(
      IN +
        '\\\\' +
        'a' +
        IN +
          '\\\\' + 'b' + '\n' +
          '\\\\' + 'c' +
        DE +
        '\\\\' + 'd' +
      DE
    ),
    { content: [
      { form: {
        content: [
          'a',
          { form: { content: [ 'b' ] } },
          { form: { content: [ 'c' ] } } ] } },
      { form: { content: [ 'd' ] } } ] })

  test.deepEqual(
    parse(
      IN +
        '\\\\a' +
          IN + '\\\\b' +
            IN +
              '\\\\c' +
            DE +
          DE +
        '\\\\d' +
      DE
    ),
    { content: [
      { form: {
        content: [
          'a',
          { form: {
            content: [
              'b',
              { form: { content: [ 'c' ] } } ] } } ] } },
      { form: { content: [ 'd' ] } } ] })

  test.deepEqual(
    parse(IN + '\\\\multiple words' + DE),
    { content: [ { form: { content: [ 'multiple words' ] } } ] },
    'text with space')

  test.deepEqual(
    parse(
      IN +
        '\\\\' +
        'a' +
        IN +
          '\\\\' +
          'b' +
        DE +
        'c' +
      DE
    ),
    { content: [
      { form: {
        content: [
          'a',
          { form: { content: [ 'b' ] } },
          'c' ] } } ] },
    'par-childpar')

  test.deepEqual(
    parse(
      IN +
        '\\\\' +
        'a' +
        IN +
          '\\\\' +
          'b' +
        DE +
        'c' + '\n' +
        'd' +
      DE
    ),
    { content: [
      { form: {
        content: [
          'a',
          { form: { content: [ 'b' ] } },
          'c',
          'd' ] } } ] },
    'consecutive nested paragraphs')

  test.end() })
