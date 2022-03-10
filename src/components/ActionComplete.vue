<template lang="html">
  <section class="action-complete">
    <div class="text-section">
      <v-icon class="icon" size="64px" color="blue lighten-1">
        mdi-mailbox
      </v-icon>
      <h1>Congratulations!</h1>
      <v-text>Expected to be delivered: </v-text>
    </div>
    <div class="text-section">
      <h1>Want to send another letter for this campaign?</h1>
      <p class="align-left">
        Here are other representatives who are also key to reach out to on this
        cause. Your letter ensures they pay attention.
      </p>
    </div>
  </section>
</template>

<script lang="js">

export default {
    name: 'ActionComplete',
    props: [],
    data () {
        return {

        }
    },
    computed: {

    },
    mounted () {

    },
    methods: {
    }
}
</script>

<style scoped lang="less">
.action-complete {
  text-align: left;
  padding: 40px;
  .icon {
    float: left;
    padding-right: 16px;
    padding-left: 16px;
  }
  .text-section {
    padding: 16px;
  }
}
</style>
