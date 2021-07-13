<template lang="html">
    <section class="search-reps">
        <v-row>
            <v-col cols="6">
                <v-card>
                    <v-card-text>
                        <v-subheader class="pa-0">
                            Where do you live?
                        </v-subheader>
                        <v-form ref="form">
                            <v-text-field
                                label="Postal Code"
                                required
                                v-on:keyup="CheckInputContent"
                                v-model="search"
                            ></v-text-field>
                        </v-form>
                        <v-btn v-on:click="CreateRepList()" clickclass="mr-4"
                            >Submit
                        </v-btn>
                    </v-card-text>
                </v-card>
                <div id="reprenstatives-list" v-show="hasContent">
                    <div>
                        <v-card
                            v-for="member in congressMembers"
                            :key="member.name"
                        >
                            <representative-card
                                :handleRepClick="handleRepClick"
                                :member="member"
                            ></representative-card>
                        </v-card>
                    </div>
                </div>
            </v-col>
            <v-col cols="6">
                <letter-display v-if="shouldRender"></letter-display>
                <letter-load v-else :repName="repName" :letterBody="letterBody"> 
                </letter-load>
            </v-col>
        </v-row>
    </section>
</template>

<script lang="js">
import LetterDisplay from '@/components/LetterDisplay.vue';
import RepresentativeCard from '@/components/RepresentativeCard.vue';
import LetterLoad from '@/components/LetterLoad.vue';
import axios from 'axios';

  export default  {
    name: 'SearchReps',
    components:{
        LetterDisplay,
        RepresentativeCard,
        LetterLoad
    },
    props: [],
    mounted () {

    },
    data () {
      return {
          repName: String,
          letterBody: String,
          congressMembers:[],
          hasContent: false,
          search: "",
          shouldRender:true
      }
    },
    methods: {
        async handleRepClick (member) {
            try{

                this.repName = `Dear ${member.name}`;
                this.shouldRender = false;
                //from campaign id find template id and then make get request with template id
                let campaignId =this.$route.params.campaignId

                const versions = await axios.get(
                    'https://murmuring-headland-63935.herokuapp.com/api/Letter_Versions/'+ campaignId
                    );

                let latestVersion = versions.data[versions.data.length - 1].template_id;


                const letter = await axios.get(
                    'https://murmuring-headland-63935.herokuapp.com/api/templates'+ latestVersion
                    );
                this.letterBody = letter.data.versions[0].html;



            } catch(e){
                console.error(e);
            }
            
        },
        CheckInputContent: function () {
                if (this.search != "") {
                    this.hasContent = true;
                } else {
                    this.hasContent = false;
                }
            },
        async CreateRepList() {
        try {
            const res = await axios.get(
                'https://murmuring-headland-63935.herokuapp.com/api/representatives/' + this.search
            );
            this.congressMembers = res.data;
            this.hasContent=true;
            console.log(res.data);
        } catch (e) {
            console.error(e);
        }
    },
}
}
</script>

<style scoped lang="less">
.search-reps {
}
</style>
