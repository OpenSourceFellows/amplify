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
      letterBody: '',
      congressMembers: [
        {
          name: 'Rashi Kesarwani',
          title: 'Berkeley Councilmember, District 1',
          address_line1: '2180 MILVIA ST',
          address_line2: '# 5',
          address_city: 'Berkeley',
          address_state: 'CA',
          address_zip: '94704',
          address_country: 'US',
          email: 'rkesarwani@cityofberkeley.info',
          twitter: 'RashiKesarwani',
          facebook: 'CouncilwomanRashi',
          photoUrl:
            'https://berkeleyca.gov/sites/default/files/elected-office-holder/kesarwani.jpg'
        },
        {
          name: 'Terry Taplin',
          title: 'Berkeley Councilmember, District 2',
          address_line1: '2180 MILVIA ST',
          address_line2: '',
          address_city: 'Berkeley',
          address_state: 'CA',
          address_zip: '94704',
          address_country: 'US',
          email: 'ttaplin@cityofberkeley.info',
          twitter: 'taplinterry',
          facebook: 'D2TerryTaplin2020',
          photoUrl:
            'https://berkeleyca.gov/sites/default/files/elected-office-holder/Terry%20Taplin.jpg'
        },
        {
          name: 'Ben Bartlett',
          title: 'Berkeley Councilmember, District 3',
          address_line1: '2180 MILVIA ST',
          address_line2: '',
          address_city: 'Berkeley',
          address_state: 'CA',
          address_zip: '94704',
          address_country: 'US',
          email: 'bbartlett@cityofberkeley.info',
          twitter: 'benbartlettberk',
          facebook: 'CouncilmemberBartlett',
          photoUrl:
            'https://berkeleyca.gov/sites/default/files/elected-office-holder/Ben-Bartlet.jpg'
        },
        {
          name: 'Kate Harrison',
          title: 'Berkeley Councilmember, District 4',
          address_line1: '2180 MILVIA ST',
          address_line2: '',
          address_city: 'Berkeley',
          address_state: 'CA',
          address_zip: '94704',
          address_country: 'US',
          email: 'kharrison@cityofberkeley.info',
          twitter: 'kateharrisond4',
          facebook: 'KateHarrisonD4',
          photoUrl:
            'https://berkeleyca.gov/sites/default/files/elected-office-holder/Kate-Harrison_1.jpg'
        },
        {
          name: 'Sophie Hahn',
          title: 'Berkeley Councilmember, District 5',
          address_line1: '2180 MILVIA ST',
          address_line2: '',
          address_city: 'Berkeley',
          address_state: 'CA',
          address_zip: '94704',
          address_country: 'US',
          email: 'shahn@cityofberkeley.info',
          twitter: 'SophieHahnBerk',
          facebook: 'sophie.hahn.583',
          photoUrl:
            'https://berkeleyca.gov/sites/default/files/elected-office-holder/Sophie-Hahn_2.jpg'
        },
        {
          name: 'Susan Wengraf',
          title: 'Berkeley Councilmember, District 6',
          address_line1: '2180 MILVIA ST',
          address_line2: '',
          address_city: 'Berkeley',
          address_state: 'CA',
          address_zip: '94704',
          address_country: 'US',
          email: 'swengraf@cityofberkeley.info',
          twitter: '',
          facebook: '',
          photoUrl:
            'https://berkeleyca.gov/sites/default/files/elected-office-holder/Susan-Wengraf_0.jpg'
        },
        {
          name: 'Rigel Robinson',
          title: 'Berkeley Councilmember, District 7',
          address_line1: '2180 MILVIA ST',
          address_line2: '',
          address_city: 'Berkeley',
          address_state: 'CA',
          address_zip: '94704',
          address_country: 'US',
          email: 'RRobinson@cityofberkeley.info',
          twitter: 'rigelrobinson',
          facebook: 'CouncilmemberRigelRobinson',
          photoUrl:
            'https://berkeleyca.gov/sites/default/files/elected-office-holder/Rigel-Robinson.jpg'
        },
        {
          name: 'Mark Humbert',
          title: 'Berkeley Councilmember, District 8',
          address_line1: '2180 MILVIA ST',
          address_line2: '5th Floor',
          address_city: 'Berkeley',
          address_state: 'CA',
          address_zip: '94704',
          address_country: 'US',
          email: 'mhumbert@cityofberkeley.info',
          twitter: 'MarkHumbert',
          facebook: '',
          photoUrl:
            'https://berkeleyca.gov/sites/default/files/elected-office-holder/Mark-Humbert-300px.jpg'
        }
      ],
      currentFilter: '',
      hasContent: true,
      postalCode: this.$route.params.postalCode || '',
      listVisible: false,
      isActive: false
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
      return campaignData.supplemental_text
    },
    campaignId() {
      return this.$store.state.campaign.id
    }
  },
  methods: {
    async loadLetterWorkflow() {
      const letter = await axios.get(`/api/lob/templates/${this.letterId}`)

      this.$store.commit('setGenericValue', { key: 'letterId', value: this.letterId })

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
