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
    .view {
        max-width: 800px;
        margin: auto;
    }
    .fade-enter-active, .fade-leave-active {
        transition: all .2s ease;
    }
    .fade-enter, .fade-leave-active {
        opacity: 0;
    }
</style>

