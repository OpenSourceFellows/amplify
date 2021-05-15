<template>
    <v-container fluid="false">
        <v-parallax height="400" class="hero-image">
            <v-row
                align="center"
                justify="center"
                align-content="center"
                class="header-row"
            >
                <v-col class="text-center" cols="10">
                    <h1 class="display-1 font-weight-thin mb-4">
                        Amplify
                    </h1>
                    <h4 class="subheading">
                        Changes start by doing.
                    </h4>
                </v-col>
            </v-row>
        </v-parallax>
    </v-container>
</template>

<script>
export default {
    name: 'HomeHero'
};
</script>

<style lang="less">
.header-row {
    align-items: center;
}
.hero-image {
    background-image: url('../assets/amplify.png');
    background-position-y: -35px;
}
</style>
