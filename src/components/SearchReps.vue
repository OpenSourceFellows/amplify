<template lang="html">
  <section class="search-reps">
    <v-row class="pa-14">
      <v-col>
        <v-card flat>
          <v-card-text>
            <v-subheader class="pa-0"> Where do you live? </v-subheader>

            <v-form ref="form">
              <v-text-field
                v-model="postalCode"
                label="Postal Code"
                required
                @keyup="CheckInputContent"
              />
            </v-form>

            <v-btn
              :to="{
                name: 'Reps',
                params: { postalCode: postalCode }
              }"
              clickclass="mr-4"
              @click="CreateRepList()"
            >
              Submit
            </v-btn>
          </v-card-text>
        </v-card>

        <div v-show="hasContent" id="reprenstatives-list">
          <div>
            <v-card v-for="member in congressMembers" :key="member.name" flat>
              <representative-card
                :member="member"
                @handleRepSelected="handleRepSelected"
              />
              <v-divider />
            </v-card>
          </div>
        </div>
      </v-col>
      <v-divider vertical />
      <v-col>
        <div v-if="!listVisible">
          <div>
            <img
              alt="Vue logo"
              src="../assets/images/StepsGraphic.png"
              width="70%"
            />
          </div>
          <p class="text-h6 pa-10">
            The bill establishes an interim goal to reduce greenhouse gas
            emissions to at least 50% below 2005 levels by 2030 as well as a
            national goal to achieve net-zero greenhouse gas emissions by 2050.
          </p>
          <p />
        </div>

        <div v-else>
          <take-action :letter-body="letterBody" :selected-rep="selectedRep" />
        </div>
      </v-col>
    </v-row>
  </section>
</template>

<script lang="js">
import RepresentativeCard from '@/components/RepresentativeCard.vue'
import TakeAction from '@/components/TakeAction.vue'
import axios from 'axios'

export default {
    name: 'SearchReps',
    components: {
      RepresentativeCard,
      TakeAction
    },
    data () {
      return {
        letterBody: '',
        selectedRep: {},
        congressMembers: [],
        hasContent: true,
        postalCode: this.$route.params.postalCode || '',
        listVisible: false,
      }
    },
    methods: {
        handleRepSelected (letterBody, selectedRep, step2) {
          this.letterBody = letterBody
          this.selectedRep = selectedRep
          this.step2 = step2
        },
        CheckInputContent: function () {
          if (this.postalCode !== '') {
              this.hasContent = true
          } else {
              this.hasContent = false
          }
        },
        async CreateRepList () {
          try {
            // Commit user's zipcode to app state
            this.$store.commit('setGenericValue', { key: 'zipcode', value: this.postalCode })

            const res = await axios.get(
              '/api/representatives/' + this.postalCode
            )
            this.congressMembers = res.data
            this.hasContent = true
            console.log(res.data)
            this.listVisible=true
          } catch (e) {
            console.error(e)
          }
        }
    }
}
</script>

<style scoped lang="less">
.search-reps {
}
</style>
