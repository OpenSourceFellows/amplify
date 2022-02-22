<template lang="html">
  <section class="letter-load">
    <v-card flat>
      <div v-show="isSubmitted">
        <v-card-subtitle align="left">
          <div class="text-left">
            {{ currentDate() }}
          </div>
          <div>{{ selectedRep.name }}</div>
          <div>{{ selectedRep.address_line1 }}</div>
          <div>
            {{ selectedRep.address_city }}, {{ selectedRep.address_state }},
            {{ selectedRep.address_zip }}
          </div>
          <br />
          <div>Your Name</div>
          <div>Address</div>
          <div>City, S.C. Zip Code</div>
        </v-card-subtitle>
        <v-card-title> {{ selectedRep.name }} </v-card-title>

        <v-card-text>
          <span class="text-sm-left" v-html="letterBody"></span>
        </v-card-text>

        <v-text-field
          label="I support this cause because... (This is optional but when you add your story - it makes a difference"
          :rules="rules"
          outlined
          color="blue"
        >
        </v-text-field>
      </div>

      <div v-show="!isSubmitted">
        <v-card-text> clicked</v-card-text>

        <div class="col-md text-center text-md-left">
          <!--<h2>You are logged in as {{ $auth.user.name }}</h2>
                    { JSON.stringify($auth.user, null, 2) }} -->
        </div>
      </div>

      <v-card-actions>
        <v-btn>
          <AuthNav />
        </v-btn>
      </v-card-actions>
    </v-card>
  </section>
</template>

<script lang="js">
import AuthNav from '@/components/AuthNav'

export default {
  name: 'LetterLoad',
  components: { AuthNav },
  props: {
    repName: String,
    letterBody: String,
    selectedRep: Object
  },

  data () {
    return {
      date: new Date().toLocaleString(),
      isSubmitted: true
    }
  },
  computed: {

  },

  mounted () {

  },
  methods: {
    currentDate () {
      const current = new Date()
      const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`; return date
    }

  }
}
</script>

<style scoped lang="less">
.letter-load {
}
</style>
