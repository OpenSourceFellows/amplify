<template>
    <v-toolbar color="theme_darkBlue">
        <v-app-bar-nav-icon>
            <img alt="Vue logo" src="../assets/logo.svg" height="40" />
        </v-app-bar-nav-icon>

        <v-toolbar-title class="white--text text-h6"
            >PASS THE POLICY</v-toolbar-title
        >

        <v-spacer></v-spacer>

        <v-toolbar-items>
            <v-btn
                class="white--text"
                color="theme_darkBlue"
                elevation="0"
                v-for="item in menuItems"
                :key="item.title"
                :to="item.path"
            >
                {{ item.title }}
            </v-btn>
        </v-toolbar-items>
    </v-toolbar>
</template>

<script>
export default {
    name: 'NavBar',
    data() {
        return {
            dialog: false,
            menuItems: [
                { title: 'Home', path: '/' },
                { title: 'About', path: '/about' }
            ]
        };
    }
};
</script>
<style lang="less"></style>
