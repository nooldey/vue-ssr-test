<template>
    <div class="z-movie">
        <section class="m-header">
            <h2>
                {{movie.title}} {{movie.original_title}}
                <span>（{{movie.year}}）</span>
            </h2>
            <div class="m-block">
                <section>
                    <a :href="'https://movie.douban.com/subject/'+itemId+'/photos?type=R'" target="_blank" title="点击查看更多海报">
                        <img :src="movie.images.medium">
                    </a>
                    <ul>
                        <li>导演：
                            <span v-for="(n,idx) in movie.directors" :key="idx">{{ n.name }}</span>
                        </li>
                        <li>主演：
                            <span v-for="(n,idx) in movie.casts" :key="idx">{{ n.name }}/</span>
                        </li>
                        <li>类型：
                            <span v-for="(n,idx) in movie.genres" :key="idx">{{ n }}/</span>
                        </li>
                        <li>制片国家/地区：
                            <span v-for="(n,idx) in movie.countries" :key="idx">{{ n }}&emsp;</span>
                        </li>
                        <li>语言：
                            <span v-for="(n,idx) in movie.languages" :key="idx">{{ n }}/</span>
                        </li>
                        <li>影讯：
                            <span>{{movie.schedule_url}}</span>
                        </li>
                    </ul>
                </section>
                <section>
                    <p>豆瓣评分</p>
                    <p>
                        <span class="score" v-if="movie.rating.average">{{ movie.rating.average }}</span>
                        <span class="comment-num" v-if="movie.rating.average">
                            <i :class="`level-${movie.rating.average*10}`"></i>
                            <em>{{movie.ratings_count}}人评价</em>
                        </span>
                        <span class="no-publish" v-else>尚未上映</span>
                    </p>
                </section>
            </div>
        </section>
        <section class="m-info">
            <h3></h3>
        </section>
        <section class="m-detail">
            <h3>剧情简介</h3>
            <p>{{ movie.summary }}</p>
            <h3>豆瓣短评</h3>
            <p>暂无</p>
        </section>
    </div>
</template>

<script>
export default {
    asyncData({ store, route }) {
        return store.dispatch('fetch_detail', route.params.id)
    },
    computed: {
        itemId() {
            return this.$store.state.movieId
        },
        movie() {
            return this.$store.state.movie
        }
    }
}
</script>

<style lang="scss" scoped>
h3 {
    line-height: 1.6;
    margin: 12px 0;
}
.m-header {
    margin-top: 40px;
}
.m-block {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin: 35px auto;
    section {
        &:first-child {
            flex: 1;
            display: flex;
        }
        &:last-child {
            flex: none;
            width: 220px;
            padding-left: 2em;
            border-left: 1px solid #eaeaea;
            color: #aaa;
            font-size: 12px;
            span {
                display: inline-block;
                vertical-align: top;
                width: 50%;
            }
        }
    }
    a {
        display: block;
        width: 200px;
        overflow: hidden;
    }
    img {
        object-fit: cover;
    }
    ul li {
        font-size: 13px;
        color: #666;
        line-height: 1.6;
        span {
            color: #37a;
        }
    }
    .score {
        font-size: 20px;
        line-height: 2;
        width: 20%;
    }
    .comment-num {
        color: #669;
        i {
            display: block;
            width: 1em;
            height: 1em;
        }
    }
    em {
        font-style: normal;
    }
}
.m-detail {
    p {
        color: #666;
        line-height: 1.8;
        text-indent: 2em;
    }
}
</style>

