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
    parse(IN + '\\\\test' + DE),
    { content: [ { form: { content: [ 'test' ] } } ] })

  test.deepEqual(
    parse(IN + '\\\\a|\\\\b' + DE),
    { content: [
      { form: { content: [ 'a' ] } },
      { form: { content: [ 'b' ] } } ] })

  test.deepEqual(
    parse(IN + 'heading\\\\test' + DE),
    { content: [
      { heading: 'heading',
        form: { content: [ 'test' ] } } ] })

  test.deepEqual(
    parse(IN + '\\\\' + IN + '\\\\b' + DE + DE),
    { content: [
      { form: {
        content: [
          { form: { content: [ 'b' ] } } ] } } ] })

  test.deepEqual(
    parse(IN + '\\\\' + IN + '\\\\b|\\\\c' + DE + DE),
    { content: [
      { form: {
        content: [
          { form: { content: [ 'b' ] } },
          { form: { content: [ 'c' ] } } ] } } ] })

  test.deepEqual(
    parse(IN + '\\\\a' + IN + '\\\\b|\\\\c' + DE + DE),
    { content: [
      { form: {
        content: [
          'a',
          { form: { content: [ 'b' ] } },
          { form: { content: [ 'c' ] } } ] } } ] })

  test.deepEqual(
    parse(IN + (
      '\\\\a' + IN +
        '\\\\b' + '|' +
        '\\\\c' + DE + '|' +
      '\\\\d' + DE)),
    { content: [
      { form: {
        content: [
          'a',
          { form: { content: [ 'b' ] } },
          { form: { content: [ 'c' ] } } ] } },
      { form: { content: [ 'd' ] } } ] })

  test.deepEqual(
    parse(IN + (
      '\\\\a' + IN +
        '\\\\b' + IN +
          '\\\\c' + DE + DE + '|' +
      '\\\\d' + DE)),
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
    { content: [ { form: { content: [ 'multiple words' ] } } ] })

  test.deepEqual(
    parse(IN + (
      '\\\\a' + IN +
        '\\\\b' + DE + '|' +
      'c' + DE)),
    { content: [
      { form: {
        content: [
          'a',
          { form: { content: [ 'b' ] } },
          'c' ] } } ] })

  test.deepEqual(
    parse(IN + (
      '\\\\a' + IN +
        '\\\\b' + DE + '|' +
      'c' + '|' +
      'd' + DE)),
    { content: [
      { form: {
        content: [
          'a',
          { form: { content: [ 'b' ] } },
          'c',
          'd' ] } } ] })

  test.end() })
