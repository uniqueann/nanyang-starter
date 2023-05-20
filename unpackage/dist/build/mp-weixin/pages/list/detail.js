"use strict";const e=require("../../common/vendor.js"),t=e.Ds.database().collection("read-news-log"),i={data:()=>({id:"",title:"title",field:"user_id.nickname,user_id._id,avatar,excerpt,last_modify_date,comment_count,like_count,title,content",formData:{noData:'<p style="text-align:center;color:#666">详情加载中...</p>'}}),computed:{uniStarterConfig:()=>getApp().globalData.config,where(){return`_id =="${this.id}"`}},onLoad(t){t.id&&(this.id=t.id),t.title&&(this.title=t.title,e.index.setNavigationBarTitle({title:t.title}))},onReady(){this.id?this.$refs.detail.loadData():e.index.showToast({icon:"none",title:this.$t("listDetail.newsErr")})},onNavigationBarButtonTap(e){"share"==e.type&&this.shareClick()},methods:{$log(...e){console.log("args",...e,this.id)},setReadNewsLog(){let t={article_id:this.id,last_time:Date.now()},i=e.index.getStorageSync("readNewsLog")||[],o=-1;i.forEach((({article_id:e},i)=>{e==t.article_id&&(o=i)})),-1===o?i.push(t):i.splice(o,1,t),e.index.setStorageSync("readNewsLog",i),console.log(i)},setFavorite(){if(e.Ds.getCurrentUserInfo().tokenExpired<Date.now())return console.log("未登录用户");let i=this.id,o=Date.now();console.log({article_id:i,last_time:o}),t.where(`"article_id" == "${i}" && "user_id"==$env.uid`).update({last_time:o}).then((({result:{updated:e}})=>{console.log("updated",e),e||t.add({article_id:i}).then((e=>{console.log(e)})).catch((e=>{console.log(e)}))})).catch((e=>{console.log(e)}))},loadData(t){""==this.title&&t[0].title&&(this.title=t[0].title,e.index.setNavigationBarTitle({title:t[0].title})),this.setReadNewsLog()},followClick(){e.index.showToast({title:this.$t("listDetail.follow"),icon:"none"})}}};if(!Array){(e.resolveComponent("uni-dateformat")+e.resolveComponent("uni-list-item")+e.resolveComponent("uni-list")+e.resolveComponent("unicloud-db"))()}Math||((()=>"../../uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat.js")+(()=>"../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js")+(()=>"../../uni_modules/uni-list/components/uni-list/uni-list.js")+(()=>"../../node-modules/@dcloudio/uni-components/lib/unicloud-db/unicloud-db.js"))();const o=e._export_sfc(i,[["render",function(t,i,o,a,n,l){return{a:e.t(n.title),b:e.w((({data:t,loading:i,error:o,options:a},n,l)=>e.e({a:!i&&t},!i&&t?{b:e.t(t.user_id&&t.user_id[0]&&t.user_id[0].nickname||"未知"),c:"9a0df2be-3-"+l+",9a0df2be-2-"+l,d:e.p({date:t.last_modify_date,format:"yyyy-MM-dd hh:mm",threshold:[6e4,2592e6]}),e:"9a0df2be-2-"+l+",9a0df2be-1-"+l,f:e.p({thumbSize:"lg",thumb:t.image}),g:"9a0df2be-1-"+l+",9a0df2be-0",h:e.p({border:!1}),i:t.avatar,j:e.t(t.excerpt),k:t.content}:{},{l:l,m:n})),{name:"d",path:"b",vueId:"9a0df2be-0"}),c:e.sr("detail","9a0df2be-0"),d:e.o(l.loadData),e:e.p({options:n.formData,collection:"opendb-news-articles,uni-id-users",field:n.field,getone:!0,where:l.where,manual:!0,foreignKey:"opendb-news-articles.user_id"})}}],["__scopeId","data-v-9a0df2be"]]);wx.createPage(o);