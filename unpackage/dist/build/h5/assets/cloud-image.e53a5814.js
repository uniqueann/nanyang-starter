import{E as e,o as t,c as i,w as c,d as s,u as r,l,i as d}from"./index.694e3e81.js";import{_ as h}from"./_plugin-vue_export-helper.cdc0426e.js";const n=h({name:"cloud-image",emits:["click"],props:{mode:{type:String,default:()=>"widthFix"},src:{default:()=>""},width:{type:String,default:()=>"100rpx"},height:{type:String,default:()=>"100rpx"}},watch:{src:{handler(t){t&&"cloud://"==t.substring(0,8)?e.getTempFileURL({fileList:[t]}).then((e=>{this.cSrc=e.fileList[0].tempFileURL})):this.cSrc=t},immediate:!0}},methods:{onClick(){this.$emit("click")}},data:()=>({cSrc:!1})},[["render",function(e,h,n,o,a,m){const p=l,u=d;return t(),i(u,{onClick:m.onClick,style:s([{width:n.width,height:n.height},{"justify-content":"center"}])},{default:c((()=>[a.cSrc?(t(),i(p,{key:0,style:s({width:n.width,height:n.height}),src:a.cSrc,mode:n.mode},null,8,["style","src","mode"])):r("",!0)])),_:1},8,["onClick","style"])}]]);export{n as _};
