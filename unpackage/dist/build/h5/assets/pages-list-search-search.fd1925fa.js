import{g as e,E as a,a5 as t,h as s,V as o,S as l,W as c,a as i,H as r,a1 as n,o as h,c as d,w as u,i as f,b as p,k as _,e as L,r as b,F as y,l as g,t as m,j as x,p as k}from"./index.936514eb.js";import{_ as C}from"./uni-search-bar.fdb31326.js";import{r as S}from"./uni-app.es.ab12552c.js";import{_ as w}from"./uni-icons.26f52fee.js";import{_ as D}from"./unicloud-db.3c5dbaac.js";import{_ as v,a as H}from"./uni-list.c623bab7.js";import{_ as T}from"./_plugin-vue_export-helper.cdc0426e.js";const I="__local_search_history";var j,z,W,B,G,N;const V=T({data:()=>({mallGoodsDbName:"opendb-news-articles",searchLogDbName:"opendb-search-log",statusBarHeight:"0px",localSearchList:e(I),localSearchListDel:!1,netHotListIsHide:!1,searchText:"",iconColor:"#999999",associativeList:[],keyBoardPopup:!1,hotWorld:"DCloud",focus:!0,speechEngine:"iFly"}),created(){this.db=a.database(),this.searchLogDb=this.db.collection(this.searchLogDbName),this.mallGoodsDb=this.db.collection(this.mallGoodsDbName),this.searchText=t().globalData.searchText},computed:{associativeShow(){return this.searchText&&this.associativeList.length}},onLoad(){},methods:{clear(e){console.log("res: ",e)},confirm(e){this.search(e.value)},cancel(e){s(),this.searchText="",this.loadList()},search(e){(e||this.hotWorld)&&(e?(this.searchText!==e&&(this.searchText=e),this.localSearchListManage(e),this.searchLogDbAdd(e)):this.hotWorld&&(this.searchText=this.hotWorld),s(),this.loadList(this.searchText))},localSearchListManage(a){e(I).length?(this.localSearchList.unshift(a),(e=>{for(let a=e.length-1;a>=0;a--){const t=e.indexOf(e[a]),s=e.lastIndexOf(e[a]);t!=s&&e.splice(s,1)}})(this.localSearchList),this.localSearchList.length>10&&this.localSearchList.pop()):this.localSearchList=[a],o(I,this.localSearchList)},LocalSearchListClear(){l({content:"确认清空搜索历史吗",confirmText:"删除",confirmColor:"red",cancelColor:"#808080",success:e=>{e.confirm&&(this.localSearchListDel=!1,this.localSearchList=[],c(I))}})},LocalSearchlistItemClick(e,a){if(this.localSearchListDel)return this.localSearchList.splice(a,1),o(I,this.localSearchList),void(this.localSearchList.length||(this.localSearchListDel=!1));this.search(e)},searchHotRefresh(){this.$refs.udb.refresh()},speech(){},searchLogDbAdd(e){this.getDeviceId().then((a=>{this.searchLogDb.add({device_id:a,content:e,create_date:Date.now()})}))},getDeviceId:()=>new Promise(((a,t)=>{const s=e("uni_id");a(s||i().system+"_"+Math.random().toString(36).substr(2))})),associativeClick(e){console.log("associativeClick: ",e),this.loadList(e.title)},loadList(e=""){t().globalData.searchText=e,r({url:"/pages/list/list"})},backPage(){n()}},watch:{searchText:(j=function(e){e?this.mallGoodsDb.where({title:new RegExp(e,"gi")}).field("_id,title").get().then((e=>{this.associativeList=e.result.data})):(this.associativeList.length=0,t().globalData.searchText="")},z=100,B=j,G=null,N=!0,W&&B(),function(){var e=arguments,a=this;N&&(N=!1,B.apply(a,e)),G&&clearTimeout(G),G=setTimeout((function(){clearTimeout(G),G=null,B.apply(a,e)}),z||200)})}},[["render",function(e,a,t,s,o,l){const c=S(x("uni-search-bar"),C),i=f,r=k,n=S(x("uni-icons"),w),T=S(x("unicloud-db"),D),I=S(x("uni-list-item"),v),j=S(x("uni-list"),H);return h(),d(i,{class:"container"},{default:u((()=>[p(i,{class:"search-container"},{default:u((()=>[p(i,{class:"search-container-bar"},{default:u((()=>[p(c,{ref:"searchBar",style:{flex:"1"},radius:"100",modelValue:o.searchText,"onUpdate:modelValue":a[0]||(a[0]=e=>o.searchText=e),focus:o.focus,placeholder:o.hotWorld,clearButton:"auto",cancelButton:"always",onClear:l.clear,onConfirm:l.confirm,onCancel:l.cancel},null,8,["modelValue","focus","placeholder","onClear","onConfirm","onCancel"])])),_:1})])),_:1}),p(i,{class:"search-body"},{default:u((()=>[o.localSearchList.length?(h(),d(i,{key:0,class:"word-container"},{default:u((()=>[p(i,{class:"word-container_header"},{default:u((()=>[p(r,{class:"word-container_header-text"},{default:u((()=>[_("搜索历史")])),_:1}),o.localSearchListDel?(h(),d(i,{key:1,class:"flex-center flex-row",style:{"font-weight":"500","justify-content":"space-between"}},{default:u((()=>[p(r,{style:{"font-size":"22rpx",color:"#666","padding-top":"4rpx","padding-bottom":"4rpx","padding-right":"20rpx"},onClick:l.LocalSearchListClear},{default:u((()=>[_("全部删除")])),_:1},8,["onClick"]),p(r,{style:{"font-size":"22rpx",color:"#c0402b","padding-top":"4rpx","padding-bottom":"4rpx","padding-left":"20rpx"},onClick:a[2]||(a[2]=e=>o.localSearchListDel=!1)},{default:u((()=>[_("完成")])),_:1})])),_:1})):(h(),d(n,{key:0,onClick:a[1]||(a[1]=e=>o.localSearchListDel=!0),class:"search-icons",style:{"padding-right":"0"},color:o.iconColor,size:"18",type:"trash"},null,8,["color"]))])),_:1}),p(i,{class:"word-container_body"},{default:u((()=>[(h(!0),L(y,null,b(o.localSearchList,((e,a)=>(h(),d(i,{class:"flex-center flex-row word-container_body-text",key:a,onClick:t=>l.LocalSearchlistItemClick(e,a)},{default:u((()=>[(h(),d(r,{class:"word-display",key:e},{default:u((()=>[_(m(e),1)])),_:2},1024)),o.localSearchListDel?(h(),d(n,{key:0,size:"12",type:"closeempty"})):g("",!0)])),_:2},1032,["onClick"])))),128))])),_:1})])),_:1})):g("",!0),p(i,{class:"word-container"},{default:u((()=>[p(i,{class:"word-container_header"},{default:u((()=>[p(i,{class:"flex-center flex-row"},{default:u((()=>[p(r,{class:"word-container_header-text"},{default:u((()=>[_("搜索发现")])),_:1}),o.netHotListIsHide?g("",!0):(h(),d(n,{key:0,class:"search-icons",color:o.iconColor,size:"14",type:"reload",onClick:l.searchHotRefresh},null,8,["color","onClick"]))])),_:1}),p(n,{class:"search-icons",style:{"padding-right":"0"},color:o.iconColor,size:"18",type:o.netHotListIsHide?"eye-slash":"eye",onClick:a[3]||(a[3]=e=>o.netHotListIsHide=!o.netHotListIsHide)},null,8,["color","type"])])),_:1}),p(T,{ref:"udb",field:"content",collection:"opendb-search-hot",orderby:"create_date desc,count desc","page-data":"replace","page-size":10},{default:u((({data:e,loading:a,error:t,options:s})=>[a&&!o.netHotListIsHide?(h(),d(r,{key:0,class:"word-container_body-info"},{default:u((()=>[_("正在加载...")])),_:1})):(h(),d(i,{key:1,class:"word-container_body"},{default:u((()=>[o.netHotListIsHide?(h(),d(i,{key:1,style:{flex:"1"}},{default:u((()=>[p(r,{class:"word-container_body-info"},{default:u((()=>[_("当前搜索发现已隐藏")])),_:1})])),_:1})):(h(),L(y,{key:0},[t?(h(),d(r,{key:0,class:"word-container_body-info"},{default:u((()=>[_(m(t.message),1)])),_:2},1024)):(h(!0),L(y,{key:1},b(e,((e,a)=>(h(),d(r,{class:"word-container_body-text",key:a,onClick:a=>l.search(e.content)},{default:u((()=>[_(m(e.content),1)])),_:2},1032,["onClick"])))),128))],64))])),_:2},1024))])),_:1},512)])),_:1})])),_:1}),l.associativeShow?(h(),d(i,{key:0,class:"search-associative"},{default:u((()=>[p(j,null,{default:u((()=>[(h(!0),L(y,null,b(o.associativeList,((e,a)=>(h(),d(I,{key:e._id,ellipsis:1,title:e.name,onClick:a=>l.associativeClick(e),"show-extra-icon":"",clickable:"","extra-icon":{size:18,color:o.iconColor,type:"search"}},null,8,["title","onClick","extra-icon"])))),128))])),_:1})])),_:1})):g("",!0)])),_:1})}],["__scopeId","data-v-1d276519"]]);export{V as default};