"use strict";const e=require("../../../common/vendor.js"),t={data:()=>({isLoading:!0,loadMore:{contentdown:"",contentrefresh:"",contentnomore:""},readNewsLog:[],udbWhere:""}),onLoad(){this.readNewsLog=e.index.getStorageSync("readNewsLog")||[];let t=this.readNewsLog.map((({article_id:e})=>e));console.log(typeof t,t),this.udbWhere=`"_id" in ${JSON.stringify(t)}`,e.index.setNavigationBarTitle({title:this.$t("newsLog.navigationBarTitle")})},onPullDownRefresh(){this.refreshData()},onReachBottom(){this.$refs.udb.loadMore()},methods:{refreshData(){this.$refs.udb.loadData({clear:!0},(t=>{e.index.stopPullDownRefresh()}))},handleItemClick(t){e.index.navigateTo({url:"/pages/list/detail?id="+t._id+"&title="+t.title})}}};if(!Array){(e.resolveComponent("uni-dateformat")+e.resolveComponent("uni-list-item")+e.resolveComponent("uni-list")+e.resolveComponent("uni-load-state")+e.resolveComponent("unicloud-db"))()}Math||((()=>"../../../uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat.js")+(()=>"../../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js")+(()=>"../../../uni_modules/uni-list/components/uni-list/uni-list.js")+(()=>"../../../components/uni-load-state/uni-load-state.js")+(()=>"../../../node-modules/@dcloudio/uni-components/lib/unicloud-db/unicloud-db.js"))();const o=e._export_sfc(t,[["render",function(t,o,i,n,a,s){return{a:e.w((({data:t,pagination:o,loading:i,hasMore:n,error:d},r,l)=>({a:e.f(t,((t,o,i)=>({a:e.t(t.title),b:"6e65631b-3-"+l+"-"+i+",6e65631b-2-"+l+"-"+i,c:e.p({date:a.readNewsLog[o].last_time,format:"yyyy-MM-dd hh:mm",threshold:[0,0]}),d:o,e:e.o((e=>s.handleItemClick(t)),o),f:"6e65631b-2-"+l+"-"+i+",6e65631b-1-"+l}))),b:"6e65631b-1-"+l+",6e65631b-0",c:"6e65631b-4-"+l+",6e65631b-0",d:e.p({state:{data:t,pagination:o,hasMore:n,loading:i,error:d}}),e:l,f:r})),{name:"d",path:"a",vueId:"6e65631b-0"}),b:e.p({clickable:!0}),c:e.o(s.refreshData),d:e.sr("udb","6e65631b-0"),e:e.o((e=>0==a.isLoading)),f:e.o((e=>0==a.isLoading)),g:e.p({where:a.udbWhere,collection:"opendb-news-articles",field:"title,_id","page-size":10})}}]]);wx.createPage(o);