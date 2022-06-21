<template>
    <div class="musiccomment">
        <div class="musiccomment_top">
            <svg class="icon" aria-hidden="true" @click="goback()">
                <use xlink:href="#icon-zuojiantou"></use>
            </svg>
            <span>歌曲评论</span>
        </div>
        <div class="musiccomment_music">
            <div class="img">
                <img :src="playList[playListIndex].al.picUrl" />
            </div>
            <div class="content">
                <p>{{ playList[playListIndex].name }}-</p> 
                <span
                    class="ar"
                    v-for="item in playList[playListIndex].ar"
                    :key="item"
                    >{{ item.name }}</span
                >
            </div>
        </div>
        <div class="separate"></div>
        <div class="comment">
        <div class="tit">
            <h2>最热评论({{ this.musiccomment.length }})</h2>
        </div>
        <div class="comment_list">
            <div
                class="list"
                v-for="(item1, index1) in musiccomment"
                :key="index1"
            >
                <div class="touxiang">
                    <img :src="item1.user.avatarUrl" />
                </div>
                <div class="list_text">
                    <div class="text1">
                        <span class="name">{{ item1.user.nickname }}:</span>
                        <span class="content">{{ item1.content }}</span>
                    </div>
                    <div
                        class="text2"
                        v-show="item1.beReplied.length"
                        v-for="(item2, index2) in item1.beReplied"
                        :key="index2"
                    >
                        <span class="name">@{{ item2.user.nickname }}:</span>
                        <span class="content">{{ item2.content }}</span>
                    </div>
                    <span class="time">{{ item1.timeStr }}</span>
                </div>
            </div>
        </div>
    </div>
    </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import { getHotComment } from "@/request/api/item.js";
export default {
    data() {
        return {
            //id: 0,
            musiccomment:{},
        };
    },
    mounted() {
        //this.id = this.$route.query.id;
        this.getHotCommentdata();
    },
    computed: {
        ...mapState(["playListIndex", "playList"]),
    },
    methods: {
        goback: function () {
            this.$router.go(-1);
            this.updateDetailShow();
        },
        getHotCommentdata: async function () {
            let res = await getHotComment(this.playList[this.playListIndex].id);
            console.log(res);
            this.musiccomment = res.data.hotComments;
        },
        ...mapMutations(["updateDetailShow"]),
    },
};
</script>

<style scoped>
/* .musiccomment{
    padding: 0 .3rem;
} */
.musiccomment_top {
    text-align: center;
    position: relative;
    margin-bottom: 0.4rem;
    padding: 0 .3rem;
    padding-top: 0.3rem;
}
.musiccomment_top .icon {
    position: absolute;
    left: .3rem;
    top: 0.26rem;
}
.musiccomment_top span {
    display: block;
    text-align: center;
    font-size: 0.3rem;
}
.musiccomment_music{
    overflow: hidden;
    padding: 0 .3rem;
    margin-bottom: .2rem;
}
.musiccomment_music .img{
    width: .6rem;
    height: .6rem;
    border-radius: 50%;
    overflow: hidden;
    float: left;
    margin-right: .16rem;
}
.musiccomment_music .img img{
    width: 100%;
    height: 100%;
    object-fit: cover;
}
.musiccomment_music .content{
    float: left;
    margin-top: .1rem;
}
.musiccomment_music p{
    display: inline-block;
    font-size: .26rem;
}
.musiccomment_music span{
    font-size: .26rem;
    color: #999;
}
.musiccomment_music span::after{
    content: '/';
}
.musiccomment_music span:last-child::after{
    content: '';
}
.separate{
    width: 100%;
    height: .1rem;
    background-color: #eee;
}

.comment {
    margin-top: .5rem;
    padding: 0 0.3rem;
}
.comment .tit h2 {
    font-size: 0.3rem;
    margin-bottom: 0.4rem;
}
.comment .list {
    overflow: hidden;
    margin-bottom: 0.5rem;
}
.comment .list .touxiang {
    float: left;
    width: 0.9rem;
    height: 0.9rem;
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
    line-height: 0.42rem;
}
.comment .list .list_text .text1 {
    margin-bottom: 0.2rem;
}
.comment .list .list_text .text2 {
    background-color: #eee;
    width: 100%;
    box-sizing: border-box;
    padding: 0.06rem 0.1rem;
    border-radius: 5px;
    margin-bottom: 0.2rem;
}
.comment .list .list_text .time {
    font-size: 0.26rem;
    color: #999;
}
</style>