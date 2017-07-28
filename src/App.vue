<template>
  <div id="app">
      <Zheader></Zheader>
       <transition name="fade" mode="out-in">
          <router-view class="view"></router-view>
      </transition> 
  </div>
</template>

<script>
    import Zheader from './components/header.vue'
    export default {
        components: {
            Zheader
        }
    }
</script>


<style lang="scss">
    body {
        color: #333;
    }
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    .view {
        max-width: 800px;
        margin: auto;
    }
    ul li,ol li {
        list-style: none;
    }
    .fade-enter-active, .fade-leave-active {
        transition: all .2s ease;
    }
    .fade-enter, .fade-leave-active {
        opacity: 0;
    }
</style>

