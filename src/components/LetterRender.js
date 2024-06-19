import Vue from 'vue'
import HtmlTree from '@/utilities/html-parser.js'


const LetterRender = Vue.component('LetterRender', {
  props: {
    template: {
      type: String,
      required: true
    }
  },
  methods: {
    createElementOnNode(node, createElement) {
      return createElement(node.content.tag, node.content.text)
    }
  },
  render (createElement) {
    const tree = new HtmlTree(this.text)

    return tree.eachLeaf(tree.head, this.createElementOnNode(createElement))
    
    /*createElement(
      'h1',
      {
        domProps: {
          innerHTML: this.template
        },
      }
    )*/
  }
})

export default LetterRender