<template>
    <v-container>
        <v-row>
            <v-col v-for="campaign in campaigns" :key="campaign.id">
                <v-card class="mx-auto" max-width="344">
                    <v-img src="../assets/reachout.jpeg" height="200px"></v-img>

                    <v-card-title v-text="campaign.name"></v-card-title>

                    <v-card-subtitle
                        v-text="campaign.organization"
                        style="text-align:left"
                    >
                    </v-card-subtitle>
                    <v-card-text
                        v-text="campaign.page_url"
                        style="text-align:left"
                    >
                    </v-card-text>
                    <v-card-actions>
                        <v-btn
                            color="orange lighten-2"
                            text
                            :to="`/campaign/${campaign.id}`"
                        >
                            View Campaign
                        </v-btn>

                        <v-spacer></v-spacer>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import axios from 'axios';

export default {
    name: 'CampaignCards',
    data() {
        return {
            campaigns: []
        };
    },
    async created() {
        try {
            const res = await axios.get(
                'https://murmuring-headland-63935.herokuapp.com/api/amplify'
            );
            this.campaigns = res.data;
        } catch (e) {
            console.error(e);
        }
    }
};
</script>

<style scoped></style>
