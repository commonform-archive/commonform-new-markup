Start
  = c:Content
    { return { content: c } }

Content
  = p:FlushParagraphs s:Series?
    { return p.concat(s || [ ]) }
  / s:Series p:DedentedParagraphs?
    { return s.concat(p || [ ]) }
  / s:Series m:ParagraphsThenSeries*
    { return s.concat(m) }

ParagraphsThenSeries
  = p:DedentedParagraphs s:Series
    { return p.concat(s) }

FlushParagraphs
  = p:Paragraph m:( AnotherParagraph )*
    { return [ p ].concat(m) }

DedentedParagraphs
  = Dedent NewLine p:FlushParagraphs
    { return p }

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
  = "|"
