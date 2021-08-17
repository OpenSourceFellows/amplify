<template lang="html">
    <section class="letter-load">
        <v-card>
            <div v-show="isSubmitted">
                <v-card-title>{{ repName }}</v-card-title>
                <v-card-text>
                    <span v-html="letterBody"></span>
                </v-card-text>
            </div>
            <div v-show="!isSubmitted">
                <v-card-text> clicked</v-card-text>

                <div class="col-md text-center text-md-left">
                    <h2>You are logged in as {{ $auth.user.name }}</h2>
                    <!-- { JSON.stringify($auth.user, null, 2) }} -->
                </div>
            </div>

            <v-card-actions>
                <v-btn
                    v-on:click="isSubmitted = !isSubmitted"
                    text
                    color="primary"
                >
                    Send Letter
                </v-btn>
            </v-card-actions>
        </v-card>
    </section>
</template>

<script lang="js">

  export default  {
    name: 'letter-load',
    props: {
        repName: String,
        letterBody: String
        },
    mounted () {

    },


    data () {
      return {
          isSubmitted: true

      }
    },
    methods: {

    },
    computed: {

    }
}
</script>

<style scoped lang="less">
.letter-load {
}
</style>
