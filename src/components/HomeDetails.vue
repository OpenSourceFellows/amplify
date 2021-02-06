<template>
    <v-container>
        <v-row>
            <v-col v-for="card in cards" :key="card.title" :cols="card.flex">
                <v-card class="mx-auto" max-width="344">
                    <v-img :src="card.src" height="200px"></v-img>

                    <v-card-title v-text="card.title"></v-card-title>

                    <v-card-subtitle
                        v-text="card.subtitle"
                        style="text-align:left"
                    >
                    </v-card-subtitle>
                    <v-card-actions>
                        <v-btn color="orange lighten-2" text>
                            Explore
                        </v-btn>

                        <v-spacer></v-spacer>

                        <v-btn icon @click="show = !show">
                            <v-icon>{{
                                show ? 'mdi-chevron-up' : 'mdi-chevron-down'
                            }}</v-icon>
                        </v-btn>
                    </v-card-actions>

                    <v-expand-transition>
                        <div v-show="show">
                            <v-divider></v-divider>

                            <v-card-text>
                                I'm a thing. But, like most politicians, he
                                promised more than he could deliver. You won't
                                have time for sleeping, soldier, not with all
                                the bed making you'll be doing. Then we'll go
                                with that data file! Hey, you add a one and two
                                zeros to that or we walk! You're going to do his
                                laundry? I've got to find a way to escape.
                            </v-card-text>
                        </div>
                    </v-expand-transition>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    name: 'HomeDetails',
    data: () => ({
        cards: [
            {
                title: 'Pre-fab homes',
                subtitle: 'The very best',
                src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg',
                flex: 3
            },
            {
                title: 'Favorite road trips',
                subtitle: 'Awesome',
                src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg',
                flex: 3
            },
            {
                title: 'Best airlines',
                subtitle: 'Woah',
                src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg',
                flex: 3
            },
            {
                title: 'Best airlines',
                subtitle: 'Woah',
                src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg',
                flex: 3
            }
        ],
        show: false
    })
};
</script>

<style scoped></style>
