<template>
  <v-card
    flat
    :to="{
      name: 'RepClick',
      params: { member: member.name }
    }"
    class="rep-card"
    @click="handleRepClick"
  >
    <v-card-title class="padding-y-0" v-text="member.name" />
    <v-card-subtitle
      class="text-align-left padding-y-0 margin-top-10"
      v-text="member.title"
    />

    <!-- social media icons -->
    <!-- TODO: This is out of spec with the Representative model and needs to be fixed or model changed. -->
    <!--
    <div
      id="social-media-channel"
      class="text-align-left social-media-channel-box"
    >
      <a
        v-for="(socialMedia, i) in member.socialMediaPages"
        :key="i"
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
    -->

    <v-img
      class="mx-auto text-align-left rep-img"
      v-bind="member"
      :src="member.photoUrl"
      height="125"
      width="125"
      :position="member.photoCroppingCSS"
    />
    <v-card-subtitle
      class="text-align-left rep-img"
      v-text="member.address_city"
    />
  </v-card>
</template>

<script lang="js">
export default {
  name: 'RepresentativeCard',
  components: {},
  props: {
    member: {
      type: Object,
      default: new Object()
    }
  },
  emits: ['handle-rep-selected'],
  data() {
    return {}
  },
  methods: {
    handleRepClick() {
      console.log('emitting handleRepSelected')
      this.$store.commit('setGenericValue', {
        key: 'selectedRep',
        value: this.member
      })
      this.$emit('handle-rep-selected')
    }
  }
}
</script>

<style scoped lang="less">
.rep-card:hover {
  background-color: rgba(254, 94, 65, 0.75) // amplify orange
;
}
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
