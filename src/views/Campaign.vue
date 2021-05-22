<template>
    <div class="campaign">
        <h1>This is the campaign page</h1>
        <p>Campaign ID is {{ $route.params.campaignId }}</p>
        <v-btn @click="goHome">Back to campaigns page</v-btn>

        <search-reps></search-reps>
    </div>
</template>

<script>
import SearchReps from '@/components/SearchReps.vue';

export default {
    methods: {
        goHome() {
            this.$router.push('/');
        }
    },
    components: {
        SearchReps
    }
};
</script>
