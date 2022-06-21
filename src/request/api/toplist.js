import service  from "..";

//获取排行榜
export function getToplist(){
    return service({
        method:"GET",
        url:"/toplist/detail"
    })
};


