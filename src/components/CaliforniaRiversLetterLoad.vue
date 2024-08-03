<template>
  <section class="letter-load">
    <v-card flat>
      <div v-show="isSubmitted">
        <v-card-subtitle align="left">
          <div class="text-left">
            {{ currentDate }}
          </div>
          <div>{{ selectedRep.name }}</div>
          <div>{{ selectedRep.address_line1 }}</div>
          <div>
            {{ selectedRep.address_city }}, {{ selectedRep.address_state }},
            {{ selectedRep.address_zip }}
          </div>
          <br />
          <div>{{ user.name }}</div>
          <div>
            {{ user.line1 }}
            <br />
            {{ user.line2 }}
          </div>
          <div>
            {{ formattedCityState }}
          </div>
        </v-card-subtitle>
        <v-card-title class="salutation">
          Dear {{ selectedRep.name }},
        </v-card-title>

        <v-card-text>
          <p>
            Thank you for your continued interest in building climate resilience
            across California, I’m a resident of
            <span style="font-weight: bold">{{ communityInput }}</span> and I
            wanted to express why I’m for keeping Phase II of the Bay Delta
            Water Quality Control Plan and negate the proposed Voluntary
            Agreements as part of the State Water Boards replacement for 2
            reasons. First, there’s higher solvency and return on investment for
            climate resilience through status quo and second, other states have
            successfully scaled such a model to increase federal funding.*
          </p>

          <p>
            *Climate resilience is forecasted 110 billion dollar problem due to
            the erosion to our soil, coasts, and flooding. Such a decision can
            not be taken lightly yet local water agencies, private companies,
            and agricultural interests sidestepped the process without listening
            to voices like mine across local communities - the fish population
            plummeting is a testament to the approach Voluntary Agreements have
            taken. The current Phase 2 approach takes into account both science
            and public based traditional ecological knowledge that include
            Tribal, Environmental Justice, fishermen, and sustainability
            communities.*
          </p>

          <p>
            Not only is there precedent for through AB 1284 , traditional
            ecological knowledge helps protect more than 86% of the world’s
            biodiversity towards climate resilience. Oregon’s Fish & WildLife
            program has successfully scaled such partnerships with Burns Paiute
            to restore trout and salmon since 1997. Not only had the population
            of fish greatly increase but they also received 300 million in
            funding federally. Given the Biden administration’s stance on
            cocreating with Tribal communities - this would be a great
            opportunity to work with all communities across the North Delta,
            Sacramento River, and Tribituaries to support flows for fish and
            fish dependent communities and reject the use of Voluntary
            Agreements for Phase II of the Bay Delta Plan.
          </p>
        </v-card-text>

        <v-card-text>
          <v-select
            v-model="communityInput"
            :items="community"
            label="Your Community"
          />
        </v-card-text>

        <p>{{ user.name }}</p>
      </div>
      <div v-show="!isSubmitted">
        <v-card-text> clicked</v-card-text>

        <div class="col-md text-center text-md-left">
          <!--<h2>You are logged in as {{ $auth.user.name }}</h2>
                    { JSON.stringify($auth.user, null, 2) }} -->
        </div>
      </div>
      <!--
      <v-card-actions class="justify-center">
        <v-btn>
          <AuthNav />
        </v-btn>
      </v-card-actions>
    -->
    </v-card>
  </section>
</template>

<script lang="js">
// import AuthNav from '@/components/AuthNav'
// import { mapState } from 'vuex';

export default {
  name: 'TuolumneLetterLoad',
  components: {
    /* AuthNav */
  },
  props: {
    letterBody: { type: String, default: '' }
  },
  data() {
    return {
      isSubmitted: true,
      communityInput: '<fill in the input below>',
      community: ['Klamath', 'Joaquin Valley', 'the Hoopa Tribe']
    }
  },

  computed: {
    selectedRep() {
      return this.$store.state.selectedRep
    },
    user() {
      return this.$store.state.userData
    },
    currentDate() {
      return new Intl.DateTimeFormat('en-US').format(new Date())
    },
    formattedCityState() {
      if (this.user.city) {
        return `${this.user.city}, ${this.user.state} ${this.user.zip}`
      }

      return ''
    },
    mergeVariables() {
      return { communityInput: this.communityInput }
    }
  },
  watch: {
    mergeVariables: function() {
      this.$store.commit('setGenericValue', { key: 'mergeVariables', value: this.mergeVariables })
    }
  }
}
</script>

<style scoped lang="less">
.letter-load {
}

.salutation {
  font-size: 18px;
}
</style>
