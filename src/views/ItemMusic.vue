<template>
    <div class="ItemMusic">
        <ItemMusicTop :playlist="state.playlist" :id="state.id"/>
        <ItemMusicList :itemList="state.itemList" :subscribedCount="state.playlist.subscribedCount"/>
    </div>
</template>

<script>
import { useRoute } from "vue-router";
import { onMounted, reactive } from "vue";
import { getMusicListView,getMusicList } from "@/request/api/item.js";
import ItemMusicTop from "@/components/item/ItemMusicTop.vue";
import ItemMusicList from "@/components/item/ItemMusicList.vue"
export default {
    // data(){
    //     return{
    //         id:'',
    //     }
    // }
    // methods:{
    //     async getView(id){
    //         let res = await getMusicListView(id);
    //         this.playlist = res.data.playlist;
    //         //console.log(this.playlist);
    //         //防止页面刷新丢失数据
    //         sessionStorage.setItem('itemDetail',JSON.stringify(this.playlist));

    //     },
    // },
    // mounted(){
    //     this.id = this.$route.query.id;
    //     //console.log(this.id);
    //     this.getView(this.id);
    // },
    setup() {
        const state = reactive({
            playlist: {}, //歌单的详情页的数据
            itemList: [], //歌单的歌曲
            id:0,
        });
        onMounted(async () => {
            //拿到从首页点击传进来的歌单id
            state.id = useRoute().query.id;
            // this.id = this.$route.query.id;

            //   获取歌单详情页
            let res = await getMusicListView(state.id);
            //console.log(res);
            state.playlist = res.data.playlist;
            console.log(state.playlist)
            
            //   防止页面刷新，数据丢失，将数据保存到sessionStorage中
            sessionStorage.setItem("itemDetail", JSON.stringify(state));
            console.log(JSON.parse(sessionStorage.getItem("itemDetail")))

            //获取歌单歌曲
            let res2 = await getMusicList(state.id,25,0);
            state.itemList = res2.data.songs;


            
        });
        return { state };
    },
    components: {
        ItemMusicTop,
        ItemMusicList,
    },
};
</script>

<style>
</style>