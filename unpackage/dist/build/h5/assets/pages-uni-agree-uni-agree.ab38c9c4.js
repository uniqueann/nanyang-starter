import{n as e,T as a,a0 as t,R as s,o as l,c,w as o,ae as i,i as n,b as u,k as r,m as d,W as _}from"./index.694e3e81.js";import{_ as f}from"./_plugin-vue_export-helper.cdc0426e.js";const{about:m}=i;const p=f({data:()=>({}),onLoad(){this._canBack=!1},onBackPress(){return!this._canBack},methods:{openprotocol(a){e({url:"/uni_modules/uni-id-pages/pages/common/webview/webview?url="+m.agreements[0].url})},openPrivacyPolicy(a){e({url:"/uni_modules/uni-id-pages/pages/common/webview/webview?url="+m.agreements[1].url})},agree(e){a("userprotocol",1),this._canBack=!0,setTimeout((()=>{t({animationDuration:0})}),100)},disagree(){s({content:"确定退出本应用？",cancelText:"退出",confirmText:"取消",success:e=>{e.confirm||(window.location.href="about:blank",window.close())}})}}},[["render",function(e,a,t,s,i,f){const m=d,p=n,k=_;return l(),c(p,{class:"page"},{default:o((()=>[u(p,null,{default:o((()=>[u(m,{class:"title"},{default:o((()=>[r("个人信息保护指引")])),_:1})])),_:1}),u(p,{class:"text-item"},{default:o((()=>[u(m,{class:"tl"},{default:o((()=>[r("1.在浏览使用时，我们会收集、使用设备标识信息用于推荐。")])),_:1})])),_:1}),u(p,{class:"text-item"},{default:o((()=>[u(m,{class:"tl"},{default:o((()=>[r("2.我们可能会申请位置权限，用于演示 uni-app 的地图、定位能力。")])),_:1})])),_:1}),u(p,{class:"text-item"},{default:o((()=>[u(m,{class:"tl"},{default:o((()=>[r("3.你可以查看完整版")])),_:1})])),_:1}),u(p,{class:"text-item flex-r"},{default:o((()=>[u(m,{class:"tl hl",onClick:f.openprotocol},{default:o((()=>[r("《用户协议》")])),_:1},8,["onClick"]),u(m,{class:"tl"},{default:o((()=>[r(" 和 ")])),_:1}),u(m,{class:"tl hl",onClick:f.openPrivacyPolicy},{default:o((()=>[r("《隐私政策》")])),_:1},8,["onClick"])])),_:1}),u(p,{class:"text-item"},{default:o((()=>[u(m,{class:"tl"},{default:o((()=>[r("以便了解我们收集、使用、共享、存储信息的情况，以及对信息的保护措施。")])),_:1})])),_:1}),u(p,{class:"text-item"},{default:o((()=>[u(m,{class:"service"},{default:o((()=>[r("如果你同意请点击下面的按钮以接受我们的服务")])),_:1})])),_:1}),u(p,{class:"text-item confirm"},{default:o((()=>[u(k,{class:"btn-privacy",type:"primary",onClick:f.agree},{default:o((()=>[r("同意")])),_:1},8,["onClick"]),u(k,{class:"btn-privacy btn-disagree",onClick:f.disagree},{default:o((()=>[r("暂不使用")])),_:1},8,["onClick"])])),_:1}),u(p,{class:"exit-area"})])),_:1})}],["__scopeId","data-v-395ecabe"]]);export{p as default};