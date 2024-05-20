<template>
  <section class="search-reps">
    <v-container>
      <v-row class="justify-center">
        <v-col cols="12" sm="6" md="4">
          <!--TODO: Create component(s) to reduce template size.-->
          <!-- This could be RepresentativeSearcher.vue or something-->
          <div v-if="!congressMembers.length">
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

          <div v-if="hasContent" id="representatives-list">
            <h3>Click or tap a Representative to get started.</h3>
            <div>
              <v-card v-for="member in congressMembers" :key="member.name" flat>
                <representative-card
                  :member="member"
                  @handle-rep-selected="loadLetterWorkflow"
                />
                <v-divider />
              </v-card>
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
            <p v-if="mode === 'single'" class="text-h6 pa-4">
              {{ campaignText }}
            </p>
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
import campaignData from '@/assets/scm/text/text.json'
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
      letterBody: '<h1>Concering the Tuolemne Tribe, I {{merge_var}}, ...</h1>',
      congressMembers: [],
      currentFilter: '',
      hasContent: true,
      postalCode: this.$route.params.postalCode || '',
      listVisible: false,
      isActive: false
    }
  },
  created() {
    // Do a migration to store as jsonb
    const mergeVarReasons = JSON.parse(mergeVarReasons)

    // Do a substring replacement
    letterBody.replace('{{...}}', <some_html_input>)

    // ...


    // profit!
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
      return campaignData.supplemental_text
    },
    campaignId() {
      return this.$store.state.campaign.id
    }
  },
  methods: {
    async loadLetterWorkflow() {
      const letterVersions = await axios.get(
        `/api/letter_versions/${this.campaignId}`
      )
      const latest =
        letterVersions.data[letterVersions.data.length - 1].template_id
      const letter = await axios.get(`/api/lob/templates/${latest}`)

      this.$store.commit('setGenericValue', { key: 'letterId', value: latest })

      this.letterBody = letter.data.versions[0].html

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
    }
  }
}
</script>

<style scoped lang="less">
.search-reps-button {
  margin: 5px 10px;
}
</style>
