import { createStore } from 'vuex'
import { getMusicLyric } from '@/request/api/item.js'
import {getPhoneLogin} from '@/request/api/home.js'
export default createStore({
  state: {
    playList: [
      { //播放列表
        al: {
          id: 84029595,
          name: "想去海边",
          pic: 109951164602081970,
          picUrl: "https://p1.music.126.net/sLWN-iePq4ESOMPER0IWgQ==/109951164602081973.jpg",
          pic_str: "109951164602081973",
        },
        id: 1413863166,
        name: "想去海边",
        ar: [{ name: "夏日入侵企画", }]
      },
    ],
    playListIndex: 0, //默认下标为0
    isbtnshow: true, //播放暂停按钮显示  true:正在播放
    detailShow: false,//歌曲详情页显示
    LyricList: {},//歌词
    currentTime: 0,//当前时间
    duration: 0,//歌曲时长
    isLogin:false,//判断是否登录
    isFooterMusic:true,//判断底部组件是否显示
    token:'',
    accountid:'',
    user:{},
    footerMusic_ref:{},
  },
  mutations: {
    updateIsbtnshow: function (state, value) {
      state.isbtnshow = value;
    },
    pushPlayList:function(state,value){
      state.playList.push(value);
    },
    updatePlayList: function (state, value) {
      state.playList = value;
      console.log(state.playList);
    },
    updatePlayListIndex: function (state, value) {
      state.playListIndex = value;
    },
    updateDetailShow: function (state) {
      state.detailShow = !state.detailShow;
    },
    updateLyricList: function (state, value) {
      state.LyricList = value;
      //console.log(state.LyricList)
    },
    updateCurrentTime: function (state, value) {
      state.currentTime = value;
      //console.log(state.currentTime)
    },
    updateDuration: function (state, value) {
      state.duration = value;
      //console.log(state.duration)
    },
    updateIsLogin:function(state,value){
      state.isLogin = value;
    },
    updateToken:function(state,value){
      state.token = value;
      localStorage.setItem('token',state.token)
    },
    updateUser:function(state,value){
      state.user = value;
      console.log(state.user)
      sessionStorage.setItem("user", JSON.stringify(value));
      // localStorage.setItem('userinfo',JSON.stringify(value))
      // state.user = JSON.parse(localStorage.getItem("userinfo")) 
      console.log(state.user)
    },
    updateaccountid:function(state,value){
      state.accountid = value;
      localStorage.setItem("accountid",JSON.stringify(value));
      console.log(state.accountid)
    },
    updateFootMusicRef:function(state,value){
      state.footerMusic_ref = value;
      //console.log(state.footerMusic_ref)
    },
    // updateFooterMusicPause:function(state,value){
    //   state.footerMusic_ref.pause = value;
    //   console.log(state.footerMusic_ref.pause)
    // }
  },
  actions: {
    getLyric: async function (context, value) {
      let res = await getMusicLyric(value)
      //console.log(res);
      context.commit("updateLyricList", res.data.lrc);
    },
    getLogin:async function(context, value){
      let res = await getPhoneLogin(value);
      //console.log(res);
      context.commit("updateaccountid", res.data.account.id);
      return res
    },
  },
  modules: {
  }
})
