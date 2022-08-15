<template lang="html">
  <v-card
    flat
    :to="{
      name: 'RepClick',
      params: { member: member.name }
    }"
    @click="handleRepClick"
  >
<<<<<<< HEAD
    <v-card-title class="justify-center" v-text="member.name" />
    <v-card-subtitle
      class="text-center padding-y-0 margin-top-10"
      v-text="member.title"
    />

    <!-- social media icons -->
    <div id="social-media-channel" class="text-center social-media-channel-box">
      <a
        v-for="socialMedia in member.socialMediaPages"
        :key="socialMedia.type"
        :href="socialMedia.url"
        target="_blank"
        class="social-media-icon"
        onclick="window.open(this.href, '_blank'); return false;"
      >
        <font-awesome-icon
          v-bind="socialMedia"
          :icon="socialMedia.icon"
          style="color: socialMedia.color"
        />
      </a>
    </div>

    <v-img
      class="mx-auto text-align-left rep-img"
      v-bind="member"
      :src="member.photoUrl"
      height="75"
      width="75"
      :position="member.photoCroppingCSS"
    />
    <v-card-subtitle class="text-center rep-img" v-text="member.address_city" />
=======
    <v-card-title v-text="member.name" />
    <v-card-subtitle style="text-align: left" v-text="member.title" />
    <v-card-subtitle style="text-align: left" v-text="member.city" />
>>>>>>> finished base completion page, added vuex to manage letter details, created generic campaign card component
  </v-card>
</template>

<script lang="js">
import axios from 'axios'

export default {
  name: 'RepresentativeCard',
  components: {
  },
  props: {
    member: {
      type: Object,
      required: true
    }
  },
  emits: ['handleRepSelected'],
<<<<<<< HEAD
  data() {
=======
  data () {
>>>>>>> finished base completion page, added vuex to manage letter details, created generic campaign card component
    return {
    }
  },
  methods: {
    async handleRepClick() {
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
