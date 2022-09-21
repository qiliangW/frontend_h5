import {createRouter,createWebHashHistory} from 'vue-router'
import home from '../views/home.vue'
// 不重定向白名单
const noUserWhiteList = [];
window.history.replaceState(null, null, window.location.pathname);

//路由
const routes = [
  { 
    path: '/', 
    component:home  ,
    name: 'home',
    meta: { title: '动态码' },
    
   }
]

const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes, // `routes: routes` 的缩写
})


//守卫
router.beforeEach((to, from, next) => {
    let topath = to.path
    next()
})

export default router;