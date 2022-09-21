<template>
  <div class="Dynamic_code">
    <div class="code_box">
      <h3>用于登录RoboGo高级参数修改功能</h3>
      <div class="field-box">
        <span class="cell__title">随机ID</span>

        <input type="text" class="cell__value" placeholder="请输入随机ID" v-model="randomCode" />
      </div>
      <div class="field-box">
        <div class="cell__title">动态密码</div>

        <input type="text" class="cell__value" placeholder="请输入动态密码" />

        <button class="btn" @click="getCode">
          <div class="btn-content">
            <span class="btn-text">点击获取</span>
          </div>
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import { reactive, toRefs, onMounted } from "vue";
import { getCode } from "@/api/user";
import { jsSign, jsAgentSign } from '../api/jssdk'
export default {
  setup() {
    const state = reactive({
      randomCode: "",
      dynamicCode: "",
    });
    const getCode = () => {
      state.randomCode &&
        getCode(state.randomCode).then((res) => {
          // 获取动态码
          state.dynamicCode = res.data.dynamicCode;
        });
    };
    const getJsSign = () => {
      const url = window.location.href.split('#')[0]
      const params = { 'url': url }
      jsSign(params).then(() => {
        //获取签名
        wx.config({
          beta: true,// 必须这么写，否则wx.invoke调用形式的jsapi会有问题
          debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: res.data.appId, // 必填，企业微信的corpID
          timestamp: res.data.timestamp, // 必填，生成签名的时间戳
          nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
          signature: res.data.signature,// 必填，签名，见 附录-JS-SDK使用权限签名算法
          jsApiList: ['openUserProfile', 'selectEnterpriseContact', 'chooseImage', 'scanQRCode', 'shareWechatMessage'] // 必填，需要使用的JS接口列表，凡是要调用的接口都需要传进来

        });
        wx.ready(function(){
          wx.checkJsApi({
               jsApiList: ['selectEnterpriseContact','selectExternalContact','chooseImage','scanQRCode','shareWechatMessage'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
               success: function(res) {
                  console.log(res)
                  // 以键值对的形式返回，可用的api值true，不可用为false
                  // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
               }
            });
        })
        wx.error(function(res){
           console.log(res)
            // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
         });
      })

    }
    onMounted(() => {

    })
    return {
      ...toRefs(state),
      getCode,
    };
  },
};
</script>
<style scoped lang="scss">
.Dynamic_code {
  padding: .5rem .4rem;
  box-sizing: border-box;

  .code_box {
    h3 {
      font-size: 0.4rem;
      padding-bottom: .6rem;
      text-align: center;
    }

    .field-box {
      display: flex;
      align-items: center;
      margin-bottom: 0.3rem;

      .cell__title {
        font-size: 0.3rem;
        width: 18%;
        display: inline-block;
        text-align: right;
      }

      .cell__value {
        width: 55%;
        margin-left: 0.2rem;
      }

      .btn {
        font-size: 0.3rem;
        background: rgb(114, 50, 221);
        border-color: rgb(114, 50, 221);
        position: relative;
        display: inline-block;
        box-sizing: border-box;
        height: .7rem;
        margin: 0;
        line-height: 1.2;
        padding: 0;
        width: 21%;
        margin-left: 0.1rem;
        text-align: center;
        border-radius: 2px;
        cursor: pointer;
        -webkit-transition: opacity 0.2s;
        transition: opacity 0.2s;
        -webkit-appearance: none;
      }

      .btn::before {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 100%;
        height: 100%;
        background-color: #000;
        border: inherit;
        border-color: #000;
        border-radius: inherit;
        -webkit-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        opacity: 0;
        content: " ";
      }

      .btn-content {
        display: flex;
        -webkit-box-align: center;
        -webkit-align-items: center;
        align-items: center;
        -webkit-box-pack: center;
        -webkit-justify-content: center;
        justify-content: center;
        height: 100%;

        .btn-text {
          color: white;
        }
      }

      .btn-content::before {
        content: " ";
      }
    }
  }
}

input {
  outline-style: none;
  border: 1px solid #ccc;
  border-radius: 3px;
  padding: 0.2rem;
  width: 100%;
  font-size: 0.3rem;
  font-family: "Microsoft soft";
  display: inline-block;
  min-height: 0.6rem;
  box-sizing: border-box;
}

input:focus {
  border-color: #66afe9;
  outline: 0;
  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
    0 0 8px rgba(102, 175, 233, 0.6);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
    0 0 8px rgba(102, 175, 233, 0.6);
}
</style>
