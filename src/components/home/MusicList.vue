<template>
    <div class="musicList">
        <div class="musicTop">
            <div class="title">推荐歌单</div>
            <!-- <div class="more">查看更多</div> -->
        </div>
        <div class="musicContent">
            <van-swipe
                :loop="false"
                :width="130"
                :show-indicators="false"
                class="my-swpie"
            >
                <van-swipe-item v-for="item in MusicList" :key="item">
                    <router-link
                        :to="{ path: '/ItemMusic', query: { id: item.id } }"
                    >
                        <img :src="item.picUrl" />
                        <span class="playCount">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-gl-play-copy"></use>
                            </svg>
                            <i class="count">{{
                                changeCount(item.playCount)
                            }}</i>
                        </span>
                        <span class="name">{{ item.name }}</span>
                    </router-link>
                </van-swipe-item>
            </van-swipe>
        </div>
    </div>
</template>

<script>
import { onMounted } from "vue";
import { getRecommend } from "@/request/api/home.js";
export default {
    // setup(){
    //     onMounted(async ()=>{
    //         let res = await getRecommend();
    //         console.log(res);
    //     });
    // }
    data() {
        return {
            MusicList: [],
        };
    },
    methods: {
        async getMusicList() {
            let res = await getRecommend();
            //console.log(res);
            this.MusicList = res.data.result;
            //console.log(this.MusicList);
        },
        changeCount: function (count) {
            if (count >= 100000000) {
                return (count / 100000000).toFixed(1) + "亿";
            } else {
                return (count / 10000).toFixed(1) + "万";
            }
        },
    },
    mounted() {
        this.getMusicList();
        //this.MusicList = res.data.result;
        //console.log(this.MusicList);
    },
};
</script>

<style lang="less" scoped>
.musicList {
    width: 100%;
    height: 5rem;
    padding: 0.2rem;
    .musicTop {
        width: 100%;
        height: 0.6rem;
        display: flex;
        justify-content: space-between;
        margin-bottom: 0.35rem;
        .title {
            font-size: 0.4rem;
            font-weight: 900;
        }
        .more {
            border: 1px solid #ccc;
            text-align: center;
            line-height: 0.6rem;
            padding: 0 0.2rem;
            border-radius: 0.4rem;
        }
    }
    .musicContent {
        width: 100%;
        height: 3.6rem;

        .van-swipe-item {
            //   margin-right: 0.14rem;
            padding-right: 0.2rem;
            position: relative;
            // height: 3.8rem;
            img {
                width: 100%;
                height: 2.4rem;
                border-radius: 0.2rem;
                //   position: absolute;
            }
            .playCount {
                position: absolute;
                z-index: 100;
                right: 0.3rem;
                color: white;
                margin-top: 0.06rem;
                .icon {
                    width: 0.3rem;
                    height: 0.3rem;
                    margin-right: 0.06rem;
                    margin-top: 1px;
                    transform: translate(0, 2px);
                }
                .count {
                    font-size: 0.26rem;
                    font-style: normal;
                }
            }
            .name {
                //   position: absolute;
                //bottom: 0px;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                font-size: 0.26rem;
                margin-top: 0.1rem;
            }
        }
    }
}
</style>