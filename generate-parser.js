var Generator = require('jison').Generator

var grammar = {
  lex: {
    rules: [
      [ '\\\\\\\\',
        'return "SLASHES"' ],
      [ '!!',
        'return "BANGS"' ],
      [ '\\|',
        'return "NEWLINE"' ],
      [ '<',
        'return "DEDENT"' ],
      [ '>',
        'return "INDENT"' ],
      [ '[a-z ]+',
        'return "TEXT"' ],
      [ '$',
        'return "EOF"' ] ] },
  start: 'start',
  bnf: {
    start: [
      [ 'children EOF',
        'return { content: $1 }' ] ],
    child: [
      [ 'heading SLASHES form',
        '$$ = { heading: $1, form: $3 }' ],
      [ 'SLASHES form',
        '$$ = { form: $2 }' ] ],
    paragraph: [
      [ 'TEXT',
        '$$ = [ $1 ]' ] ],
    heading: [
      [ 'paragraph',
        '$$ = $1.join("")' ] ],
    children: [
      [ 'child',
        '$$ = $1' ],
      [ 'children NEWLINE child',
        '$$ = $1.concat($2)' ] ],
    paragraphs: [
      [ 'paragraph',
        '$$ = $1' ],
      [ 'paragraphs NEWLINE paragraph',
        '$$ = $1.concat($2)' ] ],
    form: [
      [ 'paragraphs',
        '$$ = $1; console.log($$)' ],
      [ 'INDENT children DEDENT',
        '$$ = { content: $2 }; console.log($$)' ] ] } }

var options = {
  type: 'lalr',
  moduleType: 'commonjs',
  moduleName: 'commonform' }

process.stdout.write(new Generator(grammar, options).generate())
