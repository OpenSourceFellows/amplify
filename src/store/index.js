import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    mode: 'single',
    zipcode: '',
    letterId: 'tmpl_187d2bbba140cd8',
    letterVersion: 'latest',
    campaign: {
      id: '',
      organization: '',
      name: '',
      cause: '',
      type: '',
      pageUrl: '',
      campaignText: '',
      campaignTagline: '',
      supplementalText: '',
    },
    representatives: [],
    assets: {},
    lobReturnAddressId: '',
    selectedRep: {},
    constituentType: null,
    communityInput: null,
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
    // TODO: Do we really need two setters here?
    // It's good for clarity, but they can really be combined to dry things up.
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
    },
    setConstituentType(state, payload) {
      state.constituentType = payload
    },
    setCommunityInput(state, payload) {
      state.communityInput = payload
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
    },
    async loadSingleCampaign({ commit }, id) {
      const campaignUrl = `/api/campaigns/${id}`

      try {
        const res = await axios.get(campaignUrl)

        const campaign = res.data
        console.log(res.data)
        let { representatives, assets } = campaign

        if (typeof representatives == 'string') {
          console.log('had to parse json campaign')
          representatives = JSON.parse(representatives)
        }

        if (typeof assets == 'string') {
          console.log('had to parse json assets')
          assets = JSON.parse(assets)
        }

        commit('setObjectValue', { key: 'campaign', data: res.data })
        commit('setGenericValue', { key: 'representatives', value: representatives})
        commit('setGenericValue', { key: 'assets', value: assets })
      } catch (e) {
        alert(e.message)
      }
    }
  },
  modules: {}
})
