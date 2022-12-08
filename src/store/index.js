import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    zipcode: '',
    letterId: 'tmpl_187d2bbba140cd8',
    campaignId: '5',
    lobReturnAddressId: '',
    selectedRep: {},
    userData: {
      name: '',
      line1: '',
      line2: '',
      city: '',
      state: '',
      zip: '',
      email: ''
    }
  },
  mutations: {
    setGenericValue: (state, { key, value }) => {
      if (key in state) {
        state[key] = value
      }
    },
    setObjectValue: (state, { key, data }) => {
      // If state has an object with defined keys, use this method to mutate that entry.
      if (key in state) {
        for (const [attribute, value] of Object.entries(data)) {
          if (attribute in state[key]) {
            state[key][attribute] = value
          }
        }
      }
    }
  },
  actions: {
    setLetterAttrs: (store, payload) => {
      // Updates state, given an object
      // Will only commit change if key is already in state so no junk will be added.
      for (const [k, v] of Object.entries(payload)) {
        // There is a possible edge-case for arrays here but no arrays in state so ignorable for now.
        if (typeof k === 'object') {
          store.commit('setObjectValue'), { key: k, data: v }
        }
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
  modules: {}
})
