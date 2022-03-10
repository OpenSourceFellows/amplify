<template>
  <div>
    <complete-hero />
    <div class="complete-page">
      <action-complete />
      <cause-carousel />
    </div>
  </div>
</template>

<script>
import ActionComplete from '@/components/ActionComplete.vue'
import CauseCarousel from '@/components/CauseCarousel.vue'
import CompleteHero from '@/components/CompleteHero.vue'

export default {
  components: {
    ActionComplete,
    CauseCarousel,
    CompleteHero
  }
}
</script>

<style lang="less">
.complete-page {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 20px;
}
</style>
