//CHILD
<template lang="html">
    <section class="letter-display"></section>
</template>

<script lang="js">

  export default  {
    name: 'letter-display',
    props: ['congressMembers'],
    mounted () {

    },
    data () {
      return {

      }
    },
    methods: {

    },
    computed: {

    }
}
</script>

<style scoped lang="less">
.letter-display {
    border: 5px solid lightgreen;
    height: 500px;
}
</style>
