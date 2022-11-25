<template>
  <div class="d-flex flex-column align-center blurb">
    <div>
      <img
        src="@/assets/images/sogorea-te-8.png"
        alt="supplemental image one"
        class="mx-2 my-4 supplemental-img"
      />
      <img
        src="@/assets/images/sogorea-te-7.png"
        alt="supplemental image two"
        class="mx-2 my-4 supplemental-img"
      />
      <img
        src="@/assets/images/sogorea-te-3.jpg"
        alt="supplemental image three"
        class="mx-2 my-4 supplemental-img"
      />
    </div>
    <div class="px-6 text-content">
      <p>
        Sogorea Te' calls on us all to heal and to do the work our ancestors and
        future generations are calling us to do. The West Berkeley Shellmound
        sacred site is more at risk than ever now that the property owner, a
        commercial real estate developer, holds an SB-35 permit and has taken
        additional steps towards development on the property.
      </p>

      <p>
        While the Shellmound hasn't been making headlines over the past year
        since the California Supreme Court denied our appeal, forcing Berkeley
        to issue a development permit, work has continued steadily to advocate
        for the sacred Ohlone heritage site.
      </p>

      <p>
        Small Ohlone ceremonies and semi-public gatherings have been regularly
        held at the Shellmound, and a constant stream of messages of support,
        prayer ribbons and other offerings from community members have been
        affixed to the chain link fence surrounding the land. Conversations
        between local organizations, community leaders and elected officials are
        ongoing, regarding the fate of the Shellmound and what can be done.
      </p>

      <p>
        While there are various paths forward to achieving protection of the
        land, continued support from Berkeley City Councilmembers is critical at
        this moment. If you live in Berkeley, or elsewhere in the Bay Area, we
        ask that you please consider writing an email to, or otherwise reaching
        out to Berkeley Councilmembers (especially the representative of your
        district, if you live in Berkeley).
      </p>
    </div>

    <div class="amplify-banner">
      <img
        src="@/assets/images/amplify-web-3.png"
        alt="how amplify works"
        class="banner-img"
      />
    </div>

    <v-btn elevated class="my-4 action-btn">
      Write Your Representatives Now
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'CampaignBlurb'
}
</script>

<style lang="less" scoped>
@import '@/styles/sogorea-te.less';
.blurb {
  background-color: @st-green;
}
.text-content {
  width: 100%;
}

.supplemental-img {
  max-width: 350px;
  height: 225px;
}

.amplify-banner {
  background-color: @amp-blue;
  padding: 1rem;
}

.banner-img {
  max-width: 100%;
}

.action-btn {
  background-color: @amp-orange !important;
  color: #000 !important;
  font-size: 18px !important;
  font-weight: bold;
  text-transform: none !important;
  padding: 2rem !important;
}

@media screen and (min-width: 700px) {
  .text-content {
    width: 65%;
  }
}
</style>
