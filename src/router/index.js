import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import store from '@/store/index.js'
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
  {
    path: '/ItemMusic',
    name: 'ItemMusic',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/ItemMusic.vue')
  },
  {
    path: '/ItemMusic/ItemComment',
    name: 'ItemComment',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/item/ItemComment.vue')
  },
  {
    path: '/Search',
    name: 'Search',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Search.vue')
  },
  {
    path: '/Login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/UserInfo',
    name: 'UserInfo',
    beforeEnter:(to,from,next)=>{
      if(store.state.isLogin || store.state.token || localStorage.getItem('token')){
        next()
        console.log(store.state.isLogin)
        // console.log(store.state.token)
        // console.log(localStorage.getItem('token'))
      }else{
        next('/Login')
      }
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/UserInfo.vue')
  },
  {
    path: '/RecommendMusic',
    name: 'RecommendMusic',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/RecommendMusic.vue')
  },
  {
    path: '/RecommendMusic/MusicComment',
    name: 'MusicComment',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/item/MusicComment.vue')
  },
  {
    path: '/Fm',
    name: 'Fm',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Fm.vue')
  },
  {
    path: '/HomeMvView',
    name: 'HomeMvView',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/HomeMvView.vue')
  },
  {
    path: '/Arview',
    name: 'Arview',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Arview.vue')
  },
  {
    path: '/AlbumView',
    name: 'AlbumView',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AlbumView.vue')
  },
  {
    path: '/TopListView',
    name: 'TopListView',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/TopListView.vue')
  },
  {
    path: '/TopListView/TopListMusic',
    name: 'TopListMusic',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/toplist/TopListMusic.vue')
  },
  {
    path: '/AllList',
    name: 'AllList',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AllList.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


router.beforeEach((to,from)=>{
  if(to.path=='/Login'|| to.path=='/Fm' || to.path=='/HomeMvView'){
    store.state.isFooterMusic = false
  }else{
    store.state.isFooterMusic = true
  }
  // if(to.path=='/Fm'){
  //   store.state.footerMusic_ref.pause()
  // }
})
export default router
