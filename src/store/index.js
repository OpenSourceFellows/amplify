import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    zipcode: '',
    letterId: '',
    lobReturnAddressId: '',
    selectedRep: {},
    userData: {},
    userCustomization: ''
  },
  mutations: {
    setGenericValue: (state, { key, value }) => {
      if (key in state) {
        state[key] = value
      }
    }
  },
  actions: {
    setLetterAttrs: (store, payload) => {
      // Updates state, given an object
      // Will only commit change if key is already in state so no junk will be added.
      for (const [k, v] of Object.entries(payload)) {
        store.commit('setGenericValue', { key: k, value: v })
      }
    },
    dumpStateToLocalStorage: ({ state }, sessionId) => {
      localStorage.setItem(sessionId, JSON.stringify(state))
    },
    retrieveStateFromLocalStorage: (store, sessionId) => {
      // Gets state from local storage.
      return new Promise((resolve, reject) => {
        try {
          const driedState = localStorage.getItem(sessionId)
          const rehydratedState = JSON.parse(driedState)

          // Reset state and delete entry so local storage doesn't get clogged.
          store.dispatch('setLetterAttrs', rehydratedState)
          localStorage.removeItem(sessionId)
          resolve()
        } catch {
          const error = new Error(
            'State cannot be retrieved from local storage.'
          )
          reject(error)
        }
      })
    }
  },
  getters: {
    userCustomization: (state) => {
      return state.userCustomization
    }
  },
  modules: {}
})
