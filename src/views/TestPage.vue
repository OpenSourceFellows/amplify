<template>
  <div>
    <LetterRender :template="template" class="test"/>
  </div>
</template>

<script>
import LetterRender from '../components/LetterRender';

  export default {
    components: { LetterRender },
    data() {
      return {
        template: '<div><h1>Hi <span>merge</span></h1><p>This is a sentence.</p></div>'
      }
    }
  }
</script>

<style lang="less" scoped>
.test {
  background-color: rebeccapurple;
  height: 100px
}
</style>