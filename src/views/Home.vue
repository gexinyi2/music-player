<template>
    <div class="home">
        <TopNav />
        <Banner />
        <IconList />
        <MusicList />
        <HomeMv />
        <Exclusive />
        <Similar />
        <Album />
        <div class="fill"></div>
    </div>
</template>

<script>
// @ is an alias to /src
import TopNav from "../components/home/TopNav.vue";
import Banner from "../components/home/Banner.vue";
import IconList from "../components/home/IconList.vue";
import MusicList from "../components/home/MusicList.vue";
import HomeMv from "../components/home/HomeMv.vue";
import Exclusive from "../components/home/Exclusive.vue";
import Similar from "../components/home/Similar.vue"
import Album from "../components/home/Album.vue"

import { getTest } from "@/request/api/test.js";
import { onMounted } from "vue";
export default {

    // setup() {
    //     onMounted(async () => {
    //       let res = await getTest();
    //       console.log(res);
    //     });
    // },

    name: "Home",
    components: {
        TopNav,
        Banner,
        IconList,
        MusicList,
        HomeMv,
        Exclusive,
        Similar,
        Album,
    },
};
</script>

<style>
.fill {
    height: 1.4rem;
    width: 100%;
}
</style>
