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
            Hello,
          </p>
          <p class="text-left">
            Hello,	We,	the	undersigned	members	of	the	Hualapai	Nation	and	allies,	respectfully	request
            an	urgent	meeting	with	representatives	of	the	Navajo	Nation	to	discuss	our	grave	concerns
            regarding	the	ongoing	drilling	activities	in	Sandy	Valley,	northern	Arizona.
          </p>
          <p class="text-left">
            From the Hualapai Nation Perspective:
          </p>
          <p class="text-left">
            Ha'Kamwe'	is	part	of	the	ancient	Salt	Song	Trail	and	features	prominently	in	tribal
            songs	and	stories	about	the	Hualapai	peopleâ€™s	history,	traditions,	and	deep	connection
            to	the	natural	world.	The	ongoing	drilling	threatens	to	irrevocably	damage	this	sacred	land
            for	how	the	Hualapai	and	other	tribes	have	used	the	spring	for	centuries	for	healing,
            prayer,	and	rites	of	passage,	including	childbirth	and	coming-of-age	ceremonies	for	young
            women.
          </p>
          <p class="text-left">
            We	are	particularly	concerned	about	the	potential	impacts	of	drilling	on	the	region's	water
            resources,	air	quality,	and	wildlife	habitats.	the	drilling	will	irreversibly	damage	the
            spiritual	integrity	of	the	area,	causing	trauma	to	the	land,	that	will	impact	the	connection
            and	experience	people/tribal	members	have	with	the	area	and	our	animal	relatives.
            Importantly	a	threatened	species	of	desert	tortoise's	burrowing	and	foraging	grounds
            are	being	destroyed	in	the	area.	The	drilling	further	endangers	the	ecology	of	the	saguaro
            cactus	whose	roots	are	easily	damaged	and	are	a	keystone	plant	for	birds	and	insects	in	the
            region.
          </p>
          <p class="text-left">
            Call for Collaboration and Respect:
          </p>
          <p class="text-left">
            We	appeal	to	the	shared	values	of	environmental	stewardship	and	respect	for	Indigenous
            knowledge	that	both	the	Hualapai	and	Navajo	Nations	hold	dear.	We	believe	that	by
            working	together,	we	can	find	solutions	that	honor	the	cultural	heritage	of	both	our	peoples
            while	ensuring	sustainable	economic	development.	I	urge	you	to	take	immediate	action	to
            withdraw	NTEC	from	partnership	with	Arizona	Lithium.
          </p>
          <p class="text-left">
            We	recognize	and	respect	the	Navajo	Nation's	sovereignty	and	economic	interests,	as	well
            as	NTEC's	role	in	contributing	to	the	Navajo	economy.	However,	we	firmly	believe	that
            responsible	resource	development	must	prioritize	the	protection	of	Indigenous	lands,
            cultures,	and	communities
          </p>
          <p class="text-left">
            We	believe	that	by	working	together,	we	can	find	solutions	that	honor	the	cultural	heritage
            of	both	our	peoples	while	ensuring	sustainable	economic	development.
          </p>
          <p class="text-left">
            On	August	22,	a	federal	judge	granted	a	temporary	restraining	order	to	pause	drilling
            activities	until	a	court	hearing	scheduled	for	September	17.	The	Hualapai	Tribe	is	seeking	a
            preliminary	injunction	to	pause	all	drilling	activities	in	Sandy	Valley	until	the	case	with	the
            BLM	is	settled	and	meaningful	consultation	with	the	Hualapai	Nation	can	take	place.	
            We	await	your	prompt	response	and	look	forward	to	scheduling	a	meeting	at	your	earliest
            convenience.          
          </p>
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
