<template lang="html">
  <v-card
    flat
    v-on:click="handleRepClick"
    :to="{
      name: 'RepClick',
      params: { member: member.name }
    }"
  >
    <v-list-item>
      <v-avatar style="margin-bottom: 0px">
        <v-img class="float-lg-left" v-bind:src="member.photoUrl"> </v-img>
      </v-avatar>

      <v-list-item-content>
        <v-card-title class="pb-0" v-text="member.name"></v-card-title>
        <div class="text-left" style="margin-left: 15px">
          <p v-text="member.title"></p>
          <p v-text="member.address_city"></p>
        </div>
      </v-list-item-content>
    </v-list-item>
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
          '/api/Letter_Versions/' + campaignId
        )
        const latestVersion = versions.data[versions.data.length - 1].template_id

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
