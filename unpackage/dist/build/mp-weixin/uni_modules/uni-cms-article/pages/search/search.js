"use strict";const e=require("../../../../common/vendor.js"),t=require("../../common/publish-time.js"),i="__local_search_history",s=e.Ds.database();const o={data:()=>({articleDbName:"uni-cms-articles",searchLogDbName:"opendb-search-logs",statusBarHeight:"0px",localSearchList:e.index.getStorageSync(i),localSearchListDel:!1,netHotListIsHide:!1,searchText:"",iconColor:"#999999",associativeList:[],keyBoardPopup:!1,hotWorld:"DCloud",focus:!0,speechEngine:"iFly",isLoadData:!1,where:'"article_status" == 1',listHeight:0,associativeShow:!1,noAssociativeShow:!1}),created(){this.db=e.Ds.database(),this.searchLogDb=this.db.collection(this.searchLogDbName),this.articleDbName=this.db.collection(this.articleDbName),e.index.onKeyboardHeightChange((e=>{this.keyBoardPopup=0!==e.height}))},computed:{colList(){return[s.collection("uni-cms-articles").where(this.where).field("thumbnail,title,publish_date,user_id").getTemp(),s.collection("uni-id-users").field("_id,nickname").getTemp()]}},onReady(){this.listHeight="auto"},onLoad(){},methods:{clear(e){console.log("res: ",e)},confirm(e){this.search(e.value)},cancel(t){e.index.hideKeyboard(),this.searchText="",this.isLoadData=!1,this.associativeShow=!1},search(t){(t||this.hotWorld)&&(t?(this.searchText!==t&&(this.searchText=t),this.localSearchListManage(t),this.searchLogDbAdd(t)):this.hotWorld&&(this.searchText=this.hotWorld),e.index.hideKeyboard(),this.loadList(this.searchText))},localSearchListManage(t){e.index.getStorageSync(i).length?(this.localSearchList.unshift(t),(e=>{for(let t=e.length-1;t>=0;t--){const i=e.indexOf(e[t]),s=e.lastIndexOf(e[t]);i!=s&&e.splice(s,1)}})(this.localSearchList),this.localSearchList.length>10&&this.localSearchList.pop()):this.localSearchList=[t],e.index.setStorageSync(i,this.localSearchList)},LocalSearchListClear(){e.index.showModal({content:"确认清空搜索历史吗",confirmText:"删除",confirmColor:"red",cancelColor:"#808080",success:t=>{t.confirm&&(this.localSearchListDel=!1,this.localSearchList=[],e.index.removeStorageSync(i))}})},LocalSearchlistItemClick(t,s){if(this.localSearchListDel)return this.localSearchList.splice(s,1),e.index.setStorageSync(i,this.localSearchList),void(this.localSearchList.length||(this.localSearchListDel=!1));this.noAssociativeShow=!0,this.search(t)},searchHotRefresh(){this.$refs.udb.refresh()},speech(){},searchLogDbAdd(e){this.getDeviceId().then((t=>{this.searchLogDb.add({device_id:t,content:e,create_date:Date.now()})}))},getDeviceId:()=>new Promise(((t,i)=>{const s=e.index.getStorageSync("uni_id");t(s||e.index.getSystemInfoSync().system+"_"+Math.random().toString(36).substr(2))})),associativeClick(e){console.log("associativeClick: ",e,e.title),this.noAssociativeShow=!0,this.searchText=e.title,this.loadList(e.title)},loadList(e=""){let t='"article_status" == 1 ';this.where=e?t+`&& /${e}/.test(title)`:t,this.associativeList=[],this.associativeShow=!1,setTimeout((()=>{this.$refs.listUdb.loadData({clear:!0})}),0)},onDbLoad(){console.log("onDbLoad"),this.isLoadData=!0,this.noAssociativeShow=!1},onqueryerror(e){console.error(e)},refresh(){this.$refs.listUdb.loadData({clear:!0},(()=>{e.index.stopPullDownRefresh()}))},loadMore(){this.$refs.listUdb.loadMore()},publishTime:e=>t.translatePublishTime(e)},onReachBottom(){this.loadMore()},watch:{searchText:(a=function(e,t){e!==t&&(this.noAssociativeShow||(e?this.articleDbName.where({title:new RegExp(e,"gi")}).field("_id,title").get().then((e=>{this.associativeList=e.result.data,this.associativeShow=!0})):this.associativeList=[]))},c=100,r=a,n=null,h=!0,l&&r(),function(){var e=arguments,t=this;h&&(h=!1,r.apply(t,e)),n&&clearTimeout(n),n=setTimeout((function(){clearTimeout(n),n=null,r.apply(t,e)}),c||200)})}};var a,c,l,r,n,h;if(!Array){(e.resolveComponent("uni-search-bar")+e.resolveComponent("uni-icons")+e.resolveComponent("unicloud-db")+e.resolveComponent("uni-list-item")+e.resolveComponent("uni-load-state")+e.resolveComponent("uni-list"))()}Math||((()=>"../../../uni-search-bar/components/uni-search-bar/uni-search-bar.js")+(()=>"../../../uni-icons/components/uni-icons/uni-icons.js")+(()=>"../../../../node-modules/@dcloudio/uni-components/lib/unicloud-db/unicloud-db.js")+(()=>"../../../uni-list/components/uni-list-item/uni-list-item.js")+(()=>"../../../../components/uni-load-state/uni-load-state.js")+(()=>"../../../uni-list/components/uni-list/uni-list.js"))();const d=e._export_sfc(o,[["render",function(t,i,s,o,a,c){return e.e({a:e.sr("searchBar","777adec4-0"),b:e.o(c.clear),c:e.o(c.confirm),d:e.o(c.cancel),e:e.o((e=>a.searchText=e)),f:e.p({radius:"100",focus:a.focus,placeholder:a.hotWorld,clearButton:"auto",cancelButton:"always",modelValue:a.searchText}),g:e.w((({data:t,pagination:i,hasMore:s,loading:o,error:l,options:r},n,h)=>e.e(a.isLoadData?{v:e.f(t,((t,i,s)=>({a:t.thumbnail,b:e.t(t.title),c:e.t(t.user_id[0]?t.user_id[0].nickname:""),d:e.t(c.publishTime(t.publish_date)),e:i,f:"777adec4-8-"+h+"-"+s+",777adec4-7-"+h,g:e.p({to:"/uni_modules/uni-cms-article/pages/detail/detail?id="+t._id})}))),w:e.o(c.refresh),x:e.o(c.loadMore),y:"777adec4-9-"+h+",777adec4-7-"+h,z:e.p({state:{data:t,pagination:i,hasMore:s,loading:o,error:l}}),A:a.listHeight,B:"777adec4-7-"+h+",777adec4-1",C:e.p({border:!1})}:e.e({a:a.localSearchList.length},a.localSearchList.length?e.e({b:!a.localSearchListDel},a.localSearchListDel?{f:e.o(((...e)=>c.LocalSearchListClear&&c.LocalSearchListClear(...e))),g:e.o((e=>a.localSearchListDel=!1))}:{c:e.o((e=>a.localSearchListDel=!0)),d:"777adec4-2-"+h+",777adec4-1",e:e.p({color:a.iconColor,size:"18",type:"trash"})},{h:e.f(a.localSearchList,((t,i,s)=>e.e({a:e.t(t),b:t},a.localSearchListDel?{c:"777adec4-3-"+h+"-"+s+",777adec4-1",d:e.p({size:"12",type:"closeempty"})}:{},{e:i,f:e.o((e=>c.LocalSearchlistItemClick(t,i)),i)}))),i:a.localSearchListDel}):{},{j:!a.netHotListIsHide},a.netHotListIsHide?{}:{k:e.o(c.searchHotRefresh),l:"777adec4-4-"+h+",777adec4-1",m:e.p({color:a.iconColor,size:"14",type:"reload"})},{n:e.o((e=>a.netHotListIsHide=!a.netHotListIsHide)),o:"777adec4-5-"+h+",777adec4-1",p:e.p({color:a.iconColor,size:"18",type:a.netHotListIsHide?"eye-slash":"eye"}),q:e.w((({data:t,loading:i,error:s,options:o},l,r)=>e.e({a:i&&!a.netHotListIsHide},i&&!a.netHotListIsHide?{}:e.e({b:!a.netHotListIsHide},a.netHotListIsHide?{}:e.e({c:s},s?{d:e.t(s.message)}:{e:e.f(t,((t,i,s)=>({a:e.t(t.content),b:i,c:e.o((e=>c.search(t.content)),i)})))})),{f:r,g:l})),{name:"d",path:"g["+h+"].q",vueId:"777adec4-6-"+h+",777adec4-1"}),r:e.sr("udb","777adec4-6-"+h+",777adec4-1"),s:"777adec4-6-"+h+",777adec4-1",t:e.p({field:"content",collection:"opendb-search-hot",orderby:"create_date desc,count desc","page-data":"replace","page-size":10})}),{D:h,E:n})),{name:"d",path:"g",vueId:"777adec4-1"}),h:!a.isLoadData,i:e.sr("listUdb","777adec4-1"),j:e.o(c.onqueryerror),k:e.o(c.onDbLoad),l:e.p({collection:c.colList,"page-size":10,orderby:"publish_date desc",loadtime:"manual"}),m:a.associativeShow},a.associativeShow?{n:e.f(a.associativeList,((t,i,s)=>({a:t._id,b:e.o((e=>c.associativeClick(t)),t._id),c:"777adec4-11-"+s+",777adec4-10",d:e.p({ellipsis:1,title:t.title,"show-extra-icon":!0,clickable:!0,"extra-icon":{size:18,color:a.iconColor,type:"search"}})})))}:{})}],["__scopeId","data-v-777adec4"]]);wx.createPage(d);
