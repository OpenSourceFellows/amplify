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
          <p class="text-left">
            Please accept these comments on the Draft Environmental Impact Statement for the Central Valley Project (CVP) and State Water Project (SWP) Biological Opinion. For too long, these projects have diverted far too much water to Central Valley agriculture at a dire expense to the local watersheds, frontline communities, and struggling salmon populations. We cannot let this opportunity to rectify these harms be wasted by yet another default to this broken, and frankly racist, status quo.
            As you know, California's salmon and the communities that depend on them are facing an unprecedented crisis. Decades of operation under outdated BiOps and water laws have severely reduced salmon populations, leading to annual commercial fishing closures and the loss of access to this vital resource for many Native tribes. You have the chance now to rectify this. Unfortunately, though, the BOR’s Draft Environmental Impact Statement (DEIS) on the State and Federal water projects favors Alternative 2b, which relies heavily on vague, undefined, and generally ineffective Voluntary Agreements with California's largest water users and big ag. You can - and must - do better if our salmon are to have even a chance of recovery.
            Tribal outreach and engagement on an issue so central to these cultures has been paltry and even non-existent, especially with Tribes and marginalized communities in the Central Valley. This is in direct opposition to the Racial Equity Action plan approved by the State Water Board in 2023 and the Bureau's Tribal Trust Responsibilities. Furthermore, the DEIS only focuses on the Klamath and Trinity River for Tribal Beneficial Uses (TBUs), when there are many more Tribes in the large expanse of the Central Valley that will be negatively affected by these projects.
            As many Tribal citizens, Intertribal organizations, and sportfishing community members have stated at virtual meetings and in-person hearings in Redding and Sacramento the past few weeks, Alternative 3 (Modified Natural Hydrograph), which protects fisheries and increases instream flows into the Delta, is the only alternative that meets the purpose and need of the BO. Currently the BOR prefers Alternative 2b. It is not a good alternative for the salmon and other native fish that are on the brink of extinction, and it is not legally defensible. It is also not a viable alternative for the Native people who depend on salmon for ceremony and sustenance, or the sportfishing community that depend on them for their livelihood. 
          </p>

          <p class="text-left">
            Alternative 2b is also not economically feasible nor considerate of climate change and water supply issues. There is a higher solvency and return on investment of climate resilience with Alternative 3. Given both the Biden administration’s and Gov. Newsom's commitment to engaging Tribes - this would be a great opportunity to work with all communities across the North Delta, Sacramento River, and their tributaries to support flows for fish and fish-dependent communities, protect and restore Tribal Beneficial Uses, and support climate resiliency. Instead, the decisionmakers are leaning towards once again propping up unsustainable industrial agricultural profits at the expense of all other stakeholders.
          </p>

          <p class="text-left">
            Choosing Alternative 3 is critically important, as the Trump era Biological Opinion and Operations and use of Temporary Urgency Petitions have left salmon, and other species, on the brink of extinction and led to massive economic harm to coastal, salmon fishing, and recreational communities and industries. This industry-first management approach also threatens our rivers, drinking water supplies, and frontline communities, including Tribes. The alternative chosen for the CVP and SWP doesn't only affect our human relatives, but also our fish, mammal and plant relatives that depend on increased flows, colder temperatures and less water diversions to survive.
            Furthermore, your analysis has not yet taken a hard look at the cumulative impacts of the related Sites Reservoir and Delta Conveyance Project (Delta Tunnel), whose operations further threaten salmon habitats and could lead to their extinction in the Bay Delta and Central Valley watersheds. It is imperative that the BiOps prioritize better protecting instream flows and lower water temperatures to ensure the survival of salmon and the well-being of communities that rely on them. I implore you to choose Alternative 3 in the Long-term Operations of the State Water and Central Valley Projects. Thank you for your time and consideration.
          </p>
        </v-card-text>

        <v-card-text>
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
      mergeVariablesEnabled: false,
      isSubmitted: true,
      communityInput: '<fill in the input below>',
      community: [
        'Local fisherman', 
        'Concerned constituent', 
        'Member of Hoopa Tribe'
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
