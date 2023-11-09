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
          <v-select
            v-model="selectedReason"
            :items="reasons"
            label="Reasons why this campaign is important to you"
            class="small-dropdown custom-select"
          />
          <v-select
            v-model="selectedAffects"
            :items="affects"
            label="How this affects your community"
            class="small-dropdown custom-select"
          />
          <v-select
            v-model="selectedBenefit"
            :items="benefits"
            label="What is the benefit of supporting this"
            class="small-dropdown custom-select"
          />
          <v-select
            v-model="selectedGreaterImpact"
            :items="greaterImpacts"
            label="What is the greater impact of supporting this"
            class="small-dropdown custom-select"
          />
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
  components: { /* AuthNav */ },
  props: {
    letterBody: { type: String, default: '' },
  },
  data() {
    return {
      isSubmitted: true,
      selectedReason: null,
      selectedAffects: null,
      selectedBenefit: null,
      selectedGreaterImpact: null,
      reasons: [
        'I live here',
        'My family lives here',
        'Communities I care about are affected',
      ],
      affects: [
        'Creates jobs',
        'Creates better air and water quality',
        'Creates great sustainability examples',
        'Increases quality of life and culture',
      ],
      benefits: [
        'Protects endangered animals',
        'Lessens homelessness',
        'Prevents environmental harms to water and land',
      ],
      greaterImpacts: [
        'Protecting historical landmarks',
        'Becoming a beacon example of sustainability for the nation',
        'Generating eco and sustainability awareness education and tourism',
        'Increasing biodiversity and lowering carbon emissions',
      ],
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
.letter-load {}

.salutation {
  font-size: 18px;
}


</style>
