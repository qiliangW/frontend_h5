import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
//import store from "./store";
import "@/assets/scss/reset.scss";
//import { getUserSearchParams,get_redirect_uri } from "@/utils/index";
import { postUserId } from "@/api/user.js";
import { AppService } from '@/services/AppStorageService.js'
import './utils/setRem.js'
import VConsole from 'vconsole';

// 或者使用配置参数来初始化，详情见文档
const vConsole = new VConsole();
async function bootstrap() {
  const app = createApp(App);
  app.use(router);
 // app.use(store);
  app.mount("#app");
}


//const appid = AppService.getCorpId() === '' ? import.meta.env.VITE_CORP_ID : AppService.getCorpId()

// const redirect_uri = encodeURIComponent(get_redirect_uri())
// console.log(redirect_uri)
// const AuthUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_privateinfo&state=STATE&agentid=1000002#wechat_redirect`;
// const code = getUserSearchParams("code");
// console.log(code,"code")

//if (code) {
  
  // 说明此时已经获取到code
  // 发送code给后端 获取用户的详细信息
  // postUserId({code}).then(() => {
  //   // 接口获取成功后才能初始化项目
   
  //  // window.location.href = `${window.location.origin}${window.location.pathname}/${window.location.hash}`
  // }).catch(()=> {
  //   // 没有授权
  //   console.log('没有授权')
  // })
//} else {
 //console.log('isload')
 // 说明此时第一次进入还没有跳转回调地址
 //window.location.href = AuthUrl
//}
void bootstrap();

  