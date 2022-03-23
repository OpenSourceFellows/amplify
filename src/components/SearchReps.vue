<template lang="html">
  <section class="search-reps">
    <v-row class="pa-14">
      <v-col>
        <v-card flat>
          <v-card-text>
            <v-subheader class="pa-0"> Where do you live? </v-subheader>

            <v-form ref="form">
              <v-text-field
                :to="{
                  name: 'Reps',
                  params: { postalCode: postalCode }
                }"
                v-on:keyup="CreateRepList()"
                v-on:keydown.enter.prevent="CreateRepList()"
                label="Postal Code"
                required
                v-model="postalCode"
              />
            </v-form>
          </v-card-text>
        </v-card>
        <div id="reprenstatives-list" v-show="hasContent">
          <div>
            <v-card flat v-for="member in congressMembers" :key="member.name">
              <representative-card
                @handleRepSelected="handleRepSelected"
                :member="member"
              ></representative-card>
              <v-divider></v-divider>
            </v-card>
          </div>
        </div>
      </v-col>
      <v-divider vertical></v-divider>
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
          <p></p>
        </div>

        <div v-else>
          <take-action
            :letterBody="letterBody"
            :selectedRep="selectedRep"
          ></take-action>
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
