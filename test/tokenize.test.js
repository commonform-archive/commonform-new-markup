var tape = require('tape')
var tokenize = require('../tokenize')

tape('tokenizer', function(test) {

  test.deepEqual(
    tokenize('a test'),
    [ { type: 'TEXT',    line: 1, column: 1, string: 'a test' },
      { type: 'END',     line: 1, column: 7, string: '' } ],
    'just text')

  test.deepEqual(
    tokenize(
      [ 'A',
        '    B',
        'C' ].join('\n')),
    [ { type: 'TEXT',    line: 1, column: 1, string: 'A' },
      { type: 'NEWLINE', line: 1, column: 2, string: '\n' },
      { type: 'INDENT',  line: 2, column: 1, string: '    ' },
      { type: 'TEXT',    line: 2, column: 5, string: 'B' },
      { type: 'NEWLINE', line: 2, column: 6, string: '\n' },
      { type: 'OUTDENT', line: 3, column: 1, string: '' },
      { type: 'TEXT',    line: 3, column: 1, string: 'C' },
      { type: 'END',     line: 3, column: 2, string: '' } ],
    'OUTDENT')

  test.deepEqual(
    tokenize(
      [ 'A',
        '    B',
        '    C' ].join('\n')),
    [ { type: 'TEXT',    line: 1, column: 1, string: 'A' },
      { type: 'NEWLINE', line: 1, column: 2, string: '\n' },
      { type: 'INDENT',  line: 2, column: 1, string: '    ' },
      { type: 'TEXT',    line: 2, column: 5, string: 'B' },
      { type: 'NEWLINE', line: 2, column: 6, string: '\n' },
      { type: 'TEXT',    line: 3, column: 5, string: 'C' },
      { type: 'OUTDENT', line: 3, column: 6, string: '' },
      { type: 'END',     line: 3, column: 6, string: '' } ],
    'consecutive at same level')

  test.deepEqual(
    tokenize(
      [ 'A',
        '    B',
        '        C',
        'D' ].join('\n')),
    [ { type: 'TEXT',    line: 1, column: 1, string: 'A' },
      { type: 'NEWLINE', line: 1, column: 2, string: '\n' },
      { type: 'INDENT',  line: 2, column: 1, string: '    ' },
      { type: 'TEXT',    line: 2, column: 5, string: 'B' },
      { type: 'NEWLINE', line: 2, column: 6, string: '\n' },
      { type: 'INDENT',  line: 3, column: 1, string: '        ' },
      { type: 'TEXT',    line: 3, column: 9, string: 'C' },
      { type: 'NEWLINE', line: 3, column: 10, string: '\n' },
      { type: 'OUTDENT', line: 4, column: 1, string: '' },
      { type: 'OUTDENT', line: 4, column: 1, string: '' },
      { type: 'TEXT',    line: 4, column: 1, string: 'D' },
      { type: 'END',     line: 4, column: 2, string: '' } ],
    'multiple OUTDENT')

  test.deepEqual(
    tokenize(
      [ 'A',
        '    B',
        '        C' ].join('\n')),
    [ { type: 'TEXT',    line: 1, column: 1, string: 'A' },
      { type: 'NEWLINE', line: 1, column: 2, string: '\n' },
      { type: 'INDENT',  line: 2, column: 1, string: '    ' },
      { type: 'TEXT',    line: 2, column: 5, string: 'B' },
      { type: 'NEWLINE', line: 2, column: 6, string: '\n' },
      { type: 'INDENT',  line: 3, column: 1, string: '        ' },
      { type: 'TEXT',    line: 3, column: 9, string: 'C' },
      { type: 'OUTDENT', line: 3, column: 10, string: '' },
      { type: 'OUTDENT', line: 3, column: 10, string: '' },
      { type: 'END',     line: 3, column: 10, string: '' } ],
    'emits terminal OUTDENT tokens')

  test.deepEqual(
    tokenize(
      [ 'A',
        '    B',
        '',
        '',
        '',
        '        C' ].join('\n')),
    [ { type: 'TEXT',    line: 1, column: 1, string: 'A' },
      { type: 'NEWLINE', line: 1, column: 2, string: '\n' },
      { type: 'INDENT',  line: 2, column: 1, string: '    ' },
      { type: 'TEXT',    line: 2, column: 5, string: 'B' },
      { type: 'NEWLINE', line: 2, column: 6, string: '\n' },
      { type: 'INDENT',  line: 6, column: 1, string: '        ' },
      { type: 'TEXT',    line: 6, column: 9, string: 'C' },
      { type: 'OUTDENT', line: 6, column: 10, string: '' },
      { type: 'OUTDENT', line: 6, column: 10, string: '' },
      { type: 'END',     line: 6, column: 10, string: '' } ],
    'ignores blank lines')

  test.deepEqual(
    tokenize(
      [ 'A',
        '# Comment',
        'B' ].join('\n')),
    [ { type: 'TEXT',    line: 1, column: 1, string: 'A' },
      { type: 'NEWLINE', line: 1, column: 2, string: '\n' },
      { type: 'TEXT',    line: 3, column: 1, string: 'B' },
      { type: 'END',     line: 3, column: 2, string: '' } ],
    'ignores comment lines')

  test.deepEqual(
    tokenize(
      [ '',
        '',
        'A',
        '    B',
        '        C' ].join('\n')),
    [ { type: 'TEXT',    line: 3, column: 1, string: 'A' },
      { type: 'NEWLINE', line: 3, column: 2, string: '\n' },
      { type: 'INDENT',  line: 4, column: 1, string: '    ' },
      { type: 'TEXT',    line: 4, column: 5, string: 'B' },
      { type: 'NEWLINE', line: 4, column: 6, string: '\n' },
      { type: 'INDENT',  line: 5, column: 1, string: '        ' },
      { type: 'TEXT',    line: 5, column: 9, string: 'C' },
      { type: 'OUTDENT', line: 5, column: 10, string: '' },
      { type: 'OUTDENT', line: 5, column: 10, string: '' },
      { type: 'END',     line: 5, column: 10, string: '' } ],
    'ignores initial blank lines')

  test.throws(
    function() { tokenize('\ttest') },
    /invalid character/i)

  test.throws(
    function() { tokenize('§ test') },
    /invalid character/i)

  test.end() })
