<template>
  <section class="donate-money">
    <h1>Donate to the cause.</h1>

    <v-col cols="12" class="py-2">
      <p v-if="noCostMailEnabled">
        Your voice is super important!
        <span v-if="couponCode">
          Please use this code <strong>{{ couponCode }}</strong> to send email
          and letter for free!
        </span>
        Donations are optional and 100% goes to {{ campaign.name }} 🙂
      </p>

      <p v-else>
        Your donation makes it possible to change our relationship with
        representatives, from the comfort of your home or on the go.
      </p>

      <p>Please select the type of letter you want to send</p>
      <v-btn-toggle
        class="d-flex flex-wrap justify-center"
        tile
        color="deep-purple accent-3"
        multiple
      >
        <v-btn
          v-for="item in letterDeliveryMethods"
          :key="item.type"
          elevation="2"
          raised
          :value="item.type"
          @click="setDeliveryMethods(item.type)"
        >
          {{ item.label }}
        </v-btn>
      </v-btn-toggle>

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

          <v-btn
            v-if="emptyTransactionsEnabled"
            elevation="2"
            raised
            :value="0"
            @click="unsetCustomAmountSelection"
          >
            0
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
      </div>
    </v-col>
    <div>
      <v-btn outlined color="primary" text @click="submit()"> Send Letter </v-btn>
    </div>
  </section>
</template>

<script lang="js">
import axios from 'axios'
import { PaymentPresenter } from '../../shared/presenters/payment-presenter'

const LETTER_DELIVERY_METHODS = [{ label: 'Email', type: 'email' }, {label: 'Physical Mail', type: 'snail_mail'}]

export default {
  name: 'DonateMoney',
  props: [],
  data() {
    return {
      donationAmount: 0,
      customAmountSelected: false,
      customDonationAmount: null,
      deliveryMethods: [],
    }
  },
  computed: {
    // These are temporary structures until we can reorganize the frontend.
    letterDeliveryMethods() {
      return LETTER_DELIVERY_METHODS
    },
    noCostMailEnabled() {
      return Boolean(process.env.VUE_APP_NO_COST_MAIL)
    },
    campaign() {
      return this.$store.state.campaign
    },
    couponCode() {
      return process.env.VUE_APP_COUPON_CODE
    },
    emptyTransactionsEnabled() {
      return process.env.VUE_APP_EMPTY_TRANSACTIONS === 'on'
    },
    showExtDonation() {
      return process.env.VUE_APP_SHOW_EXT_DONATION == 'true'
    },
    extDonationUrl() {
      return process.env.VUE_APP_EXT_DONATION_URL
    },
    user() {
      const user = this.$store.state.userData

      return {
        firstName: user.name.split(' ')[0],
        lastName: user.name.split(' ')[1] || '',
        addressLine_1: user.line1,
        addressLine_2: user.line2,
        city: user.city,
        state: user.state,
        zip: user.zip,
        email: user.email
      }
    },
    letter() {
      const rep              = this.$store.state.selectedRep
      const letterId         = this.$store.state.letterId
      const letterVersion    = this.$store.state.letterVersion
      const returnAddressId  = this.$store.state.lobReturnAddressId
      const mergeVariables   = this.$store.state.mergeVariables
      const letterTemplateId = this.$store.state.campaign.letterTemplateId

      return {
        letterTemplate: letterId,
        letterVersion: letterVersion,
        addressee: rep.name,
        addressLine_1: rep.address_line1,
        addressLine_2: rep.address_Line2,
        state: rep.address_state,
        city: rep.address_city,
        zip: rep.address_zip,
        email: rep.email,
        returnAddress: returnAddressId,
        merge_variables: mergeVariables,
        letter_template_id: letterTemplateId,
      }
    },
    styledCustomDonation() {
      // TODO: Get this working and always formatting input to be x,xxx.yy
      // We won't use currency here because the $ symbol will be added in Vuetify component.
      return new Intl.NumberFormat('en-US', { minimumSignificantDigits: 2, maximumSignificantDigits: 2 })
        .format(this.customDonationAmount)
    }
  },
  methods: {
    setDeliveryMethods(method) {
      console.log('logging delivery methods', method)
      // If item in array, delete on button click, else add to array.
      const idx = this.deliveryMethods.indexOf(method)
      if (idx > -1 ) {
        return this.deliveryMethods.splice(idx, 1)
      }

      this.deliveryMethods.push(method)
    },
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

      this.createCheckoutSession(donation, this.user, this.letter, this.deliveryMethods)
    },
    createCheckoutSession(donation, user, letter, deliveryMethods) {
      console.log(donation, user, letter, deliveryMethods)
      axios.post('/api/checkout/create-checkout-session', { donation, user, letter, deliveryMethods })
        .then((response) => {
          // Redirect to Stripe
          location.href = response.data.url
        })
        .catch((error) => {
          // Bring custom error message to top-level for ease of debugging
          const { data } = error.response
          console.log(data, error)
        })
    },
  }
}
</script>

<style scoped lang="less">
.custom-donation-amount-textfield {
  margin-top: 1em;
  width: 10em;
}
</style>
