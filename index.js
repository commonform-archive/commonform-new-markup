var parser = require('./parser').parser

module.exports = function(string) {
  return parser.parse(string) }
