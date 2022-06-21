<template>
    <div class="toplistview">
        <div class="tit">
            <svg class="icon" aria-hidden="true" @click="this.$router.go(-1)">
                <use xlink:href="#icon-zuojiantou"></use>
            </svg>
            <h2>官方榜</h2>
        </div>
        <div
            class="list"
            v-for="(item1, index1) in toplist.slice(0, 4)"
            :key="index1"
        >
            <router-link
                :to="{ name: 'TopListMusic', query: { id: item1.id } }"
            >
                <div class="list_tit">
                    <h4>{{ item1.name }}</h4>
                    <span>{{ item1.updateFrequency }}</span>
                </div>
                <div class="content">
                    <div class="img">
                        <img :src="item1.coverImgUrl" />
                    </div>
                    <div class="text">
                        <div
                            class="text_list"
                            v-for="(item2, index2) in item1.tracks"
                            :key="index2"
                        >
                            <em class="index" ref="index">{{ index2 + 1 }}</em>
                            <span class="song" ref="song">{{
                                item2.first
                            }}</span>
                            <span class="ar" ref="ar">-{{ item2.second }}</span>
                        </div>
                    </div>
                </div>
            </router-link>
        </div>
        <div class="global">
            <div class="tit">
                <h2>全球榜</h2>
            </div>
            <div class="global_list">
                <div
                    class="item"
                    v-for="(item3, index3) in toplist.slice(4, toplist.length)"
                    :key="index3"
                >
                    <router-link
                        :to="{ name: 'TopListMusic', query: { id: item3.id } }"
                    >
                        <div class="img">
                            <img :src="item3.coverImgUrl" />
                        </div>
                        <p>{{ item3.name }}</p>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
    <div class="fill"></div>
</template>

<script>
import { getToplist } from "@/request/api/toplist.js";
export default {
    data() {
        return {
            toplist: [],
        };
    },
    methods: {
        gettoplistdata: async function () {
            let res = await getToplist();
            this.toplist = res.data.list;
            console.log(this.toplist);
        },
    },
    mounted() {
        this.gettoplistdata();
    },
    computed: {},
};
</script>

<style scoped>
.fill {
    height: 1.4rem;
    width: 100%;
}
.toplistview {
    background-color: #f2f2f2;
    padding-bottom: 0.4rem;
}
.tit {
    position: relative;
    padding: 0.3rem 0;
}
.tit h2 {
    color: #000;
    font-weight: normal;
    font-size: 0.36rem;
    text-align: center;
}
.tit .icon {
    position: absolute;
    left: 0.3rem;
}
.toplistview .list {
    background-color: #fff;
    width: 92%;
    margin: 0 auto;
    box-sizing: border-box;
    border-radius: 15px;
    padding: 0.3rem 0.2rem;
    margin-bottom: 0.3rem;
}
.list .list_tit {
    overflow: hidden;
    margin-bottom: 0.3rem;
}
.list .list_tit h4 {
    float: left;
    font-weight: normal;
    color: #000;
    font-size: 0.3rem;
}
.list .list_tit span {
    float: right;
    color: #999;
    font-size: 0.24rem;
}
.toplistview .list .content {
    overflow: hidden;
}

.toplistview .list .content .img {
    width: 1.6rem;
    height: 1.6rem;
    overflow: hidden;
    border-radius: 5px;
    float: left;
    margin-right: 0.4rem;
}
.toplistview .list .content .img img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
.toplistview .list .content .text {
    float: left;
    width: 68%;
}
.toplistview .list .content .text .text_list {
    margin-bottom: 0.28rem;
    /* height: 20px;
    overflow: hidden; */
}
.toplistview .list .content .text .text_list:last-child {
    margin-bottom: 0;
}
.toplistview .list .content .text em {
    font-style: normal;
    font-weight: bold;
    color: #333;
    display: inline-block;
    padding-right: 0.12rem;
    font-size: 0.3rem;
    box-sizing: border-box;
}
.toplistview .list .content .text span.song {
    font-size: 0.28rem;
    color: #333;
    display: inline-block;
    padding-right: 0.06rem;
    box-sizing: border-box;
}
.toplistview .list .content .text span.ar {
    font-size: 0.24rem;
    color: #999;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: inline-block;
    width: 44%;
    transform: translate(0, 3px);
}
.global .global_list {
    padding: 0 0.3rem;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
}
.global .global_list::after {
    content: "";
    width: 31%;
}
.global .global_list .item {
    width: 31%;
    margin-bottom: 0.3rem;
}
.global .global_list .item .img {
    width: 100%;
    height: 2.2rem;
    overflow: hidden;
    border-radius: 5px;
    margin-bottom: 0.2rem;
}

.global .global_list .item .img img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
.global .global_list .item p {
    font-size: 0.28rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>