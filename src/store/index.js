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
      filmList: []
    },
    mutations: {
      "set_type" (state,{type}) {
        state.curType = type
      },
      "push_list" (state,{list}) {
        state.filmList = list
      }
    },
    actions: {
      fetch_list_data ({ commit,state },{type}){
        axios.get('http://api.douban.com/v2/movie/in_theaters',{city: state.city}).then(res => {
          console.log(res)
          commit("push_list",{list:res})
          commit("set_type",{type})
        })
      }
    }
    // actions,
    // mutations,
    // getters
  })
}
