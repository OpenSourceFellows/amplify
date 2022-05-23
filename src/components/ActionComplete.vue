<template lang="html">
  <section class="action-complete">
    <div class="text-section up">
      <v-icon class="icon" size="64px" color="blue lighten-1">
        mdi-mailbox
      </v-icon>
      <div class="content">
        <h1>Congratulations!</h1>
        <p>
          Expected to be delivered: <span>{{ get_date_format }}</span>
        </p>
      </div>
    </div>
    <div class="text-section down">
      <h1>Want to send another letter for this campaign?</h1>
      <p class="align-left">
        Here are other representatives who are also key to reach out to on this
        cause. Your letter ensures they pay attention.
      </p>
      <div class="avartar-content">
        <div v-for="(item, index) in persons" class="item" :key="index">
          <img :src="item[1]" />
          <p>{{ item[0] }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="js">
import "../styles/components/ActionComplete.less"
const img1 = require("../assets/images/person-1.jpg")
const img2 = require("../assets/images/person-2.jpg")
const img3 = require("../assets/images/person-3.jpg")
export default {
  name: 'ActionComplete',
  props: [],
  data() {
    return {
      delivery_date: new Date(),
      persons : [["JOHN CRONIN", img1], ['SCOTT BROWN', img2], ['MICHAEL JUSHMEREK', img3]]
    }
  },
  computed: {

    get_date_format(){
      let date = this.delivery_date
      console.log("date : ", date)
      if(date)
        return `${date.getFullYear()} - ${date.getMonth() + 1} - ${date.getDate()}`;
      else
        return '--'

    }

  },
  mounted() {

  },
  methods: {
  }
}
</script>
