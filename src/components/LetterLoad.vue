<template lang="html">
    <section class="letter-load">
        <v-card>
            <v-card-title>{{ repName }}</v-card-title>
            <v-card-text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut in
                lectus sit amet mauris tincidunt commodo. Quisque rhoncus dui
                viverra augue pellentesque tincidunt. Mauris pellentesque sapien
                vel metus vulputate facilisis vitae eu nunc. Donec ullamcorper
                viverra quam, vitae hendrerit mi aliquet ut. Cras vestibulum,
                ligula sed accumsan mollis, elit lorem interdum magna, id tempus
                massa ante id ipsum. Quisque eget nibh dignissim turpis
                tincidunt laoreet. Etiam scelerisque, urna vitae elementum
                dapibus, nulla ante tincidunt nibh, vel imperdiet elit nisl sit
                amet nisl. Phasellus id viverra nunc, a suscipit quam.
                Suspendisse et convallis urna. In ipsum augue, gravida sagittis
                tincidunt sit amet, scelerisque id enim. In finibus sapien eu
                finibus rutrum. Praesent mollis lectus vel rutrum fermentum. Nam
                quam tortor, tempus dignissim mollis et, ultrices quis diam.
                Phasellus bibendum est vitae ipsum vulputate ornare. Praesent
                pretium sem quis ipsum accumsan, nec dapibus ligula pretium.
                Phasellus felis mi, tristique vel facilisis fringilla, porta id
                felis. Mauris pulvinar ut libero et lacinia. Nulla et viverra
                est. Ut blandit tristique est, nec volutpat magna sodales non.
                Suspendisse a porttitor eros.
            </v-card-text>
            <v-card-actions>
                <v-btn text color="primary"> Send Letter </v-btn>
            </v-card-actions>
        </v-card>
    </section>
</template>

<script lang="js">

  export default  {
    name: 'letter-load',
    props: {repName: String},
    mounted () {

    },
    data () {
      return {

      }
    },
    methods: {

    },
    computed: {

    }
}
</script>

<style scoped lang="less">
.letter-load {
}
</style>
