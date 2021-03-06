import Vue from 'vue'
import Vuex from 'vuex'
// import actions from './actions'
// import mutations from './mutations'
// import getters from './getters'

import axios from 'axios'
const dbapi = "http://api.douban.com/v2/movie"
// const dbapi = "http://192.168.31.33/api"

Vue.use(Vuex)

export function createStore () {
  return new Vuex.Store({
    state: {
      city: "深圳",
      curType: "",
      start: 0,
      // filmList: [],
      list: {
        moving: [],
        coming: [],
        top: []
      },
      movieId: null,
      movie: {}
    },
    mutations: {
      "set_city" (state,city) {
        state.city = city
      },
      "push_list" (state,{list,type}) {
        state.list[type] = list
        state.curType = type
      },
      "push_detail" (state,{detail,id}) {
        state.movie = detail
        state.movieId = id
      }
    },
    actions: {
      fetch_moving ({commit,state},c) {
        return axios.get(`${dbapi}/in_theaters`,{
          params: {
            city: c || state.city
          }
        }).then(res => {
          c && commit("set_city",c)
          commit("push_list",{list:res.data.subjects,type:"moving"})
        }).catch(()=>{
          console.log("请求失败")
        })
      },
      fetch_coming ({commit,state}) {
        return axios.get(`${dbapi}/coming_soon`,{
          params: {
            start: state.start,
            count: 20
          }
        }).then(res => {
          commit("push_list",{list:res.data.subjects,type:"coming"})
        }).catch(()=>{
          console.log("请求失败")
        })
      },
      fetch_top ({commit,state}) {
        return axios.get(`${dbapi}/top250`,{
          params: {
            start: state.start,
            count: 8
          }
        }).then(res => {
          commit("push_list",{list:res.data.subjects,type:"top"})
        }).catch(()=>{
          console.log("请求失败")
        })
      },
      set_list_city ({dispatch,state},city) {
        // 城市切换有问题
        if (state.city === city) {
          return;
        }
        dispatch("fetch_moving",city)
      },
      fetch_detail({commit},id) {
        return axios.get(`${dbapi}/subject/${id}`)
        .then( res => {
          commit("push_detail",{detail:res.data,id:id})
        }).catch(() => {
          console.log("请求失败")
        })
      }
    }
    // actions,
    // mutations,
    // getters
  })
}
