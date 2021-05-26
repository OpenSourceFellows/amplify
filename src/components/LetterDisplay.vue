<template lang="html">
    <section class="letter-display">
        <v-card class="mx-auto">
            <v-card-title
                >Take 3 hours worth of action in 5 minutes</v-card-title
            >

            <v-card-text>
                <v-stepper complete vertical>
                    <v-stepper-step color="blue" step="1">
                        Enter postal code
                    </v-stepper-step>

                    <v-stepper-content step="1"> </v-stepper-content>

                    <v-stepper-step color="green" step="2">
                        Select a reprenstative
                    </v-stepper-step>

                    <v-stepper-content step="2"> </v-stepper-content>
                    <v-stepper-step step="3">
                        Send your letter
                    </v-stepper-step>

                    <v-stepper-content step="3"> </v-stepper-content>
                </v-stepper>
            </v-card-text>

            <v-card-actions> </v-card-actions>
        </v-card>
    </section>
</template>

<script lang="js">

  export default  {
    name: 'letter-display',
    data () {
      return {

      }
    },
    methods: {

    },
    computed: {

    }
}
</script>

<style lang="less">
.letter-display {
    height: 500px;
}

.v-stepper__step__step {
    background-color: #2196f3 !important;
    border-color: #2196f3 !important;
}

.v-stepper__label {
    color: grey !important;
}
</style>
