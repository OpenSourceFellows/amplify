<template>
  <section class="search-reps">
    <v-container>
      <v-row class="justify-center">
        <v-col cols="12" sm="6" md="4">
          <!--TODO: Create component(s) to reduce template size.-->
          <!-- This could be RepresentativeSearcher.vue or something-->
          <!-- Disabled -->
          <div v-if="false">
            <v-card flat>
              <v-card-text>
                <v-subheader class="pa-0"> Where do you live? </v-subheader>

                <v-form ref="form" @submit.prevent="CreateRepList()">
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
                          currentFilter === 'state' && isActive
                            ? 'blue'
                            : 'gray'
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
                          currentFilter === 'local' && isActive
                            ? 'blue'
                            : 'gray'
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
                          currentFilter === 'county' && isActive
                            ? 'blue'
                            : 'gray'
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
                          currentFilter === 'school' && isActive
                            ? 'blue'
                            : 'gray'
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
                      color="primary"
                      :to="{
                        name: 'Reps',
                        params: { postalCode: postalCode || '00000' }
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
          </div>

          <!-- Always enabled -->
          <div v-if="true" id="representatives-list">
            <h3>Click or tap a Representative.</h3>
            <div v-if="Object.keys(selectedRep).length">
              <v-btn @click="clearSelectedRep" color="secondary" class="my-5">
                Clear Rep Selection
              </v-btn>
            </div>
            <div v-if="screenWidth >= 600 || !Object.keys(selectedRep).length">
              <div>
                <v-card
                  v-for="member in representatives"
                  :key="member.name"
                  flat
                >
                  <representative-card
                    :member="member"
                    @handle-rep-selected="loadLetterWorkflow"
                  />
                  <v-divider />
                </v-card>
              </div>
            </div>
          </div>
        </v-col>

        <v-divider vertical class="hidden-sm-and-down" />

        <!-- TODO: Break into another set of components. -->
        <v-col cols="12" sm="6" md="8">
          <div v-if="listVisible">
            <v-container fluid>
              <v-row class="justify-center">
                <v-col cols="12" md="8">
                  <take-action :letter-body="letterBody" />
                </v-col>
              </v-row>
            </v-container>
          </div>

          <div v-if="!listVisible">
            <div
              v-if="mode === 'single'"
              class="text-h6 pa-4"
              v-html="campaignText"
            ></div>
            <div v-else>
              <img
                alt="Vue logo"
                src="../assets/images/StepsGraphic.png"
                width="70%"
              />
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
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
      letterBody: '<h1>Test</h1>',
      congressMembers: [],
      currentFilter: '',
      hasContent: true,
      postalCode: this.$route.params.postalCode || '',
      listVisible: false,
      isActive: false,
      screenWidth: window.innerWidth
    }
  },
  computed: {
    letterId() {
      return this.$store.state.letterId
    },
    selectedRep() {
      return this.$store.state.selectedRep
    },
    mode() {
      return this.$store.state.mode
    },
    campaignText() {
      return this.$store.state.campaign.supplementalText
    },
    campaignId() {
      return this.$store.state.campaign.id
    },
    representatives() {
      return this.$store.state.representatives
    }
  },
  created() {
    // Duplicated to ensure that this data stays will be in Vuex if someone happens to
    // refresh. Should be reworked in the new repo, but needs must \_(-_-)_/
    if (!this.campaignId) {
      this.$store.dispatch(
        'loadSingleCampaign',
        process.env.VUE_APP_FEATURED_CAMPAIGN
      )
        .then(() => {
          this.$store.dispatch('loadLetterTemplate')
        })

      this.$store.commit('setGenericValue', {
        key: 'letterId',
        value: process.env.VUE_APP_LETTER_TEMPLATE
      })

      this.$store.commit('setGenericValue', { key: 'mode', value: 'single' })
    }
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize)
    })
  },
  beforeunMount() {
    window.removeEventListener('resize', this.onResize)
  },
  methods: {
    clearSelectedRep() {
      this.$store.commit('setGenericValue', { key: 'selectedRep', value: {} })
    },
    loadLetterWorkflow() {
      this.listVisible = true
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
        this.$store.commit('setGenericValue', {
          key: 'zipcode',
          value: this.postalCode
        })
        const res = await axios.get('/api/representatives/' + this.postalCode)
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

          this.congressMembers = res.data
        } else {
          this.isActive = false
          const res = await axios.get('/api/representatives/' + this.postalCode)

          this.congressMembers = res.data
        }
      } catch (e) {
        console.error(e)
      }
    },
    onResize() {
      this.screenWidth = window.innerWidth
    }
  }
}
</script>

<style scoped lang="less">
.search-reps-button {
  margin: 5px 10px;
}
</style>
