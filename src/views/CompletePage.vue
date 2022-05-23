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
import '../styles/views/CompletePage.less'

export default {
  components: {
    ActionComplete,
    CauseCarousel,
    CompleteHero
  }
}
</script>
