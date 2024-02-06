<template>
  <section class="sign-name">
    <v-card ref="form">
      <v-card-text>
        <v-text-field
          ref="name"
          v-model="name"
          :rules="[() => !!name || 'This field is required']"
          :error-messages="errorMessages"
          label="Full Name"
          placeholder="John Doe"
          required
        />
        <v-text-field
          ref="line1"
          v-model="line1"
          :rules="[
            () => !!line1 || 'This field is required',
            () =>
              (!!line1 && line1.length <= 25) ||
              'Address must be less than 25 characters',
            addressCheck
          ]"
          label="Address Line"
          placeholder="Snowy Rock Pl"
          counter="25"
          required
        />
        <v-text-field
          ref="line2"
          v-model="line2"
          label="Address Line"
          placeholder="Snowy Rock Pl"
          counter="25"
          required
        />

        <v-text-field
          ref="city"
          v-model="city"
          :rules="[() => !!city || 'This field is required', addressCheck]"
          label="City"
          placeholder="El Paso"
          required
        />
        <v-text-field
          ref="state"
          v-model="state"
          :rules="[() => !!state || 'This field is required']"
          label="State"
          required
          placeholder="TX"
        />
        <v-text-field
          ref="zip"
          v-model="zip"
          :rules="[() => !!zip || 'This field is required']"
          label="ZIP / Postal Code"
          required
          placeholder="79938"
        />
        <v-text-field
          ref="email"
          v-model="email"
          :rules="[
            () => validateEmail() || 'Please enter a valid email address.'
          ]"
          label="Email"
          placeholder="condor@shellmound.com"
        />
        <v-checkbox label="Constituent" />
      </v-card-text>
      <v-card-text> {{ message }} </v-card-text>
      <v-divider class="mt-12" />
      <v-card-actions>
        <v-btn text> Cancel </v-btn>
        <v-spacer />
        <v-slide-x-reverse-transition>
          <v-tooltip v-if="formHasErrors" left>
            <template #activator="{ on, attrs }">
              <v-btn
                icon
                class="my-0"
                v-bind="attrs"
                @click="resetForm"
                v-on="on"
              >
                <v-icon>mdi-refresh</v-icon>
              </v-btn>
            </template>
          </v-tooltip>
        </v-slide-x-reverse-transition>
        <v-btn color="primary" text @click="submit"> Verify Address </v-btn>
      </v-card-actions>
    </v-card>
  </section>
</template>

<script lang="js">
import axios from 'axios'

export default {
  name: 'SignName',
  data: () => ({
    errorMessages: '',
    name: null,
    line1: null,
    line2: null,
    city: null,
    state: null,
    zip: null,
    country: null,
    email: null,
    formHasErrors: false,
    JSONstring: '',
    message: ''
  }),

  computed: {
    form() {
      return {
        name: this.name,
        line1: this.line1,
        line2: this.line2,
        city: this.city,
        state: this.state,
        zip: this.zip,
        email: this.email
      }
    }
  },

  watch: {
    name() {
      this.errorMessages = ''
    }
  },

  methods: {
    addressCheck() {
      this.errorMessages = this.address && !this.name ? "Hey! I'm required" : ''

      return true
    },
    validateEmail() {
      if (!this.email) {
        return true
      }

      let regex = new RegExp(/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/)

      return regex.test(this.email)
    },
    resetForm() {
      this.errorMessages = []
      this.formHasErrors = false

      Object.keys(this.form).forEach((f) => {
        this.$refs[f].reset()
      })
    },
    submit() {
      this.formHasErrors = false

      Object.keys(this.form).forEach((f) => {
        if (!this.form[f]) this.formHasErrors = true

        this.$refs[f].validate(true)
      })

      axios
        .post('/api/lob/createAddress', this.form)
        .then((response) => {
          console.log(response)
          console.log(this.form)
          this.message = 'Address verified!'

          this.$store.commit('setGenericValue', {
            key: 'lobReturnAddressId',
            value: response.data.address_id
          })
          this.$store.commit('setObjectValue', {
            key: 'userData',
            data: this.form
          })
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}
</script>

<style scoped lang="less">
.sign-name {
}
</style>
