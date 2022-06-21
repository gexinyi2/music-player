<template>
    <div class="homemvview">
        <div class="homemvview_top">
            <svg class="icon" aria-hidden="true" @click="goback">
                <use xlink:href="#icon-zuojiantou"></use>
            </svg>
            <p class="tit">{{ this.tit }}</p>
        </div>
        <video :src="this.videourl" controls autoplay></video>
        <div class="comment">
            <div class="tit">
                <h2>最新评论({{this.mvcomment.length}})</h2>
            </div>
            <div class="comment_list">
                <div class="list" v-for="(item1,index1) in mvcomment" :key="index1">
                    <div class="touxiang">
                        <img :src="item1.user.avatarUrl" />
                    </div>
                    <div class="list_text">
                        <div class="text1">
                            <span class="name">{{item1.user.nickname}}:</span>
                            <span class="content">{{item1.content}}</span>
                        </div>
                        <div class="text2" v-show="item1.beReplied.length" v-for="(item2,index2) in item1.beReplied" :key="index2">
                            <span class="name">@{{item2.user.nickname}}:</span>
                            <span class="content">{{item2.content}}</span>
                        </div>
                        <span class="time">{{item1.timeStr}}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getMvUrl, getMvComment } from "@/request/api/home.js";
import { mapMutations, mapState } from "vuex";
export default {
    data() {
        return {
            id: "",
            videourl: "",
            tit: "Mv详情",
            mvcomment:[],
        };
    },
    computed: {
        ...mapState(["footerMusic_ref"]),
    },
    mounted() {
        this.id = this.$route.query.id;
        if(this.$route.query.tit){
            this.tit = this.$route.query.tit;
        }
        
        //console.log(this.tit)
        //console.log(this.id)
        this.getvideourl();
        this.footerMusic_ref.pause();
        this.updateIsbtnshow(true);
        this.getMvCommentlist()
    },
    methods: {
        getvideourl: async function () {
            let res = await getMvUrl(this.id);
            this.videourl = res.data.data.url;
        },
        getMvCommentlist: async function(){
            let res = await getMvComment(this.id);
            this.mvcomment = res.data.comments
            console.log(this.mvcomment)
        },
        goback: function () {
            this.$router.go(-1);
        },
        ...mapMutations(["updateIsbtnshow"]),
    },
};
</script>

<style scoped>
.comment {
    margin-top: 0.6rem;
    padding: 0 0.3rem;
}
.comment .tit h2 {
    font-size: 0.32rem;
    margin-bottom: 0.4rem;
}
.comment .list {
    overflow: hidden;
    margin-bottom: .5rem;
}
.comment .list .touxiang {
    float: left;
    width: .9rem;
    height: .9rem;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 0.3rem;
}
.comment .list .touxiang img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
.comment .list .list_text {
    float: left;
    width: 80%;
}
.comment .list .list_text .name {
    color: rgb(29, 95, 219);
    font-size: 0.28rem;
}
.comment .list .list_text .content {
    font-size: 0.28rem;
    color: #666;
    line-height: .42rem;
}
.comment .list .list_text .text1{
    margin-bottom: .2rem;
}
.comment .list .list_text .text2{
    background-color: #eee;
    width: 100%;
    box-sizing: border-box;
    padding: .06rem .1rem;
    border-radius: 5px;
    margin-bottom: .2rem;
}
.comment .list .list_text .time{
    font-size: .26rem;
    color: #999;
}
.homemvview video {
    width: 100%;
    height: 4rem;
    display: block;
    /* object-fit: cover; */
}
.homemvview .homemvview_top {
    position: relative;
}
.homemvview .homemvview_top .icon {
    position: absolute;
    left: 0.3rem;
    top: 0.2rem;
}
.homemvview .homemvview_top .tit {
    text-align: center;
    line-height: 1rem;
}
</style>