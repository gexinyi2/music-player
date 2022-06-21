<template>
    <div class="RecommendMusic">
        <RecommendTop :recommendmusicList="state.recommendmusicList"/>
        <RecommendList :recommendmusicList="state.recommendmusicList"/>
    </div>
</template>

<script>
import RecommendList from "@/components/recommend/RecommendList.vue";
import RecommendTop from "@/components/recommend/RecommendTop.vue";
import { onMounted, reactive } from "vue";
import { getRecommendMusic,getFn } from "@/request/api/recommend.js";
export default {
    setup() {
        const state = reactive({
            recommendmusicList: {}, //每日推荐歌曲
        });
        onMounted(async()=>{
            let res = await getRecommendMusic()
            //console.log(res);
            state.recommendmusicList = res.data.data.dailySongs;
            console.log(state.recommendmusicList);
            sessionStorage.setItem("recommendmusicList", JSON.stringify(state));
            // let res2 = await getFn()
            // console.log(res2);
        });
        return {state};
    },
    components: {
        RecommendList,
        RecommendTop,
    },
};
</script>

<style>
</style>