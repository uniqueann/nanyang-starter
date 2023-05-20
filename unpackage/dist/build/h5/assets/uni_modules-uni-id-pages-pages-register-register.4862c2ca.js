import{E as a,R as e,a1 as s,n as o,o as t,c as r,w as i,i as l,b as u,k as n,m,p as c,j as d,X as p}from"./index.936514eb.js";import{_ as f}from"./uni-match-media.aa78b4f9.js";import{r as h}from"./uni-app.es.ab12552c.js";import{_ as g}from"./uni-easyinput.a0e463ea.js";import{_ as w}from"./uni-forms-item.3bd5984b.js";import{_ as b}from"./uni-captcha.86589604.js";import{_}from"./uni-id-pages-agreements.323a190a.js";import{_ as k}from"./uni-forms.86b85170.js";import{r as V}from"./validator.99127c71.js";import{m as j}from"./login-page.mixin.c3cd961f.js";import"./store.4e19bf04.js";import{_ as D}from"./_plugin-vue_export-helper.cdc0426e.js";import"./uni-icons.26f52fee.js";import"./uni-popup-dialog.fb53a45c.js";import"./uni-popup.17c05b6a.js";import"./password.534670f7.js";const y=a.importObject("uni-id-co");const x=D({mixins:[j],data:()=>({formData:{username:"",nickname:"",password:"",password2:"",captcha:""},rules:V,focusUsername:!1,focusNickname:!1,focusPassword:!1,focusPassword2:!1,logo:"/static/logo.png"}),onReady(){this.$refs.form.setRules(this.rules)},onShow(){document.onkeydown=a=>{var e=a||window.event;e&&13==e.keyCode&&this.submit()}},methods:{submit(){this.$refs.form.validate().then((a=>4!=this.formData.captcha.length?(this.$refs.captcha.focusCaptchaInput=!0,e({title:"请输入验证码",icon:"none",duration:3e3})):this.needAgreements&&!this.agree?this.$refs.agreements.popup((()=>{this.submitForm(a)})):void this.submitForm(a))).catch((a=>{let e=a[0].key;e=e.replace(e[0],e[0].toUpperCase()),this["focus"+e]=!0}))},submitForm(a){y.registerUser(this.formData).then((a=>{this.loginSuccess(a)})).catch((a=>{console.log(a.message),this.$refs.captcha.getImageCaptcha()}))},navigateBack(){s()},toLogin(){o({url:"/uni_modules/uni-id-pages/pages/login/login-withpwd"})},registerByEmail(){o({url:"/uni_modules/uni-id-pages/pages/register/register-by-email"})}}},[["render",function(a,e,s,o,V,j){const D=m,y=l,x=c,v=h(d("uni-match-media"),f),B=h(d("uni-easyinput"),g),C=h(d("uni-forms-item"),w),U=h(d("uni-captcha"),b),P=h(d("uni-id-pages-agreements"),_),$=p,q=h(d("uni-forms"),k);return t(),r(y,{class:"uni-content"},{default:i((()=>[u(v,{"min-width":690},{default:i((()=>[u(y,{class:"login-logo"},{default:i((()=>[u(D,{src:V.logo},null,8,["src"])])),_:1}),u(x,{class:"title title-box"},{default:i((()=>[n("用户名密码注册")])),_:1})])),_:1}),u(q,{ref:"form",value:V.formData,rules:V.rules,"validate-trigger":"submit","err-show-type":"toast"},{default:i((()=>[u(C,{name:"username",required:""},{default:i((()=>[u(B,{inputBorder:!1,focus:V.focusUsername,onBlur:e[0]||(e[0]=a=>V.focusUsername=!1),class:"input-box",placeholder:"请输入用户名",modelValue:V.formData.username,"onUpdate:modelValue":e[1]||(e[1]=a=>V.formData.username=a),trim:"both"},null,8,["focus","modelValue"])])),_:1}),u(C,{name:"nickname"},{default:i((()=>[u(B,{inputBorder:!1,focus:V.focusNickname,onBlur:e[2]||(e[2]=a=>V.focusNickname=!1),class:"input-box",placeholder:"请输入用户昵称",modelValue:V.formData.nickname,"onUpdate:modelValue":e[3]||(e[3]=a=>V.formData.nickname=a),trim:"both"},null,8,["focus","modelValue"])])),_:1}),u(C,{name:"password",modelValue:V.formData.password,"onUpdate:modelValue":e[6]||(e[6]=a=>V.formData.password=a),required:""},{default:i((()=>[u(B,{inputBorder:!1,focus:V.focusPassword,onBlur:e[4]||(e[4]=a=>V.focusPassword=!1),class:"input-box",maxlength:"20",placeholder:"请输入"+("weak"==a.config.passwordStrength?"6":"8")+"-16位密码",type:"password",modelValue:V.formData.password,"onUpdate:modelValue":e[5]||(e[5]=a=>V.formData.password=a),trim:"both"},null,8,["focus","placeholder","modelValue"])])),_:1},8,["modelValue"]),u(C,{name:"password2",modelValue:V.formData.password2,"onUpdate:modelValue":e[9]||(e[9]=a=>V.formData.password2=a),required:""},{default:i((()=>[u(B,{inputBorder:!1,focus:V.focusPassword2,onBlur:e[7]||(e[7]=a=>V.focusPassword2=!1),class:"input-box",placeholder:"再次输入密码",maxlength:"20",type:"password",modelValue:V.formData.password2,"onUpdate:modelValue":e[8]||(e[8]=a=>V.formData.password2=a),trim:"both"},null,8,["focus","modelValue"])])),_:1},8,["modelValue"]),u(C,null,{default:i((()=>[u(U,{ref:"captcha",scene:"register",modelValue:V.formData.captcha,"onUpdate:modelValue":e[10]||(e[10]=a=>V.formData.captcha=a)},null,8,["modelValue"])])),_:1}),u(P,{scope:"register",ref:"agreements"},null,512),u($,{class:"uni-btn",type:"primary",onClick:j.submit},{default:i((()=>[n("注册")])),_:1},8,["onClick"]),u($,{onClick:j.navigateBack,class:"register-back"},{default:i((()=>[n("返回")])),_:1},8,["onClick"]),u(v,{"min-width":690},{default:i((()=>[u(y,{class:"link-box"},{default:i((()=>[u(x,{class:"link",onClick:j.registerByEmail},{default:i((()=>[n("邮箱验证码注册")])),_:1},8,["onClick"]),u(x,{class:"link",onClick:j.toLogin},{default:i((()=>[n("已有账号？点此登录")])),_:1},8,["onClick"])])),_:1})])),_:1})])),_:1},8,["value","rules"])])),_:1})}],["__scopeId","data-v-7ae85e3a"]]);export{x as default};