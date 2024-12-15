<template>
  <section class="take-action">
    <v-expansion-panels v-model="panel" flat>
      <!-- Review the letter -->
      <v-expansion-panel :key="0" v-model="panel">
        <v-expansion-panel-header :disabled="!isActive(0)">
          <template #actions>
            <v-icon :color="determineStyles('icon', panelStatus[0])" size="45">
              $expand
            </v-icon>
          </template>
          <v-list-item-avatar
            :color="determineStyles('avatar', panelStatus[0])"
            max-width="40px"
          >
            <v-icon v-if="panelStatus[0] === 'completed'" class="white--text">
              mdi-check-bold
            </v-icon>
            <span v-else class="text-h5 font-weight-bold white--text"> 1</span>
          </v-list-item-avatar>
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title> Review the letter </v-list-item-title>
              <v-list-item-subtitle class="text-wrap font-weight-medium">
                Tell your Representatives why this matters.
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <letter-load />
        </v-expansion-panel-content>
        <v-expansion-panel-content>
          <v-btn
            width="160"
            dark
            color="primary"
            @click="nextPage({ selectedRep })"
          >
            Next
          </v-btn>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <!-- Fill out user information -->
      <v-expansion-panel :key="1">
        <v-divider />

        <v-expansion-panel-header class="flex-nowrap" :disabled="!isActive(1)">
          <template #actions>
            <v-icon :color="determineStyles('icon', panelStatus[1])" size="45">
              $expand
            </v-icon>
          </template>
          <v-list-item-avatar
            class="50px"
            :color="determineStyles('avatar', panelStatus[1])"
            max-width="40px"
          >
            <v-icon v-if="panelStatus[1] === 'completed'" class="white--text">
              mdi-check-bold
            </v-icon>
            <span v-else class="text-h5 font-weight-bold white--text"> 2</span>
          </v-list-item-avatar>
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title
                class="text-h6"
                :class="determineStyles('title', panelStatus[1])"
              >
                Sign your name
              </v-list-item-title>
              <v-list-item-subtitle class="font-weight-medium">
                Click 'Verify Address' to proceed
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-expansion-panel-header>

        <v-expansion-panel-content>
          <sign-name @address-validated="validateAddress()" />
        </v-expansion-panel-content>

        <v-expansion-panel-content>
          <v-btn
            :disabled="addressButtonDisabled"
            width="160"
            dark
            color="primary"
            @click="nextPage({ userData })"
          >
            Next
          </v-btn>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <!-- Send letter -->
      <v-expansion-panel :key="2">
        <v-divider />

        <v-expansion-panel-header :disabled="!isActive(2)">
          <template #actions>
            <v-icon :color="determineStyles('icon', panelStatus[2])" size="45">
              $expand
            </v-icon>
          </template>
          <v-list-item-avatar
            :color="determineStyles('avatar', panelStatus[2])"
            max-width="40px"
          >
            <v-icon v-if="panelStatus[2] === 'completed'" class="white--text">
              mdi-check-bold
            </v-icon>
            <span v-else class="text-h5 font-weight-bold white--text"> 3</span>
          </v-list-item-avatar>
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title
                class="text-h6"
                :class="determineStyles('title', panelStatus[2])"
              >
                Send the Letter
              </v-list-item-title>
              <v-list-item-subtitle class="text-wrap font-weight-medium">
                You can add an optional donation or just send a letter.
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

<script>
import LetterLoad from '@/components/LetterLoad.vue'
import SignName from '@/components/SignName.vue'
import DonateMoney from '@/components/DonateMoney.vue'

export default {
  name: 'TakeAction',
  components: {
    LetterLoad,
    SignName,
    DonateMoney
  },
  props: {
  },
  data() {
    return {
      panel: 0,
      panelStatus: {
        0: 'inProgress',
        1: 'default',
        2: 'default'
      },
      addressInvalid: true
    }
  },
  computed: {
    userData() {
      return this.$store.state.userData
    },
    selectedRep() {
      return this.$store.state.selectedRep
    },
    campaign() {
      return this.$store.state.campaign
    },
    addressButtonDisabled() {
      return this.addressInvalid
    }
  },
  methods: {
    nextPage(attrs) {
      console.log('setting values with nextPage!')
      this.$store.dispatch('setLetterAttrs', attrs)

      const previousPanel = this.panel
      const nextPanel = this.panel + 1

      //update previous panel's status
      this.panelStatus[previousPanel] = 'completed'
      //update next panel's status
      this.panelStatus[nextPanel] = 'inProgress'
      //move to next panel
      this.panel += 1
    },
    isActive(panelNumber) {
      return (
        this.panelStatus[panelNumber] === 'inProgress' ||
        this.panelStatus[panelNumber] === 'completed'
      )
    },
    determineStyles(element, status) {
      if (element === 'icon') {
        if (status === 'default') return 'primary lighten-1'
        else return 'primary'
      } else if (element === 'avatar') {
        if (status === 'completed') return 'green lighten-1'
        else if (status === 'inProgress') return 'primary'
        else return 'light-grey'
      } else if (element === 'title') {
        if (status === 'inProgress') return 'primary--text'
        else return 'dark--text'
      }
    },
    handleAddress(address) {
      this.userData = address
    },
    validateAddress() {
      this.addressInvalid = !this.addressInvalid
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
