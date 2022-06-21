import service  from "..";

//获取每日推荐
export function getRecommendMusic(){
    return service({
        method:"GET",
        url:"/recommend/songs"
    })
};

//获取私人FM
export function getFm(){
    return service({
        method:"GET",
        url:"/personal_fm"
    })
};

