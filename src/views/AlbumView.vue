<template>
    <div class="albumview">
        <AlbumTop :albumdetail="this.albumdetail"/>
        <AlbumList :albumlist="this.albumlist"/>
    </div>
    <div class="fill"></div>
</template>

<script>
import { getAlbumlist } from "@/request/api/home.js";
import AlbumTop from "../components/album/AlbumTop.vue";
import AlbumList from "../components/album/AlbumList.vue"
export default {
    data() {
        return {
            id: 0,
            albumlist: {},
            albumdetail: {},
        };
    },
    mounted() {
        this.id = this.$route.query.id;

        this.getAlbumdata();
        //this.test()
        //this.getAlbumdatalist()
        
    },
    methods: {
        getAlbumdata: async function () {
            let res = await getAlbumlist(this.id);
            //console.log(res)
            this.albumlist = res.data.songs;
            this.albumdetail = res.data.album;
            sessionStorage.setItem("albumdetail", JSON.stringify(this.albumdetail));
            console.log(this.albumlist);
            console.log(this.albumdetail);
        },
        // test:function(){
        //   var time = new Date(1616688000000)
        //   var y = time.getFullYear();
        //   var m = time.getMonth()+1;
        //   var d = time.getDate();
        //   console.log(y+'-'+m+'-'+d)
        // }
    },
    components: {
        AlbumTop,
        AlbumList,
    },
};
</script>

<style>
.fill {
    height: 1.4rem;
    width: 100%;
}
</style>