<template>
    <div class="z-moving">
        <h2>电影票 - {{ city }}</h2>
        <section class="location">
            [切换城市]：
            <span v-for="(c,idx) in cities" :key="idx" @click="getCity(c)">{{ c }}</span>
        </section>
        <section class="hd">
            <span>影院上映</span>
            <em>正在上映</em>
        </section>
        <p>{{ type }}</p>
        <card :films="filmList"></card>
    </div>
</template>

<script>
import card from '../components/FilmCard.vue'
export default {
    props: {
        type: String
    },
    components: {
        card
    },
    data() {
        return {
            cities: ["北京", "上海", "深圳", "广州", "杭州"],
            city: this.$store.state.city
        }
    },
    computed: {
        filmList() {
            return this.$store.state.filmList
        }
    },
    methods: {
        getCity(c) {
            console.log('current city:', c)
            this.$store.dispatch("set_list_city",{c})
        }
    }
}
</script>

