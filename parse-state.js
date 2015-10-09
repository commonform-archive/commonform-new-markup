module.exports = ParseState

function ParseState(tokens) {
  this.position = 0
  this.tokens = tokens }

var prototype = ParseState.prototype

prototype.end = function() {
  return ( this.position === this.tokens.length ) }

prototype.consume = function() {
  if (this.end()) {
    return null }
  else {
    var next = new ParseState(this.tokens, ( this.position + 1 ))
    var token = this.tokens[this.position]
    return [ next, token ] } }

prototype.expect = function(expectedTokenType) {
  var result = this.consume()
  if (result === null || result.value.type !== expectedTokenType) {
    return null }
  else {
    return result } }

prototype.peek = function() {
  if (this.end()) {
    return null }
  else {
    return this.tokens[this.position] } }
