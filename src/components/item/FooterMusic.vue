<template>
    <div class="FooterMusic">
        <div class="footerLeft" @click="showMusicDetail()">
            <img :src="playList[playListIndex].al.picUrl" alt="" />
            <div class="content">
                <p>{{ playList[playListIndex].name }}</p>
                <span
                    v-for="(item, index) in playList[playListIndex].ar"
                    :key="index"
                    >{{ item.name }}<i> / </i></span
                >
            </div>
        </div>
        <div class="footerRight">
            <svg
                class="icon liebiao"
                aria-hidden="true"
                v-if="isbtnshow"
                @click="play"
            >
                <use xlink:href="#icon-bofanganniu"></use>
            </svg>
            <svg class="icon liebiao" aria-hidden="true" v-else @click="play">
                <use xlink:href="#icon-weibiaoti--"></use>
            </svg>
            <svg class="icon liebiao" aria-hidden="true">
                <use xlink:href="#icon-zu"></use>
            </svg>
        </div>
        <audio
            ref="audio"
            :src="`https://music.163.com/song/media/outer/url?id=${playList[playListIndex].id}.mp3`"
        ></audio>
        <van-popup
            v-model:show="detailShow"
            position="bottom"
            :style="{ height: '100%', width: '100%' }"
        >
            <MusicDetail
                :musicList="playList[playListIndex]"
                :play="play"
                :isbtnshow="isbtnshow"
                :addDuration="addDuration"
            />
        </van-popup>
    </div>
    <!-- <van-button type="primary">主要按钮</van-button> -->
</template>

<script>
import { mapMutations, mapState } from "vuex";
import MusicDetail from "@/components/item/MusicDetail.vue";
export default {
    data() {
        return {
            interVal: 0,
        };
    },
    computed: {
        ...mapState([
            "playList",
            "playListIndex",
            "isbtnshow",
            "detailShow",
            "footerMusic_ref",
        ]),
    },
    mounted() {
        //console.log(this.$refs);
        //获取歌词
        
        this.$store.dispatch("getLyric", this.playList[this.playListIndex].id);
        //this.updateTime()
        this.updateFootMusicRef(this.$refs.audio);
    },
    updated() {
        this.$store.dispatch("getLyric", this.playList[this.playListIndex].id);
        this.addDuration();
        //console.log(this.addDuration());
        //console.log("update-addduration")
    },
    methods: {
        play: function () {
            if (this.$refs.audio.paused) {
                this.$refs.audio.play();
                this.updateIsbtnshow(false);
                this.updateTime(); //播放就调用函数传值
            } else {
                this.$refs.audio.pause();
                this.updateIsbtnshow(true);
                clearInterval(this.interVal); //暂停清除定时器
            }
        },
        // updateDetailShow:function(){
        //     console.log(111);
        // },
        addDuration: function () {
            this.updateDuration(this.$refs.audio.duration);
            //console.log(this.$refs.audio.duration);
            console.log("addduration");
        },
        updateTime: function () {
            this.interVal = setInterval(() => {
                this.updateCurrentTime(this.$refs.audio.currentTime);
            }, 1000);
        },
        showMusicDetail:function(){
            this.updateDetailShow()
            //console.log(this.playList[this.playListIndex].id)
        },
        ...mapMutations([
            "updateIsbtnshow",
            "updateDetailShow",
            "updateCurrentTime",
            "updateDuration",
            "updateFootMusicRef",
        ]),
    },
    watch: {
        playListIndex: function () {
            //监听如果下标发生了改变就播放(即点击歌单里面的歌就播放)
            this.$refs.audio.autoplay = true;
            this.$refs.audio.play();
            this.updateTime();
            //console.log(this.$refs.audio.paused)
            if (!this.$refs.audio.paused) {
                this.updateIsbtnshow(false); //如果是暂停状态  点击改变图标
                //console.log("isbtnshowchange")
            }
            console.log("playlistindexchange");
        },
        //点击列表第一首歌，playlistindex默认就是0,所以监听不到，要监听列表是否发生变化
        playList: function () {
            this.updateTime();
            if (this.isbtnshow) {
                this.$refs.audio.autoplay = true;
                this.updateIsbtnshow(false);
                //console.log("playlistchange")
            }
            console.log("playlistchange");
        },
    },
    components: {
        MusicDetail,
    },
};
</script>

<style lang="less" scoped>
.FooterMusic {
    width: 100%;
    height: 1.4rem;
    background-color: #fff;
    position: fixed;
    bottom: 0;
    border-top: 1px solid #dcdcdc;
    display: flex;
    padding: 0.2rem;
    justify-content: space-between;
    .footerLeft {
        width: 78%;
        height: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        .content {
            width: 67%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        img {
            width: 1rem;
            height: 1rem;
            border-radius: 50%;
        }
        p {
            font-size: 0.3rem;
            margin-bottom: 0.06rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        span {
            font-size: 0.24rem;
        }
    }
    .footerRight {
        width: 20%;
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .icon {
            width: 0.6rem;
            height: 0.6rem;
        }
    }
}
.FooterMusic .footerLeft .content span:last-of-type i{
    display: none;
}
</style>