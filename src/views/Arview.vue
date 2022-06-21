<template>
    <div class="arview">
        <div class="bg">
            <svg class="icon" aria-hidden="true" @click="this.$router.go(-1)">
                <use xlink:href="#icon-zuojiantou"></use>
            </svg>
            <img :src="this.bg" />
        </div>
        <div class="info1">
            <div class="info1_box">
                <div class="img">
                    <img :src="this.touxiang" />
                </div>
                <h4>{{ this.name }}</h4>
                <span>{{ changenum(this.followCnt) }}关注</span>
                <span>{{ changenum(this.fansCnt) }}粉丝</span>
                <p>{{ this.desc_tit }}</p>
                <p>{{ this.followDay }}</p>
            </div>
        </div>
        <div class="info2">
            <div class="info2_box">
                <h4>艺人百科</h4>
                <p>{{ this.desc_tit }}</p>
                <p>艺人名：{{this.name}}</p>
                <p>身份：<span v-for="(item,index) in shenfen.slice(0,4)" :key="index">{{item}}</span></p>
                <p>个人简介：{{this.signature}}</p>
                <p>歌手简介：{{this.desc}}</p>
            </div>
        </div>
    </div>
    <ArMusicList :arsonglist="this.arsonglist"/>
    <div class="fill"></div>
</template>

<script>
import { getAr, getFanNum,getArSong } from "@/request/api/home.js";
import ArMusicList from "@/components/ar/ArMusicList.vue"
export default {
    data() {
        return {
            id: 0,
            ardatalist: {},
            name: "",
            desc_tit: "",
            desc: "",
            signature: "",
            bg: "",
            touxiang: "",
            fansCnt: 0,
            followCnt: 0,
            followDay: "",
            shenfen:[],
            arsonglist:{},
        };
    },
    mounted() {
        //let vm = this;
        this.id = this.$route.query.id;
        this.getArdata();
        this.getFanNumdata();
        this.getArSongdata()
        //console.log(this.fandatalist)
    },
    methods: {
        getFanNumdata: async function () {
            let res = await getFanNum(this.id);
            this.fansCnt = res.data.data.fansCnt;
            this.followCnt = res.data.data.followCnt;
            this.followDay = res.data.data.followDay;
            //console.log(res);
        },
        getArdata: async function () {
            let res = await getAr(this.id);
            this.ardatalist = res.data.data;
            //console.log(this.ardatalist);
            this.name = this.ardatalist.artist.name;
            this.desc = this.ardatalist.artist.briefDesc;
            this.bg = this.ardatalist.user.backgroundUrl;
            this.touxiang = this.ardatalist.user.avatarUrl;
            this.desc_tit = this.ardatalist.user.description;
            this.signature = this.ardatalist.user.signature;
            for(let i = 0;i<this.ardatalist.secondaryExpertIdentiy.length;i++){
                if(this.ardatalist.secondaryExpertIdentiy[i].expertIdentiyName==="演唱"){
                    this.ardatalist.secondaryExpertIdentiy[i].expertIdentiyName="歌手"
                }
                this.shenfen[i] = this.ardatalist.secondaryExpertIdentiy[i].expertIdentiyName
            }
            //this.$set()
            //console.log(this.shenfen)
            //console.log(this.ardatalist);
        },
        getArSongdata:async function(){
            let res = await getArSong(this.id)
            this.arsonglist = res.data.songs
            console.log(this.arsonglist)
        },
        changenum: function (data) {
            if (data >= 10000) {
                return (data / 10000).toFixed(1) + "万";
            } else if (data >= 100000000) {
                return (data / 100000000).toFixed(1) + "亿";
            } else {
                return data;
            }
        },
    },
    components:{
        ArMusicList,
    },
};
</script>

<style scoped>
.fill {
    height: 1.4rem;
    width: 100%;
}
.bg {
    width: 100%;
    height: 6rem;
    position: relative;
}
.bg .icon {
    position: absolute;
    left: 0.3rem;
    top: 0.2rem;
    fill: #fff;
}
.bg img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
.info1 {
    background-color: #f8f8f8;
    padding: 0 0.3rem;
}
.info1 .info1_box {
    width: 100%;
    background-color: #fff;
    border-radius: 10px;
    transform: translate(0, -20px);
    text-align: center;
    position: relative;
    box-sizing: border-box;
    padding: 0.8rem 0 0.4rem;
}
.info1 .img {
    width: 1.4rem;
    height: 1.4rem;
    margin: 0 auto;
    /* margin-bottom: .2rem; */
    border-radius: 50%;
    overflow: hidden;
    position: absolute;
    left: 0;
    right: 0;
    top: -0.75rem;
    margin: auto;
    /* transform: translate(0, -30px); */
}
.info1 .img img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
.info1 .info1_box h4 {
    font-size: 0.3rem;
    font-weight: 600;
    color: #333;
    margin-bottom: 0.1rem;
}
.info1 .info1_box span {
    color: #999;
    font-size: 0.24rem;
    display: inline-block;
}
.info1 .info1_box span:first-of-type {
    margin-right: 0.15rem;
}
.info1 .info1_box p {
    font-size: 0.24rem;
    color: #999;
    margin-top: 0.1rem;
}
.info2 {
    background-color: #f8f8f8;
    padding: 0 0.3rem;
    padding-bottom: 0.3rem;
}
.info2 .info2_box {
    background-color: #fff;
    border-radius: 10px;
    padding: 0.3rem 0.4rem;
}
.info2 .info2_box h4 {
    font-size: 0.3rem;
    font-weight: 600;
    color: #333;
    margin-bottom: 0.14rem;
}
.info2 .info2_box p {
    color: #999;
    font-size: 0.24rem;
    line-height: 0.44rem;
}
.info2 .info2_box p:nth-of-type(4),
.info2 .info2_box p:nth-of-type(5) {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
.info2 .info2_box p span::after{
    content: '、';
    color: #999;
    font-size: 0.24rem;
    line-height: 0.44rem;
}
.info2 .info2_box p span:last-of-type::after{
    content: '';
}
</style>