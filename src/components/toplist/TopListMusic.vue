<template>
    <div class="toplistmusic">
        <div class="toplistmusic_top">
            <svg class="icon" aria-hidden="true" @click="this.$router.go(-1)">
                <use xlink:href="#icon-zuojiantou"></use>
            </svg>
            <div class="bg">
                <img :src="this.toplist.coverImgUrl" />
            </div>
        </div>
        <div class="topmusiclist">
            <div
                class="item"
                v-for="(item1, index1) in toplist.tracks"
                :key="index1"
                
            >
                <!-- <div class="img">
                    <img :src="item1.al.picUrl" alt="" />
                </div> -->
                <div class="listindex">{{ index1 + 1 }}</div>
                <div class="content" @click="playMusic(index1)">
                    <h4>{{ item1.name }}</h4>
                    <div class="ar">
                        <span
                            v-for="(item2, index2) in item1.ar"
                            :key="index2"
                            >{{ item2.name }}</span
                        >
                        <em class="album"> - {{item1.al.name}}</em>
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
import { getMusicListView } from "@/request/api/item.js";
import { mapMutations } from "vuex";
export default {
    data() {
        return {
            //id:0,
            toplist: {},
            tit:'Mv详情'
        };
    },
    mounted() {
        let id = this.$route.query.id;
        console.log(id);
        this.gettoplist(id);
    },
    methods: {
        gettoplist: async function (id) {
            let res = await getMusicListView(id);
            this.toplist = res.data.playlist;
            console.log(this.toplist);
        },
        playMusic: function (index1) {
            this.updatePlayList(this.toplist.tracks);
            this.updatePlayListIndex(index1);
            //this.updateTime() //播放就调用函数传值
            //console.log(this.itemList)
        },
        goMvView:function(id){
            this.$router.push({path:'/HomeMvView',query:{id:id,tit:this.tit}})
        },
        ...mapMutations([
            "updatePlayList",
            "updatePlayListIndex",
            "updateCurrentTime",
        ]),
    },
};
</script>

<style scoped>
.toplistmusic .toplistmusic_top {
    position: relative;
}
.toplistmusic .toplistmusic_top .icon {
    position: absolute;
    left: 0.3rem;
    top: 0.2rem;
}
.toplistmusic .toplistmusic_top .bg {
    width: 100%;
    height: 4rem;
}
.toplistmusic .toplistmusic_top .bg img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
.fill {
    height: 1.4rem;
    width: 100%;
}
.listindex {
    float: left;
    color: #999;
    margin-top: 0.22rem;
    margin-right: 0.1rem;
}
.topmusiclist {
    padding: 0 0.3rem;
    margin-top: 0.4rem;
}
.topmusiclist .item {
    overflow: hidden;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    /* padding: .3rem .3rem; */
    margin-bottom: 0.4rem;
}
.topmusiclist .item .img {
    width: 0.8rem;
    height: 0.8rem;
    overflow: hidden;
    float: left;
}
.topmusiclist .item .img img {
    width: 100%;
    height: 100%;
}
.topmusiclist .item .content {
    float: left;
    margin-left: 0.2rem;
    width: 75%;
}
.topmusiclist .item .content h4 {
    font-size: 0.3rem;
    margin-bottom: 0.1rem;
    font-weight: normal;
    color: #333;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.topmusiclist .item .content .ar {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.topmusiclist .item .content span,
.topmusiclist .item .content em {
    font-size: 0.26rem;
    color: #999;
}
.topmusiclist .item .content span::after {
    content: "/";
}
.topmusiclist .item .content span:last-of-type::after {
    content: "";
}
.topmusiclist .item .itemRight {
    float: right;
    margin-top: 0.15rem;
}
.topmusiclist .item .itemRight .icon {
    width: 0.4rem;
    height: 0.4rem;
}
.topmusiclist .item .itemRight .icon.liebiao {
    margin-left: 0.2rem;
}

.ar i{
    font-style: normal;
}

em.album{
    font-style: normal;
}

.ar span:last-of-type i{
    display: none;
}
</style>