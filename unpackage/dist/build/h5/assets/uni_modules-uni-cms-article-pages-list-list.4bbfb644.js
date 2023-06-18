import{D as e,g as a,a as s,h as t,n as r,s as i,o as l,c as o,w as n,i as d,b as u,d as c,e as h,r as p,F as m,f,j as _,k as b,t as g,l as y,m as B,p as v,q as w}from"./index-0982dc28.js";import{_ as j}from"./uni-search-bar.3f77c41f.js";import{r as k}from"./uni-app.es.0abf17f1.js";import{_ as M,a as R}from"./uni-list.41a88308.js";import{_ as x}from"./uni-load-state.19d22a78.js";import{_ as C}from"./unicloud-db.9e3e3341.js";import{s as H}from"./uni-status-bar.36723567.js";import{t as L}from"./publish-time.42a692e1.js";import{_ as N}from"./_plugin-vue_export-helper.1b428a4d.js";import"./uni-icons.3b963afa.js";const P=e.database();const z=N({components:{statusBar:H},computed:{inputPlaceholder:e=>"en"==a("CURRENT_LANG")?"Please enter the search content":"请输入搜索内容",colList(){return[P.collection("uni-cms-articles").where(this.where).field("thumbnail,title,publish_date,user_id").getTemp(),P.collection("uni-id-users").field("_id,nickname").getTemp()]}},data:()=>({adpid:"",where:'"article_status" == 1',showRefresh:!1,listHeight:0,mpButtonPlaceholderSize:87,navBarHeight:44}),async onReady(){this.listHeight="auto"},methods:{initNavBarSize(){let e=uni.getMenuButtonBoundingClientRect();this.mpButtonPlaceholderSize=e.width+10,this.navBarHeight=s().system.toLowerCase().includes("ios")?44:48},publishTime:e=>L(e),searchClick(e){t(),r({url:"/uni_modules/uni-cms-article/pages/search/search"})},retry(){this.refresh()},refresh(){this.$refs.udb.loadData({clear:!0},(()=>{i()}))},loadMore(){this.$refs.udb.loadMore()},onqueryerror(e){console.error(e)},aderror(e){console.log("aderror: "+JSON.stringify(e.detail))}},onPullDownRefresh(){this.refresh()},onReachBottom(){this.$refs.udb.loadMore()}},[["render",function(e,a,s,t,r,i){const H=f("statusBar"),L=d,N=k(_("uni-search-bar"),j),P=B,z=v,E=w,T=k(_("uni-list-item"),M),$=k(_("uni-load-state"),x),D=k(_("uni-list"),R),S=k(_("unicloud-db"),C);return l(),o(L,{class:"pages"},{default:n((()=>[u(L,{class:"placeholder-bar"},{default:n((()=>[u(H),u(L,{style:c({height:`${r.navBarHeight}px`})},null,8,["style"])])),_:1}),u(L,{class:"nav-box"},{default:n((()=>[u(L,{class:"nav",style:c({height:`${r.navBarHeight}px`})},{default:n((()=>[u(L,{class:"uni-search-box"},{default:n((()=>[u(N,{ref:"searchBar",radius:"100",cancelButton:"none",disabled:"",placeholder:i.inputPlaceholder},null,8,["placeholder"]),u(L,{class:"cover-search-bar",onClick:i.searchClick},null,8,["onClick"])])),_:1})])),_:1},8,["style"])])),_:1}),u(S,{ref:"udb",onError:i.onqueryerror,collection:i.colList,"page-size":10,orderby:"publish_date desc"},{default:n((({data:e,pagination:a,hasMore:s,loading:t,error:d,options:f})=>[u(D,{class:"uni-list",border:!1,style:c({height:r.listHeight})},{default:n((()=>[(l(!0),h(m,null,p(e,((e,a)=>(l(),o(T,{to:"/uni_modules/uni-cms-article/pages/detail/detail?id="+e._id,key:a},{header:n((()=>[u(P,{class:"thumbnail",src:e.thumbnail,mode:"aspectFill"},null,8,["src"])])),body:n((()=>[u(L,{class:"main"},{default:n((()=>[u(z,{class:"title"},{default:n((()=>[b(g(e.title),1)])),_:2},1024),u(L,{class:"info"},{default:n((()=>[u(z,{class:"author"},{default:n((()=>[b(g(e.user_id[0]?e.user_id[0].nickname:""),1)])),_:2},1024),u(z,{class:"publish_date"},{default:n((()=>[b(g(i.publishTime(e.publish_date)),1)])),_:2},1024)])),_:2},1024)])),_:2},1024),a>0&&(a+1)%1==0?(l(),o(L,{key:0,class:"ad-view"},{default:n((()=>[u(E,{adpid:r.adpid,onError:i.aderror},null,8,["adpid","onError"])])),_:1})):y("",!0)])),_:2},1032,["to"])))),128)),u($,{onNetworkResume:i.refresh,state:{data:e,pagination:a,hasMore:s,loading:t,error:d},onLoadMore:i.loadMore},null,8,["onNetworkResume","state","onLoadMore"])])),_:2},1032,["style"])])),_:1},8,["onError","collection"])])),_:1})}],["__scopeId","data-v-868ddb3b"]]);export{z as default};