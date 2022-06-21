import service  from "..";

//获取歌单详情
export function getMusicListView(data){
    return service({
        method:"GET",
        url:`/playlist/detail?id=${data}`
    })
};

//获取歌单列表
export function getMusicList(id,limit,offset){
    return service({
        method:"GET",
        url:`/playlist/track/all?id=${id}&limit=${limit}&offset=${offset}`
    })
};

//获取歌词
export function getMusicLyric(id){
    return service({
        method:"GET",
        url:`/lyric?id=${id}`
    })
};

//获取歌单评论
export function getMusicListComment(data){
    return service({
        method:"GET",
        url:`/comment/playlist?id=${data}&limit=100`
    })
};

//获取歌曲热门评论
export function getHotComment(data){
    return service({
        method:"GET",
        url:`/comment/hot?id=${data}&type=0&limit=100`
    })
};