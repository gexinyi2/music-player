<template>
    <div class="albumlist">
        <div
            class="item"
            v-for="(item1, index1) in albumlist"
            :key="index1"
            @click="showdialog"
        >
            <!-- <div class="img">
                    <img :src="item1.al.picUrl" alt="" />
                </div> -->
            <div class="listindex">{{ index1 + 1 }}</div>
            <div class="content">
                <h4>{{ item1.name }}</h4>
                <div class="ar">
                    <span v-for="(item2, index2) in item1.ar" :key="index2">{{
                        item2.name
                    }}</span>
                </div>
            </div>
            <div class="itemRight">
                <svg
                    class="icon bofang"
                    aria-hidden="true"
                    v-show="item1.mv != 0"
                >
                    <use xlink:href="#icon-shipin"></use>
                </svg>
                <svg class="icon liebiao" aria-hidden="true">
                    <use xlink:href="#icon-31liebiao"></use>
                </svg>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    // props: {
    //     albumlist: {
    //         type: Array,
    //     },
    // },
    setup(props) {
        //console.log(props);
    },
    props: ["albumlist"],
    methods: {
        showdialog: function () {
            this.$dialog
                .alert({
                    message:
                        "需要购买此数字专辑才能播放",
                    theme: "round-button",
                })
                .then(() => {
                    // on close
                });
        },
    },
};
</script>

<style lang="less" scoped>
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
.albumlist {
    padding: 0 0.3rem;
    margin-top: 1.5rem;
}
.albumlist .item {
    overflow: hidden;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    //padding: .3rem .3rem;
    margin-bottom: 0.4rem;
}
.albumlist .item .img {
    width: 0.8rem;
    height: 0.8rem;
    overflow: hidden;
    float: left;
}
.albumlist .item .img img {
    width: 100%;
    height: 100%;
}
.albumlist .item .content {
    float: left;
    margin-left: 0.2rem;
    width: 60%;
}
.albumlist .item .content h4 {
    font-size: 0.3rem;
    margin-bottom: 0.1rem;
    font-weight: normal;
    color: #333;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.albumlist .item .content .ar {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.albumlist .item .content span {
    font-size: 0.26rem;
    color: #999;
}
.albumlist .item .itemRight {
    float: right;
    margin-top: 0.15rem;
}
.albumlist .item .itemRight .icon {
    width: 0.4rem;
    height: 0.4rem;
}
.albumlist .item .itemRight .icon.liebiao {
    margin-left: 0.2rem;
}
.albumlist .item .content span::after {
    content: "/";
}
.albumlist .item .content span:last-of-type::after {
    content: "";
}
</style>