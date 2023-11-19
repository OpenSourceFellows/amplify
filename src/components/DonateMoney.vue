<template>
  <section class="donate-money">
    <h1>Donate to the cause.</h1>

    <v-col cols="12" class="py-2">
      <p>
        Your donation makes it possible to change our relationship with
        representatives, from the comfort of your home or on the go.
      </p>

      <v-btn-toggle
        v-model="donationAmount"
        class="d-flex flex-wrap justify-center"
        tile
        color="deep-purple accent-3"
        group
      >
        <v-btn
          elevation="2"
          raised
          :value="200"
          @click="unsetCustomAmountSelection"
        >
          2
        </v-btn>

        <v-btn
          elevation="2"
          raised
          :value="2000"
          @click="unsetCustomAmountSelection"
        >
          20
        </v-btn>

        <v-btn
          elevation="2"
          raised
          :value="5000"
          @click="unsetCustomAmountSelection"
        >
          50
        </v-btn>

        <v-btn elevation="2" raised @click="toggleCustomDonation">
          Custom Amount
        </v-btn>
      </v-btn-toggle>

      <div class="d-flex justify-center flex-column align-center :width=100%">
        <v-text-field
          v-if="customAmountSelected"
          ref="input"
          v-model="customDonationAmount"
          class="custom-donation-amount-textfield"
          inputmode="numeric"
          label="Donation Amount"
          type="number"
          required
        >
          <v-icon slot="prepend"> mdi-currency-usd </v-icon>
          {{ styledCustomDonation }}
        </v-text-field>
      </div>
    </v-col>
    <div>
      <v-btn outlined color="primary" text @click="submit()"> Submit </v-btn>
    </div>
  </section>
</template>

<script lang="js">
import axios from 'axios'
import { PaymentPresenter } from '../../shared/presenters/payment-presenter'

export default {
  name: 'DonateMoney',
  props: [],
  data() {
    return {
      donationAmount: 2000,
      customAmountSelected: false,
      customDonationAmount: null,
    }
  },
  computed: {
    userData() {
      return this.$store.state.userData
    },
    styledCustomDonation() {
      // TODO: Get this working and always formatting input to be x,xxx.yy
      // We won't use currency here because the $ symbol will be added in Vuetify component.
      return new Intl.NumberFormat('en-US', { minimumSignificantDigits: 2, maximumSignificantDigits: 2 })
        .format(this.customDonationAmount)
    }
  },
  methods: {
    unsetCustomAmountSelection() {
      this.customAmountSelected = false
    },
    toggleCustomDonation() {
      this.customAmountSelected = !this.customAmountSelected
    },
    submit() {
      let donation = this.customAmountSelected ? this.customDonationAmount : this.donationAmount
      const presenter = new PaymentPresenter()

      donation = presenter.formatPaymentAmount(donation)
      console.log(donation)
      this.createCheckoutSession(donation, this.userData)
    },
    createCheckoutSession(donationAmount, user) {
      console.log(donationAmount, user)
      axios.post('/api/checkout/create-checkout-session', { donationAmount, user })
        // TODO: Investigate whether we need to dump user state still. With the new stripe webhook it may not be necessary.
        .then((response) => {
          // Dump state to local storage before redirect
          this.$store.dispatch(
            'dumpStateToLocalStorage',
            response.data.sessionId
          )
          // Redirect to Stripe
          location.href = response.data.url
        })
        .catch((error) => {
          // Bring custom error message to top-level for ease of debugging
          const { data } = error.response
          console.log(data, error)
        })
    }
  }
}
</script>

<style scoped lang="less">
.custom-donation-amount-textfield {
  margin-top: 1em;
  width: 10em;
}
</style>
