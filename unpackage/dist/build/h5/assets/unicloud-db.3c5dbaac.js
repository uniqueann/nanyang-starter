import{u as t,P as e,Q as i,E as n,R as o,S as a,T as s,o as l,c,w as r,v as d,C as h,i as u}from"./index.936514eb.js";import{s as p,a as g}from"./uni-app.es.ab12552c.js";import{_ as m}from"./_plugin-vue_export-helper.cdc0426e.js";const f={en:{"uniCloud.component.add.success":"Success","uniCloud.component.update.success":"Success","uniCloud.component.remove.showModal.title":"Tips","uniCloud.component.remove.showModal.content":"是否删除该数据"},es:{"uniCloud.component.add.success":"新增成功","uniCloud.component.update.success":"修改成功","uniCloud.component.remove.showModal.title":"提示","uniCloud.component.remove.showModal.content":"是否删除该数据"},fr:{"uniCloud.component.add.success":"新增成功","uniCloud.component.update.success":"修改成功","uniCloud.component.remove.showModal.title":"提示","uniCloud.component.remove.showModal.content":"是否删除该数据"},"zh-Hans":{"uniCloud.component.add.success":"新增成功","uniCloud.component.update.success":"修改成功","uniCloud.component.remove.showModal.title":"提示","uniCloud.component.remove.showModal.content":"是否删除该数据"},"zh-Hant":{"uniCloud.component.add.success":"新增成功","uniCloud.component.update.success":"修改成功","uniCloud.component.remove.showModal.title":"提示","uniCloud.component.remove.showModal.content":"是否刪除數據"}},y=Array.isArray,{t:C}=t(f),v="load",_="error",w="add",S="replace",b="auto",D="manual",x=["pageCurrent","pageSize","collection","action","field","getcount","orderby","where","groupby","groupField","distinct"];const I=m({name:"UniClouddb",setup(t){const i=t.ssrKey?t.getone?p(void 0,t.ssrKey):g([],t.ssrKey):t.getone?p(void 0,"/TC2PZpHostiwIt/E5C6og=="):g([],"boT5MVdWWKzaPdTPN626cQ=="),n=h();return e((()=>{i.value&&0!==i.value.length||t.manual||t.loadtime!==b||n.proxy.loadData()})),{dataList:i}},async serverPrefetch(){if(!this.manual&&this.loadtime===b)return this.loadData()},props:{options:{type:[Object,Array],default:()=>({})},spaceInfo:{type:Object,default:()=>({})},collection:{type:[String,Array],default:""},action:{type:String,default:""},field:{type:String,default:""},orderby:{type:String,default:""},where:{type:[String,Object],default:""},pageData:{type:String,default:"add"},pageCurrent:{type:Number,default:1},pageSize:{type:Number,default:20},getcount:{type:[Boolean,String],default:!1},getone:{type:[Boolean,String],default:!1},gettree:{type:[Boolean,String,Object],default:!1},gettreepath:{type:[Boolean,String],default:!1},startwith:{type:String,default:""},limitlevel:{type:Number,default:10},groupby:{type:String,default:""},groupField:{type:String,default:""},distinct:{type:[Boolean,String],default:!1},pageIndistinct:{type:[Boolean,String],default:!1},foreignKey:{type:String,default:""},loadtime:{type:String,default:"auto"},manual:{type:Boolean,default:!1},ssrKey:{type:[String,Number],default:""}},data:()=>({loading:!1,hasMore:!1,paginationInternal:{},errorMessage:""}),computed:{collectionArgs(){return y(this.collection)?this.collection:[this.collection]},isLookup(){return y(this.collection)&&this.collection.length>1||"string"==typeof this.collection&&this.collection.indexOf(",")>-1},mainCollection(){if("string"==typeof this.collection)return this.collection.split(",")[0];return JSON.parse(JSON.stringify(this.collection[0])).$db[0].$param[0]}},created(){this._isEnded=!1,this.paginationInternal={current:this.pageCurrent,size:this.pageSize,count:0},this.$watch((()=>{var t=[];return x.forEach((e=>{t.push(this[e])})),t}),((t,e)=>{if(this.paginationInternal.size=this.pageSize,t[0]!==e[0]&&(this.paginationInternal.current=this.pageCurrent),this.loadtime===D)return;let i=!1;for(let n=2;n<t.length;n++)if(t[n]!==e[n]){i=!0;break}i&&(this.clear(),this.reset()),this._execLoadData()}))},methods:{loadData(t,e){let i=null,n=!1;return"object"==typeof t?(t.clear&&(this.pageData===S?this.clear():n=t.clear,this.reset()),void 0!==t.current&&(this.paginationInternal.current=t.current),"function"==typeof e&&(i=e)):"function"==typeof t&&(i=t),this._execLoadData(i,n)},loadMore(){this._isEnded||this.loading||(this.pageData===w&&this.paginationInternal.current++,this._execLoadData())},refresh(){this.clear(),this._execLoadData()},clear(){this._isEnded=!1,this.dataList=[]},reset(){this.paginationInternal.current=1},add(t,{action:e,showToast:l=!0,toastTitle:c,success:r,fail:d,complete:h,needConfirm:u=!0,needLoading:p=!0,loadingTitle:g=""}={}){p&&i({title:g});let m=n.database(this.spaceInfo);e&&(m=m.action(e)),m.collection(this.mainCollection).add(t).then((t=>{r&&r(t),l&&o({title:c||C("uniCloud.component.add.success")})})).catch((t=>{d&&d(t),u&&a({content:t.message,showCancel:!1})})).finally((()=>{p&&s(),h&&h()}))},remove(t,{action:e,success:i,fail:n,complete:o,confirmTitle:s,confirmContent:l,needConfirm:c=!0,needLoading:r=!0,loadingTitle:d=""}={}){t&&t.length&&(c?a({title:s||C("uniCloud.component.remove.showModal.title"),content:l||C("uniCloud.component.remove.showModal.content"),showCancel:!0,success:a=>{a.confirm&&this._execRemove(t,e,i,n,o,c,r,d)}}):this._execRemove(t,e,i,n,o,c,r,d))},update(t,e,{action:l,showToast:c=!0,toastTitle:r,success:d,fail:h,complete:u,needConfirm:p=!0,needLoading:g=!0,loadingTitle:m=""}={}){g&&i({title:m});let f=n.database(this.spaceInfo);return l&&(f=f.action(l)),f.collection(this.mainCollection).doc(t).update(e).then((t=>{d&&d(t),c&&o({title:r||C("uniCloud.component.update.success")})})).catch((t=>{h&&h(t),p&&a({content:t.message,showCancel:!1})})).finally((()=>{g&&s(),u&&u()}))},getTemp(t=!0){let e=n.database(this.spaceInfo);this.action&&(e=e.action(this.action)),e=e.collection(...this.collectionArgs),this.foreignKey&&(e=e.foreignKey(this.foreignKey)),this.where&&Object.keys(this.where).length&&(e=e.where(this.where)),this.field&&(e=e.field(this.field)),this.groupby&&(e=e.groupBy(this.groupby)),this.groupField&&(e=e.groupField(this.groupField)),!0===this.distinct&&(e=e.distinct()),this.orderby&&(e=e.orderBy(this.orderby));const{current:i,size:o}=this.paginationInternal,a={};this.getcount&&(a.getCount=this.getcount);const s={limitLevel:this.limitlevel,startWith:this.startwith};return this.gettree&&(a.getTree=s),this.gettreepath&&(a.getTreePath=s),e=e.skip(o*(i-1)).limit(o),t?(e=e.getTemp(a),e.udb=this):e=e.get(a),e},setResult(t){0===t.code?this._execLoadDataSuccess(t):this._execLoadDataFail(new Error(t.message))},_execLoadData(t,e){if(!this.loading)return this.loading=!0,this.errorMessage="",this._getExec().then((i=>{this.loading=!1,this._execLoadDataSuccess(i.result,t,e)})).catch((e=>{this.loading=!1,this._execLoadDataFail(e,t)}))},_execLoadDataSuccess(t,e,i){const{data:n,count:o}=t;this._isEnded=void 0!==o?this.paginationInternal.current*this.paginationInternal.size>=o:n.length<this.pageSize,this.hasMore=!this._isEnded;const a=this.getone?n.length?n[0]:void 0:n;this.getcount&&(this.paginationInternal.count=o),e&&e(a,this._isEnded,this.paginationInternal),this._dispatchEvent(v,a),this.getone||this.pageData===S||i?this.dataList=a:this.dataList.push(...a)},_execLoadDataFail(t,e){this.errorMessage=t,e&&e(),this.$emit(_,t)},_getExec(){return this.getTemp(!1)},_execRemove(t,e,o,l,c,r,d,h){if(!this.collection||!t)return;const u=y(t)?t:[t];if(!u.length)return;d&&i({mask:!0,title:h});const p=n.database(this.spaceInfo),g=p.command;let m=p;e&&(m=m.action(e)),m.collection(this.mainCollection).where({_id:g.in(u)}).remove().then((t=>{o&&o(t.result),this.pageData===S?this.refresh():this.removeData(u)})).catch((t=>{l&&l(t),r&&a({content:t.message,showCancel:!1})})).finally((()=>{d&&s(),c&&c()}))},removeData(t){const e=t.slice(0),i=this.dataList;for(let n=i.length-1;n>=0;n--){const t=e.indexOf(i[n]._id);t>=0&&(i.splice(n,1),e.splice(t,1))}},_dispatchEvent(t,e){this._changeDataFunction?this._changeDataFunction(e,this._isEnded,this.paginationInternal):this.$emit(t,e,this._isEnded,this.paginationInternal)}}},[["render",function(t,e,i,n,o,a){const s=u;return l(),c(s,null,{default:r((()=>[d(t.$slots,"default",{options:i.options,data:n.dataList,pagination:o.paginationInternal,loading:o.loading,hasMore:o.hasMore,error:o.errorMessage})])),_:3})}]]);export{I as _};
