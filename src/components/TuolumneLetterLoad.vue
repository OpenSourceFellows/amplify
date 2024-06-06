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
          <div>
            <p>
              <span style="color: rgb(0, 0, 0); font-size: 10pt">
                <strong>{{ constituentType }}</strong>
              </span>
            </p>
            <br />
            <p>
              <span style="color: rgb(0, 0, 0); font-size: 10pt">
                <strong>{{ communityInput }}</strong>
                The SFPUC is out of control. “Leaders” have been prosecuted for
                corruption, the EPA is suing the agency over illegal sewage
                discharges, toxic algae blooms fueled by wastewater nutrients
                released into the bay are killing tens of thousands of fish, and
                the Tuolumne River is on life support due to low river flows.
              </span>
            </p>
            <br />
            <p>
              Please launch an independent audit of the SFPUC, as proposed by
              Supervisor Safai last year. The audit should not only look into
              financial mismanagement, but also SFPUC policies that drive poor
              decision- making. The SFPUC's “Design Drought” is a prime example.
            </p>
            <br />

            <p>
              The Design Drought arbitrarily combines two of the worst droughts
              on record to create a megadrought that might occur once in 25,000
              years. It assumes a huge increase in water use, despite the fact
              that water demand has decreased significantly over the past three
              decades.
            </p>
            <br />

            <p>
              The Design Drought has prompted the SFPUC to create an Alternative
              Water Supply Plan that would cost between $17 billion and $25
              billion. This would double the SFPUC budget (and water rates) to
              produce expensive water we won't ever need. An objective audit
              will prove this.
            </p>
            <br />

            <p>
              We can't change past mistakes, like long-deferred maintenance on
              our water and wastewater systems, that have led to the financial
              crisis we're in today, but we can avoid a future boondoggle.
            </p>
            <br />

            <p>
              Please audit the SFPUC!
              <br /><br />
              Sincerely,
            </p>
          </div>
        </v-card-text>

        <v-card-text>
          <v-select
            v-model="constituentType"
            :items="reasons"
            label="You are a ..."
          />
          <v-select
            v-model="communityInput"
            :items="affects"
            label="How this affects your community"
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
      constituentType: '<fill in the input below>',
      communityInput: '<fill in the input below>',
      reasons: [
        `As a resident of San Francisco and someone who cares deeply about the Tuolumne River,
I'm extremely concerned about our skyrocketing water and sewer bills.
San Francisco's combined water and sewer bills are projected to increase by 8% per year.`,
        `As a customer of Hetch Hetchy water living outside of SF who cares deeply about the Tuolumne River,
I'm extremely concerned about our skyrocketing water bills and water rates in Bay Area communities
 outside of San Francisco will increase by 8.8% in July`,
        `As someone who cares deeply about the Tuolumne River.
I'm extremely concerned about our skyrocketing unsustainable water policies that affect the Tuolumne River
 and increased water rates throughout the Bay Area affect frontline communities throughout the watershed.`
      ],
      affects: [
        'I\'m already struggling to pay my utility bill.',
        'This will place an undue burden on my monthly bills.',
        'Rate increases hit lower income residents especially hard.',
      ],
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
      return { constituentType: this.constituentType, communityInput: this.communityInput }
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
