<template lang="html">
    <section class="take-action">
        <v-expansion-panels v-model="panel">
            <v-expansion-panel v-model="panel">
                <v-expansion-panel-header>
                    Item 1
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                    <letter-load :repName="repName" :letterBody="letterBody" />
                </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
                <v-expansion-panel-header>
                    Item 2
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
                <v-expansion-panel-header>
                    Item 3
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-expansion-panels>
    </section>
</template>

<script lang="js">
import LetterLoad from '@/components/LetterLoad.vue';

  export default  {
    name: 'take-action',
    components:{LetterLoad},
      props: {
        repName: String,
        letterBody: String
        },
    mounted () {

    },
    data () {
      return {
  panel: 0
      }
    },
    methods: {

    },
    computed: {

    }
}
</script>

<style scoped lang="less">
.take-action {
}
</style>
