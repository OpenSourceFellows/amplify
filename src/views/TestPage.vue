<template>
  <div>
    <LetterRender :template="template" />
  </div>
</template>

<script>
import LetterRender from '../components/LetterRender';

  export default {
    components: { LetterRender },
    data() {
      return {
        template: '<div><h1>Hi <vue>merge</vue></h1><p>This is a sentence.</p></div>'
      }
    }
  }
</script>

<style lang="less" scoped>

</style>