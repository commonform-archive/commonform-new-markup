Start
  = c:Content
    { return { content: c } }

Content
  = p:Paragraphs m:( Series Paragraphs )*
    { var rest = m.map(function(e) { return e[0].concat(e[1]) })
      return p.concat(rest) }
  / p:Paragraphs s:Series
    { return p.concat(s) }
  / s:Series m:( Paragraphs Series )*
    { var rest = m.map(function(e) { return e[0].concat(e[1]) })
      return s.concat(rest) }
  / s:Series p:Paragraphs
    { return s.concat(p) }

Paragraphs
  = Dedent p:Paragraph m:( MoreParagraphs )*
    { return [ p ].concat(m) }

MoreParagraphs
  = NewLine p:Paragraph
    { return p }

Series
  = Indent c:Child m:( MoreChildren )* Dedent
    { return [ c ].concat(m) }

MoreChildren
  = NewLine c:Child
    { return c }

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
  = p:Paragraphs c:Indented?
    { if (c) {
        return { content: p.concat(c) } }
      else {
        return { content: p } } }
  / c:Indented
    { return { content: c } }

Indented
  = Indent c:Content
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
