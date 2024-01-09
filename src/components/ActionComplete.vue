<template lang="html">
  <div class="d-flex flex-column items-center">
    <section v-if="loading">
      <v-progress-circular
        indeterminate
        color="primary"
        :size="100"
        class="my-6"
      />
    </section>
    <section
      v-else
      class="d-flex flex-column flex-md-row justify-center align-center my-6 action-complete"
    >
      <img
        src="../assets/images/mailbox.png"
        alt="mailbox"
        height="150px"
        class="mailbox"
      />
      <div class="text-xs-center text-md-left mx-4">
        <h2 class="text-h3 text-md-h2 font-weight-bold mb-2">
          Congratulations!
        </h2>
        <h5 class="text-h5 font-weight-regular">
          Thank you for your donation of
          <span class="font-weight-bold">${{ donationAmount }}</span
          >.
          <br />
          Your letter is expected to be delivered on
          <span class="font-weight-bold">{{ expectedDeliveryDate }}</span
          >.
        </h5>
      </div>

      <!-- Area for progress bar? -->
    </section>
    <!-- TODO: Fill with rep info later on
    <section
      class="d-flex flex-column justify-center align-center my-6 action-complete"
    >
      <h4 class="text-h4">
        Want to send another letter for this campaign?
      </h4>
      <p class="text-h6 px-6">
        Here are other local representatives who will play key roles in deciding
        policy. Your letter ensures that they pay attention.
      </p>

      <div class="d-flex flex-row justify-center">
        <v-card
          v-for="(card, index) in cards"
          :key="index"
          class="mx-4"
        >
          <img
            :src="card.imgSrc"
            :alt="`Image of ${card.name}`"
            class="mailbox"
          >
          <p>{{ card.name }}</p>
        </v-card>
      </div>
    </section>
    -->
  </div>
</template>

<script lang="js">
import axios from 'axios'
// import RepresentativeCard from './RepresentativeCard.vue'

export default {
  name: 'ActionComplete',
  // components: { RepresentativeCard },
  props: [],
  data() {
    return {
      loading: true,
      email: '',
      amount: 0, // Will be in cents
      expectedDeliveryDate: '',
      congressMembers: []
    }
  },
  computed: {
    donationAmount() {
      return this.amount * 0.01
    },
    selectedRep() {
      return this.$store.state.selectedRep
    },
    userData() {
      return this.$store.state.userData
    },
    letterId() {
      return this.$store.state.letterId
    },
    lobReturnAddressId() {
      return this.$store.state.lobReturnAddressId
    }
  },
  created() {
    const sessionId = this.$route.query.session_id

    // Retrieve letter details from state
    this.$store
      .dispatch('retrieveStateFromLocalStorage', sessionId)
      .catch((e) => {
        console.error(e.message)
        this.$router.push({ path: '/' })
      })

    // Write transaction record into database.
    this.createTransactionRecord(sessionId)

    // Create letter with lob api and kill loading spinner.
    this.createCampaignLetter(sessionId)
  },
  methods: {
    createTransactionRecord(sessionId) {
      // Uses sessionId from Stripe to create db entry about transaction.

      axios
        .post('/api/checkout/create-transaction', { sessionId })
        .then((res) => {
          const { email, amount } = res.data
          this.email = email
          this.amount = amount
          // log response status
          this.$log.debug(
            'Status at /api/checkout/create-transaction:',
            res.status
          )
        })
        .catch(function (error) {
          // TODO: Needs error handling
          console.error(error)
          // log error
          this.$log.error(
            'An error occured at /api/checkout/create-transaction:',
            error.message,
            error.name,
            error.code
          )
        })
    },
    createCampaignLetter(sessionId) {
      // Creates campaign letter with lob api.
      axios
        .post('/api/lob/createLetter', {
          description: '',
          to: this.selectedRep,
          from: this.lobReturnAddressId,
          template_id: this.letterId,
          sessionId
        })
        .then((res) => {
          this.expectedDeliveryDate = res.data.expected_delivery_date
          this.loading = false
          // log response status
          // this.$log.debug('Status at /api/lob/createLetter:', res.status)
        })
        .catch((err) => {
          // TODO: Needs error handling
          console.error(err)
          // log error
          // this.$log.error('An error occured at /lob/checkout/createLetter:', err.message, err.name, err.code)
        })
    }
  }
}
</script>

<style scoped lang="less">
.mailbox {
  height: 150px;
}
</style>
