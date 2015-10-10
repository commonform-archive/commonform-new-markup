Start
  = c:Content
    { return { content: c } }

Content
  = s:Series ps:ParagraphsThenSeries+ p:Paragraphs
    { return s.concat(ps).concat(p) }
  / s:Series ps:ParagraphsThenSeries+
    { return s.concat(ps) }
  / ps:ParagraphsThenSeries+ p:Paragraphs?
    { ps = ps.reduce(function(x, y) { return x.concat(y) })
      return ps.concat(p || [ ]) }
  / s:Series p:Paragraphs?
    { return s.concat(p || [ ]) }
  / p:Paragraphs
    { return p }

ParagraphsThenSeries
  = p:Paragraphs s:Series
    { return p.concat(s) }

Paragraphs
  = p:Paragraph m:( AnotherParagraph )*
    { return m.reduce(
        function(result, element) {
          return result.concat(element) },
        p) }

AnotherParagraph
  = NewLine p:Paragraph
    { return p }

Series
  = Indent c:Child m:( AnotherChild )* Dedent
    { return [ c ].concat(m) }

AnotherChild
  = NewLine? c:Child
    { return c }

Child
  = h:Heading "\\\\" f:Form
    { return { heading: h, form: f } }
  / h:Heading "!!" f:Form
    { f.conspicuous = 'yes'
      return { heading: h, form: f } }
  / "\\\\" f:Form
    { return { form: f } }

Form
  = c:Content
    { return { content: c } }

Heading
  = t:Text
    { return t }

Paragraph
  = c:InlineContent+
    { return c.reduce(
        function(x, y) { return x.concat(y) },
        [ ]) }

InlineContent
  = Blank
  / Definition
  / Use
  / Reference
  / Text

Blank
  = '[' t:Text ']'
    { return { blank: t } }

Definition
  = '""' t:Text '""'
    { return { definition: t } }

Use
  = '<' t:Text '>'
    { return { use: t } }

Reference
  = '{' t:Text '}'
    { return { reference: t } }

Text
  = chars:[a-zA-Z ]+
    { return chars.join('') }

Indent
  = "\x0F"

Dedent
  = "\x0E"

NewLine
  = "\n"
