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
    <div class="d-flex justify-center align-center">
      <v-card
        v-for="rep in representatives"
        :key="rep.id"
        class="mx-3"
        height="198"
        width="208"
      >
        <v-img
          :src="require(`../../public/representatives/${rep.profilePicture}`)"
        />
        <div class="card-label">
          <p class="rep-name">
            {{ rep.representativeName }}
          </p>
        </div>
      </v-card>
    </div>
  </section>
</template>

<script lang="js">
import axios from 'axios'

export default {
  name: 'ActionComplete',
  props: [],
  data() {
    return {
      expectedDate: "",
      representatives: [
        {
          id: 1,
          representativeName: "John Cronin",
          profilePicture: "rep1.png"
        },
        {
          id: 2,
          representativeName: "Scott Brown",
          profilePicture: "rep2.png"
        },
        {
          id: 3,
          representativeName: "Michael Kushmerek",
          profilePicture: "rep3.png"
        }
      ]

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
  async mounted() {
    // const ltr_id = 1;
     try {
      // const res = await axios.get(`https://api.lob.com/v1/letters/${ltr_id}`)
      const res = await axios.get(`/api/letters`)
      console.log(res)
      this.expectedDate = res.data.expected_delivery_date
    } catch (err) {
      console.error(err);
    }

  },
  methods: {
  }
}
</script>
<style scoped lang="less">
.action-complete {
  text-align: left;
  padding: 40px;

  .icon {
    float: left;
    padding-right: 16px;
    padding-left: 16px;
  }

  .text-section {
    padding: 16px;
  }

  .card-label {
    position: absolute;
    bottom: 0;
    left: 0;
    background-color: #38618c;
    padding: 5px;
    z-index: 5;
    width: 100%;
    text-align: center;

    .rep-name {
      color: #fff;
      font-size: 14px;
      font-weight: 300;
      text-transform: uppercase;
      margin: 0;
    }
  }
}
</style>
