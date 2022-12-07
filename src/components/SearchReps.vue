<template lang="html">
  <section class="search-reps">
    <v-container>
      <v-row class="justify-center">
        <v-col
          cols="12"
          sm="6"
          md="4"
          v-bind:class="{ 'overflow-auto': !$vuetify.breakpoint.mobile }"
          v-bind:style="{ height: myHeight }"
        >
          <v-card flat>
            <v-card-text>
              <v-subheader class="pa-0"> Where do you live? </v-subheader>

              <v-form @submit.prevent="CreateRepList()" ref="form">
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
                    @click="FilterList('school')"
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
            myHeight: this.$vuetify.breakpoint.mobile ? false : "100vh"
        }
      },
    methods: {
        handleRepSelected(letterBody, selectedRep, step2) {
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
        async CreateRepList() {
            try {
                this.$store.commit('setGenericValue', { key: 'zipcode', value: this.postalCode })
                const res = await axios.get(
                    '/api/representatives/' + this.postalCode
                )
                this.isActive = false
                this.congressMembers = res.data
                this.hasContent = true
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
        }
    },
}
</script>

<style scoped lang="less">
.search-reps-button {
  margin: 5px 10px;
}
</style>
