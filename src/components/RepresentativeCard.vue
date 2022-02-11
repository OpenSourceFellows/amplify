<template lang="html">
  <v-card
    flat
    v-on:click="handleRepClick"
    :to="{
      name: 'RepClick',
      params: { member: member.name }
    }"
  >
    <v-card-title v-text="member.name"></v-card-title>
    <v-card-subtitle v-text="member.title" style="text-align: left">
    </v-card-subtitle>
    <v-card-subtitle
      v-text="member.city"
      style="text-align: left"
    ></v-card-subtitle>
  </v-card>
</template>

<script lang="js">
import axios from 'axios'

export default {
  name: 'representative-card',
  components: {
  },
  props: {
    member: Object
  },
  data () {
    return {
    }
  },
  emits: ['handleRepSelected'],
  methods: {
    async handleRepClick () {
      try {
        const campaignId = this.$route.params.campaignId

        const versions = await axios.get(
          'https://murmuring-headland-63935.herokuapp.com/api/Letter_Versions/' + campaignId
        )
        const latestVersion = versions.data[versions.data.length - 1].template_id

        const letter = await axios.get(
          'https://murmuring-headland-63935.herokuapp.com/api/lob/templates/' + latestVersion
        )

        const letterBody = letter.data.versions[0].html
        const selectedRep = this.member
        this.$emit('handleRepSelected', letterBody, selectedRep, true)
      } catch (e) {
        console.error(e)
      }
    }
  }
}
</script>

<style scoped lang="less"></style>
