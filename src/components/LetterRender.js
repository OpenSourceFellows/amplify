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
    createElementOnNode(node) {
      return document.createElement(node.content.tag, node.content.text)
    }
  },
  render () {
    const tree = new HtmlTree(this.template)

    return tree.onEachLeaf(tree.head, this.createElementOnNode)
    
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