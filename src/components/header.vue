<template>
  <div class="z-header">
      <div class="search">
          <a class="logo">豆瓣电影</a>
          <div class="search-bar">
              <input type="text" placeholder="电影、演员、影院、电视剧" v-model="keyword">
          </div>
      </div>
       <div class="navbar">
           <template v-for="bar in barlist">
                <router-link :to="bar.url">
                    {{ bar.title }}
                </router-link>
           </template>
      </div> 
  </div>
</template>

<script>
    export default {
        data () {
            return {
                keyword: '',
                barlist: [
                    {
                        title: "正在热映",
                        url: '/'
                    },
                    {
                        title: "即将上映",
                        url: '/coming'
                    },
                    {
                        title: "热播列表",
                        url: '/top'
                    }
                ]
            }
        }
    }
</script>

<style lang="scss">
    .z-header {
        height: 114px;
        background: #f0f3f5;
        .search {
            width: 950px;
            height: 75px;
            margin: 0 auto;
        }
    }
</style>
