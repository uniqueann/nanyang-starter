import{g as e,D as a,Q as s,h as t,u as o,v as l,x as c,a as i,M as r,K as n,o as h,c as d,w as u,i as f,b as _,k as p,e as y,r as L,F as g,l as m,t as x,j as b,p as k}from"./index-0982dc28.js";import{_ as C}from"./uni-search-bar.3f77c41f.js";import{r as w}from"./uni-app.es.0abf17f1.js";import{_ as S}from"./uni-icons.3b963afa.js";import{_ as D}from"./unicloud-db.9e3e3341.js";import{_ as v,a as T}from"./uni-list.41a88308.js";import{_ as H}from"./_plugin-vue_export-helper.1b428a4d.js";var I,j,z,B,W,G;const M=H({data:()=>({mallGoodsDbName:"opendb-news-articles",searchLogDbName:"opendb-search-log",statusBarHeight:"0px",localSearchList:e("__local_search_history"),localSearchListDel:!1,netHotListIsHide:!1,searchText:"",iconColor:"#999999",associativeList:[],keyBoardPopup:!1,hotWorld:"DCloud",focus:!0,speechEngine:"iFly"}),created(){this.db=a.database(),this.searchLogDb=this.db.collection(this.searchLogDbName),this.mallGoodsDb=this.db.collection(this.mallGoodsDbName),this.searchText=s().globalData.searchText},computed:{associativeShow(){return this.searchText&&this.associativeList.length}},onLoad(){},methods:{clear(e){console.log("res: ",e)},confirm(e){this.search(e.value)},cancel(e){t(),this.searchText="",this.loadList()},search(e){(e||this.hotWorld)&&(e?(this.searchText!==e&&(this.searchText=e),this.localSearchListManage(e),this.searchLogDbAdd(e)):this.hotWorld&&(this.searchText=this.hotWorld),t(),this.loadList(this.searchText))},localSearchListManage(a){e("__local_search_history").length?(this.localSearchList.unshift(a),(e=>{for(let a=e.length-1;a>=0;a--){const s=e.indexOf(e[a]),t=e.lastIndexOf(e[a]);s!=t&&e.splice(t,1)}})(this.localSearchList),this.localSearchList.length>10&&this.localSearchList.pop()):this.localSearchList=[a],o("__local_search_history",this.localSearchList)},LocalSearchListClear(){l({content:"确认清空搜索历史吗",confirmText:"删除",confirmColor:"red",cancelColor:"#808080",success:e=>{e.confirm&&(this.localSearchListDel=!1,this.localSearchList=[],c("__local_search_history"))}})},LocalSearchlistItemClick(e,a){if(this.localSearchListDel)return this.localSearchList.splice(a,1),o("__local_search_history",this.localSearchList),void(this.localSearchList.length||(this.localSearchListDel=!1));this.search(e)},searchHotRefresh(){this.$refs.udb.refresh()},speech(){},searchLogDbAdd(e){this.getDeviceId().then((a=>{this.searchLogDb.add({device_id:a,content:e,create_date:Date.now()})}))},getDeviceId:()=>new Promise(((a,s)=>{const t=e("uni_id");a(t||i().system+"_"+Math.random().toString(36).substr(2))})),associativeClick(e){console.log("associativeClick: ",e),this.loadList(e.title)},loadList(e=""){s().globalData.searchText=e,r({url:"/pages/list/list"})},backPage(){n()}},watch:{searchText:(I=function(e){e?this.mallGoodsDb.where({title:new RegExp(e,"gi")}).field("_id,title").get().then((e=>{this.associativeList=e.result.data})):(this.associativeList.length=0,s().globalData.searchText="")},j=100,B=I,W=null,G=!0,z&&B(),function(){var e=arguments,a=this;G&&(G=!1,B.apply(a,e)),W&&clearTimeout(W),W=setTimeout((function(){clearTimeout(W),W=null,B.apply(a,e)}),j||200)})}},[["render",function(e,a,s,t,o,l){const c=w(b("uni-search-bar"),C),i=f,r=k,n=w(b("uni-icons"),S),H=w(b("unicloud-db"),D),I=w(b("uni-list-item"),v),j=w(b("uni-list"),T);return h(),d(i,{class:"container"},{default:u((()=>[_(i,{class:"search-container"},{default:u((()=>[_(i,{class:"search-container-bar"},{default:u((()=>[_(c,{ref:"searchBar",style:{flex:"1"},radius:"100",modelValue:o.searchText,"onUpdate:modelValue":a[0]||(a[0]=e=>o.searchText=e),focus:o.focus,placeholder:o.hotWorld,clearButton:"auto",cancelButton:"always",onClear:l.clear,onConfirm:l.confirm,onCancel:l.cancel},null,8,["modelValue","focus","placeholder","onClear","onConfirm","onCancel"])])),_:1})])),_:1}),_(i,{class:"search-body"},{default:u((()=>[o.localSearchList.length?(h(),d(i,{key:0,class:"word-container"},{default:u((()=>[_(i,{class:"word-container_header"},{default:u((()=>[_(r,{class:"word-container_header-text"},{default:u((()=>[p("搜索历史")])),_:1}),o.localSearchListDel?(h(),d(i,{key:1,class:"flex-center flex-row",style:{"font-weight":"500","justify-content":"space-between"}},{default:u((()=>[_(r,{style:{"font-size":"22rpx",color:"#666","padding-top":"4rpx","padding-bottom":"4rpx","padding-right":"20rpx"},onClick:l.LocalSearchListClear},{default:u((()=>[p("全部删除")])),_:1},8,["onClick"]),_(r,{style:{"font-size":"22rpx",color:"#c0402b","padding-top":"4rpx","padding-bottom":"4rpx","padding-left":"20rpx"},onClick:a[2]||(a[2]=e=>o.localSearchListDel=!1)},{default:u((()=>[p("完成")])),_:1})])),_:1})):(h(),d(n,{key:0,onClick:a[1]||(a[1]=e=>o.localSearchListDel=!0),class:"search-icons",style:{"padding-right":"0"},color:o.iconColor,size:"18",type:"trash"},null,8,["color"]))])),_:1}),_(i,{class:"word-container_body"},{default:u((()=>[(h(!0),y(g,null,L(o.localSearchList,((e,a)=>(h(),d(i,{class:"flex-center flex-row word-container_body-text",key:a,onClick:s=>l.LocalSearchlistItemClick(e,a)},{default:u((()=>[(h(),d(r,{class:"word-display",key:e},{default:u((()=>[p(x(e),1)])),_:2},1024)),o.localSearchListDel?(h(),d(n,{key:0,size:"12",type:"closeempty"})):m("",!0)])),_:2},1032,["onClick"])))),128))])),_:1})])),_:1})):m("",!0),_(i,{class:"word-container"},{default:u((()=>[_(i,{class:"word-container_header"},{default:u((()=>[_(i,{class:"flex-center flex-row"},{default:u((()=>[_(r,{class:"word-container_header-text"},{default:u((()=>[p("搜索发现")])),_:1}),o.netHotListIsHide?m("",!0):(h(),d(n,{key:0,class:"search-icons",color:o.iconColor,size:"14",type:"reload",onClick:l.searchHotRefresh},null,8,["color","onClick"]))])),_:1}),_(n,{class:"search-icons",style:{"padding-right":"0"},color:o.iconColor,size:"18",type:o.netHotListIsHide?"eye-slash":"eye",onClick:a[3]||(a[3]=e=>o.netHotListIsHide=!o.netHotListIsHide)},null,8,["color","type"])])),_:1}),_(H,{ref:"udb",field:"content",collection:"opendb-search-hot",orderby:"create_date desc,count desc","page-data":"replace","page-size":10},{default:u((({data:e,loading:a,error:s,options:t})=>[a&&!o.netHotListIsHide?(h(),d(r,{key:0,class:"word-container_body-info"},{default:u((()=>[p("正在加载...")])),_:1})):(h(),d(i,{key:1,class:"word-container_body"},{default:u((()=>[o.netHotListIsHide?(h(),d(i,{key:1,style:{flex:"1"}},{default:u((()=>[_(r,{class:"word-container_body-info"},{default:u((()=>[p("当前搜索发现已隐藏")])),_:1})])),_:1})):(h(),y(g,{key:0},[s?(h(),d(r,{key:0,class:"word-container_body-info"},{default:u((()=>[p(x(s.message),1)])),_:2},1024)):(h(!0),y(g,{key:1},L(e,((e,a)=>(h(),d(r,{class:"word-container_body-text",key:a,onClick:a=>l.search(e.content)},{default:u((()=>[p(x(e.content),1)])),_:2},1032,["onClick"])))),128))],64))])),_:2},1024))])),_:1},512)])),_:1})])),_:1}),l.associativeShow?(h(),d(i,{key:0,class:"search-associative"},{default:u((()=>[_(j,null,{default:u((()=>[(h(!0),y(g,null,L(o.associativeList,((e,a)=>(h(),d(I,{key:e._id,ellipsis:1,title:e.name,onClick:a=>l.associativeClick(e),"show-extra-icon":"",clickable:"","extra-icon":{size:18,color:o.iconColor,type:"search"}},null,8,["title","onClick","extra-icon"])))),128))])),_:1})])),_:1})):m("",!0)])),_:1})}],["__scopeId","data-v-63bef1ac"]]);export{M as default};
