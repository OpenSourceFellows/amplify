<template>
  <v-app>
    <div id="app">
      <app-header />
      <router-view :test="test" />
      <app-footer />
    </div>
  </v-app>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'

export default {
  components: {
    AppHeader,
    AppFooter
  },
  methods: {
    test() {
      console.log('test logs are working')
      const testObject = {
        name: 'test',
        value: 'this is a test object'
      }
      this.$log.debug('Test Message', testObject)
      this.$log.info('Test Info Message', testObject)
      this.$log.warn('Test Warn Message', testObject)
      this.$log.error('Test Error Message', testObject)
      this.$log.log('Test Log Message', testObject)
      // change options
      this.$log.apply({ level: 'error' }) // applies new log level
      this.$log.warn('The Warn Message is not logged now')
    }
  }
}
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
