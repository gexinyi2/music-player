<template>
    <div class="iconList">
        <div class="iconItem" @click="goRecommend()">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-tuijian"></use>
            </svg>
            <span>每日推荐</span>
        </div>
        <div class="iconItem" @click="goFm()">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-zhibo"></use>
            </svg>
            <span>私人FM</span>
        </div>
        <div class="iconItem" @click="goAllList()">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-gedan"></use>
            </svg>
            <span>歌单</span>
        </div>
        <div class="iconItem" @click="goTopListView()">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-paihangbang"></use>
            </svg>
            <span>排行榜</span>
        </div>
    </div>
</template>

<script>
import { mapMutations, mapState, useStore } from "vuex";
export default {
    computed:{
        ...mapState(["footerMusic_ref"])
    },
    methods:{
        goRecommend:function(){
            this.$router.push('/RecommendMusic')
        },
        goFm:function(){
            this.$router.push('/Fm')
            //this.updateFooterMusicPause(true);
            this.footerMusic_ref.pause()
            this.updateIsbtnshow(true)
        },
        goTopListView:function(){
            this.$router.push('/TopListView')
        },
        goAllList:function(){
            this.$router.push('/AllList')
        },
        ...mapMutations([
            "updateFooterMusicPause",
            "updateIsbtnshow",
        ]),
    },
};
</script>

<style lang="less" scoped>
.iconList {
    width: 100%;
    height: 2rem;
    margin-top: 0.2rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .iconItem {
        width: 25%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        .icon {
            width: 1rem;
            height: 1rem;
        }
    }
}
</style>