<template>
  <div class="z-film">
      <section v-for="(f,idx) in films" :key="idx">
          <a href="javascript:;">
              <img :src="f.images.large" alt="douban-movies">
          </a>
          <a href="javascript:;">{{ f.title }}</a>
          <span>豆瓣评分：{{ f.rating.average }}</span>
          <p class="45">
              <!-- 评分星星图 -->
          </p>
          <a href="javascript:;">特惠选座</a>
      </section>
  </div>
</template>

<script>
    export default {
        props: {
            films: Array
        }
    }
</script>

<style lang="scss" scoped>
    .z-film {
        max-width: 750px;
        margin: 0 auto;
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        flex-wrap: wrap;
        >section {
            flex-basis: 25%;
            padding: 5px;
            overflow: hidden;
            box-sizing: border-box;
            text-align: center;
        }
        img {
            width: 100%;
            height: 220px;
            margin-bottom: 12px;
            object-fit: cover;
        }
        span {
            font-size: 12px;
            color: #232323;
        }
        a {
            display: block;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            text-decoration: none;
            &:nth-of-type(2) {
                color: #333;
                font-size: 16px;
            }
            &:nth-of-type(3) {
                display: inline-block;
                padding: 5px 16px;
                background: #08b;
                color: #fff;
                font-size: 14px;
            }
        }
    }
</style>


