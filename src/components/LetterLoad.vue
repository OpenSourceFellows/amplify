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
          <br/>
          <div>{{ user.name }}</div>
          <div>
            {{ user.line1 }}
            <br/>
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
            <p><span style="color: rgb(0, 0, 0);font-size: 10pt;">As a {{ constituentType }}</span><span style="color: rgb(0, 0, 0);font-size: 10pt;">, &nbsp;</span><span style="color: rgb(0, 0, 0);font-size: 10pt;">I&rsquo;m extremely concerned about our skyrocketing “water and sewer bills” and the The Design Drought.</span><span style="color: rgb(0, 0, 0);font-size: 10pt;"> San Francisco&rsquo;s combined water and sewer bills are projected to increase by 8% per year.&nbsp;</span></p>
            <p><span style="color: rgb(0, 0, 0);font-size: 10pt;"> {{ communityInput }} At a time when taxpayer water rates are set to skyrocket for San Franciscans, the SFPUC budget is on the verge of collapse, and low flows along the Tuolumne River contribute to the erosion of health for all species, the economic and ecological tipping point is now.</span></p>
            <p><span style="color: rgb(0, 0, 0);font-size: 10pt;">The Design Drought arbitrarily combines two of the worst droughts on record to create a&nbsp;</span><span style="color: rgb(0, 0, 0);font-size: 10pt;">megadrought that might occur once in 25,000 years. It assumes a huge increase in water use,&nbsp;</span><span style="color: rgb(0, 0, 0);font-size: 10pt;">despite the fact that water demand has decreased significantly over the past three decades.&nbsp;</span><span style="color: rgb(0, 0, 0);font-size: 10pt;">The Design Drought has prompted the SFPUC to create an Alternative Water Supply Plan that &nbsp;</span><span style="color: rgb(0, 0, 0);font-size: 10pt;">would cost between $17 billion and $25 billion. This would double the SFPUC budget (and water rates) to produce expensive water we won&rsquo;t ever need.&nbsp;</span></p>
            <p><span style="color: rgb(0, 0, 0);font-size: 10pt;">Thank you for your continued attention.&nbsp;</span><span style="color: rgb(0, 0, 0);font-size: 10pt;">I support n</span><span style="color: rgb(0, 0, 0);font-size: 10pt;">ot approving the new budget with rate increases</span><span style="color: rgb(0, 0, 0);font-size: 10pt;">&nbsp;and am following this issue closely and with great concern.</span></p>
          </div>
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
import { mapState } from 'vuex';

export default {
  name: 'LetterLoad',
  components: {
    /* AuthNav */
  },
  props: {
    letterBody: { type: String, default: '' }
  },
  data() {
    return {
      isSubmitted: true,
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
    ...mapState({
      constituentType: state => state.constituentType,
      communityInput: state => state.communityInput
    }),
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
