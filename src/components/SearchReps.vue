<template lang="html">
  <section class="search-reps">
    <v-container fluid>
      <v-row class="justify-center">
        <v-col cols="12" sm="6" md="4">
          <v-card flat>
            <v-card-text>
              <v-subheader class="pa-0"> Where do you live? </v-subheader>

              <v-form ref="form">
                <v-text-field
                  v-model="searchText"
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
                    rounded
                    dark
                    class="ui button toggle search-reps-button"
                    :style="{
                      backgroundColor:
                        currentFilter === 'municipality' && isActive
                          ? 'blue'
                          : 'gray'
                    }"
                    @click="FilterList('municipality')"
                  >
                    Local
                  </v-btn>
                </v-col>
              </v-row>

              <v-row>
                <v-col>
                  <v-btn
                    :to="{
                      name: 'Reps',
                      params: { searchText: searchText }
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
            searchText: this.$route.params.searchText || '',
            listVisible: false,
            isActive: false,
        }
    },
    methods: {
        handleRepSelected(letterBody, selectedRep, step2) {
            this.letterBody = letterBody
            this.selectedRep = selectedRep
            this.step2 = step2
        },
        CheckInputContent: function () {
            if (this.searchText !== '') {
                this.hasContent = true
            } else {
                this.hasContent = false
            }
        },
        async CreateRepList() {
            try {

                // check postal code is valid with regex
                let res = ''
                let isPostalCodeValid =  /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(this.searchText);
                let streetAddressValid = /^[a-zA-Z0-9\s,'-]*$/.test(this.searchText);
                if(isPostalCodeValid || streetAddressValid) {
                  console.log('valid input to get representatives')
                  res = await axios.get(
                    '/api/representatives/' + this.searchText
                )
                }

                /*
                else{
                  // check if street address is valid with a flexible regex. This validation is not perfect, but caches common cases
                  // [a-zA-Z0-9\s]	Any single character in the range a-z or A-Z or 0-9 or whitespace
                  // '-	Matches the characters - (case sensitive)
                  // * 0 or more times
                  // $  end of string
                  let streetAddressValid = /^[a-zA-Z0-9\s,'-]*$/.test(this.searchText);
                  if(streetAddressValid){
                  res = await axios.post(
                    '/api/representatives/districts', {address: this.searchText}
                  )
                  console.log(res)
                  }
                }
                */

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
                        '/api/representatives/' + this.searchText,
                        {
                            params
                        }
                    )

                    console.log(res)
                    this.congressMembers = res.data
                } else {
                    this.isActive = false;
                    const res = await axios.get(
                        '/api/representatives/' + this.searchText
                    )

                    this.congressMembers = res.data
                }
            } catch (e) {
                console.error(e)
            }
        }
    }
}
</script>

<style scoped lang="less">
.search-reps-button {
  margin: 5px 10px;
}
</style>
