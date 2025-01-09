import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    mode: 'single',
    zipcode: '',
    letterTemplate: {},
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
      letterTemplateId: ''
    },
    representatives: [],
    assets: {},
    lobReturnAddressId: '',
    selectedRep: {},
    userData: {
      name: '<Your name here>',
      line1: '',
      line2: '',
      city: '',
      state: '',
      zip: '',
      email: ''
    },
    mergeVariables: {}
  },
  mutations: {
    // TODO: Do we really need two setters here?
    // It's good for clarity, but they can really be combined to dry things up.
    // This can be used to replace an object, wholesale: state.mergeVariables = {} ==> state.mergeVariables = { somekey: someval }
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
        commit('setGenericValue', {
          key: 'representatives',
          value: representatives
        })
        commit('setGenericValue', { key: 'assets', value: assets })
      } catch (e) {
        alert(e.message)
      }
    },
    async loadLetterTemplate({ state, commit }) {
      const templateUrl = `/api/v1/letter_templates/${state.campaign.letterTemplateId}`

      try {
        const res = await axios.get(templateUrl)

        const { letterTemplate } = res.data
        console.log(letterTemplate)

        commit('setGenericValue', {
          key: 'letterTemplate',
          value: letterTemplate
        })
      } catch (e) {
        alert(e)
      }
    }
  },
  modules: {}
})
