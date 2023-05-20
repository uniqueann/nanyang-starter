import{E as e,n as a,K as o,o as s,c as t,w as r,i,b as l,k as m,m as u,p as d,j as n,X as p}from"./index.936514eb.js";import{_ as c}from"./uni-match-media.aa78b4f9.js";import{r as f}from"./uni-app.es.ab12552c.js";import{_ as h}from"./uni-easyinput.a0e463ea.js";import{_ as w}from"./uni-forms-item.3bd5984b.js";import{_ as b}from"./uni-id-pages-email-form.1d54b635.js";import{_ as g}from"./uni-forms.86b85170.js";import{_}from"./uni-popup-captcha.3735cd52.js";import{m as k}from"./login-page.mixin.c3cd961f.js";import{p as D}from"./password.534670f7.js";import{_ as y}from"./_plugin-vue_export-helper.cdc0426e.js";import"./uni-icons.26f52fee.js";import"./uni-captcha.86589604.js";import"./uni-popup.17c05b6a.js";import"./store.4e19bf04.js";const j=e.importObject("uni-id-co",{errorOptions:{type:"toast"}});const C=y({mixins:[k],data:()=>({lock:!1,focusEmail:!0,focusPassword:!1,focusPassword2:!1,formData:{email:"",code:"",password:"",password2:"",captcha:""},rules:{email:{rules:[{required:!0,errorMessage:"请输入邮箱"},{format:"email",errorMessage:"邮箱格式不正确"}]},code:{rules:[{required:!0,errorMessage:"请输入邮箱验证码"},{pattern:/^.{6}$/,errorMessage:"请输入6位验证码"}]},...D.getPwdRules()},logo:"/static/logo.png"}),computed:{isEmail(){return/@/.test(this.formData.email)},isPwd(){return/^.{6,20}$/.test(this.formData.password)},isCode(){return/^\d{6}$/.test(this.formData.code)}},onLoad(e){e&&e.emailNumber&&(this.formData.email=e.emailNumber,e.lock&&(this.lock=e.lock,this.focusEmail=!0))},onReady(){this.formData.email&&this.$refs.shortCode.start(),this.$refs.form.setRules(this.rules)},onShow(){document.onkeydown=e=>{var a=e||window.event;a&&13==a.keyCode&&this.submit()}},methods:{submit(){this.$refs.form.validate().then((e=>{let{email:o,password:s,captcha:t,code:r}=this.formData;j.resetPwdByEmail({email:o,code:r,password:s,captcha:t}).then((e=>{a({url:"/uni_modules/uni-id-pages/pages/login/login-withpwd",complete:e=>{}})})).catch((e=>{"uni-id-captcha-required"==e.errCode&&this.$refs.popup.open()})).finally((e=>{this.formData.captcha=""}))})).catch((e=>{let a=e[0].key;if("code"==a)return this.$refs.shortCode.focusSmsCodeInput=!0;a=a.replace(a[0],a[0].toUpperCase()),this["focus"+a]=!0}))},retrieveByPhone(){a({url:"/uni_modules/uni-id-pages/pages/retrieve/retrieve"})},backLogin(){o({url:"/uni_modules/uni-id-pages/pages/login/login-withpwd"})}}},[["render",function(e,a,o,k,D,y){const j=u,C=i,V=d,v=f(n("uni-match-media"),c),x=f(n("uni-easyinput"),h),P=f(n("uni-forms-item"),w),B=f(n("uni-id-pages-email-form"),b),$=p,E=f(n("uni-forms"),g),U=f(n("uni-popup-captcha"),_);return s(),t(C,{class:"uni-content"},{default:r((()=>[l(v,{"min-width":690},{default:r((()=>[l(C,{class:"login-logo"},{default:r((()=>[l(j,{src:D.logo},null,8,["src"])])),_:1}),l(V,{class:"title title-box"},{default:r((()=>[m("通过邮箱验证码找回密码")])),_:1})])),_:1}),l(E,{ref:"form",value:D.formData,"err-show-type":"toast"},{default:r((()=>[l(P,{name:"email"},{default:r((()=>[l(x,{focus:D.focusEmail,onBlur:a[0]||(a[0]=e=>D.focusEmail=!1),class:"input-box",disabled:D.lock,inputBorder:!1,modelValue:D.formData.email,"onUpdate:modelValue":a[1]||(a[1]=e=>D.formData.email=e),placeholder:"请输入邮箱"},null,8,["focus","disabled","modelValue"])])),_:1}),l(P,{name:"code"},{default:r((()=>[l(B,{ref:"shortCode",email:D.formData.email,type:"reset-pwd-by-email",modelValue:D.formData.code,"onUpdate:modelValue":a[2]||(a[2]=e=>D.formData.code=e)},null,8,["email","modelValue"])])),_:1}),l(P,{name:"password"},{default:r((()=>[l(x,{focus:D.focusPassword,onBlur:a[3]||(a[3]=e=>D.focusPassword=!1),class:"input-box",type:"password",inputBorder:!1,modelValue:D.formData.password,"onUpdate:modelValue":a[4]||(a[4]=e=>D.formData.password=e),placeholder:"请输入新密码"},null,8,["focus","modelValue"])])),_:1}),l(P,{name:"password2"},{default:r((()=>[l(x,{focus:D.focusPassword2,onBlur:a[5]||(a[5]=e=>D.focusPassword2=!1),class:"input-box",type:"password",inputBorder:!1,modelValue:D.formData.password2,"onUpdate:modelValue":a[6]||(a[6]=e=>D.formData.password2=e),placeholder:"请再次输入新密码"},null,8,["focus","modelValue"])])),_:1}),l($,{class:"uni-btn send-btn-box",type:"primary",onClick:y.submit},{default:r((()=>[m("提交")])),_:1},8,["onClick"]),l(v,{"min-width":690},{default:r((()=>[l(C,{class:"link-box"},{default:r((()=>[l(V,{class:"link",onClick:y.retrieveByPhone},{default:r((()=>[m("通过手机验证码找回密码")])),_:1},8,["onClick"]),l(C),l(V,{class:"link",onClick:y.backLogin},{default:r((()=>[m("返回登录")])),_:1},8,["onClick"])])),_:1})])),_:1})])),_:1},8,["value"]),l(U,{onConfirm:y.submit,modelValue:D.formData.captcha,"onUpdate:modelValue":a[7]||(a[7]=e=>D.formData.captcha=e),scene:"reset-pwd-by-sms",ref:"popup"},null,8,["onConfirm","modelValue"])])),_:1})}],["__scopeId","data-v-b2bc532c"]]);export{C as default};
