<template>
  <section class="merge-variables-dropdowns">
    <div>
      <v-select
        v-model="constituent_type"
        :items="types"
        label="You are"
        @change="onConstituentTypeChange" 
      />
    </div>
    <div>
      <v-select
        v-model="community_input"
        :items="affects"
        label="How this affects your community"
        @change="onCommunityInputChange" 
      />
    </div>
  </section>
</template>

  <script>
  export default {
    name: 'MergeVariablesDropdowns',
    data() {
      return {
        constituent_type: null,
        community_input: null,
        types: [
        "a resident of San Francisco and someone who cares deeply about the Tuolumne River",
        "a person adjacent to Hetch Hetchy and someone who cares deeply about the Tuolumne River",
        "someone who cares deeply about the Tuolumne River"
        ],
        affects: [
        "I'm already struggling to pay my utility bill.",
        "This will place an undue burden on my monthly bills.",
        "Rate increases hit lower income residents especially hard."
        ],
      };
    },
    methods: {
      onConstituentTypeChange(value) {
        this.$store.commit('setConstituentType', value);
      },
      onCommunityInputChange(value) {
        this.$store.commit('setCommunityInput', value);
      }
    },
  };
  </script>  

<style scoped lang="less">
.merge-variables-dropdowns {
}
</style>