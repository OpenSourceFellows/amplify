<template>
  <div class="complete-page">
    <h1>This is the complete page</h1>
    <action-complete></action-complete>
    <cause-carousel></cause-carousel>
  </div>
</template>

<script>
import ActionComplete from '@/components/ActionComplete.vue'
import CauseCarousel from '@/components/CauseCarousel.vue'

export default {
  components: {
    ActionComplete,
    CauseCarousel
  }
}
</script>
