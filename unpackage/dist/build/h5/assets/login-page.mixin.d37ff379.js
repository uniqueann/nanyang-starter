import{ac as e,P as i,_ as t}from"./index.694e3e81.js";import{m as s}from"./store.a5f21933.js";let n={data:()=>({config:e,uniIdRedirectUrl:"",isMounted:!1}),onUnload(){document.onkeydown=!1},mounted(){this.isMounted=!0},onLoad(e){if(e.is_weixin_redirect){if(i({mask:!0}),window.location.href.includes("#")){window.location.href.split("?")[1].split("&").forEach((i=>{let t=i.split("=");"code"==t[0]&&(e.code=t[1])}))}this.$nextTick((i=>{this.$refs.uniFabLogin.login({code:e.code},"weixin")}))}e.uniIdRedirectUrl&&(this.uniIdRedirectUrl=decodeURIComponent(e.uniIdRedirectUrl)),1===t().length&&(uni.hideHomeButton(),console.log("已隐藏：返回首页按钮"))},computed:{needAgreements(){if(this.isMounted)return!!this.$refs.agreements&&this.$refs.agreements.needAgreements},agree:{get(){if(this.isMounted)return!this.$refs.agreements||this.$refs.agreements.isAgree},set(e){this.$refs.agreements?this.$refs.agreements.isAgree=e:console.log("不存在 隐私政策协议组件")}}},methods:{loginSuccess(e){s.loginSuccess({...e,uniIdRedirectUrl:this.uniIdRedirectUrl})}}};export{n as m};
