"use strict";const e=require("../../../common/vendor.js"),i=require("./store.js"),t=require("../config.js");let s={data:()=>({config:t.config,uniIdRedirectUrl:"",isMounted:!1}),onUnload(){},mounted(){this.isMounted=!0},onLoad(i){if(i.is_weixin_redirect){if(e.index.showLoading({mask:!0}),window.location.href.includes("#")){window.location.href.split("?")[1].split("&").forEach((e=>{let t=e.split("=");"code"==t[0]&&(i.code=t[1])}))}this.$nextTick((e=>{this.$refs.uniFabLogin.login({code:i.code},"weixin")}))}i.uniIdRedirectUrl&&(this.uniIdRedirectUrl=decodeURIComponent(i.uniIdRedirectUrl)),1===getCurrentPages().length&&(e.index.hideHomeButton(),console.log("已隐藏：返回首页按钮"))},computed:{needAgreements(){if(this.isMounted)return!!this.$refs.agreements&&this.$refs.agreements.needAgreements},agree:{get(){if(this.isMounted)return!this.$refs.agreements||this.$refs.agreements.isAgree},set(e){this.$refs.agreements?this.$refs.agreements.isAgree=e:console.log("不存在 隐私政策协议组件")}}},methods:{loginSuccess(e){i.mutations.loginSuccess({...e,uniIdRedirectUrl:this.uniIdRedirectUrl})}}};exports.mixin=s;
