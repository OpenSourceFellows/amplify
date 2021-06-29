<template lang="html">
    <section class="letter-load">
        <v-card>
            <v-card-title>{{ repName }}</v-card-title>
            <v-card-text>
                {{ letterBody }}
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
    props: {
        repName: String,
        letterBody: String
        },
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
