Start
  = c:Content
    { return { content: c } }

Content
  = s:Series ps:ParagraphsThenSeries+ p:Paragraphs
    { return s.concat(ps).concat(p) }
  / s:Series ps:ParagraphsThenSeries+
    { return s.concat(ps) }
  / ps:ParagraphsThenSeries+ p:Paragraphs?
    { return ps.concat(p || [ ]) }
  / s:Series p:Paragraphs?
    { return s.concat(p || [ ]) }
  / p:Paragraphs
    { return p }

ParagraphsThenSeries
  = p:Paragraphs s:Series
    { return p.concat(s) }

Paragraphs
  = p:Paragraph m:( AnotherParagraph )*
    { return p.concat(m) }

AnotherParagraph
  = NewLine p:Paragraph
    { return p }

Series
  = Indent c:Child m:( AnotherChild )* Dedent
    { return [ c ].concat(m) }

AnotherChild
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

Form
  = c:Content
    { return { content: c } }

Heading
  = t:Text
    { return t.join('') }

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
  = [\n]
