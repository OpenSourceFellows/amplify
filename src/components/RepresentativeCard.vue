<template lang="html">
  <v-card
    flat
    :to="{
      name: 'RepClick',
      params: { member: member.name }
    }"
    @click="handleRepClick"
  >
    <v-card-title v-text="member.name" />
    <v-card-subtitle style="text-align: left" v-text="member.title" />
    <v-card-subtitle style="text-align: left" v-text="member.city" />
  </v-card>
</template>

<script lang="js">
import axios from 'axios'

export default {
  name: 'RepresentativeCard',
  components: {
  },
  props: {
    member: Object
  },
  emits: ['handleRepSelected'],
  data () {
    return {
    }
  },
  methods: {
    async handleRepClick () {
      try {
        const campaignId = this.$route.params.campaignId

        const versions = await axios.get(
          '/api/Letter_Versions/' + campaignId
        )
        const latestVersion = versions.data[versions.data.length - 1].template_id

        // Set letterId in state
        console.log(typeof latestVersion)
        this.$store.commit('setGenericValue', { key: 'letterId', value: latestVersion })

        const letter = await axios.get(
          '/api/lob/templates/' + latestVersion
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
