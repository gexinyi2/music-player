<template>
    <div class="topNav">
        <div class="topleft">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-31liebiao"></use>
            </svg>
        </div>

        <div class="topContent">
            <span @click="$router.push('/UserInfo')">我的</span>
            <span class="active">发现</span>
            <span>云村</span>
            <span>视频</span>
        </div>
        <div class="topRight">
            <svg
                class="icon"
                aria-hidden="true"
                @click="$router.push('/Search')"
            >
                <use xlink:href="#icon-sousuo"></use>
            </svg>
        </div>
    </div>
</template>

<script>

</script>

<style lang="less" scoped>
.topNav {
    width: 100%;
    height: 1rem;
    padding: 0.2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .topContent {
        width: 35%;
        height: 100%;
        display: flex;
        justify-content: space-around;
        // align-items: center;
        font-size: 0.36rem;
        // span{
        //     display: inline-block;
        //     width: 25%;
        // }
        .active {
            // font-weight: 600;
            color:crimson;
        }
    }
}
.topNav .topContent span:nth-of-type(3),
.topNav .topContent span:nth-of-type(4){
    display: none;
}
</style>