<template lang="html">
    <section class="search-reps">
        <v-row class="pa-14">
            <v-col>
                <v-card flat>
                    <v-card-text>
                        <v-subheader class="pa-0">
                            Where do you live?
                        </v-subheader>
                        <v-form ref="form">
                            <v-text-field
                                label="Postal Code"
                                required
                                v-on:keyup="CheckInputContent"
                                v-model="postalCode"
                            ></v-text-field>
                        </v-form>
                        <v-btn
                            :to="{
                                name: 'Reps',
                                params: { postalCode: postalCode }
                            }"
                            v-on:click="CreateRepList()"
                            clickclass="mr-4"
                            >Submit
                        </v-btn>
                    </v-card-text>
                </v-card>
                <div id="reprenstatives-list" v-show="hasContent">
                    <div>
                        <v-card
                            flat
                            v-for="member in congressMembers"
                            :key="member.name"
                        >
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
                <div v-if="$auth.isAuthenticated">
                    <take-action  :letterBody="letterBody" :selectedRep="selectedRep"
>
                    </take-action>
                </div>
                <div v-else>
                    <letter-display
                        v-if="shouldRender"
                        :is-step1="isStep1"
                        :is-step2="isStep2"
                        :is-step3="isStep3"
                    ></letter-display>
                    <letter-load
                        v-else
                        :letterBody="letterBody"
                        :selectedRep="selectedRep"
                    >
                    </letter-load>
                </div>
            </v-col>
        </v-row>
    </section>
</template>

<script lang="js">
import LetterDisplay from '@/components/LetterDisplay.vue'
import RepresentativeCard from '@/components/RepresentativeCard.vue'
import LetterLoad from '@/components/LetterLoad.vue'
import takeAction from '@/components/takeAction.vue'
import axios from 'axios'

export default {
  name: 'SearchReps',
  components: {
    LetterDisplay,
    RepresentativeCard,
    LetterLoad,
    takeAction
  },
  mounted () {
    this.CreateRepList()
  },
  data () {
    return {
      letterBody: '',
      selectedRep: {},
      congressMembers: [],
      hasContent: true,
      postalCode: this.$route.params.postalCode || '',
      shouldRender: false,
      isStep1: Boolean,
      isStep2: Boolean,
      isStep3: Boolean
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
          'https://murmuring-headland-63935.herokuapp.com/api/representatives/' + this.postalCode
        )
        this.congressMembers = res.data
        this.hasContent = true
        console.log(res.data)

        this.isStep1 = true
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
