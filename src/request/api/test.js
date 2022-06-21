import service  from "..";

//获取每日推荐
export function getTest(){
    return service({
        method:"GET",
        url:"/album/songsaleboard?type=year&year=2021&albumType=0"
    })
};