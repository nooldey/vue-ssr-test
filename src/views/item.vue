<template>
    <div class="z-moving">
        <h2>电影票 - {{ city }}</h2>
        <section class="location">
            [切换城市]：
            <span
                v-for="(c,idx) in cities"
                :key="idx"
                @click="getCity(c)"
            >{{ c }}</span>
        </section>
        <section class="hd">
            <span>影院上映</span>
            <em>正在上映</em>
        </section>
        <card></card>
    </div>
</template>

<script>
    import FilmCard from '../components/FilmCard.vue'
    export default {
        components: {
            card: FilmCard
        },
        data() {
            return {
                cities: ["北京", "上海", "深圳", "广州", "杭州"]
            }
        },
        methods: {
            getCity(c) {
                console.log('current city:',c)
                // do something ...
            }
        }
    }
</script>

