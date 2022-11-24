<template>
  <div class="d-flex justify-space-between banner">
    <img
      src="@/assets/images/sogorea-te.png"
      alt="sogorea te logo"
      class="pl-4"
    />
    <img
      src="@/assets/images/sacred-shellmounds.png"
      alt="sacred shellmount drawings"
      class=""
    />
  </div>
</template>

<script>
export default {
  name: 'CampaignBanner'
}
</script>

<style lang="less" scoped>
@import '../styles/sogorea-te.less';

.banner {
  width: 100%;
  background-color: @st-teal;
}
</style>
