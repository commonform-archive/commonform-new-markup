var Generator = require('jison').Generator

var grammar = {
  lex: {
    rules: [
      [ '\\\\\\\\',
        'return "SLASHES"' ],
      [ '\\n',
        'return "NEWLINE"' ],
      [ '[a-z]+',
        'return "TEXT"' ],
      [ '$',
        'return "EOF"' ] ] },
  bnf: {
    start: [
      [ 'children EOF',
        'return { content: $1 }' ] ],
    children: [
      [ 'child',
        '$$ = [ $1 ]' ],
      [ 'child morechildren' ,
        '$$ = [ $1 ].concat($2)' ] ],
    morechildren: [
      [ 'NEWLINE child', '$$ = $1' ],
      [ 'NEWLINE child morechildren', '$$ = $1' ] ],
    child: [
      [ 'content SLASHES content',
        '$$ = { heading: $1, form: { content: $2 } }' ],
      [ 'SLASHES content',
        '$$ = { form: { content: $2 } }' ] ],
    content: [
      [ 'TEXT',
        '$$ = [ $1 ]' ] ] } }

var options = {
  type: 'lalr',
  moduleType: 'commonjs',
  moduleName: 'commonform' }

process.stdout.write(new Generator(grammar, options).generate())
