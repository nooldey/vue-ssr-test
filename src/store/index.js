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
      "set_city" (state,{city}) {
        state.city = city
      },
      "push_list" (state,{list}) {
        state.filmList = list
      },
    },
    actions: {
      
      fetch_list_data ({ commit,dispatch },{type}) {
        commit("set_type",{type})
        return dispatch("fetch_"+type)
      },
      fetch_moving ({commit,state}) {
        console.log("moving...")
        return axios.get("http://api.douban.com/v2/movie/in_theaters",{
          city: state.city
        }).then(res => {
          commit("push_list",{list:res.data.subjects})
        })
      },
      fetch_coming ({commit,state}) {
        console.log("coming...")        
        return axios.get("http://api.douban.com/v2/movie/coming_soon",{
          city: state.city,
          // start: state.upcom.start + 1
        }).then(res => {
          commit("push_list",{list:res.data.subjects})
        })
      },
      fetch_top ({commit,state}) {
        console.log("top...")        
        return axios.get("http://api.douban.com/v2/movie/top250",{
          start: state.start,
          count: 7
        }).then(res => {
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
