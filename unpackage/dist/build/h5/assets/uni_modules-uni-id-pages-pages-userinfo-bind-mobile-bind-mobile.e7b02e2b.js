import{C as o,D as e,K as a,o as t,c as s,w as i,i as n,b as m,k as r,m as l,p as u,j as p,E as c}from"./index-0982dc28.js";import{_ as d}from"./uni-match-media.3d79c613.js";import{r as f}from"./uni-app.es.0abf17f1.js";import{_ as b}from"./uni-easyinput.96b49448.js";import{_ as h}from"./uni-id-pages-sms-form.86f37ec6.js";import{_ as D}from"./uni-popup-captcha.892896ab.js";import{m as _}from"./store.49192a69.js";import{_ as g}from"./_plugin-vue_export-helper.1b428a4d.js";import"./uni-icons.3b963afa.js";import"./uni-captcha.61cf6bee.js";import"./uni-popup.08c373cf.js";const j=g({data:()=>({formData:{mobile:"",code:"",captcha:""},focusMobile:!0,logo:"/static/logo.png"}),computed:{tipText(){return`验证码已通过短信发送至 ${this.formData.mobile}。密码为6 - 20位`}},onLoad(o){},onReady(){},methods:{submit(){if(!/^1\d{10}$/.test(this.formData.mobile))return this.focusMobile=!0,o({title:"手机号码格式不正确",icon:"none",duration:3e3});if(!/^\d{6}$/.test(this.formData.code))return this.$refs.smsForm.focusSmsCodeInput=!0,o({title:"验证码格式不正确",icon:"none",duration:3e3});e.importObject("uni-id-co").bindMobileBySms(this.formData).then((e=>{o({title:e.errMsg,icon:"none",duration:3e3}),this.getOpenerEventChannel(),_.setUserInfo(this.formData),a()})).catch((o=>{console.log(o),"uni-id-captcha-required"==o.errCode&&this.$refs.popup.open()})).finally((o=>{this.formData.captcha=""}))}}},[["render",function(o,e,a,_,g,j){const y=l,C=n,V=u,x=f(p("uni-match-media"),d),M=f(p("uni-easyinput"),b),$=f(p("uni-id-pages-sms-form"),h),I=c,U=f(p("uni-popup-captcha"),D);return t(),s(C,{class:"uni-content"},{default:i((()=>[m(x,{"min-width":690},{default:i((()=>[m(C,{class:"login-logo"},{default:i((()=>[m(y,{src:g.logo},null,8,["src"])])),_:1}),m(V,{class:"title title-box"},{default:i((()=>[r("绑定手机号")])),_:1})])),_:1}),m(M,{clearable:"",focus:g.focusMobile,onBlur:e[0]||(e[0]=o=>g.focusMobile=!1),type:"number",class:"input-box",inputBorder:!1,modelValue:g.formData.mobile,"onUpdate:modelValue":e[1]||(e[1]=o=>g.formData.mobile=o),maxlength:"11",placeholder:"请输入手机号"},null,8,["focus","modelValue"]),m($,{ref:"smsForm",type:"bind-mobile-by-sms",modelValue:g.formData.code,"onUpdate:modelValue":e[2]||(e[2]=o=>g.formData.code=o),phone:g.formData.mobile},null,8,["modelValue","phone"]),m(I,{class:"uni-btn send-btn-box",type:"primary",onClick:j.submit},{default:i((()=>[r("提交")])),_:1},8,["onClick"]),m(U,{onConfirm:j.submit,modelValue:g.formData.captcha,"onUpdate:modelValue":e[3]||(e[3]=o=>g.formData.captcha=o),scene:"bind-mobile-by-sms",ref:"popup"},null,8,["onConfirm","modelValue"])])),_:1})}],["__scopeId","data-v-1357cc03"]]);export{j as default};
