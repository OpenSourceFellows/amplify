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
          <div>{{ selectedRep.address_line2 }}</div>
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
          Dear Acting Secretary Reese:
        </v-card-title>

        <v-card-text class="text-left">
          <p class="text-left">
            I understand that the Federal Energy Regulatory Commission (FERC)
            has received a Notice of Intent and Pre-Application Document from
            Southeast Oklahoma Power Corporation (SEOPC) for a proposed pumped
            storage facility in Pushmataha County, Oklahoma, and is seeking
            scoping comments.
          </p>

          <p class="text-left">
            I oppose this project as it would adversely affect the Kiamichi and
            Little River Basin. I have includedstudy requests in this letter.
          </p>

          <p class="text-left">
            Pumped storage projects are not appropriate for an environmentally
            sensitive area like the Kiamichi River and are only suitable for
            developed nations if they are in an abandoned mine. The proposal for
            this project negatively affects the local economy, leading to lost
            tax revenue and is causing a mental health crisis. Using modern
            Battery Energy Storage Technology, a similar energy storage capacity
            can be achieved on 300-400 acres. Yet, the applicant plans to use
            eminent domain to acquire over 35,000 acres (current project area),
            as most landowners have already indicated they are unwilling to
            sell.
          </p>

          <p class="text-left">
            The prospective applicant has indicated that their facility is
            closed-loop; however, it does not meet FERC&rsquo;s criteria for a
            closed-loop facility. Details are included in this letter.
          </p>

          <p class="text-left">
            The prospective applicant has indicated they intend to divert water
            directly from the Kiamichi River via an intake 1.5 feet from the
            bottom of the riverbed. This is concerning as the region has
            recently seen increased tourism from visitors who want to spend time
            on the river and in the area.
          </p>

          <p class="text-left">
            Lake Hugo receives its water from the Kiamichi River, which flows
            downstream. The volume of water used to fill the impoundments has
            the potential to degrade the water flowing into the United States
            Army Corp of Engineers (USACE) reservoir, which serves as a
            residential public water supply.
          </p>

          <p class="text-left">
            The community and the State of Oklahoma are opposed to this project.
            The following government offices and officials have issued
            opposition letters. The Attorney General of the State of Oklahoma,
            Chief Gary Batton of the Choctaw Nation, Chickasaw Nation Governor
            Bill Anoatubby, US Congressman Josh Brecheen, State Senator Bullard,
            State Representative JJ Humphrey, State Senator Burns, The City of
            Antlers, The City of Hugo, The Town of Albion, Pushmataha County
            Board of Commissioners, Choctaw County Board of Commissioners,
            Oklahoma Department of Wildlife and Conservation, Choctaw Historic
            Preservation Office, Chickasaw Culture and Humanities Office, Rural
            Water District#2, and Rural Water District #3.
          </p>

          <p class="text-left">
            <br />
          </p>

          <p class="text-left">
            &ldquo;Leave it as it is . . . The ages have been at work on it, and
            man can only mar it.&rdquo;&nbsp;
          </p>

          <p class="text-left">
            <br />
          </p>

          <p class="text-left">-Our Beloved President Theodore Roosevelt</p>

          <p class="text-left">
            <br />
          </p>

          <p class="text-left">
            Proposed Facility Does Not Meet FERC&rsquo;s Criteria for
            Closed-Loop
          </p>

          <p class="text-left">
            The facility, as proposed, does not meet FERC&rsquo;s criteria to
            qualify as closed-loop. The application states the proposed project
            would operate as a closed-loop hydro-power pumped storage plant.
            This is inaccurate. According to the US Department of Interior
            letter dated 9/04/2024, the project does not meet the definition of
            closed-loop for several reasons, including because it is in a
            natural waterway and is likely to cause adverse impacts on
            endangered species. The proposed project cannot be considered a
            &ldquo;closed-loop&rdquo; because the facility will directly connect
            to the Kiamichi River during initial fill, during maintenance when
            the facility must be flushed, and to obtain water for evaporative
            losses.
          </p>

          <p class="text-left">C.F.R. &sect;7.1(a).</p>

          <p class="text-left">
            The regulations define &ldquo;qualifying criteria for closed-loop
            pumped storage projects&rdquo; as follows:
          </p>

          <p class="text-left">
            (i) Cause little to no change to existing surface and groundwater
            flows and uses;
          </p>

          <p class="text-left">
            (ii) Is unlikely to adversely affect species listed as a threatened
            species or endangered species, or designated critical habitat of
            such species, under the Endangered Species Actof 1973;
          </p>

          <p class="text-left">
            (iii) Utilize only reservoirs situated at locations other than
            natural waterways, lakes, wetlands, and other natural surface water
            features; and
          </p>

          <p class="text-left">
            (iv) Rely only on temporary withdrawals from surface waters or
            groundwater for the sole purposes of initial fill and periodic
            recharge needed for project operation.
          </p>

          <p class="text-left">18 C.F.R. &sect;7.1(c)(3).</p>

          <p class="text-left">
            The proposed pumped storage project does not meet criteria 2 and 3
            listed above. According to the US Department of Interior, the
            proposed facility is continuously connected to/uses a reservoir next
            to the Kiamichi River, and severely threatening endangered species.
            The prospective applicant is making misleading statements about the
            facility&apos;s true nature and associated environmental impacts.
          </p>

          <p class="text-left">
            I request the following studies be completed before the issuance of
            a license.
          </p>

          <p class="text-left">1) Water Resources</p>

          <p class="text-left">
            &bull; I request that the applicant perform a current state
            assessment of the actual available flow of the Kiamichi River at the
            proposed project site. The current water availability study uses a
            location 20 miles downstream from the project area and right after
            the dam that releases water from Sardis Lake into the Kiamichi
            River. Any studies regarding water availability should be taken on
            the proposed diversion site to ensure water availability.
          </p>

          <p class="text-left">
            &bull; I request that any hydrology studies account for risks
            associated with climate change over the expected license life of
            30-50 years. See United States Department of Interior Letter dated
            9/04/2024, &ldquo;Climate change effects on river flows and
            evaporative and seepage losses.&rdquo;
          </p>

          <p class="text-left">
            &bull; I request a survey of all groundwater wells within the
            Kiamichi River Basin and an evaluation of the proposed
            project&apos;s impacts on the availability of groundwater sources
            and wells.
          </p>

          <p class="text-left">
            &bull; Evaluate the impact of damming Long Creek on the Little River
            Basin Watershed.
          </p>

          <p class="text-left">
            &bull; Evaluate the Kiamichi River&apos;s minimum flow against the
            project&apos;s operational requirements, which indicate evaporative
            losses of 20,000 acre-feet.
          </p>

          <p class="text-left">
            &bull; Evaluate the water quality and quantity of the upper and
            lower reservoirs and streams upstreamand downstream from the project
            area.
          </p>

          <p class="text-left">
            <br />
          </p>

          <p class="text-left">
            &bull; Conduct studies consistent with the United States Department
            of Interior Letter dated 9/04/2024,
          </p>

          <p class="text-left">
            &ldquo;Conduct studies on water quality assessment and
            monitoring.&rdquo; See page 5.
          </p>

          <p class="text-left">
            &bull; Conduct studies consistent with the United States Department
            of Interior Letter dated 9/04/2024,
          </p>

          <p class="text-left">
            &ldquo;Needs for mitigation of Project effects on the Kiamichi River
            as a Water of the United States.&rdquo;
          </p>

          <p class="text-left">See page 6.</p>

          <p class="text-left">2) Aquatic Resources</p>

          <p class="text-left">
            &bull; Conduct a study on the effects of diverting 10-15% of the
            water from the Kiamichi River onendangered mussel species.
          </p>

          <p class="text-left">
            &bull; Conduct a study on water temperature changes to account for
            the diversion of 10-15% of the water flow from the Kiamichi River
            related to mussel mortality.
          </p>

          <p class="text-left">
            &bull; Conduct fish community surveys in the Kiamichi River, Long
            Creek, Little River, and tributaries to the Kiamichi and Little
            Rivers.
          </p>

          <p class="text-left">
            &bull; Conduct freshwater mussel surveys in the Kiamichi River,
            Little River, and Long Creek upstream and downstream from the
            proposed project site.
          </p>

          <p class="text-left">
            &bull; Conduct field surveys to determine fish populations in the
            Kiamichi River, which will later be used in fish entrainment and
            impingement studies.
          </p>

          <p class="text-left">
            &bull; Conduct a Fish Entrainment, Impingement, and Survival
            Study&mdash;conduct field studies to determine the impact of
            entrainment and mortality for fish species in the Kiamichi River.
          </p>

          <p class="text-left">
            &bull; Conduct a study to determine the minimum flow of Long Creek
            past the dam location.
          </p>

          <p class="text-left">
            &bull; Conduct a study on the Little River&apos;s mussel population
            to determine its current state. This will be critical in determining
            the project&apos;s impacts on Long Creek&apos;s damming.
          </p>

          <p class="text-left">
            &bull; Conduct a study to determine the impact of reservoirs or
            impoundment ponds lined with a material to prevent seepage into or
            from the aquifer.
          </p>

          <p class="text-left">
            &bull; Develop a management plan for hazardous materials during
            construction (e.g., fuel) to preventcontamination of water resources
            in the watershed.
          </p>

          <p class="text-left">
            &bull; Conduct quality monitoring, including salinity, to be
            established in the reservoirs afterconstruction and on any
            discharges into the Kiamichi River and its watershed.
          </p>

          <p class="text-left">
            &bull; Conduct a study to determine the impact of algaecides and
            biocides used in the reservoirs or pumping mechanisms.
          </p>

          <p class="text-left">
            &bull; Conduct a study to determine whether measures will be in
            place to prevent avian and aquatic interactions with both reservoirs
            and the impoundment pond.
          </p>

          <p class="text-left">
            &bull; Conduct a study to determine the impact of corrosion
            inhibitors, lubricants, or potentiallycarcinogenetic chemicals being
            added to the water at any time during the life of this project.
          </p>

          <p class="text-left">
            &bull; Create a management plan, including methodology and gages,
            for monitoring diversions during the initial fill and each year
            thereafter.
          </p>

          <p class="text-left">
            &bull; Create a management plan for flooding events. Once initial
            fill is achieved, how will flooding events be addressed to prevent
            excess water consumption into the system?
          </p>

          <p class="text-left">
            &bull; Create a management plan for discharges in the upper
            reservoir and determine whether those discharges are considered
            in-basin or out-of-basin discharges from the Kiamichi River Basin to
            the Little River Basin.
          </p>

          <p class="text-left">3) Scope of the Project Area</p>

          <p class="text-left">
            &bull; I request that the study area be modified to include the
            Little River Basin. The proposed applicant intends to dam the
            headwaters of Long Creek, which flows into the Little River Basin.
            The impacts on the Little River and the Little River Basin should be
            studied as part of this project to determine the effects on aquatic
            life.
          </p>

          <p class="text-left">
            <br />
          </p>

          <p class="text-left">
            &bull; I request that the study area be modified to include the
            entire Kiamichi River basin and its impacts on aquatic life and
            other species.
          </p>

          <p class="text-left">
            &bull; I request that the study area be modified to include the Red
            River Basin. The water flow from the Kiamichi River will decrease by
            10-15% during construction (per the applicant) and, in the long
            term, will be reduced to accommodate evaporative losses. The
            Kiamichi River flows into the Red River. Conduct a study to
            determine the impacts on the Red River Basin and associated
            groundwater wells. This is especially true as the region has seen
            increased droughts and days over 100 degrees Fahrenheit, leading to
            higher evaporative losses.
          </p>

          <p class="text-left">4) Geologic and Soil Resources</p>

          <p class="text-left">
            &bull; Conduct studies on the effect of project construction and
            operation on the geomorphology of the Kiamichi River (see United
            States Department of Interior letter dated 9/04/2024).
          </p>

          <p class="text-left">
            &bull; Conduct studies that address the effects on geologic and soil
            resources and define the baseline soil erosion and stream conditions
            in the Kiamichi River, Little River, and Long Creek.
          </p>

          <p class="text-left">
            &bull; Perform geotechnical analysis to determine the composition of
            project area soil and rock layers to depths equal to or greater than
            those required to excavate the lower reservoir.
          </p>

          <p class="text-left">
            &bull; Perform geotechnical analysis on mountains into which tunnels
            are expected to be bored to determine the effects of boring said
            tunnels and the composition of materials expected to be removed
            during the boring of said tunnels.
          </p>

          <p class="text-left">
            &bull; Conduct studies that address the effects on geologic and soil
            resources will be performed, and baseline soil erosion and stream
            conditions in the Kiamichi River, Little River, and Long Creek will
            be defined.
          </p>

          <p class="text-left">
            &bull; Perform geotechnical analysis to determine the composition of
            project area soil and rock layers to depths equal to or greater than
            those required to excavate the lower reservoir.
          </p>

          <p class="text-left">
            &bull; Perform geotechnical analysis on mountains into which tunnels
            are expected to be bored to determine the effects of boring said
            tunnels and the composition of materials expected to be removed
            during the boring of said tunnels.
          </p>

          <p class="text-left">
            &bull; Conduct studies to determine the potential impacts to flow
            and their magnitude from subsurface seepage through the surrounding
            alluvium aquifer in the Kiamichi River Basin due to digging the
            impoundment pond and lower reservoir through and below the alluvium.
          </p>

          <p class="text-left">
            &bull; Create a management plan regarding subsurface seepage. If any
            impacts occur, how will they be mitigated to prevent unpermitted
            subsurface flow, surface water quality, and water quantity issues?
          </p>

          <p class="text-left">
            &bull; Conduct a study to determine how erosion from the edge of the
            Kiamichi River channel to the impoundment pond will be mitigated.
            Create a continuous monitoring plan that will be monitored during
            the project&apos;s life, 30, 40, or 50 years into the future.
          </p>

          <p class="text-left">
            &bull; Conduct a study to determine where the spoil/debris will go
            from excavating the impoundment pond. Determine the impact of water
            quality or surrounding terrestrial habitats. If so, how will that be
            avoided, minimized, or mitigated?
          </p>

          <p class="text-left">
            &bull; Create a management plan for stormwater runoff during initial
            construction.
          </p>

          <p class="text-left">5) Mental Health</p>

          <p class="text-left">
            &bull; Study the mental health implications of this project on
            impacted landowners and the surrounding community.
          </p>

          <p class="text-left">
            &bull; Create a study plan to address the mental health concerns of
            the community and those within the project area.
          </p>

          <p class="text-left">
            <br />
          </p>

          <p class="text-left">
            &bull; Create a plan to compensate people seeking mental health
            treatment for issues related to this project.
          </p>

          <p class="text-left">
            6) Terrestrial Wildlife and Botanical Resources
          </p>

          <p class="text-left">
            &bull; Conduct studies to characterize terrestrial wildlife,
            botanical resources, and associated habitat.
          </p>

          <p class="text-left">
            &bull; Develop ground- maps of vegetation cover classes and land use
            in the study area, including assessments of habitat structure and
            conditions characterizing habitat types.
          </p>

          <p class="text-left">
            &bull; Observe and record biological inventory during the habitat
            assessment, including a running list of encountered wildlife,
            wildlife spores, and dominant vegetative species.
          </p>

          <p class="text-left">
            &bull; Create a management plan defining BMPs to minimize
            disturbances to the existing vegetation during construction and
            promptly revegetate the area to control erosion and protect
            terrestrial wildlife habitat.
          </p>

          <p class="text-left">
            &bull; Create annual and seasonal management plans to protect and
            prevent the extermination of federal endangered species in the
            project area.
          </p>

          <p class="text-left">
            &bull; Conduct a preconstruction survey to identify specific
            locations of endangered species within the project area.
          </p>

          <p class="text-left">
            &bull; Conduct a study of migratory waterfowl that would utilize the
            waters in the project area. Create a management plan with steps to
            protect these avian populations during the operation.
          </p>

          <p class="text-left">
            &bull; Create a management plan to protect terrestrial wildlife and
            people from accessing areas near the project area before, during,
            and after construction.
          </p>

          <p class="text-left">
            &bull; Create a management plan for monitoring access to the site.
          </p>

          <p class="text-left">
            &bull; Create a management plan regarding fencing and subsequent
            signage on the reservoirs, denoting their use and indicating that
            fishing, swimming, or other recreational activities are prohibited
            on the reservoirs and the site.
          </p>

          <p class="text-left">
            &bull; Determine the impact of fencing on species.
          </p>

          <p class="text-left">
            &bull; Conduct studies consistent with the United States Department
            of Interior Letter dated 9/04/2024,
          </p>

          <p class="text-left">
            &ldquo;Acoustic surveys for bats in the project area.&rdquo; See
            page 6-7
          </p>

          <p class="text-left">
            &bull; Conduct studies consistent with the United States Department
            of Interior Letter dated 9/04/2024,
          </p>

          <p class="text-left">
            &ldquo;American burying beetle (ABB) surveys.&rdquo; See page 7
          </p>

          <p class="text-left">7) Wetlands, Riparian, and Littoral Resources</p>

          <p class="text-left">
            &bull; Delineate wetlands and streams and assess the nature and
            degree of the project&rsquo;s potential effects on areas subject to
            Section 404 of the Clean Water Act.
          </p>

          <p class="text-left">8) Review of Alternatives</p>

          <p class="text-left">
            &bull; With the advances in BESS (battery energy storage systems), a
            similar energy storage capacitycould be achieved on 400 acres or
            less within 2-3 years, including approvals. Furthermore, pumped
            storage is only 70-80% efficient at storing electricity and will be
            a net drain on our power grid. BESS is over 90% efficient at storing
            electricity and can be co-located with existing wind and solar
            infrastructure. A prudent energy strategy would disperse energy
            storage across the grid, not place it over 120 miles from any
            metropolitan area. It would not require eminent domain, as BESS can
            be located adjacent to existing transmission lines and closer to
            energy demands and generation. We understand evaluating alternatives
            is a necessary step in this process, and it will be performed before
            any license is issued. We request that the Commission conduct a
            thorough and complete review of alternatives.
          </p>

          <p class="text-left">
            &bull; We request that the Commission review available abandoned
            mines to determine whether they may be used to construct a pumped
            storage facility. Scientists have located several mines near the
            Dallas Fort Worth (&ldquo;DFW&rdquo;) metro area that could serve as
            locations for such facilities.
          </p>

          <p class="text-left">
            <br />
          </p>

          <p class="text-left">
            &bull; We request that the Commission perform a no-action
            alternative given the significant impacts on threatened and
            endangered species within the project boundary.
          </p>

          <p class="text-left">
            9) Recreation, Land Use, and Aesthetic Resources
          </p>

          <p class="text-left">
            &bull; Conduct an inventory and assessment of existing recreation
            facilities in the study area and analyze the potential effects of
            project operation on existing recreation facilities in the study
            area.
          </p>

          <p class="text-left">
            &bull; Evaluate land use, including reviewing existing land
            management plans and ordinances related to project construction and
            operation and evaluating land use effects associated with
            construction, operation, and maintenance.
          </p>

          <p class="text-left">
            &bull; Conduct an aesthetics inventory, photograph key viewing
            locations, develop a photo simulation of proposed project
            facilities, and conduct a viewshed and visual resource assessment.
          </p>

          <p class="text-left">10) Cultural and Tribal Resources</p>

          <p class="text-left">
            &bull; Create an updated survey of all archeological sites within
            the project area. The current surveys are outdated, and thus a new
            survey should be completed by the applicant as part of the licensing
            process.
          </p>

          <p class="text-left">
            &bull; Conduct a study that includes (1) identifying the area of
            potential effects (APE) in consultation with the state historic
            preservation officer (SHPO) and the tribes and additional literature
            searches to identify historic structures and archaeological sites.
          </p>

          <p class="text-left">
            &bull; Consult with the SHPO and appropriate tribes to perform field
            studies of impacted historical and tribal sites.
          </p>

          <p class="text-left">
            &bull; Conduct a cultural resources inventory/study to determine the
            potential effects of projectconstruction, operation, and maintenance
            on archeological resources and historic structures included in, or
            eligible for listing on, the National Register of Historic Places.
          </p>

          <p class="text-left">
            &bull; Conduct in-person and on-site archaeological assessment and
            coordination with the Choctaw Nation of Oklahoma before excavation
            and construction to identify culturally significant artifacts,
            plants, or historic sites.
          </p>

          <p class="text-left">11) Socioeconomic Resources</p>

          <p class="text-left">
            &bull; Conduct a socioeconomic study that examines the short-term
            and long-term economic effects on the project vicinity within 50
            miles.
          </p>

          <p class="text-left">
            &bull; Conduct an environmental justice study to define the
            potential effects of project construction and operation on
            environmental justice communities that may be present in the study
            area.
          </p>

          <p class="text-left">
            &bull; Conduct a study to determine how many local permanent
            employees will be retained at the facility after completion.
          </p>

          <p class="text-left">
            &bull; Conduct a study to determine how impacted landowners will be
            compensated.
          </p>

          <p class="text-left">12) Noise, Air Quality and Traffic</p>

          <p class="text-left">
            &bull; Conduct a noise study to assess the effects of construction
            and operations on noise levels in the project area.
          </p>

          <p class="text-left">
            &bull; Conduct an air quality study to assess the effects of
            construction activities, includingconstruction-related dust, vehicle
            exhaust, and blasting and boring of holes and resources, on the air
            quality within 50 miles of the project site.
          </p>

          <p class="text-left">
            &bull; Conduct a traffic study to assess the effects of construction
            traffic and road networks in the project area and determine whether
            machinery can make it to the location given Oklahoma&rsquo;s highway
            system. Consult with the Department of Transportation and county
            commissioners regarding this study.
          </p>

          <p class="text-left">
            <br />
          </p>

          <p class="text-left">
            &bull; Conduct a traffic study of post-construction traffic in the
            project vicinity.
          </p>

          <p class="text-left">
            I oppose this proposed project and encourage the Commission to
            cancel it, considering the substantial community opposition, lack of
            public benefit, and significant environmental impacts.
          </p>

          <p class="text-left">Respectfully submitted,</p>

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
