var tape = require('tape')
var parse = require('.')

var IN = '>'
var DE = '<'

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
    parse('\\\\' + IN + '\\\\b' + DE),
    { content: [
      { form: {
        content: [
          { form: { content: [ 'b' ] } } ] } } ] })

  test.deepEqual(
    parse('\\\\' + IN + '\\\\b\n\\\\c' + DE),
    { content: [
      { form: {
        content: [
          { form: { content: [ 'b' ] } },
          { form: { content: [ 'c' ] } } ] } } ] })

  test.deepEqual(
    parse('\\\\a' + IN + '\\\\b\n\\\\c' + DE),
    { content: [
      { form: {
        content: [
          'a',
          { form: { content: [ 'b' ] } },
          { form: { content: [ 'c' ] } } ] } } ] })

  test.deepEqual(
    parse((
      '\\\\a' + IN +
        '\\\\b\n' +
        '\\\\c' + DE + '\n' +
      '\\\\d' )),
    { content: [
      { form: {
        content: [
          'a',
          { form: { content: [ 'b' ] } },
          { form: { content: [ 'c' ] } } ] } },
      { form: { content: [ 'd' ] } } ] })

  test.deepEqual(
    parse((
      '\\\\a' + IN +
        '\\\\b' + IN +
          '\\\\c' + DE + DE + '\n' +
      '\\\\d' )),
    { content: [
      { form: {
        content: [
          'a',
          { form: {
            content: [
              'b',
              { form: { content: [ 'c' ] } } ] } } ] } },
      { form: { content: [ 'd' ] } } ] })

  test.end() })
