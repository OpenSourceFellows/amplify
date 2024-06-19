const testHtml = '<div><h1>Hi <vue>merge</vue></h1><p>This is a sentence.</p></div>'

class HtmlTree {
  // Supports normal tags, but not something like <span style=...>lorem ipsum</span>
  tags = new RegExp(/(<\/*[[div|li|ul|ol|a|h|p|span|label|html|vue\]123456]*>)/)

  symbols = {
    '<h1>'   : '</h1>',
    '<h2>'   : '</h2>',
    '<h3>'   : '</h3>',
    '<h4>'   : '</h4>',
    '<h5>'   : '</h5>',
    '<h6>'   : '</h6>',
    '<p>'    : '</p>',
    '<div>'  : '</div>',
    '<span>' : '</span>',
    '<label>': '</label>',
    '<html>' : '</html>',
    '<a>'    : '</a>',
    '<ul>'   : '</ul>',
    '<li>'   : '</li>',
    '<ol>'   : '</ol>',
    '<vue>'  : '</vue>' // Handlebars for string interpolation
  }

  constructor(htmlString) {
    this.head = new HtmlLeaf()
    this.currentLeaf = this.head

    this.unparsedHtml = htmlString

    this.parse()
  }

  eachLeaf(start, func){
    func(start)

    start.children.forEach((child) => this.eachLeaf(child, func))
  }

  mapLeaves(start, func) {
    func(start)

    return start.children.map((child) => this.mapLeaves(child, func))
  }

  tagName(leaf) {
    console.log(leaf.content.tag)
  }

  parse() {
    const contentArr = this.unparsedHtml.split(this.tags)
    const openingTags = Object.keys(this.symbols)
    const closingTags = Object.values(this.symbols)
    let unclosedTags = []

    console.log(contentArr)

    for (const token of contentArr) {
      if (token === '') continue; // Get rid of empty strings, if any.

      if (closingTags.includes(token) && unclosedTags.length === 0) {
        throw new Error('Malformed html!')
      }

      // If we have a closing tag and an unclosedTag,
      // set the currentLeaf's parent as the new currentLeaf
      if (closingTags.includes(token)) {
        // TODO: Check for unmatched set before popping

        console.log(`A: ${token}, ${unclosedTags}`)
        closingTags.pop()

        if (!this.currentLeaf.parent) {
          break // If the current Lead has no parent, we must be back at the head
        }

        this.currentLeaf = this.currentLeaf.parent
        continue
      }

      // If there is no open tag, create a Leaf and set that tag to be the open one.
      // We want to match an open and close tag. If we get an opening tag symbol and we have
      // one set as openTag, then that should be a child Leaf of the current tag.
      if (openingTags.includes(token) && unclosedTags.length == 0) {
        console.log(`B: ${token}, ${unclosedTags}`)
        unclosedTags.push(token)
        this.currentLeaf.content.tag = token
        continue
      }

      // If there's another opening tag but we're opened
      if (openingTags.includes(token) && unclosedTags.length > 0) {
        console.log(`C: ${token}, ${unclosedTags}`)
        unclosedTags.push(token)
        this.currentLeaf = this.currentLeaf.createChildLeaf(token, this.currentLeaf)
        continue
      }

      // If we aren't doing an operation on a Leaf, we can assume
      // that the token is just content to append
      this.currentLeaf.content.text += token
    }
  }
}

class HtmlLeaf {
  constructor(tag=null, parent=null) {
    this.content = { tag, text: '' }
    this.children = []
    this.parent = parent
  }

  isHead() {
    if (!this.parent) {
      return true
    }

    return false
  }

  siblings() {
    if (!this.parent) {
      return null
    }

    const siblings = []

    for (const node of this.parent.children) {
      if (node === this) continue

      siblings.push(node)
    }

    return siblings
  }

  createChildLeaf(tag, parent) {
    const leaf = new HtmlLeaf(tag, parent)
    this.children.push(leaf)

    return leaf
  }
}

// const tree = new HtmlTree(testHtml)

export default HtmlTree