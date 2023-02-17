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
          v-model="customDonationAmount"
          class="custom-donation-amount-textfield"
          type="number"
          :precision="2"
          :step="0.01"
          :max="10000"
          :min="1.5"
          label="Donation Amount"
          :value="customDonationAmount"
          @input="validateDonationAmount"
          required
        />
      </div>

      <p v-if="message !== ''" class="message">
        {{ message }}
      </p>
    </v-col>
    <div>
      <v-btn outlined color="primary" text @click="submit"> Submit </v-btn>
    </div>
  </section>
</template>

<script lang="js">
import axios from 'axios'
export default {
  name: 'DonateMoney',
  props: [],
  data () {
    return {
      donationAmount: 2,
      customAmountSelected: false,
      customDonationAmount: undefined, // set min value to be 1.5
      message: ''
    }
  },
  computed: {
  },
  mounted () {
  },
  methods: {
    unsetCustomAmountSelection() {
      this.customAmountSelected = false;
      this.message = "";
    },
    handleCustomAmountSelection() {
      this.customAmountSelected = !this.customAmountSelected;
      this.message = "";
    },
    validateDonationAmount(value = this.customDonationAmount) {
      let isValid = true;
      value = parseFloat(value); // outputs: number
      value = value.toFixed(2); // outputs: string
      value = parseFloat(value); // outputs: number
      // separating parameter assignment and parseFloat operation for consistent outcome on change

      // if an existing donation amount button was chosen
      if (!this.customAmountSelected) {
        value = this.donationAmount;
        return { value, isValid } // i.e. { 2 || 20 || 50, true }
      }

      if (value > 1.49 && value < 10000.01) {
        this.message = "";
        return { value, isValid }; // { 1.50, true }
      }

      if (isNaN(value)) { // undefined || NaN
        this.message = "Please select or enter a valid amount.";
      }
      if (value < 1.5) {
        this.message = "Please enter a donation amount higher than $1.50.";
      }
      if (value > 10000) {
        this.message = "Amplify currently only accept donation amounts less than $10,000."
      }

      isValid = false;
      return { value, isValid }; // i.e. { undefined, false }
    },
    submit() {
      const { value, isValid } = this.validateDonationAmount();
      // console.log(`the value: ${value} is ${isValid ? 'valid' : 'NOT valid'}`);

      if (isValid) {
        this.createCheckoutSession(value);
        this.message = ""; // only refreshes message after input value becomes valid
      } else {
        this.message = "The donation amount is not valid."; // edge case?
        return;
      }
    },
    createCheckoutSession (donationAmount) {
      axios.post('/api/checkout/create-checkout-session', {donationAmount})
        .then((response) => {
          // Dump state to local storage before redirect
          this.$store.dispatch('dumpStateToLocalStorage', response.data.sessionId)
          // Redirect to stripe
          location.href = response.data.url
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}
</script>

<style scoped lang="less">
.custom-donation-amount-textfield {
  margin-top: 1em;
  min-width: 10em;
}
.message {
  background-color: #fff8e6;
  border-radius: 0.25em;
  border: 1px solid #e6a700;
  color: #4d3800;
  // margin-top: 1em;
  padding: 0.25em;
}
</style>
