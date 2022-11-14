<template lang="html">
  <section class="action-complete">
    <h1>action-complete Component</h1>
    <h1>
      Thank you {{ data.email }} for your ${{ data.amount * 0.01 }} donation!
    </h1>
  </section>
</template>

<script lang="js">
import axios from 'axios'
export default {
    name: 'ActionComplete',
    props: [],
    data () {
        return {
          data: {
            email: null,
            amount: null
                }
        }
    },
    computed: {
    },
    mounted () {
        this.amount = this.getSession()
    },
    methods: {
        getSession() {
            const session_id = {'session_id': this.$route.query.session_id }
            axios.post( '/api/checkout/create-transaction', session_id )
                .then((response) => {
                    this.data  = response.data
                })
                .catch(function (error) {
                   console.log(error)
               })
         },
   }
}
</script>

<style scoped lang="less">
.action-complete {
}
</style>
