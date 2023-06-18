import{D as e,g as a,Q as s,h as t,n as o,s as r,o as l,c as i,w as n,i as d,b as c,d as u,e as h,r as m,F as f,j as p,k as _,t as y,m as g,p as w}from"./index-0982dc28.js";import{_ as b}from"./uni-search-bar.3f77c41f.js";import{r as k}from"./uni-app.es.0abf17f1.js";import{_ as j}from"./uni-dateformat.cb07646a.js";import{_ as M,a as R}from"./uni-list.41a88308.js";import{_ as v}from"./uni-load-state.19d22a78.js";import{_ as x}from"./unicloud-db.9e3e3341.js";import{s as D}from"./uni-status-bar.36723567.js";import{_ as C}from"./_plugin-vue_export-helper.1b428a4d.js";import"./uni-icons.3b963afa.js";let T;const L=e.database();const B=C({components:{statusBar:D},computed:{inputPlaceholder:e=>"en"==a("CURRENT_LANG")?"Please enter the search content":"请输入搜索内容",colList(){return[L.collection("opendb-news-articles").where(this.where).field("avatar,title,last_modify_date,user_id").getTemp(),L.collection("uni-id-users").field("_id,nickname").getTemp()]}},data:()=>({where:'"article_status" == 1',keyword:"",showRefresh:!1,listHight:0}),watch:{keyword(e,a){let s='"article_status" == 1 ';this.where=e?`"article_status" == 1 && /${e}/.test(title)`:s}},async onReady(){this.listHight="auto",T=this.$refs.udb},async onShow(){this.keyword=s().globalData.searchText,s().globalData.searchText=""},methods:{searchClick(e){t(),o({url:"/pages/list/search/search",animationType:"fade-in"})},retry(){this.refresh()},refresh(){T.loadData({clear:!0},(()=>{r(),console.log("end")})),console.log("refresh")},loadMore(){T.loadMore()},onqueryerror(e){console.error(e)},onpullingdown(e){console.log(e),this.showRefresh=!0,e.pullingDistance>100&&this.refresh()}},onPullDownRefresh(){this.refresh()},onReachBottom(){this.loadMore()}},[["render",function(e,a,s,t,o,r){const D=k(p("uni-search-bar"),b),C=d,T=g,L=w,B=k(p("uni-dateformat"),j),E=k(p("uni-list-item"),M),N=k(p("uni-load-state"),v),P=k(p("uni-list"),R),H=k(p("unicloud-db"),x);return l(),i(C,{class:"pages"},{default:n((()=>[c(C,{class:"uni-search-box"},{default:n((()=>[c(D,{modelValue:o.keyword,"onUpdate:modelValue":a[0]||(a[0]=e=>o.keyword=e),ref:"searchBar",radius:"100",cancelButton:"none",disabled:"",placeholder:r.inputPlaceholder},null,8,["modelValue","placeholder"]),c(C,{class:"cover-search-bar",onClick:r.searchClick},null,8,["onClick"])])),_:1}),c(H,{ref:"udb",onError:r.onqueryerror,collection:r.colList,"page-size":10},{default:n((({data:e,pagination:a,hasMore:s,loading:t,error:d,options:p})=>[c(P,{class:"uni-list",border:!1,style:u({height:o.listHight})},{default:n((()=>[(l(!0),h(f,null,m(e,((e,a)=>(l(),i(E,{to:"/pages/list/detail?id="+e._id+"&title="+e.title,key:a},{header:n((()=>[c(T,{class:"avatar",src:e.avatar,mode:"aspectFill"},null,8,["src"])])),body:n((()=>[c(C,{class:"main"},{default:n((()=>[c(L,{class:"title"},{default:n((()=>[_(y(e.title),1)])),_:2},1024),c(C,{class:"info"},{default:n((()=>[c(L,{class:"author"},{default:n((()=>[_(y(e.user_id[0]?e.user_id[0].nickname:""),1)])),_:2},1024),c(B,{class:"last_modify_date",date:e.last_modify_date,format:"yyyy-MM-dd",threshold:[6e4,2592e6]},null,8,["date"])])),_:2},1024)])),_:2},1024)])),_:2},1032,["to"])))),128)),c(N,{onNetworkResume:r.refresh,state:{data:e,pagination:a,hasMore:s,loading:t,error:d},onLoadMore:r.loadMore},null,8,["onNetworkResume","state","onLoadMore"])])),_:2},1032,["style"])])),_:1},8,["onError","collection"])])),_:1})}],["__scopeId","data-v-d64780c9"]]);export{B as default};