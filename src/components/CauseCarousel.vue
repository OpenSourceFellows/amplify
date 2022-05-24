<template lang="html">
  <section class="cause-carousel">
    <h1>Other Bills part of Campaign Can't Wait 2022</h1>
    <p>
      Take a look at where others are engaging with Pass The Policy to reach
      this representative on similar causes. Return to Amplify if you'd like to
      start with a different cause.
    </p>

    <!-- <v-flex>
      <v-carousel hide-delimiters style="box-shadow: 0px 0px">
        <v-carousel-item v-for="i in 2" :key="i" style="margin: 64px">
          <v-layout row align-content-space-between>
            <v-flex v-for="j in 6" :key="j" sm3 offset-1>
              <v-card>
                <v-img
                  src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"
                />
                <v-card-title primary-title>
                  <div>Card text</div>
                </v-card-title>
              </v-card>
            </v-flex>
          </v-layout>
        </v-carousel-item>
      </v-carousel>
    </v-flex> -->

    <vue-horizontal-list :items="items" :options="options">
      <template #nav-prev>
        <v-icon large> mdi-chevron-left </v-icon>
      </template>

      <template #nav-next>
        <v-icon large> mdi-chevron-right </v-icon>
      </template>

      <template #default="{ item }">
        <div
          class="item"
          :style="{
            'background-image': `url(https://cdn.vuetifyjs.com/images/cards/desert.jpg)`
          }"
        >
          <!-- <h5>{{ item.title }}</h5> -->
          <p>{{ item.name }}</p>
        </div>
      </template>
    </vue-horizontal-list>
  </section>
</template>

<script lang="js">

import VueHorizontalList from "vue-horizontal-list";
import axios from "axios"

import "../styles/components/CauseCarousel.less"

export default {
  name: 'CauseCarousel',
  components: {
    VueHorizontalList
  },
  props: [],
  data() {
    return {
      options: {
        responsive: [
          { end: 576, size: 1 },
          { start: 576, end: 768, size: 2 },
          { start: 768, end: 992, size: 3 },
          { size: 4 },
        ],
        list: {
          // 1200 because @media (min-width: 1200px) and therefore I want to switch to windowed mode
          // windowed: 1200,
          // Because: #app {padding: 80px 24px;}
          padding: 32,
        },
        position: {
          start: 0,
        }
      },
      items: [
        // { title: "Item 1", content: "The Grean \n New Deal", image: "https://cdn.vuetifyjs.com/images/cards/desert.jpg" },
        // { title: "Item 2", content: "Teachers Fossil \n Foeis Divestment", image: "https://cdn.vuetifyjs.com/images/cards/desert.jpg" },
        // { title: "Item 3", content: "Build Public \n Reneawables Act", image: "https://cdn.vuetifyjs.com/images/cards/desert.jpg" },

        // { title: "Item 4", content: "The Grean \n New Deal", image: "https://cdn.vuetifyjs.com/images/cards/desert.jpg" },
        // { title: "Item 5", content: "Teachers Fossil \n Foeis Divestment", image: "https://cdn.vuetifyjs.com/images/cards/desert.jpg" },
        // { title: "Item 6", content: "Build Public \n Reneawables Act", image: "https://cdn.vuetifyjs.com/images/cards/desert.jpg" },
      ]
    }
  },
  computed: {

  },
  mounted() {

    axios
      .get('/api/campaigns')
      .then(response =>{
        this.items =[]
        console.log("res : ", response)
        this.items = response.data
      })
      .catch(function (error) { // 请求失败处理
        console.log(error);
      });


  },
  methods: {

  }
}
</script>
