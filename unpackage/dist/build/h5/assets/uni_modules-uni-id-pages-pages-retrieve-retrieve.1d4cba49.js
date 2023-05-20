import{E as e,a1 as o,n as s,K as a,o as r,c as t,w as i,i as n,b as u,k as l,m as d,p,j as m,X as c}from"./index.936514eb.js";import{_ as f}from"./uni-match-media.aa78b4f9.js";import{r as h}from"./uni-app.es.ab12552c.js";import{_ as w}from"./uni-easyinput.a0e463ea.js";import{_ as b}from"./uni-forms-item.3bd5984b.js";import{_ as g}from"./uni-id-pages-sms-form.c35fd338.js";import{_}from"./uni-forms.86b85170.js";import{_ as y}from"./uni-popup-captcha.3735cd52.js";import{m as k}from"./login-page.mixin.c3cd961f.js";import{_ as D}from"./_plugin-vue_export-helper.cdc0426e.js";import"./uni-icons.26f52fee.js";import"./uni-captcha.86589604.js";import"./uni-popup.17c05b6a.js";import"./store.4e19bf04.js";const j=e.importObject("uni-id-co",{errorOptions:{type:"toast"}});const C=D({mixins:[k],data:()=>({lock:!1,focusPhone:!0,focusPassword:!1,focusPassword2:!1,formData:{phone:"",code:"",password:"",password2:"",captcha:""},rules:{phone:{rules:[{required:!0,errorMessage:"请输入手机号"},{pattern:/^1\d{10}$/,errorMessage:"手机号码格式不正确"}]},code:{rules:[{required:!0,errorMessage:"请输入短信验证码"},{pattern:/^.{6}$/,errorMessage:"请输入6位验证码"}]},password:{rules:[{required:!0,errorMessage:"请输入新密码"},{pattern:/^.{6,20}$/,errorMessage:"密码为6 - 20位"}]},password2:{rules:[{required:!0,errorMessage:"请确认密码"},{pattern:/^.{6,20}$/,errorMessage:"密码为6 - 20位"},{validateFunction:function(e,o,s,a){return o!=s.password&&a("两次输入密码不一致"),!0}}]}},logo:"/static/logo.png"}),computed:{isPhone(){return/^1\d{10}$/.test(this.formData.phone)},isPwd(){return/^.{6,20}$/.test(this.formData.password)},isCode(){return/^\d{6}$/.test(this.formData.code)}},onLoad(e){e&&e.phoneNumber&&(this.formData.phone=e.phoneNumber,e.lock&&(this.lock=e.lock,this.focusPhone=!0))},onReady(){this.formData.phone&&this.$refs.shortCode.start(),this.$refs.form.setRules(this.rules)},onShow(){document.onkeydown=e=>{var o=e||window.event;o&&13==o.keyCode&&this.submit()}},methods:{submit(){this.$refs.form.validate().then((e=>{let{phone:s,password:a,captcha:r,code:t}=this.formData;j.resetPwdBySms({mobile:s,code:t,password:a,captcha:r}).then((e=>{o()})).catch((e=>{"uni-id-captcha-required"==e.errCode&&this.$refs.popup.open()})).finally((e=>{this.formData.captcha=""}))})).catch((e=>{let o=e[0].key;if("code"==o)return this.$refs.shortCode.focusSmsCodeInput=!0;o=o.replace(o[0],o[0].toUpperCase()),this["focus"+o]=!0}))},retrieveByEmail(){s({url:"/uni_modules/uni-id-pages/pages/retrieve/retrieve-by-email"})},backLogin(){a({url:"/uni_modules/uni-id-pages/pages/login/login-withpwd"})}}},[["render",function(e,o,s,a,k,D){const j=d,C=n,V=p,P=h(m("uni-match-media"),f),v=h(m("uni-easyinput"),w),x=h(m("uni-forms-item"),b),$=h(m("uni-id-pages-sms-form"),g),B=c,M=h(m("uni-forms"),_),U=h(m("uni-popup-captcha"),y);return r(),t(C,{class:"uni-content"},{default:i((()=>[u(P,{"min-width":690},{default:i((()=>[u(C,{class:"login-logo"},{default:i((()=>[u(j,{src:k.logo},null,8,["src"])])),_:1}),u(V,{class:"title title-box"},{default:i((()=>[l("通过手机验证码找回密码")])),_:1})])),_:1}),u(M,{ref:"form",value:k.formData,"err-show-type":"toast"},{default:i((()=>[u(x,{name:"phone"},{default:i((()=>[u(v,{focus:k.focusPhone,onBlur:o[0]||(o[0]=e=>k.focusPhone=!1),class:"input-box",disabled:k.lock,type:"number",inputBorder:!1,modelValue:k.formData.phone,"onUpdate:modelValue":o[1]||(o[1]=e=>k.formData.phone=e),maxlength:"11",placeholder:"请输入手机号"},null,8,["focus","disabled","modelValue"])])),_:1}),u(x,{name:"code"},{default:i((()=>[u($,{ref:"shortCode",phone:k.formData.phone,type:"reset-pwd-by-sms",modelValue:k.formData.code,"onUpdate:modelValue":o[2]||(o[2]=e=>k.formData.code=e)},null,8,["phone","modelValue"])])),_:1}),u(x,{name:"password"},{default:i((()=>[u(v,{focus:k.focusPassword,onBlur:o[3]||(o[3]=e=>k.focusPassword=!1),class:"input-box",type:"password",inputBorder:!1,modelValue:k.formData.password,"onUpdate:modelValue":o[4]||(o[4]=e=>k.formData.password=e),placeholder:"请输入新密码"},null,8,["focus","modelValue"])])),_:1}),u(x,{name:"password2"},{default:i((()=>[u(v,{focus:k.focusPassword2,onBlur:o[5]||(o[5]=e=>k.focusPassword2=!1),class:"input-box",type:"password",inputBorder:!1,modelValue:k.formData.password2,"onUpdate:modelValue":o[6]||(o[6]=e=>k.formData.password2=e),placeholder:"请再次输入新密码"},null,8,["focus","modelValue"])])),_:1}),u(B,{class:"uni-btn send-btn-box",type:"primary",onClick:D.submit},{default:i((()=>[l("提交")])),_:1},8,["onClick"]),u(P,{"min-width":690},{default:i((()=>[u(C,{class:"link-box"},{default:i((()=>[u(V,{class:"link",onClick:D.retrieveByEmail},{default:i((()=>[l("通过邮箱验证码找回密码")])),_:1},8,["onClick"]),u(C),u(V,{class:"link",onClick:D.backLogin},{default:i((()=>[l("返回登录")])),_:1},8,["onClick"])])),_:1})])),_:1})])),_:1},8,["value"]),u(U,{onConfirm:D.submit,modelValue:k.formData.captcha,"onUpdate:modelValue":o[7]||(o[7]=e=>k.formData.captcha=e),scene:"reset-pwd-by-sms",ref:"popup"},null,8,["onConfirm","modelValue"])])),_:1})}],["__scopeId","data-v-332307ef"]]);export{C as default};