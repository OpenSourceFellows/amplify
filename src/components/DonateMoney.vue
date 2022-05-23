<template lang="html">
  <section class="donate-money">
    <h1>Donate to the cause.</h1>

    <v-col cols="12" class="py-2">
      <p>
        Your donation makes it possible to change our relationship with
        representatives, from the comfort of your home or on the go.
      </p>

      <v-btn-toggle v-model="text" tile color="deep-purple accent-3" group>
        <v-btn elevation="2" raised value="2"> 2 </v-btn>

        <v-btn elevation="2" raised value="20"> 20 </v-btn>

        <v-btn elevation="2" raisedvalue="50"> 50 </v-btn>
      </v-btn-toggle>
    </v-col>
    <div>
      <v-btn outlined color="primary" text @click="submit"> Submit</v-btn>
    </div>
  </section>
</template>

<script lang="js">

export default {
    name: 'donate-money',
    props: [],
    mounted () {

    },
    data () {
        return {

          text: ""

        }
    },
    methods: {
        submit () {
            this.$router.push('/complete')
        }
    },
    computed: {

    }
}
</script>

<style scoped lang="less">
.donate-money {
}
</style>
