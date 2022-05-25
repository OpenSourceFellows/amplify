<template lang="html">
  <section class="cause-carousel">
    <h1>Other Bills part of Campaign Can't Wait 2022</h1>
    <p>
      Take a look at where others are engaging with Pass The Policy to reach
      this representative on similar causes. Return to Amplify if you'd like to
      start with a different cause.
    </p>

    <v-sheet class="mx-auto" elevation="0" max-width="900">
      <v-slide-group v-model="model" class="pa-4" show-arrows>
        <v-slide-item
          v-for="bill in campaignBills"
          :key="bill.id"
          v-slot="{ active, toggle }"
        >
          <v-card
            :color="active ? 'primary' : 'grey lighten-1'"
            class="ma-4"
            height="160"
            width="220"
            @click="toggle"
          >
            <v-img
              :src="require(`../../public/campaignBills/${bill.image}`)"
              class="white--text font-weight-bold text-capitalize"
            >
              <div class="bill-card--overlay">
                <p>
                  {{ bill.title }}
                </p>
              </div>
            </v-img>
          </v-card>
        </v-slide-item>
      </v-slide-group>
    </v-sheet>
  </section>
</template>

<script lang="js">

import axios from "axios"

import "../styles/components/CauseCarousel.less"

export default {
  name: 'CauseCarousel',
  components: {

  },
  props: [],
  data() {
    return {
      campaignBills: [
        {
          id: 1,
          title: "The Green New Deal",
          image: "bill1.png"
        },
        {
          id: 2,
          title: "Teachers Fossil Fuel Divestment",
          image: "bill2.png"
        },
        {
          id: 3,
          title: "Build Public Renewables Act",
          image: "bill3.png"
        },
        {
          id: 4,
          title: "Consolidated Appropriations Act, 2022",
          image: "bill2.png"
        },
        {
          id: 5,
          title: "	Infrastructure Investment and Jobs Act",
          image: "bill1.png"
        },
        {
          id: 6,
          title: "Women’s Health Protection Act of 2022",
          image: "bill3.png"
        }
        ],
        position: {
          start: 0,
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

<style scoped lang="less">
.cause-carousel {
  text-align: left;
  padding: 56px;
}
.bill-card--overlay {
  height: 100%;
  width: 100%;
  background-color: rgba(66, 103, 178, 0.35);
  padding: 10px;
  font-size: 18px;
}
</style>
