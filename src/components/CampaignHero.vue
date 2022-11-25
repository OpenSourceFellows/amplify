<template>
  <div
    :style="{ 'background-image': 'url(' + imgPath + ')' }"
    class="d-flex justify-center align-center main-content"
  >
    <div class="call-to-action">
      <a :href="campaignUrl" target="_blank">
        <img
          src="@/assets/images/sogorea-te.png"
          alt="sogorea te land trust"
          class="pa-4 campaign-feature-image"
        />
      </a>
      <h1>Protect Our Sacred Shellmounds</h1>
      <h2>Make Your Voice Count</h2>
      <div class="d-flex justify-center align-center">
        <v-btn
          elevation="2"
          class="mt-2 mb-4 mx-3 action-btn"
          :to="{
            name: 'Campaign',
            params: { campaignId }
          }"
        >
          Write Your Representatives
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CampaignHero',
  data() {
    return {
      campaignName: "Sogorea 'Te Land Trust",
      campaignUrl: 'https://sogoreate-landtrust.org/',
      campaignId: 5,
      imgPath: require('@/assets/images/ohlone.jpg'),
      gifPath: require('@/assets/images/native.gif')
    }
  }
}
</script>

<style lang="less" scoped>
@import '@/styles/sogorea-te.less';

.main-content {
  background-color: @st-green;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  width: 100%;
  height: 450px;
}

.call-to-action {
  background-color: rgba(83, 197, 196, 0.85);
  border-radius: 5px;
  box-shadow: 2px 2px 5px 1px rgba(92, 92, 92, 0.75);
  padding: 0 1.5rem;
  max-width: 100%;
}

.action-btn {
  background-color: @amp-orange !important;
  color: #000 !important;
  font-size: 1.25rem !important;
  font-weight: bold;
  text-transform: none !important;
  padding: 2rem !important;
}

.campaign-feature-image {
  max-width: 100%; // Needs to be changed later
}
</style>
