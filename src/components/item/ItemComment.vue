<template>
    <div class="itemcomment">
        <div class="itemMusicTop">
            <img :src="this.coverurl" alt="" class="bgimg" />
            <div class="itemLeft">
                <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
                    <use xlink:href="#icon-zuojiantou"></use>
                </svg>
                <span>歌单评论</span>
            </div>
            <div class="itemRight">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-sousuo"></use>
                </svg>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-31liebiao"></use>
                </svg>
            </div>
        </div>
        <div class="itemTopContent">
            <div class="contentLeft">
                <img :src="this.coverurl" alt="" />
            </div>
            <div class="contentRight">
                <p class="rightP_one">{{ this.playlist.name }}</p>
                <div class="right_img">
                    <img :src="this.bgurl" alt="" />
                    <span>{{ this.nickname }}</span>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-youjiantou"></use>
                    </svg>
                </div>
                <p class="rightP_two">
                    <span>{{ this.playlist.description }}</span>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-youjiantou"></use>
                    </svg>
                </p>
            </div>
        </div>
    </div>
    <div class="comment">
        <div class="tit">
            <h2>最新评论({{ this.itemcomment.length }})</h2>
        </div>
        <div class="comment_list">
            <div
                class="list"
                v-for="(item1, index1) in itemcomment"
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
    <div class="fill"></div>
</template>

<script>
import { getMusicListView, getMusicListComment } from "@/request/api/item.js";
export default {
    data() {
        return {
            id: 0,
            playlist: {},
            bgurl: "",
            coverurl: "",
            nickname: "",
            itemcomment: {},
        };
    },
    mounted() {
        console.log(this.$route.query.id);
        this.id = this.$route.query.id;
        this.getMusicListdata();
        // if ((this.playlist.creator = '')) {
        //     this.playlist.creator = JSON.parse(sessionStorage.getItem("itemDetail")).playlist.creator
        // }
        //this.playlist.creator = JSON.parse(sessionStorage.getItem("itemDetail")).playlist.creator
        //console.log(this.playlist.creator)
        this.getMusiCommentdata();
    },
    methods: {
        getMusicListdata: async function () {
            let res = await getMusicListView(this.id);
            this.playlist = res.data.playlist;
            this.coverurl = res.data.playlist.coverImgUrl;
            this.bgurl = res.data.playlist.creator.backgroundUrl;
            //console.log(this.bgurl)
            console.log(this.playlist.coverImgUrl);
            this.nickname = res.data.playlist.creator.nickname;
            console.log(this.playlist);
        },
        getMusiCommentdata: async function () {
            let res = await getMusicListComment(this.id);
            this.itemcomment = res.data.comments;
            console.log(res);
        },
    },
};
</script>

<style lang="less" scoped>
.fill {
    height: 1.4rem;
    width: 100%;
}
.itemMusicTop {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    // padding: .2rem;
    position: relative;
    .itemLeft,
    .itemRight {
        width: 25%;
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 0 0.2rem;
        span {
            font-size: 0.3rem;
            color: #fff;
        }
        .icon {
            fill: #fff; //填充颜色
        }
    }
    .bgimg {
        width: 100%;
        height: 10rem;
        position: absolute;
        z-index: -1;
        filter: blur(30px);
    }
}
.itemTopContent {
    width: 100%;
    height: 3rem;
    padding: 0.2rem;
    margin-top: 0.4rem;
    display: flex;
    justify-content: space-between;
    .contentLeft {
        width: 36%;
        height: 2.6rem;
        position: relative;

        img {
            width: 2.6rem;
            height: 2.6rem;
            border-radius: 0.2rem;
            position: absolute;
            z-index: -1;
        }
        .palyCount {
            position: absolute;
            right: 0.1rem;
            margin-top: 0.1rem;
            .icon {
                width: 0.26rem;
                height: 0.26rem;
                margin-top: -0.02rem;
                vertical-align: middle;
                margin-right: 0.06rem;
            }
            span {
                font-size: 0.26rem;
                color: #fff;
            }
        }
    }
    .contentRight {
        width: 60%;
        height: 2.6rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .rightP_one {
            font-size: 0.3rem;
            font-weight: 900;
            color: #fff;
            font-family: "微软雅黑";
        }
        .right_img {
            width: 100%;
            height: 0.6rem;
            line-height: 0.6rem;
            color: #ccc;
            img {
                width: 0.6rem;
                height: 0.6rem;
                border-radius: 50%;
                vertical-align: middle;
            }
            span {
                margin-left: 0.1rem;
                font-size: 0.3rem;
            }
            .icon {
                width: 0.26rem;
                height: 0.26rem;
                margin-top: -0.08rem;
                vertical-align: middle;
            }
        }
        .rightP_two {
            width: 100%;
            height: 0.6rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            span {
                display: inline-block;
                width: 95%;
                height: 100%;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                font-size: 0.24rem;
                color: #ccc;
            }
            .icon {
                width: 0.24rem;
                height: 0.24rem;
            }
        }
    }
}
.itemTopFooter {
    width: 100%;
    height: 1.4rem;
    display: flex;
    justify-content: space-around;
    margin-top: 0.2rem;
    .footerItem {
        display: flex;
        flex-direction: column;
        align-items: center;
        color: #fff;
        .icon {
            fill: #fff;
        }
        span {
            margin-top: 0.1rem;
            font-size: 0.28rem;
        }
    }
}
.comment {
    margin-top: 1.2rem;
    padding: 0 0.3rem;
}
.comment .tit h2 {
    font-size: 0.32rem;
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