<template>
    <div class="similar">
        <div class="similarTop">
            <div class="title">{{ this.artist }}相似歌手</div>
            <!-- <div class="more">查看更多</div> -->
        </div>
        <div class="similarContent">
            <div class="item" v-for="(item,index) in similarlist" :key="index" @click="goarview(item.id)">
                <div class="img">
                    <img :src="item.img1v1Url" />
                </div>
                <p>{{item.name}}</p>
            </div>
        </div>
    </div>
</template>

<script>
import { getAr, getSimilar } from "@/request/api/home.js";
export default {
    data() {
        return {
            id: 11257, //11257 cblock,  12107961 xxxtentacion
            artist: "",
            similarlist: [],
            //ardata:{},
        };
    },
    mounted() {
        this.getArdata();
        this.getSimilardata();
        //console.log(this.similarlist)
    },
    methods: {
        getArdata: async function () {
            let res = await getAr(this.id);
            this.artist = res.data.data.artist.name;
            //console.log(this.ardata.artist.name)
        },
        getSimilardata: async function () {
            let res = await getSimilar(this.id);
            for(let i = 0 ; i < 6 ; i++){
                this.similarlist[i] = res.data.artists[i]
            }
            //console.log(this.similarlist);
        },
        goarview(id){
            this.$router.push({path:'/Arview',query:{id:id}})
        },
    },
};
</script>

<style lang="less" scoped>
.similar {
    width: 100%;
    //height: 5rem;
    padding: 0.2rem;
    .similarTop {
        width: 100%;
        height: 0.6rem;
        display: flex;
        justify-content: space-between;
        margin-bottom: 0.35rem;
        .title {
            font-size: 0.4rem;
            font-weight: 900;
        }
    }
    .similarContent {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
        .item {
            width: 32%;
            margin-bottom: 0.3rem;
            .img {
                width: 100%;
                height: 2.5rem;
                margin-bottom: 0.15rem;
                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
            }
            p {
                font-size: 0.26rem;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            
        }
        
    }
}
.similar .similarContent::after{
    content: '';
    width: 32%;
}
</style>