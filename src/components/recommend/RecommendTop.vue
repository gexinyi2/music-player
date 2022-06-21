<template>
    <div class="RecommendTop">
        <div class="img">
            <img src="@/assets/test1.jpg" alt="" />
        </div>
        <div class="tit">
            <svg class="icon" aria-hidden="true" @click="this.$router.push('/')">
                <use xlink:href="#icon-zuojiantou"></use>
            </svg>
            <span>每日推荐</span>
        </div>
        <div class="date">
            <span class="day">{{state.date.day}}</span>/<span class="month">{{state.date.month}}</span>
        </div>
        <!-- <div class="itemMusicTop">
            <img :src="playlist.coverImgUrl" alt="" class="bgimg" />
            <div class="itemLeft">
                <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
                    <use xlink:href="#icon-zuojiantou"></use>
                </svg>
                <span>歌单</span>
            </div>
            <div class="itemRight">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-sousuo"></use>
                </svg>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-31liebiao"></use>
                </svg>
            </div>
        </div> -->
    </div>
</template>

<script>
import { onMounted, reactive } from "vue";
export default {
    setup(props) {
        const state = reactive({
            date: {
                month:'',
                day:'',
            }, //日期
        });
        console.log(props);
        // if(props.recommendmusicList.al = ""){
        //   props.recommendmusicList.al = JSON.parse(sessionStorage.getItem("recommendmusicList").al)
        // }
        let nowDate = new Date();
        state.date = {
            month: nowDate.getMonth() + 1,
            day: nowDate.getDate(),
        };
        if (parseInt(state.date.day) < 10) {
            state.date.day = "0" + state.date.day;
        }else if(parseInt(state.date.month)<10){
            state.date.month = "0" + state.date.month
        }
        //console.log(state.date);
        return {state}
    },
    props: ["recommendmusicList"],
};
</script>

<style lang="less" scoped>
.RecommendTop {
    position: relative;
}
.RecommendTop .img {
    width: 100%;
    height: 6rem;
}
.RecommendTop .img img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
.RecommendTop .tit {
    position: absolute;
    left: 0.3rem;
    top: 0.3rem;
}
.RecommendTop .tit span {
    display: inline-block;
    font-size: 0.3rem;
    color: #333;
    transform: translate(0, -0.14rem);
    margin-left: 0.1rem;
}
.RecommendTop .date{
    position: absolute;
    bottom: .8rem;
    left: .3rem;
    color: #fff;
}
.RecommendTop .date .day{
    font-size: .7rem;
    font-weight: bold;
    display: inline-block;
    margin-right: .15rem;
}
.RecommendTop .date .month{
    display: inline-block;
    margin-left: .1rem;
}
</style>