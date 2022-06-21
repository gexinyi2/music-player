import service  from "..";

//获取banner
export function getBanner(){
    return service({
        method:"GET",
        url:'banner?type=2'
    })
};

//获取推荐歌单
export function getRecommend(){
    return service({
        method:"GET",
        url:"/personalized?limit=10"
    })
}

//搜索
export function getSearch(data){
    return service({
        method:"GET",
        url:`/cloudsearch?keywords=${data}`
    })
}

//登录
export function getPhoneLogin(data){
    return service({
        method:"GET",
        url:`/login/cellphone?phone=${data.phone}&password=${data.password}`
    })
}

//获取用户详情
export function getLoginUser(data){
    return service({
        method:"GET",
        url:`/user/detail?uid=${data}`
    })
}

//获取用户歌单
// export function getUserMusic(data){
//     return service({
//         method:"GET",
//         url:`/user/playlist?uid=${data}`
//     })
// }

//获取登录状态
export function getLoginStaus(){
    return service({
        method:"GET",
        url:"/login/status"
    })
};

//获取推荐mv
export function getHomeMv(){
    return service({
        method:"GET",
        url:"/personalized/mv"
    })
};

//获取独家放送
export function getExclusive(){
    return service({
        method:"GET",
        url:"/personalized/privatecontent"
    })
};

//获取mv url
export function getMvUrl(data){
    return service({
        method:"GET",
        url:`/mv/url?id=${data}`
    })
};

//获取mv评论
export function getMvComment(data){
    return service({
        method:"GET",
        url:`/comment/mv?id=${data}&limit=100`
    })
};

//获取歌手详情
export function getAr(data){
    return service({
        method:"GET",
        url:`/artist/detail?id=${data}`
    }) 
};

//获取歌手粉丝数
export function getFanNum(data){
    return service({
        method:"GET",
        url:`/artist/follow/count?id=${data}`
    }) 
};

//获取歌手歌曲top50
export function getArSong(data){
    return service({
        method:"GET",
        url:`/artist/top/song?id=${data}`
    }) 
};

//获取相似歌手
export function getSimilar(data){
    return service({
        method:"GET",
        url:`/simi/artist?id=${data}`
    }) 
};

//获取推荐专辑
export function getAlbum(){
    return service({
        method:"GET",
        url:"/album/songsaleboard?type=year&year=2021&albumType=0"
    }) 
};

//获取专辑详情
// export function getAlbumdetail(data){
//     return service({
//         method:"GET",
//         url:`/album/detail?id=${data}`
//     }) 
// };

//获取专辑列表
export function getAlbumlist(data){
    return service({
        method:"GET",
        url:`/album?id=${data}`
    })
};


//获取精品歌单
export function getAllList(){
    return service({
        method:"GET",
        url:"/top/playlist/highquality?limit=100"
    })
};

