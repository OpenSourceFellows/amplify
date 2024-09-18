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

        <v-card-text class="text-left">
          <p class="text-left">Hello,</p>
          <p class="text-left"> am an Arizona constituent writing in to discuss my grave concerns regarding the ongoing drilling activities in Sandy Valley, northern Arizona.</p>
          <p class="text-left"><strong>1. Threats to Hualapai Cultural Heritage and Religious Freedoms</strong></p>
          <p class="text-left">The mining exploration, authorized by the Bureau of Land Management (BLM), directly impacts Ha’Kamwe’ (Cofer Hot Spring), a sacred site that holds profound spiritual significance for the Hualapai Tribe and other Indigenous communities.</p>
          <ul>
            <li><strong>Religious Freedom Restoration Act (42 U.S.C. § 2000bb et seq.):</strong> The ongoing drilling undermines how the Hualapai and other tribes have used the spring for centuries for healing, prayer, and rites of passage, including childbirth and coming-of-age ceremonies for young women. Ha’Kamwe’ is integral to the spiritual practices of the Hualapai people.</li>
            <li><strong>National Historic Preservation Act (54 U.S.C. § 300101 et seq.):</strong> Ha’Kamwe’ is part of the ancient Salt Song Trail and features prominently in tribal songs and stories about the Hualapai people’s history and connection to their land. BLM’s approval of exploratory drilling without fully considering the cultural importance of Ha’Kamwe’ disregards this statute and disrespects the rights of the Hualapai Tribe.</li>
          </ul>
          <br>
          <p class="text-left"><strong>2. Environmental Violations and the Rights of Nature</strong></p>
          <p class="text-left">The drilling project threatens to cause irreversible damage to the local ecosystem, including the depletion of water sources that sustain Ha’Kamwe’. The proposed 131 exploration holes, reaching depths of up to 360 feet, could alter the temperature and flow of the aquifer feeding the spring, endangering the surrounding plants and wildlife.</p>
          <ul>
            <li><strong>Clean Water Act (33 U.S.C. § 1251 et seq.)</strong> The drilling activities risk contaminating the aquifer, which could lead to ecological degradation, violating federal regulations designed to protect water quality.</li>
            <li><strong>Rights of Nature Doctrine:</strong> The concept of the Rights of Nature recognizes natural entities, such as springs, as rights-bearing entities with the right to exist, thrive, and regenerate. The drilling endangers Ha’Kamwe’, infringing on its right to exist and maintain its natural state.</li>
          </ul>
          <br>
          <p><strong>Call for Collaboration and Respect:</strong></p>
          <p class="text-left">We request a precautionary pause as an injunction on all drilling activities in Sandy Valley until a thorough assessment of the environmental and cultural impacts can be conducted, and meaningful consultation with the Hualapai Nation can take place.</p>
          <p class="text-left">We await your prompt response and look forward to scheduling a meeting at your earliest convenience.</p>
          <p class="text-left">
            Sincerely,
          </p>

          <p>{{ user.name }}</p>
        </v-card-text>

        <v-card-text v-if="mergeVariablesEnabled">
          <v-select
            v-model="communityInput"
            :items="community"
            label="Your Community"
          />
          <v-select
            v-model="impactReasonInput"
            :items="impactReason"
            label="How this Legislation Impacts You"
          />
        </v-card-text>
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
// import { mapState } from 'vuex';

export default {
  name: 'TuolumneLetterLoad',
  components: {
    /* AuthNav */
  },
  props: {
    letterBody: { type: String, default: '' }
  },
  data() {
    return {
      isSubmitted: true,
      communityInput: '<fill in the input below>',
      community: [
        'Local fisherman',
        'Concerned constituent',
        'Tribal member and/or Indigenous person'
      ],
      impactReasonInput: '<fill in the input below>',
      impactReason: [
        'This impacts my livelihood, I\'ll have to invest in new fishing equipment, fire workers, change industry, or move locations',
        'The water will become lower and lower the number of fish impacting our traditional food ways',
        'This would affect my water and food bills',
        'My farm will have to front the costs of less water and ground resources'
      ]
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
    mergeVariables() {
      return { community: this.communityInput, impactReason: this.impactReasonInput }
    },
    mergeVariablesEnabled() {
      const keys = Object.keys(this.$store.state.mergeVariables)
      return keys.count > 1
    }
  },
  watch: {
    mergeVariables: function() {
      this.$store.commit('setGenericValue', { key: 'mergeVariables', value: this.mergeVariables })
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
