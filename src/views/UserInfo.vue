<template>
    <!-- <div class="infoUserTop">
        <svg class="icon" aria-hidden="true" @click="$router.push('/')">
                <use xlink:href="#icon-zuojiantou"></use>
        </svg>
        <img :src="avatarUrl" alt="" class="profileimg" />
        <div class="name">{{ nickname }}</div>
    </div> -->
    <div class="userinfo">
        <div class="bg">
            <svg class="icon" aria-hidden="true" @click="this.$router.push('/')">
                <use xlink:href="#icon-zuojiantou"></use>
            </svg>
            <img :src="this.backgroundUrl" />
        </div>
        <div class="info1">
            <div class="info1_box">
                <div class="img">
                    <img :src="this.avatarUrl" />
                </div>
                <h4>{{ this.nickname }}</h4>
                <span>{{ changenum(this.follows) }}关注</span>
                <span>{{ changenum(this.fans) }}粉丝</span>
                <span>Lv.{{this.lv}}</span>
            </div>
        </div>
        <div class="info2">
            <div class="info2_box">
                <h4>基本信息</h4>
                <p>村龄：{{year-changetime(this.createTime).year}}年（{{changetime(this.createTime).year}}年{{changetime(this.createTime).month}}月注册）</p>
                <p>性别：{{changegender(this.gender)}}</p>
                <!-- <p>地区：</p> -->
                <p>个人简介：{{this.signature}}</p>
            </div>
        </div>
    </div>
</template>
<script>
import { getLoginUser } from "@/request/api/home.js";
import { mapState } from "vuex";
export default {
    data(){
      return {
          userinlocal:{},
          avatarUrl:'',
          backgroundUrl:'',
          nickname:'',
          lv:0,
          fans:0,
          follows:0,
          gender:0,
          signature:"",
          createTime:0,
          //year:0,
      }  
    },
    computed: {
        ...mapState(["user","accountid"]),
        year(){
            let time = new Date()
            //console.log(time)
            return time.getFullYear()
        },
    },
    methods:{
        async getUserInfo(){
            //console.log(123);
            let res = await getLoginUser(this.accountid ||JSON.parse(localStorage.getItem("accountid")));
            console.log(res);
            this.avatarUrl = res.data.profile.avatarUrl
            this.nickname = res.data.profile.nickname
            this.backgroundUrl = res.data.profile.backgroundUrl
            this.lv = res.data.level
            this.fans = res.data.profile.followeds
            this.follows = res.data.profile.follows
            this.gender = res.data.profile.gender
            this.signature = res.data.profile.signature
            this.createTime = res.data.profile.createTime
            // this.userinlocal = res;
            // console.log(this.userinlocal)
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
        changegender:function(data){
            if(data===1){
                return "男"
            }else{
                return "女"
            }
        },
        changetime:function(data){
            let time = new Date(data)     
            let y = time.getFullYear();
            let m = time.getMonth()+1;
            //let d = time.getDate();
            return {year:y,month:m}
        },
    },
    mounted() {
        this.getUserInfo()
    },
};
</script>
<style lang="less" scoped>
.infoUserTop {
    width: 100%;
    height: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    .profileimg {
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
    }
    .name {
        font-weight: 700;
        font-size: 0.4rem;
    }
}

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
    margin-right: 0.15rem;
}
.info1 .info1_box span:last-of-type {
    margin-right: 0;
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