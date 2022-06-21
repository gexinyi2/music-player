<template>
    <div class="exclusive">
        <div class="exclusiveTop">
            <div class="title">独家放送</div>
            <!-- <div class="more">查看更多</div> -->
        </div>
        <div class="exclusiveContent">
            <van-swipe
                :loop="false"
                :width="200"
                :show-indicators="false"
                class="my-swpie"
            >
                <van-swipe-item v-for="item in exclusivevlist" :key="item">
                    <router-link
                        :to="{ path: '/HomeMvView', query: { id: item.id,tit:this.tit } }"
                    >
                        <img :src="item.picUrl" />
                        <span class="playCount">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-gl-play-copy"></use>
                            </svg>
                            <!-- <i class="count">{{ item.playCount }}</i> -->
                        </span>
                        <span class="name">{{ item.name }}</span>
                    </router-link>
                </van-swipe-item>
            </van-swipe>
        </div>
    </div>
</template>

<script>
import { getExclusive } from "@/request/api/home.js";
export default {
    data() {
        return {
            exclusivevlist: {},
            tit:'独家放送',
        };
    },
    mounted() {
        this.getExclusivedata();
    },
    methods: {
        getExclusivedata: async function () {
            let res = await getExclusive();
            this.exclusivevlist = res.data.result;
            //console.log(this.exclusivevlist);
        },
    },
};
</script>

<style lang="less" scoped>
.exclusive {
    width: 100%;
    height: 5rem;
    padding: 0.2rem;
    .exclusiveTop {
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
    .exclusiveContent {
        width: 100%;
        height: 3.6rem;

        .van-swipe-item {
            //   margin-right: 0.14rem;
            padding-right: 0.2rem;
            position: relative;
            height: 3.6rem;
            // height: 3.8rem;
            img {
                width: 100%;
                height: 2.4rem;
                border-radius: 0.2rem;
                object-fit: cover;
                //   position: absolute;
            }
            .playCount {
                position: absolute;
                z-index: 100;
                left: 0.3rem;
                top: 0.1rem;
                width: 0.5rem;
                height: 0.5rem;
                color: white;
                margin-top: 0.06rem;
                display: inline-block;
                //border: 1px solid #999;
                box-sizing: border-box;
                background-color: rgba(0, 0, 0, 0.5);
                border-radius: 0.5rem;
                .icon {
                    width: 0.25rem;
                    height: 0.25rem;
                    position: absolute;
                    left: 0;
                    top: 0;
                    right: 0;
                    bottom: 0;
                    margin: auto;
                    //margin-right: 0.06rem;
                    //margin-top: 1px;
                    //transform: translate(0, 2px);
                }
                .count {
                    font-size: 0.24rem;
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