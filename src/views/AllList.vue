<template>
    <div class="alllist">
        <div class="tit">
            <svg class="icon" aria-hidden="true" @click="this.$router.go(-1)">
                <use xlink:href="#icon-zuojiantou"></use>
            </svg>
            <h2>精品歌单</h2>
        </div>
        <div
            class="list_top"
            v-for="(item1, index1) in playlist.slice(0, 1)"
            :key="index1"
        >
            <router-link :to="{path:'/ItemMusic',query:{id:item1.id}}">
                <div class="bg">
                    <img :src="item1.coverImgUrl" />
                </div>
                <div class="top_box">
                    <div class="img">
                        <img :src="item1.coverImgUrl" />
                    </div>
                    <div class="text">
                        <h4>精品歌单</h4>
                        <p>{{ item1.name }}</p>
                    </div>
                </div>
            </router-link>
        </div>
        <div class="list_box">
            <div
                class="list"
                v-for="(item2, index2) in playlist.slice(1, playlist.length)"
                :key="index2"
            >
                <router-link
                    :to="{ path: '/ItemMusic', query: { id: item2.id } }"
                >
                    <div class="img">
                        <div class="playnum">
                            <svg
                                t="1655729402356"
                                class="icon"
                                viewBox="0 0 1024 1024"
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                                p-id="3818"
                            >
                                <path
                                    d="M862.272595 605.405343l-41.589211 0c0-208.754464-34.268478-428.440909-301.521265-428.440909-213.875089 0-322.31587 136.798643-322.31587 428.440909l-41.589211 0c0-312.108391 125.833917-470.03012 363.90508-470.03012C826.704518 135.376247 862.272595 396.650879 862.272595 605.405343z"
                                    p-id="3819"
                                ></path>
                                <path
                                    d="M224.122477 859.601766l-16.568351 3.849678c-56.153928 13.047154-106.165971-31.03176-124.684744-110.736057-18.507516-79.656201 6.927783-141.315516 63.081711-154.36267l16.576537-3.851725L224.122477 859.601766zM138.093125 639.657448c-27.721365 18.498306-31.527041 64.72821-21.605064 107.428731 9.925047 42.716894 33.727149 82.550111 66.760496 86.914512L138.093125 639.657448z"
                                    p-id="3820"
                                ></path>
                                <path
                                    d="M257.088286 886.868783l-0.824785 0.191358c-31.746028 7.375991-63.578014-12.446473-70.954005-44.192501l-50.241264-216.235856c-7.375991-31.746028 12.455683-63.571874 44.202735-70.947865 32.571836-7.567349 64.403822 12.254092 71.779813 44.00012l50.241264 216.235856C308.665988 847.666946 288.834314 879.492792 257.088286 886.868783zM187.794084 588.630285c-14.303774 3.323699-22.720468 16.824177-19.589151 30.303166l50.241264 216.235856c3.131317 13.477966 16.638959 21.88545 30.116925 18.754133l0.824785-0.191358c13.477966-3.131317 21.895683-16.632819 18.764366-30.110785l-50.241264-216.235856C214.779691 593.905428 201.27205 585.497944 187.794084 588.630285z"
                                    p-id="3821"
                                ></path>
                                <path
                                    d="M861.758895 591.985706l16.521279 3.838422c55.965639 13.003152 81.316004 74.455759 62.869886 153.844877-18.456351 79.437214-68.300572 123.367749-124.266212 110.364597l-16.513092-3.836375L861.758895 591.985706zM841.108576 830.683133c32.921807-4.350075 56.644091-44.050262 66.536392-86.62287 9.888208-42.557258 6.094812-88.632643-21.533432-107.068528L841.108576 830.683133z"
                                    p-id="3822"
                                ></path>
                                <path
                                    d="M723.463156 812.663734l50.072419-215.510332c7.351432-31.639604 39.076994-51.395554 71.538313-43.852764 31.639604 7.351432 51.404764 39.070854 44.054355 70.710458l-50.072419 215.510332c-7.351432 31.639604-39.076994 51.395554-70.716598 44.044122l-0.822738-0.191358C735.876883 876.021737 716.111724 844.303338 723.463156 812.663734zM806.561759 604.826152 756.48934 820.336484c-3.121084 13.43294 5.26798 26.889417 18.700921 30.010501l0.822738 0.191358c13.43294 3.121084 26.895557-5.257747 30.016641-18.690688l50.072419-215.510332c3.121084-13.43294-5.26798-26.889417-19.523659-30.200836C823.144436 583.01438 809.682843 591.393211 806.561759 604.826152z"
                                    p-id="3823"
                                ></path>
                            </svg>
                            <span>{{ changeCount(item2.playCount) }}</span>
                        </div>
                        <img :src="item2.coverImgUrl" />
                    </div>
                    <p>{{ item2.name }}</p>
                    <span class="nickname"
                        >by {{ item2.creator.nickname }}</span
                    >
                </router-link>
            </div>
        </div>
    </div>
    <div class="fill"></div>
</template>

<script>
import { getAllList, getLoginUser } from "@/request/api/home.js";
export default {
    data() {
        return {
            playlist: [],
            //bgurl:'@/assets/test1.jpg'
            id: 0,
        };
    },
    mounted() {
        this.getalllistdata();
        //this.getnickname()
    },
    methods: {
        getalllistdata: async function () {
            let res = await getAllList();
            this.playlist = res.data.playlists;
            console.log(this.playlist);
        },
        // getnickname: async function (id) {
        //     let res = await getLoginUser(id);
        //     let nickname = res.data.profile.nickname;
        //     return nickname;
        // },
        // 对播放量的处理
        changeCount: function (num) {
            if (num >= 100000000) {
                return (num / 100000000).toFixed(1) + "亿";
            } else if (num >= 10000) {
                return (num / 10000).toFixed(1) + "万";
            }
        },
    },
};
</script>

<style scoped>
.tit {
    position: relative;
    padding: 0.3rem 0 0.6rem;
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
.alllist {
    padding: 0 0.3rem;
}
.alllist .list_top {
    position: relative;
    /* padding-top: .6rem; */
}
.alllist .list_top .top_box {
    overflow: hidden;
    padding: 0 0.2rem;
    padding-top: 0.3rem;
}
.alllist .list_top .top_box .img {
    float: left;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 10px;
    overflow: hidden;
    margin-right: 0.2rem;
}
.alllist .list_top .top_box .img img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
.alllist .list_top .top_box .text {
    float: left;
    width: 58%;
}
.alllist .list_top .top_box .text h4 {
    font-size: 0.28rem;
    color: chocolate;
    text-align: center;
    display: inline-block;
    padding: 0.06rem 0.2rem;
    border-radius: 25px;
    border: 1px solid chocolate;
    margin-top: 0.4rem;
    margin-bottom: 0.4rem;
}
.alllist .list_top .top_box .text p {
    color: #fff;
    font-size: 0.26rem;
}
.alllist .list_top .bg {
    position: absolute;
    width: 100%;
    height: 3rem;
    /* filter: blur(10px); */
    z-index: -1;
    border-radius: 10px;
    overflow: hidden;
    background-position: center;
    background-size: cover;
}
.alllist .list_top .bg img {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    filter: blur(15px);
    top: 0;
    left: 0;
    object-fit: cover;
    z-index: 1;
}
/* .alllist .list_top .bg img {
    width: 100%;
    height: 100%;
    object-fit: cover;
} */
.list_box {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    margin-top: 0.8rem;
}
.list_box .list {
    width: 47%;
    margin-bottom: 0.3rem;
}
.list_box .list .img {
    width: 100%;
    height: 3.2rem;
    overflow: hidden;
    border-radius: 5px;
    margin-bottom: 0.16rem;
    position: relative;
}
.list_box .list .img img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
.list_box .list p {
    font-size: 0.28rem;
    color: #333;
    margin-bottom: 0.06rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.list_box .list span.nickname {
    color: #999;
    font-size: 0.24rem;
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.list_box .list .playnum {
    position: absolute;
    bottom: 0;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    overflow: hidden;
    padding: 0.1rem 0;
}
.list_box .list .playnum .icon {
    fill: #fff;
    width: 0.35rem;
    height: 0.35rem;
    float: left;
    margin-left: 0.2rem;
    margin-right: 0.1rem;
}

.list_box .list .playnum span {
    color: #fff;
    font-size: 0.24rem;
}
</style>