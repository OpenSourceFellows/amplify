<template>
    <v-container fluid="false">
        <v-parallax
            src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
            height="300"
        >
            <v-row
                align="center"
                justify="center"
                align-content="center"
                class="header-row"
            >
                <v-col class="text-center" cols="12">
                    <h1 class="display-1 font-weight-thin mb-4">
                        Vuetify
                    </h1>
                    <h4 class="subheading">
                        Build your application today!
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
</style>
