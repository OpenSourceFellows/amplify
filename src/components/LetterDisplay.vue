<template lang="html">
    <section class="letter-display">
        <v-card class="mx-auto">
            <v-card-title
                >Take 3 hours worth of action in 5 minutes</v-card-title
            >

            <v-card-text>
                <v-stepper vertical>

                    
                        <v-stepper-step v-if="isStep1 == true" color="blue" step="1" complete>
                        Enter postal code
                        </v-stepper-step>
    

                   
                        <v-stepper-step  v-else color="blue" step="1">
                        Enter postal code
                        </v-stepper-step>
                    

                    <v-stepper-content step="1"> </v-stepper-content>

                    
                        <v-stepper-step v-if="isStep2 == true" color="blue" step="2" complete>
                        Select a reprenstative
                        </v-stepper-step>
                    
                    
                        <v-stepper-step v-else color="blue" step="2">
                        Select a reprenstative
                        </v-stepper-step>
                    

                    <v-stepper-content step="2"> </v-stepper-content>
                    
                  
                        <v-stepper-step  v-if="isStep3 == true" color="blue" step="3" complete>
                        Send your letter
                    </v-stepper-step>
                  
    
                        <v-stepper-step v-else color="blue" step="3" >
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
    props: ['isStep1', 'isStep2', 'isStep3'],
    data () {
      return {
          
      }
    },
    methods: {
       
    },
    computed: {
        
    },
}
</script>

<style lang="less">
.letter-display {
    height: 500px;
}

.v-stepper__label {
    color: grey !important;
}
</style>
