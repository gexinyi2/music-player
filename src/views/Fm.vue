<template>
    <div class="fm_bg">
        <img :src="this.fm_pic" />
    </div>
    <div class="fm">
        <div class="fm_top">
            <svg class="icon" aria-hidden="true" @click="goback">
                <use xlink:href="#icon-zuojiantou"></use>
            </svg>
            <p class="tit">私人FM</p>
        </div>
        <div class="fm_content" v-show="!isLyricShow">
            <img :src="this.fm_pic" />
            <h4>{{ this.fm_name }}</h4>
            <p>{{ this.fm_ar }}</p>
        </div>
        <!-- <div
            class="musicLyric"
            ref="musicLyric"
            v-show="isLyricShow"
            @click="changeLyricShow"
        >
            <p
                v-for="item in lyric"
                :key="item"
                :class="{
                    active:
                        currentTime * 1000 >= item.time &&
                        currentTime * 1000 <= item.pre,
                }"
            >
                {{ item.lrc }}
            </p>
        </div> -->
        <div class="fm_footer">
            <div class="footerContent">
                <input
                    type="range"
                    class="range"
                    min="0"
                    :max="this.fm_duration"
                    v-model="this.currentTime"
                    step="0.05"
                />
            </div>
            <div class="footer">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-xunhuan"></use>
                </svg>
                <svg class="icon" aria-hidden="true" @click="goplay(-1)">
                    <use xlink:href="#icon-shangyishoushangyige"></use>
                </svg>
                <svg
                    class="icon bofang"
                    aria-hidden="true"
                    v-if="isfmbtnshow"
                    @click="play"
                >
                    <use xlink:href="#icon-bofang1"></use>
                </svg>
                <svg
                    class="icon bofang"
                    aria-hidden="true"
                    v-else
                    @click="play"
                >
                    <use xlink:href="#icon-zanting"></use>
                </svg>
                <svg class="icon" aria-hidden="true" @click="goplay(1)">
                    <use xlink:href="#icon-xiayigexiayishou"></use>
                </svg>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-zu"></use>
                </svg>
            </div>
        </div>
    </div>
    <audio
        ref="audio"
        :src="`https://music.163.com/song/media/outer/url?id=${this.fm_id}.mp3`"
        autoplay
    ></audio>
</template>

<script>

import { getFm } from "@/request/api/recommend.js";
import { mapMutations, mapState, useStore } from "vuex";

export default {
    data() {
        return {
            isLyricShow: false,
            currentTime: 0,
            interVal: 0,

            fmlist: {},
            fm_pic: "",
            fm_name: "",
            fm_ar: "",
            fm_id: 0,
            fm_index: 0,
            fm_duration: 0,
            isfmbtnshow:false,
        };
    },
    mounted() {
        this.getFmdata();
        this.updateTime();
    },
    methods: {
        getFmdata: async function () {
            let res = await getFm();
            this.fmlist = res.data.data;
            console.log(this.fmlist);
            this.fm_id = this.fmlist[this.fm_index].id;
            this.fm_pic = this.fmlist[this.fm_index].album.picUrl;
            this.fm_ar = this.fmlist[this.fm_index].artists[0].name;
            this.fm_name = this.fmlist[this.fm_index].name;
            this.fm_duration = this.fmlist[this.fm_index].duration/1000;
            console.log(this.fm_duration)
            console.log(this.fmlist[this.fm_index].duration)
        },
        updateTime: function () {
            this.interVal = setInterval(() => {
                this.currentTime = this.$refs.audio.currentTime;
                //console.log(this.currentTime)
            }, 1000);
        },
        play: function () {
            if (this.$refs.audio.paused) {
                this.$refs.audio.play();
                this.isfmbtnshow = false
                this.updateTime(); //播放就调用函数传值
            } else {
                this.$refs.audio.pause();
                this.isfmbtnshow = true;
                clearInterval(this.interVal); //暂停清除定时器
            }
        },
        goback: function () {
            this.$router.go(-1);
            clearInterval(this.interVal); //暂停清除定时器
            //console.log(this.interVal)
        },
        goplay: function (data) {
            this.fm_index = this.fm_index + data;
            //console.log(this.$refs.audio.autoplay)

            //歌曲循环播放
            if (this.fm_index < 0) {
                this.fm_index = this.fmlist.length - 1;
            } else if (this.fm_index === this.fmlist.length) {
                this.fm_index = 0;
            }

            if(this.isfmbtnshow){
                //this.$refs.audio.pause()
                console.log("pause")
                //clearInterval(this.interVal); //暂停清除定时器
            }else{
                //this.$refs.audio.play()
                console.log("play")
                //this.updateTime()
            }

            //重新赋值实现歌曲切换
            this.fm_id = this.fmlist[this.fm_index].id;
            this.fm_pic = this.fmlist[this.fm_index].album.picUrl;
            this.fm_ar = this.fmlist[this.fm_index].artists[0].name;
            this.fm_name = this.fmlist[this.fm_index].name;
            this.fm_duration = this.fmlist[this.fm_index].duration/1000;
            //console.log(this.fm_index)

            //暂停之后切歌还是暂停状态
            if(this.isfmbtnshow){
                //this.isfmbtnshow = false
                this.$refs.audio.autoplay = false
                //console.log("pause")
                clearInterval(this.interVal); //暂停清除定时器
            }else{
                this.$refs.audio.autoplay = true
            }
        },
        ...mapMutations([
            "updateIsbtnshow",
            "updateDetailShow",
            "updateCurrentTime",
            "updateDuration",
        ]),
        //    async getid(){
        //        let res = await getFm()
        //        console.log(res);
        //        this.id = res.data.data[0].id
        //        //console.log(this.id)
        //     }
    },
};
</script>

<style lang="less" scoped>
.fm {
    width: 100%;
    height: 100%;
}
.fm_bg {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: -1;
    font-size: 0;
}
.fm_bg img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: blur(35px);
}
.fm .fm_top {
    position: relative;
}
.fm .fm_top .icon {
    position: absolute;
    left: 0.3rem;
    top: 0.2rem;
}
.fm .fm_top .tit {
    text-align: center;
    line-height: 1rem;
}
.fm .fm_content {
    margin-top: 30%;
    text-align: center;
    color: #fff;
}
.fm .fm_content img {
    width: 80%;
    height: 5.5rem;
    object-fit: cover;
    margin: 0 auto;
    margin-bottom: 0.4rem;
    display: block;
}
.fm .fm_content h4 {
    font-size: 0.36rem;
    font-weight: normal;
    margin-bottom: 0.3rem;
}
.fm .fm_content p {
    font-size: 0.28rem;
}
.fm_footer {
    width: 100%;
    height: 2rem;
    position: absolute;
    bottom: 0.8rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .footerTop {
        width: 100%;
        height: 1rem;
        display: flex;
        justify-content: space-around;
        align-items: center;
        .icon {
            width: 0.36rem;
            height: 0.36rem;
            fill: rgb(245, 234, 234);
        }
        .icon {
            width: 0.6rem;
            height: 0.6rem;
        }
    }
    .range {
        width: 100%;
        height: 0.06rem;
    }
    .footer {
        width: 100%;
        height: 1rem;
        display: flex;
        justify-content: space-around;
        align-items: center;
        .icon {
            fill: rgb(245, 234, 234);
        }
        .bofang {
            width: 1rem;
            height: 1rem;
        }
    }
}

.musicLyric {
    width: 100%;
    height: 8.5rem;
    //height: 65%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 1rem;
    overflow: scroll;
    transition: all 0.3s ease-in-out;
    p {
        color: rgb(190, 181, 181);
        margin-bottom: 0.3rem;
        transition: all 0.3s ease-in-out;
    }
    .active {
        color: #fff;
        font-size: 0.32rem;
    }
}
</style>