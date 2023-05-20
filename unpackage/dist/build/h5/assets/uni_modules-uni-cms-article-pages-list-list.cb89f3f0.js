import{E as e,g as a,a as s,h as t,n as r,s as i,o as l,c as o,w as n,i as d,b as u,d as c,e as h,r as p,F as m,f,j as b,k as _,t as g,l as y,m as B,p as j,q as k}from"./index.936514eb.js";import{_ as v}from"./uni-search-bar.fdb31326.js";import{r as w}from"./uni-app.es.ab12552c.js";import{_ as M,a as R}from"./uni-list.c623bab7.js";import{_ as x}from"./uni-load-state.d2986383.js";import{_ as C}from"./unicloud-db.3c5dbaac.js";import{s as H}from"./uni-status-bar.16c55a43.js";import{t as E}from"./publish-time.4a9adb49.js";import{_ as L}from"./_plugin-vue_export-helper.cdc0426e.js";import"./uni-icons.26f52fee.js";const N=e.database();const P=L({components:{statusBar:H},computed:{inputPlaceholder:e=>"en"==a("CURRENT_LANG")?"Please enter the search content":"请输入搜索内容",colList(){return[N.collection("uni-cms-articles").where(this.where).field("thumbnail,title,publish_date,user_id").getTemp(),N.collection("uni-id-users").field("_id,nickname").getTemp()]}},data:()=>({adpid:"",where:'"article_status" == 1',showRefresh:!1,listHeight:0,mpButtonPlaceholderSize:87,navBarHeight:44}),async onReady(){this.listHeight="auto"},methods:{initNavBarSize(){let e=uni.getMenuButtonBoundingClientRect();this.mpButtonPlaceholderSize=e.width+10,this.navBarHeight=s().system.toLowerCase().includes("ios")?44:48},publishTime:e=>E(e),searchClick(e){t(),r({url:"/uni_modules/uni-cms-article/pages/search/search"})},retry(){this.refresh()},refresh(){this.$refs.udb.loadData({clear:!0},(()=>{i()}))},loadMore(){this.$refs.udb.loadMore()},onqueryerror(e){console.error(e)},aderror(e){console.log("aderror: "+JSON.stringify(e.detail))}},onPullDownRefresh(){this.refresh()},onReachBottom(){this.$refs.udb.loadMore()}},[["render",function(e,a,s,t,r,i){const H=f("statusBar"),E=d,L=w(b("uni-search-bar"),v),N=B,P=j,T=k,$=w(b("uni-list-item"),M),z=w(b("uni-load-state"),x),S=w(b("uni-list"),R),q=w(b("unicloud-db"),C);return l(),o(E,{class:"pages"},{default:n((()=>[u(E,{class:"placeholder-bar"},{default:n((()=>[u(H),u(E,{style:c({height:`${r.navBarHeight}px`})},null,8,["style"])])),_:1}),u(E,{class:"nav-box"},{default:n((()=>[u(E,{class:"nav",style:c({height:`${r.navBarHeight}px`})},{default:n((()=>[u(E,{class:"uni-search-box"},{default:n((()=>[u(L,{ref:"searchBar",radius:"100",cancelButton:"none",disabled:"",placeholder:i.inputPlaceholder},null,8,["placeholder"]),u(E,{class:"cover-search-bar",onClick:i.searchClick},null,8,["onClick"])])),_:1})])),_:1},8,["style"])])),_:1}),u(q,{ref:"udb",onError:i.onqueryerror,collection:i.colList,"page-size":10,orderby:"publish_date desc"},{default:n((({data:e,pagination:a,hasMore:s,loading:t,error:d,options:f})=>[u(S,{class:"uni-list",border:!1,style:c({height:r.listHeight})},{default:n((()=>[(l(!0),h(m,null,p(e,((e,a)=>(l(),o($,{to:"/uni_modules/uni-cms-article/pages/detail/detail?id="+e._id,key:a},{header:n((()=>[u(N,{class:"thumbnail",src:e.thumbnail,mode:"aspectFill"},null,8,["src"])])),body:n((()=>[u(E,{class:"main"},{default:n((()=>[u(P,{class:"title"},{default:n((()=>[_(g(e.title),1)])),_:2},1024),u(E,{class:"info"},{default:n((()=>[u(P,{class:"author"},{default:n((()=>[_(g(e.user_id[0]?e.user_id[0].nickname:""),1)])),_:2},1024),u(P,{class:"publish_date"},{default:n((()=>[_(g(i.publishTime(e.publish_date)),1)])),_:2},1024)])),_:2},1024)])),_:2},1024),a>0&&(a+1)%1==0?(l(),o(E,{key:0,class:"ad-view"},{default:n((()=>[u(T,{adpid:r.adpid,onError:i.aderror},null,8,["adpid","onError"])])),_:1})):y("",!0)])),_:2},1032,["to"])))),128)),u(z,{onNetworkResume:i.refresh,state:{data:e,pagination:a,hasMore:s,loading:t,error:d},onLoadMore:i.loadMore},null,8,["onNetworkResume","state","onLoadMore"])])),_:2},1032,["style"])])),_:1},8,["onError","collection"])])),_:1})}],["__scopeId","data-v-a9bd638c"]]);export{P as default};
