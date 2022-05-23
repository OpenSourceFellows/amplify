<template lang="html">
  <section class="take-action">
    <v-expansion-panels v-model="panel" flat>
      <v-expansion-panel :key="0" v-model="panel">
        <v-expansion-panel-header>
          <v-list-item-avatar class="grey lighten-2" max-width="40px">
            <span> 1</span>
          </v-list-item-avatar>
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title> Review the letter </v-list-item-title>
              <v-list-item-subtitle>
                Add any additional details to organizer requests.
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <letter-load
            :selected-rep="selectedRep"
            :rep-name="repName"
            :letter-body="letterBody"
          />
        </v-expansion-panel-content>
        <v-expansion-panel-content>
          <v-btn width="160" dark color="theme_darkBlue" @click="nextPage">
            Next
          </v-btn>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel :key="1">
        <v-divider />

        <v-expansion-panel-header class="flex-nowrap">
          <v-list-item-avatar class="grey lighten-2 50px" max-width="40px">
            <span> 2</span>
          </v-list-item-avatar>
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title>Sign your name</v-list-item-title>
              <v-list-item-subtitle>Use your legal name.</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-expansion-panel-header>

        <v-expansion-panel-content>
          <sign-name />
        </v-expansion-panel-content>
        <v-expansion-panel-content>
          <v-btn width="160" dark color="theme_darkBlue" @click="nextPage">
            Next
          </v-btn>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel :key="2">
        <v-divider />

        <v-expansion-panel-header>
          <v-list-item-avatar class="grey lighten-2" max-width="40px">
            <span> 3</span>
          </v-list-item-avatar>
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title>Send the letter</v-list-item-title>
              <v-list-item-subtitle>
                Postage is $1.50 to send your letter.Learn more about what how
                this fee is used.
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <donate-money />
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </section>
</template>

<script lang="js">
import LetterLoad from '@/components/LetterLoad.vue'
import SignName from '@/components/SignName.vue'
import DonateMoney from '@/components/DonateMoney.vue'

export default {
    name: 'TakeAction',
    components: { LetterLoad, SignName, DonateMoney },
    props: {
        repName: {
          type: String,
          required: false
        },
        letterBody: {
          type: String,
          required: true
        },
        selectedRep: {
          type: Object,
          required: true
        }
    },
    data () {
        return {
            panel: 0
        }
    },
    computed: {

    },
    mounted () {

    },
    methods: {
        nextPage () {
            this.panel = this.panel += 1
        }
    }
}
</script>

<style scoped lang="less">
.take-action {
  .v-list-item {
    padding: 0px;
  }
}
</style>
