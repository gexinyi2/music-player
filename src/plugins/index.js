import { Swipe, SwipeItem,Popup,Dialog,Button  } from 'vant';
// 放入数组中
let plugins=[
    Swipe,SwipeItem,Popup,Dialog,Button
]
export default function getVant(app){
    plugins.forEach((item)=>{
        return app.use(item)
    })
}
