import{ac as e,_ as t,$ as i,a0 as n,Q as o,P as s,S as a,ar as l,E as u,R as r,o as p,c as g,w as c,b as d,e as f,F as h,r as m,k as y,t as w,l as v,m as _,i as b}from"./index.694e3e81.js";import{m as x}from"./store.a5f21933.js";import{_ as C}from"./_plugin-vue_export-helper.cdc0426e.js";const S=C({computed:{agreements(){if(!e.agreements)return[];let{serviceUrl:t,privacyUrl:i}=e.agreements;return[{url:t,title:"用户服务协议"},{url:i,title:"隐私政策条款"}]},agree:{get(){return this.getParentComponent().agree},set(e){return this.getParentComponent().agree=e}}},data:()=>({servicesList:[{id:"username",text:"账号登录",logo:"/uni_modules/uni-id-pages/static/login/uni-fab-login/user.png",path:"/uni_modules/uni-id-pages/pages/login/login-withpwd"},{id:"smsCode",text:"短信验证码",logo:"/uni_modules/uni-id-pages/static/login/uni-fab-login/sms.png",path:"/uni_modules/uni-id-pages/pages/login/login-withoutpwd?type=smsCode"},{id:"weixin",text:"微信登录",logo:"/uni_modules/uni-id-pages/static/login/uni-fab-login/weixin.png"},{id:"apple",text:"苹果登录",logo:"/uni_modules/uni-id-pages/static/app-plus/uni-fab-login/apple.png"},{id:"univerify",text:"一键登录",logo:"/uni_modules/uni-id-pages/static/app-plus/uni-fab-login/univerify.png"},{id:"taobao",text:"淘宝登录",logo:"/uni_modules/uni-id-pages/static/app-plus/uni-fab-login/taobao.png"},{id:"facebook",text:"脸书登录",logo:"/uni_modules/uni-id-pages/static/app-plus/uni-fab-login/facebook.png"},{id:"alipay",text:"支付宝登录",logo:"/uni_modules/uni-id-pages/static/app-plus/uni-fab-login/alipay.png"},{id:"qq",text:"QQ登录",logo:"/uni_modules/uni-id-pages/static/app-plus/uni-fab-login/qq.png"},{id:"google",text:"谷歌登录",logo:"/uni_modules/uni-id-pages/static/app-plus/uni-fab-login/google.png"},{id:"douyin",text:"抖音登录",logo:"/uni_modules/uni-id-pages/static/app-plus/uni-fab-login/douyin.png"},{id:"sinaweibo",text:"新浪微博",logo:"/uni_modules/uni-id-pages/static/app-plus/uni-fab-login/sinaweibo.png"}],univerifyStyle:{fullScreen:!0,backgroundColor:"#ffffff",buttons:{iconWidth:"45px",list:[]},privacyTerms:{defaultCheckBoxState:!1,textColor:"#BBBBBB",termsColor:"#5496E3",prefix:"我已阅读并同意",suffix:"并使用本机号码登录",privacyItems:[]}}}),watch:{agree(e){this.univerifyStyle.privacyTerms.defaultCheckBoxState=e}},async created(){let t=this.servicesList,i=e.loginTypes;t=t.filter((e=>"apple"!=e.id&&i.includes(e.id))),i.includes("univerify")&&(this.univerifyStyle.privacyTerms.privacyItems=this.agreements,t.forEach((({id:e,logo:t,path:i})=>{"univerify"!=e&&this.univerifyStyle.buttons.list.push({iconPath:t,provider:e,path:i})}))),this.servicesList=t.filter((e=>(e.path?e.path.split("?")[0]:"")!=this.getRoute(1)))},methods:{getParentComponent(){return this.$parent.$parent},setUserInfo(e){console.log("setUserInfo",e)},getRoute(e=0){let i=t();return e>i.length?"":"/"+i[i.length-e].route},toPage(e,t=0){let o=["navigateTo","redirectTo"][t];if(this.getRoute(1)==e.split("?")[0]&&"/uni_modules/uni-id-pages/pages/login/login-withoutpwd"==this.getRoute(1)){let t=e.split("?")[1].split("=")[1];i("uni-id-pages-setLoginType",t)}else this.getRoute(2)==e?n():this.getRoute(1)!=e?uni[o]({url:e,animationType:"slide-in-left",complete(e){}}):console.log("出乎意料的情况,path："+e)},async login_before(t,i=!0,u={}){var r,p;if(console.log(t),["qq","xiaomi","sinaweibo","taobao","facebook","google","alipay","douyin"].includes(t))return o({title:"该登录方式暂未实现，欢迎提交pr",icon:"none",duration:3e3});if(["univerify","apple"].includes(t))return o({title:"当前设备不支持此登录，请选择其他登录方式",icon:"none",duration:3e3});let g=((null==(p=null==(r=e)?void 0:r.agreements)?void 0:p.scope)||[]).includes("register");if("univerify"!=t&&g&&!this.agree){return this.getParentComponent().$refs.agreements.popup((()=>{this.login_before(t,i,u)}))}if("weixin"==t){let t=location.protocol+"//"+document.domain+(window.location.href.includes("#")?"/#":"")+"/uni_modules/uni-id-pages/pages/login/login-withoutpwd?is_weixin_redirect=true&type=weixin";return"micromessenger"==window.navigator.userAgent.toLowerCase().match(/MicroMessenger/i)?window.open(`https://open.weixin.qq.com/connect/oauth2/authorize?\n\t\t\t\t\t\t\t\t\t\tappid=${e.appid.weixin.h5}\n\t\t\t\t\t\t\t\t\t\t&redirect_uri=${encodeURIComponent(t)}\n\t\t\t\t\t\t\t\t\t\t&response_type=code\n\t\t\t\t\t\t\t\t\t\t&scope=snsapi_userinfo\n\t\t\t\t\t\t\t\t\t\t&state=STATE&connect_redirect=1#wechat_redirect`):location.href=`https://open.weixin.qq.com/connect/qrconnect?appid=${e.appid.weixin.web}\n\t\t\t\t\t\t\t\t\t\t\t&redirect_uri=${encodeURIComponent(t)}\n\t\t\t\t\t\t\t\t\t\t\t&response_type=code&scope=snsapi_login&state=STATE#wechat_redirect`}if(s({mask:!0}),"univerify"==t){let e=function(){a(),t.close(),t.offButtonsClick(s)},t=uni.getUniverifyManager(),i=!1,s=async t=>{console.log("点击了第三方登录，provider：",t,t.provider,this.univerifyStyle.buttons.list),i=!0;let n=await uni.getCheckBoxState();this.agree=n.state;let{path:s}=this.univerifyStyle.buttons.list[t.index];s?(this.getRoute(1).includes("login-withoutpwd")&&s.includes("login-withoutpwd")&&this.getParentComponent().showCurrentWebview(),this.toPage(s,1),e()):this.agree?(e(),setTimeout((()=>{this.login_before(t.provider)}),500)):o({title:"你未同意隐私政策协议",icon:"none",duration:3e3})};return t.onButtonsClick(s),t.login({univerifyStyle:this.univerifyStyle,success:e=>{this.login(e.authResult,"univerify")},fail(e){console.log(e),i||n()},complete:async e=>{a(),t.offButtonsClick(s)}})}if("weixinMobile"===t)return this.login({phoneCode:u.phoneNumberCode},t);l({provider:t,onlyAuthorize:!0,success:async e=>{if("apple"==t){let t=await this.getUserInfo({provider:"apple"});Object.assign(e.authResult,t.userInfo),a()}this.login("weixin"==t?{code:e.code}:e.authResult,t)},fail:async e=>{console.log(e),a()}})},login(e,t){console.log({params:e,type:t});let i="loginBy"+t.trim().replace(t[0],t[0].toUpperCase());u.importObject("uni-id-co",{customUI:!0})[i](e).then((e=>{o({title:"登录成功",icon:"none",duration:2e3}),e.loginType=t,x.loginSuccess(e)})).catch((e=>{r({content:e.message,confirmText:"知道了",showCancel:!1})})).finally((e=>{"univerify"==t&&uni.closeAuthView(),a()}))},getUserInfo:async e=>new Promise(((t,i)=>{uni.getUserInfo({...e,success:e=>{t(e)},fail:e=>{r({content:JSON.stringify(e),showCancel:!1}),i(e)}})}))}},[["render",function(e,t,i,n,o,s){const a=v,l=_,u=b;return p(),g(u,null,{default:c((()=>[d(u,{class:"fab-login-box"},{default:c((()=>[(p(!0),f(h,null,m(o.servicesList,((e,t)=>(p(),g(u,{class:"item",key:t,onClick:t=>e.path?s.toPage(e.path):s.login_before(e.id,!1)},{default:c((()=>[d(a,{class:"logo",src:e.logo,mode:"scaleToFill"},null,8,["src"]),d(l,{class:"login-title"},{default:c((()=>[y(w(e.text),1)])),_:2},1024)])),_:2},1032,["onClick"])))),128))])),_:1})])),_:1})}],["__scopeId","data-v-632daef5"]]);export{S as _};
