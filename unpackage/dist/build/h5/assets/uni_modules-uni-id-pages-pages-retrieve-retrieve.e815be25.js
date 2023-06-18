import{D as e,K as o,n as s,L as a,o as r,c as t,w as i,i as n,b as u,k as l,m as d,p,j as m,E as c}from"./index-0982dc28.js";import{_ as f}from"./uni-match-media.3d79c613.js";import{r as h}from"./uni-app.es.0abf17f1.js";import{_ as w}from"./uni-easyinput.96b49448.js";import{_ as g}from"./uni-forms-item.d7723594.js";import{_}from"./uni-id-pages-sms-form.86f37ec6.js";import{_ as b}from"./uni-forms.4c61d8e0.js";import{_ as D}from"./uni-popup-captcha.892896ab.js";import{m as y}from"./login-page.mixin.403b914d.js";import{_ as k}from"./_plugin-vue_export-helper.1b428a4d.js";import"./uni-icons.3b963afa.js";import"./uni-captcha.61cf6bee.js";import"./uni-popup.08c373cf.js";import"./store.49192a69.js";const C=e.importObject("uni-id-co",{errorOptions:{type:"toast"}});const j=k({mixins:[y],data:()=>({lock:!1,focusPhone:!0,focusPassword:!1,focusPassword2:!1,formData:{phone:"",code:"",password:"",password2:"",captcha:""},rules:{phone:{rules:[{required:!0,errorMessage:"请输入手机号"},{pattern:/^1\d{10}$/,errorMessage:"手机号码格式不正确"}]},code:{rules:[{required:!0,errorMessage:"请输入短信验证码"},{pattern:/^.{6}$/,errorMessage:"请输入6位验证码"}]},password:{rules:[{required:!0,errorMessage:"请输入新密码"},{pattern:/^.{6,20}$/,errorMessage:"密码为6 - 20位"}]},password2:{rules:[{required:!0,errorMessage:"请确认密码"},{pattern:/^.{6,20}$/,errorMessage:"密码为6 - 20位"},{validateFunction:function(e,o,s,a){return o!=s.password&&a("两次输入密码不一致"),!0}}]}},logo:"/static/logo.png"}),computed:{isPhone(){return/^1\d{10}$/.test(this.formData.phone)},isPwd(){return/^.{6,20}$/.test(this.formData.password)},isCode(){return/^\d{6}$/.test(this.formData.code)}},onLoad(e){e&&e.phoneNumber&&(this.formData.phone=e.phoneNumber,e.lock&&(this.lock=e.lock,this.focusPhone=!0))},onReady(){this.formData.phone&&this.$refs.shortCode.start(),this.$refs.form.setRules(this.rules)},onShow(){document.onkeydown=e=>{var o=e||window.event;o&&13==o.keyCode&&this.submit()}},methods:{submit(){this.$refs.form.validate().then((e=>{let{phone:s,password:a,captcha:r,code:t}=this.formData;C.resetPwdBySms({mobile:s,code:t,password:a,captcha:r}).then((e=>{o()})).catch((e=>{"uni-id-captcha-required"==e.errCode&&this.$refs.popup.open()})).finally((e=>{this.formData.captcha=""}))})).catch((e=>{let o=e[0].key;if("code"==o)return this.$refs.shortCode.focusSmsCodeInput=!0;o=o.replace(o[0],o[0].toUpperCase()),this["focus"+o]=!0}))},retrieveByEmail(){s({url:"/uni_modules/uni-id-pages/pages/retrieve/retrieve-by-email"})},backLogin(){a({url:"/uni_modules/uni-id-pages/pages/login/login-withpwd"})}}},[["render",function(e,o,s,a,y,k){const C=d,j=n,V=p,P=h(m("uni-match-media"),f),v=h(m("uni-easyinput"),w),x=h(m("uni-forms-item"),g),$=h(m("uni-id-pages-sms-form"),_),B=c,M=h(m("uni-forms"),b),U=h(m("uni-popup-captcha"),D);return r(),t(j,{class:"uni-content"},{default:i((()=>[u(P,{"min-width":690},{default:i((()=>[u(j,{class:"login-logo"},{default:i((()=>[u(C,{src:y.logo},null,8,["src"])])),_:1}),u(V,{class:"title title-box"},{default:i((()=>[l("通过手机验证码找回密码")])),_:1})])),_:1}),u(M,{ref:"form",value:y.formData,"err-show-type":"toast"},{default:i((()=>[u(x,{name:"phone"},{default:i((()=>[u(v,{focus:y.focusPhone,onBlur:o[0]||(o[0]=e=>y.focusPhone=!1),class:"input-box",disabled:y.lock,type:"number",inputBorder:!1,modelValue:y.formData.phone,"onUpdate:modelValue":o[1]||(o[1]=e=>y.formData.phone=e),maxlength:"11",placeholder:"请输入手机号"},null,8,["focus","disabled","modelValue"])])),_:1}),u(x,{name:"code"},{default:i((()=>[u($,{ref:"shortCode",phone:y.formData.phone,type:"reset-pwd-by-sms",modelValue:y.formData.code,"onUpdate:modelValue":o[2]||(o[2]=e=>y.formData.code=e)},null,8,["phone","modelValue"])])),_:1}),u(x,{name:"password"},{default:i((()=>[u(v,{focus:y.focusPassword,onBlur:o[3]||(o[3]=e=>y.focusPassword=!1),class:"input-box",type:"password",inputBorder:!1,modelValue:y.formData.password,"onUpdate:modelValue":o[4]||(o[4]=e=>y.formData.password=e),placeholder:"请输入新密码"},null,8,["focus","modelValue"])])),_:1}),u(x,{name:"password2"},{default:i((()=>[u(v,{focus:y.focusPassword2,onBlur:o[5]||(o[5]=e=>y.focusPassword2=!1),class:"input-box",type:"password",inputBorder:!1,modelValue:y.formData.password2,"onUpdate:modelValue":o[6]||(o[6]=e=>y.formData.password2=e),placeholder:"请再次输入新密码"},null,8,["focus","modelValue"])])),_:1}),u(B,{class:"uni-btn send-btn-box",type:"primary",onClick:k.submit},{default:i((()=>[l("提交")])),_:1},8,["onClick"]),u(P,{"min-width":690},{default:i((()=>[u(j,{class:"link-box"},{default:i((()=>[u(V,{class:"link",onClick:k.retrieveByEmail},{default:i((()=>[l("通过邮箱验证码找回密码")])),_:1},8,["onClick"]),u(j),u(V,{class:"link",onClick:k.backLogin},{default:i((()=>[l("返回登录")])),_:1},8,["onClick"])])),_:1})])),_:1})])),_:1},8,["value"]),u(U,{onConfirm:k.submit,modelValue:y.formData.captcha,"onUpdate:modelValue":o[7]||(o[7]=e=>y.formData.captcha=e),scene:"reset-pwd-by-sms",ref:"popup"},null,8,["onConfirm","modelValue"])])),_:1})}],["__scopeId","data-v-39aded6e"]]);export{j as default};