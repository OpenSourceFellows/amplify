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
      <div class="d-flex justify-center align-center">
        <v-btn
          elevation="2"
          class="mt-2 mb-4 mx-3 action-btn"
          :to="{
            name: 'Campaign',
            params: { campaignId }
          }"
        >
          Take Action Now
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
}

.action-btn {
  background-color: @st-red !important;
  color: #fff !important;
  font-size: 16px !important;
  text-transform: none !important;
}

.campaign-feature-image {
  max-width: 500px; // Needs to be changed later
}
</style>
