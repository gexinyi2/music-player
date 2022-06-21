<template>
    <div class="albumtop">
        <div class="bg">
            <img :src="albumdetail.blurPicUrl" />
        </div>
        <div class="tit">
            <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
                <use xlink:href="#icon-zuojiantou"></use>
            </svg>
            <span>专辑</span>
        </div>
        <div class="content">
            <div class="img">
                <img :src="albumdetail.picUrl" />
            </div>
            <div class="text">
                <h4>{{albumdetail.name}}</h4>
                <p>歌手：{{albumdetail.artist.name}}</p>
                <p>发行时间：{{changetime(albumdetail.publishTime)}}</p>
                <p>{{albumdetail.description}}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    // props: {
    //     albumdetail: {
    //         type: Object,
    //     },
    // },
    //mounted() {},
    setup(props){
        //console.log(props.albumdetail.artist)
        //避免获取不到数据，将数据存进session
        if ((props.albumdetail.artist = "")) {
            props.albumdetail.artist = JSON.parse(
                sessionStorage.getItem().albumdetail
            ).artist;
        }
        function changetime(data){
            let time = new Date(data)
            let y = time.getFullYear();
            let m = time.getMonth()+1;
            let d = time.getDate();
            return y+'-'+m+'-'+d
        }
        return{changetime}
    },
    props: ["albumdetail"],
};
</script>

<style>
.albumtop {
    position: relative;
}
.albumtop .bg {
    position: absolute;
    width: 100%;
    height: 4.5rem;
    z-index: -1;
}
.albumtop .bg img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: blur(30px);
}
.albumtop .tit {
    text-align: center;
    color: #fff;
    font-size: 0.3rem;
    padding-top: 0.3rem;
    position: relative;
}
.albumtop .tit .icon {
    position: absolute;
    left: 0.3rem;
    top: 0.26rem;
    fill: #fff;
}
.albumtop .content {
    overflow: hidden;
    margin-top: 0.8rem;
    padding: 0 0.3rem;
}
.albumtop .content .img {
    float: left;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 10px;
    overflow: hidden;
}
.albumtop .content .img img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
.albumtop .content .text {
    float: left;
    margin-left: 0.3rem;
    width: 59%;
}
.albumtop .content .text h4 {
    color: #fff;
    font-size: 0.3rem;
    font-weight: normal;
    margin-bottom: 0.16rem;
}
.albumtop .content .text p {
    font-size: 0.24rem;
    color: #eee;
    line-height: 0.4rem;
}
.albumtop .content .text p:nth-of-type(1) {
    margin-bottom: 0.3rem;
}
.albumtop .content .text p:nth-of-type(3) {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
</style>