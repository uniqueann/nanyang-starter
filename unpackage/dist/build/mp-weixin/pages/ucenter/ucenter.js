"use strict";const e=require("../../common/vendor.js"),i=require("../../uni_modules/uni-upgrade-center-app/utils/call-check-version.js"),n=require("../../uni_modules/uni-id-pages/common/store.js");require("../../uni_modules/uni-id-pages/config.js");const t=e.Ds.database(),o={data(){return{gridList:[{text:this.$t("mine.showText"),icon:"chat"},{text:this.$t("mine.showText"),icon:"cloud-upload"},{text:this.$t("mine.showText"),icon:"contact"},{text:this.$t("mine.showText"),icon:"download"}],ucenterList:[[{title:this.$t("mine.signIn"),event:"signIn",icon:"compose"},{title:this.$t("mine.readArticles"),to:"/pages/ucenter/read-news-log/read-news-log",icon:"flag"},{title:this.$t("mine.myScore"),to:"",event:"getScore",icon:"paperplane"}],[{title:this.$t("mine.feedback"),to:"/uni_modules/uni-feedback/pages/opendb-feedback/opendb-feedback",icon:"help"},{title:this.$t("mine.settings"),to:"/pages/ucenter/settings/settings",icon:"gear"}]],listStyles:{height:"150rpx",width:"150rpx",border:{color:"#eee",width:"1px",style:"solid",radius:"100%"}}}},onLoad(){},onShow(){},computed:{userInfo:()=>n.store.userInfo,hasLogin:()=>n.store.hasLogin,appConfig:()=>getApp().globalData.config},methods:{toSettings(){e.index.navigateTo({url:"/pages/ucenter/settings/settings"})},signIn(){this.$refs.signIn.open()},signInByAd(){this.$refs.signIn.showRewardedVideoAd()},ucenterListClick(e){!e.to&&e.event&&this[e.event]()},async checkVersion(){let n=await i.callCheckVersion();console.log(n),n.result.code>0||e.index.showToast({title:n.result.message,icon:"none"})},toUserInfo(){e.index.navigateTo({url:"/uni_modules/uni-id-pages/pages/userinfo/userinfo"})},tapGrid(i){e.index.showToast({title:this.$t("mine.clicked")+" "+(i+1),icon:"none"})},gotoMarket(){},getScore(){if(!this.userInfo)return e.index.showToast({title:this.$t("mine.checkScore"),icon:"none"});e.index.showLoading({mask:!0}),t.collection("uni-id-scores").where('"user_id" == $env.uid').field("score,balance").orderBy("create_date","desc").limit(1).get().then((i=>{console.log(i);const n=i.result.data[0];let t="";t=n?this.$t("mine.currentScore")+n.balance:this.$t("mine.noScore"),e.index.showToast({title:t,icon:"none"})})).finally((()=>{e.index.hideLoading()}))},async share(){let{result:i}=await t.collection("uni-id-users").where("'_id' == $cloudEnv_uid").field("my_invite_code").get(),n=i.data[0].my_invite_code;if(!n)return e.index.showToast({title:"请检查uni-config-center中uni-id配置，是否已启用 autoSetInviteCode",icon:"none"});console.log({myInviteCode:n}),this.appConfig.about}}};if(!Array){(e.resolveComponent("uni-sign-in")+e.resolveComponent("cloud-image")+e.resolveComponent("uni-icons")+e.resolveComponent("uni-grid-item")+e.resolveComponent("uni-grid")+e.resolveComponent("uni-list-item")+e.resolveComponent("uni-list"))()}Math||((()=>"../../uni_modules/uni-sign-in/components/uni-sign-in/uni-sign-in.js")+(()=>"../../uni_modules/uni-id-pages/components/cloud-image/cloud-image.js")+(()=>"../../uni_modules/uni-icons/components/uni-icons/uni-icons.js")+(()=>"../../uni_modules/uni-grid/components/uni-grid-item/uni-grid-item.js")+(()=>"../../uni_modules/uni-grid/components/uni-grid/uni-grid.js")+(()=>"../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js")+(()=>"../../uni_modules/uni-list/components/uni-list/uni-list.js"))();const s=e._export_sfc(o,[["render",function(i,n,t,o,s,r){return e.e({a:e.sr("signIn","6d4bbe50-0"),b:r.hasLogin&&r.userInfo.avatar_file&&r.userInfo.avatar_file.url},r.hasLogin&&r.userInfo.avatar_file&&r.userInfo.avatar_file.url?{c:e.p({width:"150rpx",height:"150rpx",src:r.userInfo.avatar_file.url})}:{d:e.p({color:"#ffffff",size:"50",type:"person-filled"})},{e:r.hasLogin},r.hasLogin?{f:e.t(r.userInfo.nickname||r.userInfo.username||r.userInfo.mobile)}:{g:e.t(i.$t("mine.notLogged"))},{h:e.o(((...e)=>r.toUserInfo&&r.toUserInfo(...e))),i:e.f(s.gridList,((i,n,t)=>({a:"6d4bbe50-5-"+t+",6d4bbe50-4-"+t,b:e.p({color:"#007AFF",type:i.icon,size:"26"}),c:e.t(i.text),d:e.o((e=>r.tapGrid(n)),n),e:n,f:"6d4bbe50-4-"+t+",6d4bbe50-3"}))),j:e.p({column:4,showBorder:!1,square:!0}),k:e.f(s.ucenterList,((i,n,t)=>({a:e.f(i,((i,n,o)=>e.e({a:i.showBadge},i.showBadge?{b:e.t(i.rightText)}:{},{c:n,d:e.o((e=>r.ucenterListClick(i)),n),e:"6d4bbe50-7-"+t+"-"+o+",6d4bbe50-6-"+t,f:e.p({title:i.title,link:!0,rightText:i.rightText,clickable:!0,to:i.to,"show-extra-icon":!0,extraIcon:{type:i.icon,color:"#999"}})}))),b:n,c:"6d4bbe50-6-"+t})))})}],["__scopeId","data-v-6d4bbe50"]]);wx.createPage(s);
