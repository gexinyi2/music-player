<template>
    <div class="itemMusicList">
        <div class="itemListTop">
            <div class="listLeft">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-bofanganniu"></use>
                </svg>
                <span
                    >播放全部<span>(共{{ itemList.length }}首)</span></span
                >
            </div>
            <div class="listRight">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-jiahao"></use>
                </svg>
                <span>收藏({{ subscribedCount }})</span>
            </div>
        </div>
        <div class="itemList">
            <div class="item" v-for="(item1, index1) in itemList" :key="index1">
                <div class="itemLeft" @click="playMusic(index1)">
                    <span class="leftSpan">{{ index1 + 1 }}</span>
                    <div class="ar">
                        <p>{{ item1.name }}</p>
                        <span
                            v-for="(item2, index2) in item1.ar"
                            :key="index2"
                            >{{ item2.name }}<i> / </i></span
                        >
                        <em> - {{ item1.al.name }}</em>
                    </div>
                </div>
                <div class="itemRight">
                    <svg
                        class="icon bofang"
                        aria-hidden="true"
                        v-show="item1.mv != 0"
                        @click="goMvView(item1.mv)"
                    >
                        <use xlink:href="#icon-shipin"></use>
                    </svg>
                    <svg class="icon liebiao" aria-hidden="true">
                        <use xlink:href="#icon-31liebiao"></use>
                    </svg>
                </div>
            </div>
        </div>
        <div class="fill"></div>
    </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
    // data(){
    //     return {
    //         interVal:0,
    //     }
    // },
    setup(props) {
        console.log(props);
    },
    props: ["itemList", "subscribedCount"],
    // mounted(){
    //     setTimeout(()=>{
    //         console.log(this.itemList)  //有数据
    //     },1000)
    //     console.log(this.itemList)      //没数据
    // },
    methods: {
        playMusic: function (index1) {
            this.updatePlayList(this.itemList);
            this.updatePlayListIndex(index1);
            //this.updateTime() //播放就调用函数传值
            //console.log(this.itemList)
        },
        goMvView: function (id) {
            this.$router.push({
                path: "/HomeMvView",
                query: { id: id },
            });
        },
        // updateTime:function(){
        //     this.interVal = setInterval(()=>{
        //         this.updateCurrentTime(this.$refs.audio.currentTime)
        //     },1000)
        // },
        ...mapMutations([
            "updatePlayList",
            "updatePlayListIndex",
            "updateCurrentTime",
        ]),
    },
};
</script>

<style lang="less" scoped>
.fill {
    height: 1.4rem;
    width: 100%;
}
.itemMusicList {
    width: 100%;
    height: 10rem;
    background-color: #fff;
    padding: 0 0.2rem;
    margin-top: 0.2rem;
    border-top-left-radius: 0.4rem;
    border-top-right-radius: 0.4rem;
    .itemListTop {
        width: 100%;
        height: 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .listLeft {
            width: 3rem;
            height: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .icon {
                stroke: #333333;
                stroke-width: 20;
            }
            span {
                font-weight: 700;
                span {
                    font-weight: 400;
                    font-size: 0.24rem;
                    color: #999;
                    display: inline-block;
                    margin-left: 0.08rem;
                }
            }
        }
        .listRight {
            display: flex;
            align-items: center;
            background-color: red;
            padding: 0.2rem;
            border-radius: 0.4rem;
            color: #fff;
            .icon {
                width: 0.3rem;
                height: 0.3rem;
                fill: #fff;
                margin-right: 0.1rem;
                stroke: #fff;
                stroke-width: 50;
            }
        }
    }
    .itemList {
        width: 100%;
        //margin-bottom: 1.4rem;
        .item {
            width: 100%;
            height: 1.2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .itemLeft {
                width: 85%;
                height: 100%;
                display: flex;
                align-items: center;
                .leftSpan {
                    display: inline-block;
                    width: 0.2rem;
                    text-align: center;
                }
                div {
                    width: 90%;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    p {
                        width: 4.54rem;
                        height: 0.4rem;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        font-weight: 700;
                    }
                    span,
                    em {
                        font-style: normal;
                        font-weight: 400;
                        font-size: 0.24rem;
                        color: #999;
                    }
                    margin-left: 0.3rem;
                }
            }
            .itemRight {
                width: 20%;
                height: 100%;
                display: flex;
                // justify-content: space-between;
                align-items: center;
                position: relative;
                .icon {
                    fill: #999;
                }
                .bofang {
                    position: absolute;
                    left: 0;
                }
                .liebiao {
                    position: absolute;
                    right: 0;
                }
            }
        }
    }
}
.ar i,
.ar em {
    font-style: normal;
}

em.album {
    font-style: normal;
}

.ar span:last-of-type i {
    display: none;
}
</style>