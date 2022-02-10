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
                    <letter-load
                        :selectedRep="selectedRep"
                        :repName="repName"
                        :letterBody="letterBody"
                    />
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
                    <sign-name />
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
                    <donate-money></donate-money>
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-expansion-panels>
    </section>
</template>

<script lang="js">
import LetterLoad from '@/components/LetterLoad.vue'
import SignName from '@/components/SignName.vue'
import donateMoney from '@/components/donateMoney.vue'

export default {
    name: 'take-action',
    components: { LetterLoad, SignName, donateMoney },
    props: {
        repName: String,
        letterBody: String,
        selectedRep: Object
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
