import Vue from 'vue'
import Vuex from 'vuex'
// import actions from './actions'
// import mutations from './mutations'
// import getters from './getters'

import axios from 'axios'

Vue.use(Vuex)

export function createStore () {
  return new Vuex.Store({
    state: {
      city: "深圳",
      curType: "",
      start: 0,
      filmList: []
    },
    mutations: {
      "set_type" (state,{type}) {
        state.curType = type
      },
      "set_city" (state,{city}) {
        state.city = city
      },
      "push_list" (state,{list}) {
        state.filmList = list
      },
    },
    actions: {
      fetch_moving ({commit,state},{type}) {
        console.log("moving...")
        commit("set_type",{type})
        return axios.get("http://192.168.31.238/api/moving",{
          city: state.city
        }).then(res => {
// console.log(res)
          commit("push_list",{list:res.data.subjects})
        })
      },
      fetch_coming ({commit,state},{type}) {
        console.log("coming...")
        commit("set_type",{type})
        return axios.get("http://192.168.31.238/api/coming_soon",{
          city: state.city,
          start: 1
        }).then(res => {
// console.log(res)
          commit("push_list",{list:res.data.subjects})
        })
      },
      fetch_top ({commit,state},{type}) {
        console.log("top...")
        commit("set_type",{type})  
        return axios.get("http://192.168.31.238/api/top250",{
          start: state.start,
          count: 7
        }).then(res => {
// console.log(res)          
          commit("push_list",{list:res.data.subjects})
        })
      },
      set_list_city ({commit,dispatch},{city}) {
        commit("set_city",{city})
        dispatch("fetch_list_data")
      }
    }
    // actions,
    // mutations,
    // getters
  })
}
