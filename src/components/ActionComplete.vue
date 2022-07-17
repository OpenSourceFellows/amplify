<template lang="html">
  <div class="d-flex flex-column align-center">
    <section
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

const cards = [
  {
    name: 'Rep 1',
    imgSrc: require('../assets/images/cardimage.jpeg')
  },
  {
    name: 'Rep 2',
    imgSrc: require('../assets/images/cardimage.jpeg')
  },
  {
    name: 'Rep 3',
    imgSrc: require('../assets/images/cardimage.jpeg')
  },
]

export default {
    name: 'ActionComplete',
    props: [],
    data () {
      return {
        email: '',
        amount: 0,    // Will be in cents
        expectedDeliveryDate: '6/31/22 '
      }
    },
    computed: {
      donationAmount () {
        return this.amount * 0.01
      },
      cards() {
        return cards
      }
    },
    created () {
      // Write transaction record into database.
      const sessionId = this.$route.query.session_id
      console.log(sessionId)

      this.createTransactionRecord(sessionId)
      // Get Address details to create letter.
      // const letterDetails = { sessionId }

      // Create letter with lob api.
      // this.createCampaignLetter(letterDetails)

      // Display success details in template.

    },
    methods: {
      createTransactionRecord(sessionId) {
        // Uses sessionId from Stripe to create db entry about transaction.

        axios.post( '/api/checkout/create-transaction', { sessionId })
        .then((res) => {
          const { email, amount } = res.data
          this.email = email
          this.amount = amount
        })
        .catch(function (error) {
          // TODO: Needs error handling
          console.log(error)
        })
      },
      createCampaignLetter(letterDetails) {
        // Creates campaign letter with lob api.

        axios.post('/api/lob/createLetter', letterDetails)
          .then((res) => {
            console.log(res)
          })
          .catch((err) => {
            // TODO: Needs error handling
            console.error(err)
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
