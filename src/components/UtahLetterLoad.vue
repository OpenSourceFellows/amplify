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
          <p class="text-left">
            I am writing to urge your immediate action to take a precautionary
            pause on uranium mining operations near White Mesa, Utah and conduct
            an environmental impact assessment review. These activities threaten
            the environment, public health, and cultural heritage of the region.
            Further, we believe the mining activities and related processing
            have a measurable economic impact on the State’s budget in
            connection with climate disaster mitigation. Moreover, the
            activities at the mine and related impacts may conflict with
            existing Utah statutes that are designed to safeguard community
            health and the environment.
          </p>

          <p class="text-left">1. Environmental Threats and Legal Context:</p>

          <p class="text-left">
            Uranium mining poses significant risks to groundwater, surface
            water, and air quality in the White Mesa area. Specifically, these
            activities may violate Utah Code Title 19, Chapter 5, the “Utah
            Water Quality Act,” which mandates the protection of water resources
            from pollution. Moreover, Utah Code Title 19, Chapter 2, the “Utah
            Air Conservation Act,” stipulates that the state must control and
            reduce air pollution. Uranium mining generates radioactive dust and
            emissions that can degrade air quality, posing health risks to
            nearby residents and ecosystems.
          </p>

          <p class="text-left">2. Public Health Risks:</p>

          <p class="text-left">
            Utah Code Title 19, Chapter 3, the “Radiation Control Act,”
            specifically addresses the regulation of radiation sources to
            protect public health. Radioactive material is being sent to White
            Mesa from around the world. The radioactive and toxic byproducts of
            uranium mining have well-documented adverse health impacts,
            including an increased risk of cancer, respiratory diseases, and
            other chronic health conditions.
          </p>

          <p class="text-left">3. Cultural and Historical Significance:</p>
          <p class="text-left">
            White Mesa holds cultural, historical, and spiritual importance for
            the Ute Mountain Ute Tribe and other Indigenous communities. These
            lands are more than just resources—they are sacred. Utah Code Title
            9, Chapter 8, the “Protection of Cultural Sites Act,” underscores
            the state’s obligation to preserve sites of historical and cultural
            value.
          </p>
          <p class="text-left">
            4. Economic and Long-Term Environmental Considerations:
          </p>
          <p class="text-left">
            While mining may provide short-term economic gains, the long-term
            costs associated with environmental degradation, public health
            impacts, and the loss of cultural sites far outweigh these benefits.
            As outlined in Utah Code Title 63M, Chapter 4, the “Energy Policy
            Act,” the state’s energy strategy emphasizes the importance of
            balancing energy development with environmental stewardship. For
            example Conservation efforts for the Yellow-Billed Cuckoo help
            maintain riparian ecosystems, which are essential for regulating
            water flow and preventing flood damage to save between 10-30 million
            dollars. Or healthy sagebrush ecosystems are less prone to frequent,
            intense wildfires that are exacerbated by invasive species like
            cheatgrass which we spend on $50-100 million a year.
          </p>
          <p class="text-left">Conclusion:</p>
          <p class="text-left">
            Given the potential legal conflicts with existing Utah environmental
            statutes and the profound risks to public health and cultural
            heritage, I respectfully urge you to introduce or support
            legislation that puts a precautionary pause on uranium mining in
            White Mesa. Thank you for considering this urgent request. I look
            forward to your response and hope that you will act to safeguard
            White Mesa from further harm.
          </p>
          <p class="text-left">Sincerely,</p>

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
