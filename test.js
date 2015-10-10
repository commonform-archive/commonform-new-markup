var tape = require('tape')
var parse = require('.')

var IN = '>'
var DE = '<'

tape(function(test) {

  // test.deepEqual(
  //   parse('\\\\a>\\\\a<|b'),
  //   { content: [
  //     'a',
  //     { form: { content: [ 'a' ] } },
  //     'b' ] })

  test.deepEqual(
    parse('\\\\test'),
    { content: [ { form: { content: [ 'test' ] } } ] })

  test.deepEqual(
    parse('\\\\a|\\\\b'),
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
    parse('\\\\' + IN + '\\\\b|\\\\c' + DE),
    { content: [
      { form: {
        content: [
          { form: { content: [ 'b' ] } },
          { form: { content: [ 'c' ] } } ] } } ] })

  test.deepEqual(
    parse('\\\\a' + IN + '\\\\b|\\\\c' + DE),
    { content: [
      { form: {
        content: [
          'a',
          { form: { content: [ 'b' ] } },
          { form: { content: [ 'c' ] } } ] } } ] })

  test.deepEqual(
    parse((
      '\\\\a' + IN +
        '\\\\b' + '|' +
        '\\\\c' + DE + '|' +
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
          '\\\\c' + DE + DE + '|' +
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

  test.deepEqual(
    parse('\\\\multiple words'),
    { content: [ { form: { content: [ 'multiple words' ] } } ] })

  test.deepEqual(
    parse((
      '\\\\a' + IN +
        '\\\\b' + DE + '|' +
      'c')),
    { content: [
      { form: {
        content: [
          'a',
          { form: { content: [ 'b' ] } },
          'c' ] } } ] })

  test.deepEqual(
    parse((
      '\\\\a' + IN +
        '\\\\b' + DE + '|' +
      'c' + '|' +
      'd')),
    { content: [
      { form: {
        content: [
          'a',
          { form: { content: [ 'b' ] } },
          'c',
          'd' ] } } ] })

  test.end() })
