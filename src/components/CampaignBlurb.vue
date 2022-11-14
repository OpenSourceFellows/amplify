<template>
  <div class="d-flex flex-column align-center blurb">
    <div>
      <img
        src="@/assets/images/sogorea-te-1.jpg"
        alt="supplemental image one"
        class="mx-2 my-4 supplemental-img"
      />
      <img
        src="@/assets/images/sogorea-te-2.jpg"
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
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam aliquid,
        alias cumque, maiores suscipit minima ipsa voluptatibus doloribus
        adipisci voluptatum fuga nam molestiae nulla ipsam est, porro numquam
        sint similique.
      </p>

      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam aliquid,
        alias cumque, maiores suscipit minima ipsa voluptatibus doloribus
        adipisci voluptatum fuga nam molestiae nulla ipsam est, porro numquam
        sint similique.
      </p>
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
  width: 350px;
  height: 225px;
}

.action-btn {
  background-color: @st-red !important;
  color: #fff !important;
  font-size: 16px !important;
  text-transform: none !important;
}

@media screen and (min-width: 700px) {
  .text-content {
    width: 65%;
  }
}
</style>
