<template lang="html">
  <section class="donate-money">
    <h1>Donate to the cause.</h1>

    <v-col cols="12" class="py-2">
      <p>
        Your donation makes it possible to change our relationship with
        representatives, from the comfort of your home or on the go.
      </p>

      <v-btn-toggle v-model="donation" tile color="deep-purple accent-3" group>
        <v-btn elevation="2" raised :value="2"> 2 </v-btn>

        <v-btn elevation="2" raised :value="20"> 20 </v-btn>

        <v-btn elevation="2" :value="50"> 50 </v-btn>
      </v-btn-toggle>
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
        donation: 1.50
      }
    },
    computed: {
    },
    mounted () {
    },
    methods: {
      submit () {
        axios.post('/api/checkout/create-checkout-session', {donationAmount: this.donation})
        .then((response) => {
          console.log(response);
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

<style scoped lang="less"></style>
