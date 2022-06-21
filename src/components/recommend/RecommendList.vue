<template>
    <div class="RecommendList">
        <div
            class="item"
            v-for="(item1, index1) in recommendmusicList"
            :key="index1"
            
        >
            <div class="img">
                <img :src="item1.al.picUrl" alt="" />
            </div>
            <div class="content" @click="playMusic(index1)">
                <h4>{{ item1.name }}</h4>
                <div class="ar">
                    <span v-for="(item2, index2) in item1.ar" :key="index2"
                        >{{ item2.name }}<i> / </i></span
                    >
                    <em class="album"> - {{ item1.al.name }}</em>
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
        <div class="fill"></div>
    </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
    setup(props) {
        console.log(props);
    },
    props: ["recommendmusicList"],
    methods: {
        playMusic: function (index1) {
            this.updatePlayList(this.recommendmusicList);
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
.RecommendList {
    padding: 0 0.3rem;
    margin-top: 0.4rem;
}
.RecommendList .item {
    overflow: hidden;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    //padding: .3rem .3rem;
    margin-bottom: 0.4rem;
}
.RecommendList .item .img {
    width: 0.8rem;
    height: 0.8rem;
    overflow: hidden;
    float: left;
}
.RecommendList .item .img img {
    width: 100%;
    height: 100%;
}
.RecommendList .item .content {
    float: left;
    margin-left: 0.2rem;
    width: 60%;
}
.RecommendList .item .content h4 {
    font-size: 0.3rem;
    margin-bottom: 0.1rem;
    font-weight: normal;
    color: #333;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.RecommendList .item .content .ar {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.RecommendList .item .content span,
.RecommendList .item .content em {
    font-size: 0.26rem;
    color: #999;
}
.RecommendList .item .itemRight {
    float: right;
    margin-top: 0.15rem;
}
.RecommendList .item .itemRight .icon {
    width: 0.4rem;
    height: 0.4rem;
}
.RecommendList .item .itemRight .icon.liebiao {
    margin-left: 0.2rem;
}

.ar i {
    font-style: normal;
}

em.album {
    font-style: normal;
}

.ar span:last-of-type i {
    display: none;
}
</style>