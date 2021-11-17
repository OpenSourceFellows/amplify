<template lang="html">
    <section class="search-reps">
        <v-row class="pa-14">
            <v-col>
                <v-card flat>
                    <v-card-text>
                        <v-subheader class="pa-0">
                            Where do you live?
                        </v-subheader>
                        <v-form ref="form">
                            <v-text-field
                                label="Postal Code"
                                required
                                v-on:keyup="CheckInputContent"
                                v-model="postalCode"
                            ></v-text-field>
                        </v-form>
                        <v-btn
                            :to="{
                                name: 'Reps',
                                params: { postalCode: postalCode }
                            }"
                            v-on:click="CreateRepList()"
                            clickclass="mr-4"
                            >Submit
                        </v-btn>
                    </v-card-text>
                </v-card>
                <div id="reprenstatives-list" v-show="hasContent">
                    <div>
                        <v-card
                            flat
                            v-for="member in congressMembers"
                            :key="member.name"
                        >
                            <representative-card
                                :handleRepClick="handleRepClick"
                                :member="member"
                            ></representative-card>
                            <v-divider></v-divider>
                        </v-card>
                    </div>
                </div>
            </v-col>
            <v-divider vertical></v-divider>
            <v-col>
                <div v-if="$auth.isAuthenticated">
                    <take-action :repName="repName" :letterBody="letterBody">
                    </take-action>
                </div>
                <div v-else>
                    <letter-display
                        v-if="shouldRender"
                        :is-step1="isStep1"
                        :is-step2="isStep2"
                        :is-step3="isStep3"
                    ></letter-display>
                    <letter-load
                        v-else
                        :repName="repName"
                        :letterBody="letterBody"
                    >
                    </letter-load>
                </div>
            </v-col>
        </v-row>
    </section>
</template>

<script lang="js">
import LetterDisplay from '@/components/LetterDisplay.vue';
import RepresentativeCard from '@/components/RepresentativeCard.vue';
import LetterLoad from '@/components/LetterLoad.vue';
import takeAction from '@/components/takeAction.vue';
import axios from 'axios';

  export default  {
    name: 'SearchReps',
    components:{
        LetterDisplay,
        RepresentativeCard,
        LetterLoad,
        takeAction
    },
    mounted() {
        this.CreateRepList()
    },
    data () {
      return {
          repName: String,
          letterBody: String,
          congressMembers:[],
          hasContent: false,
          postalCode: this.$route.params.postalCode ||"",
          shouldRender:true,
          isStep1: Boolean,
          isStep2: Boolean,
          isStep3: Boolean
          }
    },
    methods: {
        async handleRepClick (member) {
            try{

                this.repName = `Dear ${member.name}`;
                this.shouldRender = false;
                //from campaign id find template id and then make get request with template id
                var campaignId =this.$route.params.campaignId;

                const versions = await axios.get(
                    'https://murmuring-headland-63935.herokuapp.com/api/Letter_Versions/'+ campaignId
                    );

                let latestVersion = versions.data[versions.data.length - 1].template_id;


                const letter = await axios.get(
                    'https://murmuring-headland-63935.herokuapp.com/api/lob/templates/' + latestVersion
                    );
                this.letterBody = letter.data.versions[0].html;
                this.isStep2 = true;


            } catch(e){
                console.error(e);
            }

        },
        CheckInputContent: function () {
                if (this.postalCode != "" ) {
                    this.hasContent = true;
                } else {
                    this.hasContent = false;
                }
            },
        async CreateRepList() {
        try {
            const res = await axios.get(
                'https://murmuring-headland-63935.herokuapp.com/api/representatives/' + this.postalCode
            );
            this.congressMembers = res.data;
            this.hasContent=true;
            console.log(res.data);

            this.isStep1 = true;
        } catch (e) {
            console.error(e);
        }

        }
    }
  }
</script>

<style scoped lang="less">
.search-reps {
}
</style>
