<template>
  <section class="letter-load">
    <v-card flat>
      <div v-show="isSubmitted">
        <v-card-subtitle align="left">
          <div class="text-left">
            {{ currentDate }}
          </div>
          <div>{{ selectedRep.name }}</div>
          <div>{{ selectedRep.address_line1 }}</div>
          <div>
            {{ selectedRep.address_city }}, {{ selectedRep.address_state }},
            {{ selectedRep.address_zip }}
          </div>
          <br />
          <div>{{ user.name }}</div>
          <div>
            {{ user.line1 }}
            <br />
            {{ user.line2 }}
          </div>
          <div>
            {{ formattedCityState }}
          </div>
        </v-card-subtitle>
        <v-card-title class="salutation">
          Dear {{ selectedRep.name }},
        </v-card-title>

        <v-card-text>
          <span v-html="letterBody" />
        </v-card-text>

        <p>{{ user.name }}</p>
      </div>
      <div v-show="!isSubmitted">
        <v-card-text> clicked</v-card-text>

        <div class="col-md text-center text-md-left">
          <!--<h2>You are logged in as {{ $auth.user.name }}</h2>
                    { JSON.stringify($auth.user, null, 2) }} -->
        </div>
      </div>
      <!--
      <v-card-actions class="justify-center">
        <v-btn>
          <AuthNav />
        </v-btn>
      </v-card-actions>
    -->
    </v-card>
  </section>
</template>

<script lang="js">
// import AuthNav from '@/components/AuthNav'

export default {
  name: 'LetterLoad',
  components: {
    /* AuthNav */
  },
  props: {
    letterBody: { type: String, default: '' }
  },
  data() {
    return {
      isSubmitted: true
    }
  },
  computed: {
    selectedRep() {
      return this.$store.state.selectedRep
    },
    user() {
      return this.$store.state.userData
    },
    currentDate() {
      return new Intl.DateTimeFormat('en-US').format(new Date())
    },
    formattedCityState() {
      if (this.user.city) {
        return `${this.user.city}, ${this.user.state} ${this.user.zip}`
      }

      return ''
    }
  }
}
</script>

<style scoped lang="less">
.letter-load {
}

.salutation {
  font-size: 18px;
}
</style>
