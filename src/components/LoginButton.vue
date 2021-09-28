<template>
    <button
        class="btn btn-primary btn-block"
        v-if="!$auth.isAuthenticated"
        @click="login"
    >
        Log In
    </button>
</template>

<script>
export default {
    name: 'LoginButton',
    created() {
        this.cmpId = this.$route.params.campaignId;
    },
    methods: {
        login() {
            // set local storage item equal to current campaign id
            console.log("'login()'" + this.cmpId);
            localStorage.setItem('campaignId', this.cmpId);
            this.$auth.loginWithRedirect({
                redirect_uri: 'http://localhost:8080/campaign/-1'
            });
        }
    },
    mounted() {
        // check if campaign id in local storage if yes redirect to page with campaign id
        var cmpId = localStorage.getItem('campaignId');
        if (cmpId !== null && this.cmpId !== cmpId) {
            this.$router.push(`/campaign/${cmpId}`);
            console.log("'route'" + cmpId);
        }
    }
};
</script>
