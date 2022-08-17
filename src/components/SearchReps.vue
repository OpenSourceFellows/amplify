<template lang="html">
  <section class="search-reps">
<<<<<<< HEAD
    <v-container fluid>
      <v-row class="justify-center">
        <v-col cols="12" sm="6" md="4">
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

              <v-row>
                <v-col>
                  <v-btn
                    class="search-reps-button"
                    rounded
                    dark
                    :style="{
                      backgroundColor:
                        currentFilter === 'federal' && isActive
                          ? 'blue'
                          : 'gray'
                    }"
                    @click="FilterList('federal')"
                  >
                    Federal
                  </v-btn>

                  <v-btn
                    class="search-reps-button"
                    rounded
                    dark
                    :class="{ active: isActive }"
                    :style="{
                      backgroundColor:
                        currentFilter === 'state' && isActive ? 'blue' : 'gray'
                    }"
                    @click="FilterList('state')"
                  >
                    State
                  </v-btn>

                  <v-btn
                    rounded
                    dark
                    class="ui button toggle search-reps-button"
                    :style="{
                      backgroundColor:
                        currentFilter === 'local' && isActive ? 'blue' : 'gray'
                    }"
                    @click="FilterList('local')"
                  >
                    Local
                  </v-btn>

                  <v-btn
                    class="search-reps-button"
                    rounded
                    dark
                    :class="{ active: isActive }"
                    :style="{
                      backgroundColor:
                        currentFilter === 'county' && isActive ? 'blue' : 'gray'
                    }"
                    @click="FilterList('county')"
                  >
                    County
                  </v-btn>

                  <v-btn
                    class="search-reps-button"
                    rounded
                    dark
                    :class="{ active: isActive }"
                    :style="{
                      backgroundColor:
                        currentFilter === 'school' && isActive ? 'blue' : 'gray'
                    }"
                    v-on:click="FilterList('school')"
                  >
                    School
                  </v-btn>
                </v-col>
              </v-row>

              <v-row>
                <v-col>
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
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>

          <div v-show="hasContent" id="reprenstatives-list">
            <div>
              <v-card v-for="member in congressMembers" :key="member.name" flat>
                <representative-card
                  :member="member"
                  @handle-rep-selected="handleRepSelected"
                />
                <v-divider />
              </v-card>
            </div>
          </div>
        </v-col>

        <v-divider vertical class="hidden-sm-and-down" />

        <v-col cols="12" sm="6" md="8">
          <div v-if="!listVisible">
            <div>
              <img
                alt="Vue logo"
                src="../assets/images/StepsGraphic.png"
                width="70%"
              />
            </div>
            <p class="text-h6 pa-4">
              The bill establishes an interim goal to reduce greenhouse gas
              emissions to at least 50% below 2005 levels by 2030 as well as a
              national goal to achieve net-zero greenhouse gas emissions by
              2050.
            </p>
            <p />
          </div>

          <div v-else>
            <v-container fluid>
              <v-row class="justify-center">
                <v-col cols="12" md="8">
                  <take-action
                    :letter-body="letterBody"
                    :selected-rep="selectedRep"
                  />
                </v-col>
              </v-row>
            </v-container>
          </div>
        </v-col>
      </v-row>
    </v-container>
=======
    <v-row class="pa-14">
      <v-col>
        <v-card flat>
          <v-card-text>
            <v-subheader class="pa-0">
              Where do you live?
            </v-subheader>

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

        <div
          v-show="hasContent"
          id="reprenstatives-list"
        >
          <div>
            <v-card
              v-for="member in congressMembers"
              :key="member.name"
              flat
            >
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
            >
          </div>
          <p class="text-h6 pa-10">
            The bill establishes an interim goal to reduce greenhouse gas
            emissions to at least 50% below 2005 levels by 2030 as well as a
            national goal to achieve net-zero greenhouse gas emissions by 2050.
          </p>
          <p />
        </div>

        <div v-else>
          <take-action
            :letter-body="letterBody"
            :selected-rep="selectedRep"
          />
        </div>
      </v-col>
    </v-row>
>>>>>>> finished base completion page, added vuex to manage letter details, created generic campaign card component
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
<<<<<<< HEAD
    data() {
        return {
            letterBody: '',
            selectedRep: {},
            congressMembers: [],
            currentFilter: '',
            hasContent: true,
            postalCode: this.$route.params.postalCode || '',
            listVisible: false,
            isActive: false,
        }
    },
    methods: {
        handleRepSelected(letterBody, selectedRep, step2) {
            this.letterBody = letterBody
            this.selectedRep = selectedRep
            this.step2 = step2
=======
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
>>>>>>> finished base completion page, added vuex to manage letter details, created generic campaign card component
        },
        CheckInputContent: function () {
          if (this.postalCode !== '') {
              this.hasContent = true
          } else {
              this.hasContent = false
          }
        },
<<<<<<< HEAD
        async CreateRepList() {
            try {
                const res = await axios.get(
                    '/api/representatives/' + this.postalCode
                )
                this.isActive = false

                this.congressMembers = res.data
                this.hasContent = true
                // console.log(res.data)
                this.listVisible = true
            } catch (e) {
                console.error(e)
            }
        },
        async FilterList(level) {
            try {
                this.currentFilter = level

                if (!this.isActive) {
                    this.isActive = true
                    const params = {}
                    if (this.currentFilter != null) {
                        params.filter = this.currentFilter
                    }

                    const res = await axios.get(
                        '/api/representatives/' + this.postalCode,
                        {
                            params
                        }
                    )

                    console.log(res)
                    this.congressMembers = res.data
                } else {
                    this.isActive = false;
                    const res = await axios.get(
                        '/api/representatives/' + this.postalCode
                    )

                    this.congressMembers = res.data
                }
            } catch (e) {
                console.error(e)
            }
=======
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
>>>>>>> finished base completion page, added vuex to manage letter details, created generic campaign card component
        }
    }
}
</script>

<style scoped lang="less">
.search-reps-button {
  margin: 5px 10px;
}
</style>
