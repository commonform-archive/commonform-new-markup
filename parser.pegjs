Start
  = c:Content
    { return { content: c } }

Content
  = first:Child second:More*
    { return [ first ].concat(second) }

More
  = NewLine c:Child
    { return c }
  / Dedent NewLine p:Paragraph
    { return p }

Child
  = h:Heading "\\\\" f:Form
    { return { heading: h, form: f } }
  / h:Heading "!!" f:Form
    { f.conspicuous = 'yes'
      return { heading: h, form: f } }
  / "\\\\" f:Form
    { return { form: f } }

Heading
  = t:Text
    { return t.join('') }

Form
  = p:Paragraph c:Children?
    { if (c) {
        return { content: [ p ].concat(c) } }
      else {
        return { content: [ p ] } } }
  / c:Children
    { return { content: c } }

Children
  = Indent c:Content Dedent
    { return c }

Paragraph
  = t:Text
    { return t.join('') }

Text
  = chars:[a-z ]+
    { return chars }

Indent
  = ">"

Dedent
  = "<"

NewLine
  = "|"
