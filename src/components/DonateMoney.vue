<template lang="html">
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
          :value="2"
          @click="unsetCustomAmountSelection"
        >
          2
        </v-btn>

        <v-btn
          elevation="2"
          raised
          :value="20"
          @click="unsetCustomAmountSelection"
        >
          20
        </v-btn>

        <v-btn
          elevation="2"
          raised
          :value="50"
          @click="unsetCustomAmountSelection"
        >
          50
        </v-btn>

        <v-btn
          elevation="2"
          raised
          :value="customDonationAmount"
          @click="handleCustomAmountSelection"
        >
          Custom Amount
        </v-btn>
      </v-btn-toggle>

      <div class="d-flex justify-center flex-column align-center :width=100%">
        <v-text-field
          v-if="customAmountSelected"
          ref="input"
          v-model="customDonationAmount"
          :rules="inputRule"
          class="custom-donation-amount-textfield"
          inputmode="numeric"
          label="Donation Amount"
          type="number"
          :max="10000"
          :min="1.5"
          :precision="2"
          :step="0.01"
          :value="customDonationAmount"
          required
        />
      </div>
    </v-col>
    <div>
      <v-btn outlined color="primary" text @click="submit()"> Submit </v-btn>
    </div>
  </section>
</template>

<script lang="js">
import axios from 'axios'
import { formatDonationAmount } from '../../util/format.js'
import { validateDonationAmount } from '../../util/validate.js'
export default {
  name: 'DonateMoney',
  props: [],
  data() {
    return {
      donationAmount: 2,
      customAmountSelected: false,
      customDonationAmount: undefined,
      inputRule: [
        (val) =>
          validateDonationAmount(formatDonationAmount(val)) ||
          'Invalid amount: acceptable value ranges between $1.50 and $10,000.00'
      ]
    }
  },
  computed: {},
  mounted() {},
  methods: {
    unsetCustomAmountSelection() {
      this.customAmountSelected = false
    },
    handleCustomAmountSelection() {
      this.customAmountSelected = !this.customAmountSelected
    },
    submit() {
      const value = this.customAmountSelected
        ? this.customDonationAmount
        : this.donationAmount
      const input = formatDonationAmount(value)

      if (this.customAmountSelected) {
        // inputRule provides user feedback on input, but actual validation occurs on submit
        if (this.$refs.input.validate()) this.createCheckoutSession(input)
      }

      if (validateDonationAmount(input)) this.createCheckoutSession(input)

      return
    },
    createCheckoutSession(donationAmount) {
      axios
        .post('/api/checkout/create-checkout-session', { donationAmount })
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
