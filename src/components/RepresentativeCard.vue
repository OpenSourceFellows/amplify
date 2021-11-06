<template lang="html">
    <v-card
        v-on:click="handleRepClick(member)"
        :to="{
            name: 'RepClick',
            params: { member: member.name }
        }"
    >
        <v-card-title v-text="member.name"></v-card-title>
        <v-card-subtitle v-text="member.title" style="text-align:left">
        </v-card-subtitle>
        <v-card-subtitle
            v-text="member.city"
            style="text-align:left"
        ></v-card-subtitle>
    </v-card>
</template>

<script lang="js">
  export default  {
    name: 'representative-card',
    components: {
    },
    props: ['member', 'handleRepClick'],
    mounted () {
      this.handleRepClick(this.member);
    },
    data () {
      return {
      }
    },
    methods: {},
}
</script>

<style scoped lang="less"></style>
