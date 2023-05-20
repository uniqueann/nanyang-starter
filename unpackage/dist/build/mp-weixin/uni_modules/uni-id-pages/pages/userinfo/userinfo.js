"use strict";const e=require("../../../../common/vendor.js"),i=require("../../common/store.js");require("../../config.js");const n=e.Ds.importObject("uni-id-co"),o={computed:{userInfo:()=>i.store.userInfo},data:()=>({univerifyStyle:{authButton:{title:"本机号码一键绑定"},otherLoginButton:{title:"其他号码绑定"}},hasPwd:!1,showLoginManage:!1,setNicknameIng:!1}),async onShow(){this.univerifyStyle.authButton.title="本机号码一键绑定",this.univerifyStyle.otherLoginButton.title="其他号码绑定"},async onLoad(e){e.showLoginManage&&(this.showLoginManage=!0);let i=await n.getAccountInfo();this.hasPwd=i.isPasswordSet},methods:{login(){e.index.navigateTo({url:"/uni_modules/uni-id-pages/pages/login/login-withoutpwd",complete:e=>{}})},logout(){i.mutations.logout()},bindMobileSuccess(){i.mutations.updateUserInfo()},changePassword(){e.index.navigateTo({url:"/uni_modules/uni-id-pages/pages/userinfo/change_pwd/change_pwd",complete:e=>{}})},bindMobile(){this.$refs["bind-mobile-by-sms"].open()},univerify(){e.index.login({provider:"univerify",univerifyStyle:this.univerifyStyle,success:async o=>{n.bindMobileByUniverify(o.authResult).then((e=>{i.mutations.updateUserInfo()})).catch((e=>{console.log(e)})).finally((i=>{e.index.closeAuthView()}))},fail:e=>{console.log(e),"30002"!=e.code&&"30001"!=e.code||this.bindMobileBySmsCode()}})},bindMobileBySmsCode(){e.index.navigateTo({url:"./bind-mobile/bind-mobile"})},setNickname(e){e?(i.mutations.updateUserInfo({nickname:e}),this.setNicknameIng=!1,this.$refs.dialog.close()):(this.setNicknameIng=!0,this.$refs.dialog.open())},deactivate(){e.index.navigateTo({url:"/uni_modules/uni-id-pages/pages/userinfo/deactivate/deactivate"})},async bindThirdAccount(n){const o=e.Ds.importObject("uni-id-co"),t={weixin:"wx_openid",alipay:"ali_openid",apple:"apple_openid",qq:"qq_openid"}[n.toLowerCase()];this.userInfo[t]?(await o["unbind"+n](),await i.mutations.updateUserInfo()):e.index.login({provider:n.toLowerCase(),onlyAuthorize:!0,success:async t=>{const s=await o["bind"+n]({code:t.code});s.errCode&&e.index.showToast({title:s.errMsg||"绑定失败",duration:3e3}),await i.mutations.updateUserInfo()},fail:async i=>{console.log(i),e.index.hideLoading()}})}}};if(!Array){(e.resolveComponent("uni-id-pages-avatar")+e.resolveComponent("uni-list-item")+e.resolveComponent("uni-list")+e.resolveComponent("uni-popup-dialog")+e.resolveComponent("uni-popup")+e.resolveComponent("uni-id-pages-bind-mobile"))()}Math||((()=>"../../components/uni-id-pages-avatar/uni-id-pages-avatar.js")+(()=>"../../../uni-list/components/uni-list-item/uni-list-item.js")+(()=>"../../../uni-list/components/uni-list/uni-list.js")+(()=>"../../../uni-popup/components/uni-popup-dialog/uni-popup-dialog.js")+(()=>"../../../uni-popup/components/uni-popup/uni-popup.js")+(()=>"../../components/uni-id-pages-bind-mobile/uni-id-pages-bind-mobile.js"))();const t=e._export_sfc(o,[["render",function(i,n,o,t,s,a){return e.e({a:e.p({width:"260rpx",height:"260rpx"}),b:e.o((e=>a.setNickname(""))),c:e.p({title:"昵称",rightText:a.userInfo.nickname||"未设置",link:!0}),d:e.o(a.bindMobile),e:e.p({title:"手机号",rightText:a.userInfo.mobile||"未绑定",link:!0}),f:a.userInfo.email},a.userInfo.email?{g:e.p({title:"电子邮箱",rightText:a.userInfo.email})}:{},{h:s.hasPwd},s.hasPwd?{i:e.o(a.changePassword),j:e.p({title:"修改密码",link:!0})}:{},{k:e.o(a.setNickname),l:e.p({mode:"input",value:a.userInfo.nickname,inputType:s.setNicknameIng?"nickname":"text",title:"设置昵称",placeholder:"请输入要设置的昵称"}),m:e.sr("dialog","89b673bc-6"),n:e.p({type:"dialog"}),o:e.sr("bind-mobile-by-sms","89b673bc-8"),p:e.o(a.bindMobileSuccess),q:s.showLoginManage},s.showLoginManage?e.e({r:a.userInfo._id},a.userInfo._id?{s:e.o(((...e)=>a.logout&&a.logout(...e)))}:{t:e.o(((...e)=>a.login&&a.login(...e)))}):{})}],["__scopeId","data-v-89b673bc"]]);wx.createPage(t);