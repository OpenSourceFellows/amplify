<template lang="html">
  <section class="cause-carousel">
    <h1 style="margin: 32px">Other Bills part of Campaign Can't Wait 2022</h1>
    <p style="margin: 32px">
      Take a look at where others are engaging with Pass The Policy to reach
      this representative on similar causes. Return to Amplify if you'd like to
      start with a different cause.
    </p>
    <v-flex style="margin: 32px">
      <v-carousel hide-delimiters style="box-shadow: 0px 0px">
        <v-carousel-item v-for="i in 2" :key="i" style="margin: 64px">
          <v-layout row align-content-space-between>
            <v-flex v-for="j in 6" :key="j" sm3 offset-1>
              <v-card>
                <v-img
                  src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"
                />
                <v-card-title primary-title>
                  <div>Card text</div>
                </v-card-title>
              </v-card>
            </v-flex>
          </v-layout>
        </v-carousel-item>
      </v-carousel>
    </v-flex>
  </section>
</template>

<script lang="js">
export default {
    name: 'CauseCarousel',
    props: [],
    data () {
        return {

        }
    },
    computed: {

    },
    mounted () {

    },
    methods: {

    }
}
</script>

<style scoped lang="less">
.cause-carousel {
  text-align: left;
  padding: 56px;
}
</style>
