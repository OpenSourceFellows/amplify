<template lang="html">
    <section class="take-action">
        <v-expansion-panels v-model="panel" flat>
            <v-expansion-panel v-model="panel">
                <v-expansion-panel-header>
                    <v-list-item-avatar class="grey lighten-2" max-width="40px">
                        <span> 1</span>
                    </v-list-item-avatar>
                    <v-list-item two-line>
                        <v-list-item-content>
                            <v-list-item-title
                                >Review the letter</v-list-item-title
                            >
                            <v-list-item-subtitle
                                >Add any additional details to organizer
                                requests.</v-list-item-subtitle
                            >
                        </v-list-item-content>
                    </v-list-item>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                    <letter-load :repName="repName" :letterBody="letterBody" />
                </v-expansion-panel-content>
            </v-expansion-panel>

            <v-expansion-panel>
                <v-divider></v-divider>

                <v-expansion-panel-header class="flex-nowrap">
                    <v-list-item-avatar
                        class="grey lighten-2 50px"
                        max-width="40px"
                    >
                        <span> 2</span>
                    </v-list-item-avatar>
                    <v-list-item two-line>
                        <v-list-item-content>
                            <v-list-item-title
                                >Sign your name</v-list-item-title
                            >
                            <v-list-item-subtitle
                                >Use your legal name.</v-list-item-subtitle
                            >
                        </v-list-item-content>
                    </v-list-item>
                </v-expansion-panel-header>

                <v-expansion-panel-content>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
                <v-divider></v-divider>

                <v-expansion-panel-header>
                    <v-list-item-avatar class="grey lighten-2" max-width="40px">
                        <span> 3</span>
                    </v-list-item-avatar>
                    <v-list-item two-line>
                        <v-list-item-content>
                            <v-list-item-title
                                >Send the letter</v-list-item-title
                            >
                            <v-list-item-subtitle
                                >Postage is $1.50 to send your letter.Learn more
                                about what how this fee is
                                used.</v-list-item-subtitle
                            >
                        </v-list-item-content>
                    </v-list-item>
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
    .v-list-item {
        padding: 0px;
    }
}
</style>
