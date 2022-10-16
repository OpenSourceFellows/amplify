<template lang="html">
  <v-card
    flat
    v-on:click="handleRepClick"
    :to="{
      name: 'RepClick',
      params: { member: member.name }
    }"
  >
    <v-card-title v-text="member.name" class="padding-y-0"></v-card-title>
    <v-card-subtitle
      v-text="member.title"
      class="text-align-left padding-y-0 margin-top-10"
    >
    </v-card-subtitle>

    <!-- social media icons -->
    <div
      id="social-media-channel"
      class="text-align-left social-media-channel-box"
    >
      <a
        v-for="socialMedia in member.socialMediaPages"
        :key="socialMedia.type"
        :href="socialMedia.url"
        target="_blank"
        class="social-media-icon"
        onclick="window.open(this.href, '_blank'); return false;"
      >
        <font-awesome-icon :icon="socialMedia.icon" />
      </a>
    </div>

    <v-img
      class="text-align-left rep-img"
      v-bind:src="member.photoUrl"
      height="75"
      width="75"
    >
    </v-img>
    <v-card-subtitle
      v-text="member.address_city"
      class="text-align-left rep-img"
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
  data() {
    return {
    }
  },
  emits: ['handleRepSelected'],
  methods: {
    async handleRepClick() {
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

<style scoped lang="less">
.social-media-icon {
  margin-right: 5px;
}
.text-align-left {
  text-align: left;
}
.social-media-channel-box {
  margin-left: 16px;
  margin-top: -10px;
  margin-bottom: 16px;
}
.rep-img {
  border-radius: 50%;
  margin-left: 10px;
}
</style>
