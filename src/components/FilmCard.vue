<template>
  <div class="z-film">
      <section v-for="(f,idx) in films" :key="idx">
          <a href="javascript:;">
              <img :src="f.images.large" alt="douban-movies">
          </a>
          <a href="javascript:;">{{ f.title }}</a>
          <span>{{ f.rating.average }}</span>
          <p class="45"></p>
          <a href="javascript:;">特惠选座</a>
      </section>
  </div>
</template>

<script>
    export default {
        data () {
            return {
                films: this.$store.state.filmList
            }
        }
    }
</script>

