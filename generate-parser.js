var Generator = require('jison').Generator

var grammar = {
  lex: {
    rules: [
      [ '\\\\\\\\',
        'return "SLASHES"' ],
      [ '\\n',
        'return "NEWLINE"' ],
      [ '\x0E',
        'return "DEDENT"' ],
      [ '\x0F',
        'return "INDENT"' ],
      [ '[a-z]+',
        'return "TEXT"' ],
      [ '$',
        'return "EOF"' ] ] },
  start: 'start',
  bnf: {
    start: [
      [ 'children EOF',
        'return { content: $1 }' ] ],
    children: [
      [ 'child',
        '$$ = [ $1 ]' ],
      [ 'child morechildren',
        '$$ = [ $1 ].concat($2)' ] ],
    morechildren: [
      [ 'NEWLINE children',
        '$$ = $2' ] ],
    child: [
      [ 'TEXT SLASHES form',
        '$$ = { heading: $1, form: $3 }' ],
      [ 'SLASHES form',
        '$$ = { form: $2 }' ] ],
    form: [
      [ 'TEXT',
        '$$ = { content: [ $1 ] }' ],
      [ 'INDENT child',
        '$$ = { content: [ $2 ] } ' ] ] } }

var options = {
  moduleType: 'commonjs',
  moduleName: 'commonform' }

process.stdout.write(new Generator(grammar, options).generate())
