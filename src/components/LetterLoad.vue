<template>
  <section class="letter-load">
    <v-card flat>
      <div v-show="isSubmitted">
        <v-card-text>
          <v-select
            v-for="[key, entry] of Object.entries(mergeVariables)"
            :key="key"
            v-model="userSelections[key]"
            :items="entry.choices"
            :label="entry.label"
          />
          <br />
        </v-card-text>

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
          <div>
            <span v-html="letterBody" />
          </div>
        </v-card-subtitle>
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
import axios from 'axios'

// These fields will not show up as dropdowns for the user
// to modify.
const UNEDITABLE_FIELDS = ['representativeName', 'firstName', 'lastName', 'name', 'fullName']

export default {
  name: 'LetterLoad',
  components: {
    /* AuthNav */
  },
  props: {
    // letterBody: { type: String, default: '' }
  },
  data() {
    return {
      isSubmitted: true,
      userSelections: {},
      letterBody: 'placeholder'
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
    },
    letterTemplate() {
      return this.$store.state.letterTemplate
    },
    mergeVariables() {
      return Object.fromEntries(
        Object.entries(this.letterTemplate.mergeVariables).filter(([key]) => !UNEDITABLE_FIELDS.includes(key))
      )
    }
  },
  watch: {
    userSelections: {
      handler: function () {
        this.$store.commit('setGenericValue', {
          key: 'mergeVariables',
          value: this.userSelections
        })

        this.renderLetter()
      },
      deep: true
    },
    selectedRep: {
      handler: function() {
        this.renderLetter()
      },
      deep: true
    }
  },
  created() {
    for(let key of Object.keys(this.letterTemplate.mergeVariables)) {
      this.$set(this.userSelections, key, '<your answer here>')
    }

    this.userSelections.representativeName = this.selectedRep.name

    this.letterBody = this.letterTemplate.html

    // First Letter Render to set user's name
    this.renderLetter()
  },
  methods: {
    renderLetter() {
      axios.post('/api/v1/letter_templates/render', { mergeVariables: { ...this.userSelections, representativeName: this.selectedRep.name, name: this.user.name }, templateId: this.letterTemplate.id })
        .then((res) => {
          this.letterBody = res.data.letter
        })
    }
  },
}
</script>

<style scoped lang="less">
.letter-load {
}

.salutation {
  font-size: 18px;
}
</style>
