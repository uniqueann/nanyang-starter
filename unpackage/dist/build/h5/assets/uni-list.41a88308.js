import{o as t,c as e,w as i,y as s,z as o,d as l,k as a,t as n,l as r,p as d,i as c,n as u,M as p,a1 as h,L as f,j as g,b as m,m as y,af as b}from"./index-0982dc28.js";import{_ as k}from"./uni-icons.3b963afa.js";import{r as S}from"./uni-app.es.0abf17f1.js";import{_}from"./_plugin-vue_export-helper.1b428a4d.js";const w=_({name:"UniBadge",emits:["click"],props:{type:{type:String,default:"error"},inverted:{type:Boolean,default:!1},isDot:{type:Boolean,default:!1},maxNum:{type:Number,default:99},absolute:{type:String,default:""},offset:{type:Array,default:()=>[0,0]},text:{type:[String,Number],default:""},size:{type:String,default:"small"},customStyle:{type:Object,default:()=>({})}},data:()=>({}),computed:{width(){return 8*String(this.text).length+12},classNames(){const{inverted:t,type:e,size:i,absolute:s}=this;return[t?"uni-badge--"+e+"-inverted":"","uni-badge--"+e,"uni-badge--"+i,s?"uni-badge--absolute":""].join(" ")},positionStyle(){if(!this.absolute)return{};let t=this.width/2,e=10;this.isDot&&(t=5,e=5);const i=`${-t+this.offset[0]}px`,s=`${-e+this.offset[1]}px`,o={rightTop:{right:i,top:s},rightBottom:{right:i,bottom:s},leftBottom:{left:i,bottom:s},leftTop:{left:i,top:s}},l=o[this.absolute];return l||o.rightTop},dotStyle(){return this.isDot?{width:"10px",minWidth:"0",height:"10px",padding:"0",borderRadius:"10px"}:{}},displayValue(){const{isDot:t,text:e,maxNum:i}=this;return t?"":Number(e)>i?`${i}+`:e}},methods:{onClick(){this.$emit("click")}}},[["render",function(u,p,h,f,g,m){const y=d,b=c;return t(),e(b,{class:"uni-badge--x"},{default:i((()=>[s(u.$slots,"default",{},void 0,!0),h.text?(t(),e(y,{key:0,class:o([m.classNames,"uni-badge"]),style:l([m.positionStyle,h.customStyle,m.dotStyle]),onClick:p[0]||(p[0]=t=>m.onClick())},{default:i((()=>[a(n(m.displayValue),1)])),_:1},8,["class","style"])):r("",!0)])),_:3})}],["__scopeId","data-v-871ec77f"]]);const x=_({name:"UniListItem",emits:["click","switchChange"],props:{direction:{type:String,default:"row"},title:{type:String,default:""},note:{type:String,default:""},ellipsis:{type:[Number,String],default:0},disabled:{type:[Boolean,String],default:!1},clickable:{type:Boolean,default:!1},showArrow:{type:[Boolean,String],default:!1},link:{type:[Boolean,String],default:!1},to:{type:String,default:""},showBadge:{type:[Boolean,String],default:!1},showSwitch:{type:[Boolean,String],default:!1},switchChecked:{type:[Boolean,String],default:!1},badgeText:{type:String,default:""},badgeType:{type:String,default:"success"},badgeStyle:{type:Object,default:()=>({})},rightText:{type:String,default:""},thumb:{type:String,default:""},thumbSize:{type:String,default:"base"},showExtraIcon:{type:[Boolean,String],default:!1},extraIcon:{type:Object,default:()=>({type:"",color:"#000000",size:20,customPrefix:""})},border:{type:Boolean,default:!0},customStyle:{type:Object,default:()=>({padding:"",backgroundColor:"#FFFFFF"})},keepScrollPosition:{type:Boolean,default:!1}},watch:{"customStyle.padding":{handler(t){"number"==typeof t&&(t+="");let e=t.split(" ");if(1===e.length){const t=e[0];this.padding={top:t,right:t,bottom:t,left:t}}else if(2===e.length){const[t,i]=e;this.padding={top:t,right:i,bottom:t,left:i}}else if(4===e.length){const[t,i,s,o]=e;this.padding={top:t,right:i,bottom:s,left:o}}},immediate:!0}},data:()=>({isFirstChild:!1,padding:{top:"",right:"",bottom:"",left:""}}),mounted(){this.list=this.getForm(),this.list&&(this.list.firstChildAppend||(this.list.firstChildAppend=!0,this.isFirstChild=!0))},methods:{getForm(t="uniList"){let e=this.$parent,i=e.$options.name;for(;i!==t;){if(e=e.$parent,!e)return!1;i=e.$options.name}return e},onClick(){""===this.to?(this.clickable||this.link)&&this.$emit("click",{data:{}}):this.openPage()},onSwitchChange(t){this.$emit("switchChange",t.detail)},openPage(){-1!==["navigateTo","redirectTo","reLaunch","switchTab"].indexOf(this.link)?this.pageApi(this.link):this.pageApi("navigateTo")},pageApi(t){let e={url:this.to,success:t=>{this.$emit("click",{data:t})},fail:t=>{this.$emit("click",{data:t})}};switch(t){case"navigateTo":default:u(e);break;case"redirectTo":f(e);break;case"reLaunch":h(e);break;case"switchTab":p(e)}}}},[["render",function(u,p,h,f,_,x){const B=c,C=y,T=S(g("uni-icons"),k),$=d,v=S(g("uni-badge"),w),F=b;return t(),e(B,{class:o([{"uni-list-item--disabled":h.disabled},"uni-list-item"]),style:l({"background-color":h.customStyle.backgroundColor}),"hover-class":!h.clickable&&!h.link||h.disabled||h.showSwitch?"":"uni-list-item--hover",onClick:x.onClick},{default:i((()=>[_.isFirstChild?r("",!0):(t(),e(B,{key:0,class:o(["border--left",{"uni-list--border":h.border}])},null,8,["class"])),m(B,{class:o(["uni-list-item__container",{"container--right":h.showArrow||h.link,"flex--direction":"column"===h.direction}]),style:l({paddingTop:_.padding.top,paddingLeft:_.padding.left,paddingRight:_.padding.right,paddingBottom:_.padding.bottom})},{default:i((()=>[s(u.$slots,"header",{},(()=>[m(B,{class:"uni-list-item__header"},{default:i((()=>[h.thumb?(t(),e(B,{key:0,class:"uni-list-item__icon"},{default:i((()=>[m(C,{src:h.thumb,class:o(["uni-list-item__icon-img",["uni-list--"+h.thumbSize]])},null,8,["src","class"])])),_:1})):h.showExtraIcon?(t(),e(B,{key:1,class:"uni-list-item__icon"},{default:i((()=>[m(T,{customPrefix:h.extraIcon.customPrefix,color:h.extraIcon.color,size:h.extraIcon.size,type:h.extraIcon.type},null,8,["customPrefix","color","size","type"])])),_:1})):r("",!0)])),_:1})]),!0),s(u.$slots,"body",{},(()=>[m(B,{class:o(["uni-list-item__content",{"uni-list-item__content--center":h.thumb||h.showExtraIcon||h.showBadge||h.showSwitch}])},{default:i((()=>[h.title?(t(),e($,{key:0,class:o(["uni-list-item__content-title",[0!==h.ellipsis&&h.ellipsis<=2?"uni-ellipsis-"+h.ellipsis:""]])},{default:i((()=>[a(n(h.title),1)])),_:1},8,["class"])):r("",!0),h.note?(t(),e($,{key:1,class:"uni-list-item__content-note"},{default:i((()=>[a(n(h.note),1)])),_:1})):r("",!0)])),_:1},8,["class"])]),!0),s(u.$slots,"footer",{},(()=>[h.rightText||h.showBadge||h.showSwitch?(t(),e(B,{key:0,class:o(["uni-list-item__extra",{"flex--justify":"column"===h.direction}])},{default:i((()=>[h.rightText?(t(),e($,{key:0,class:"uni-list-item__extra-text"},{default:i((()=>[a(n(h.rightText),1)])),_:1})):r("",!0),h.showBadge?(t(),e(v,{key:1,type:h.badgeType,text:h.badgeText,"custom-style":h.badgeStyle},null,8,["type","text","custom-style"])):r("",!0),h.showSwitch?(t(),e(F,{key:2,disabled:h.disabled,checked:h.switchChecked,onChange:x.onSwitchChange},null,8,["disabled","checked","onChange"])):r("",!0)])),_:1},8,["class"])):r("",!0)]),!0)])),_:3},8,["class","style"]),h.showArrow||h.link?(t(),e(T,{key:1,size:16,class:"uni-icon-wrapper",color:"#bbb",type:"arrowright"})):r("",!0)])),_:3},8,["class","style","hover-class","onClick"])}],["__scopeId","data-v-ae887389"]]);const B=_({name:"uniList","mp-weixin":{options:{multipleSlots:!1}},props:{stackFromEnd:{type:Boolean,default:!1},enableBackToTop:{type:[Boolean,String],default:!1},scrollY:{type:[Boolean,String],default:!1},border:{type:Boolean,default:!0},renderReverse:{type:Boolean,default:!1}},created(){this.firstChildAppend=!1},methods:{loadMore(t){this.$emit("scrolltolower")},scroll(t){this.$emit("scroll",t)}}},[["render",function(o,l,a,n,d,u){const p=c;return t(),e(p,{class:"uni-list uni-border-top-bottom"},{default:i((()=>[a.border?(t(),e(p,{key:0,class:"uni-list--border-top"})):r("",!0),s(o.$slots,"default",{},void 0,!0),a.border?(t(),e(p,{key:1,class:"uni-list--border-bottom"})):r("",!0)])),_:3})}],["__scopeId","data-v-1f7cd97b"]]);export{x as _,B as a};
