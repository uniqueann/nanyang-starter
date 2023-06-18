import{D as a,C as e,K as s,v as o,n as t,o as r,c as i,w as l,i as u,b as n,k as m,m as d,p as c,j as p,E as f}from"./index-0982dc28.js";import{_ as h}from"./uni-match-media.3d79c613.js";import{r as g}from"./uni-app.es.0abf17f1.js";import{_ as w}from"./uni-easyinput.96b49448.js";import{_}from"./uni-forms-item.d7723594.js";import{_ as k}from"./uni-captcha.61cf6bee.js";import{_ as b}from"./uni-id-pages-agreements.735c067c.js";import{_ as V}from"./uni-forms.4c61d8e0.js";import{r as D}from"./validator.54dce936.js";import{m as j}from"./login-page.mixin.403b914d.js";import{_ as C}from"./_plugin-vue_export-helper.1b428a4d.js";import"./uni-icons.3b963afa.js";import"./uni-popup-dialog.ef059ad2.js";import"./uni-popup.08c373cf.js";import"./password.69139260.js";import"./store.49192a69.js";const v=a.importObject("uni-id-co",{customUI:!0});const x=C({mixins:[j],data:()=>({formData:{username:"",nickname:"",password:"",password2:"",captcha:""},rules:D,focusUsername:!1,focusNickname:!1,focusPassword:!1,focusPassword2:!1,logo:"/static/logo.png"}),onReady(){this.$refs.form.setRules(this.rules)},onShow(){document.onkeydown=a=>{var e=a||window.event;e&&13==e.keyCode&&this.submit()}},methods:{submit(){this.$refs.form.validate().then((a=>4!=this.formData.captcha.length?(this.$refs.captcha.focusCaptchaInput=!0,e({title:"请输入验证码",icon:"none",duration:3e3})):this.needAgreements&&!this.agree?this.$refs.agreements.popup((()=>{this.submitForm(a)})):void this.submitForm(a))).catch((a=>{let e=a[0].key;e=e.replace(e[0],e[0].toUpperCase()),this["focus"+e]=!0}))},submitForm(a){v.registerAdmin(this.formData).then((a=>{s()})).catch((a=>{this.$refs.captcha.getImageCaptcha(),o({title:"提示",content:a.errMsg||`创建失败: ${a.errCode}`,showCancel:!1})}))},navigateBack(){s()},toLogin(){t({url:"/uni_modules/uni-id-pages/pages/login/login-withpwd"})},registerByEmail(){t({url:"/uni_modules/uni-id-pages/pages/register/register-by-email"})}}},[["render",function(a,e,s,o,t,D){const j=d,C=u,v=c,x=g(p("uni-match-media"),h),y=g(p("uni-easyinput"),w),U=g(p("uni-forms-item"),_),B=g(p("uni-captcha"),k),P=g(p("uni-id-pages-agreements"),b),$=f,I=g(p("uni-forms"),V);return r(),i(C,{class:"uni-content"},{default:l((()=>[n(x,{"min-width":690},{default:l((()=>[n(C,{class:"login-logo"},{default:l((()=>[n(j,{src:t.logo},null,8,["src"])])),_:1}),n(v,{class:"title title-box"},{default:l((()=>[m("创建超级管理员")])),_:1})])),_:1}),n(I,{ref:"form",value:t.formData,rules:t.rules,"validate-trigger":"submit","err-show-type":"toast"},{default:l((()=>[n(U,{name:"username",required:""},{default:l((()=>[n(y,{inputBorder:!1,focus:t.focusUsername,onBlur:e[0]||(e[0]=a=>t.focusUsername=!1),class:"input-box",placeholder:"请输入用户名",modelValue:t.formData.username,"onUpdate:modelValue":e[1]||(e[1]=a=>t.formData.username=a),trim:"both"},null,8,["focus","modelValue"])])),_:1}),n(U,{name:"nickname"},{default:l((()=>[n(y,{inputBorder:!1,focus:t.focusNickname,onBlur:e[2]||(e[2]=a=>t.focusNickname=!1),class:"input-box",placeholder:"请输入用户昵称",modelValue:t.formData.nickname,"onUpdate:modelValue":e[3]||(e[3]=a=>t.formData.nickname=a),trim:"both"},null,8,["focus","modelValue"])])),_:1}),n(U,{name:"password",modelValue:t.formData.password,"onUpdate:modelValue":e[6]||(e[6]=a=>t.formData.password=a),required:""},{default:l((()=>[n(y,{inputBorder:!1,focus:t.focusPassword,onBlur:e[4]||(e[4]=a=>t.focusPassword=!1),class:"input-box",maxlength:"20",placeholder:"请输入"+("weak"==a.config.passwordStrength?"6":"8")+"-16位密码",type:"password",modelValue:t.formData.password,"onUpdate:modelValue":e[5]||(e[5]=a=>t.formData.password=a),trim:"both"},null,8,["focus","placeholder","modelValue"])])),_:1},8,["modelValue"]),n(U,{name:"password2",modelValue:t.formData.password2,"onUpdate:modelValue":e[9]||(e[9]=a=>t.formData.password2=a),required:""},{default:l((()=>[n(y,{inputBorder:!1,focus:t.focusPassword2,onBlur:e[7]||(e[7]=a=>t.focusPassword2=!1),class:"input-box",placeholder:"再次输入密码",maxlength:"20",type:"password",modelValue:t.formData.password2,"onUpdate:modelValue":e[8]||(e[8]=a=>t.formData.password2=a),trim:"both"},null,8,["focus","modelValue"])])),_:1},8,["modelValue"]),n(U,null,{default:l((()=>[n(B,{ref:"captcha",scene:"register",modelValue:t.formData.captcha,"onUpdate:modelValue":e[10]||(e[10]=a=>t.formData.captcha=a)},null,8,["modelValue"])])),_:1}),n(P,{scope:"register",ref:"agreements"},null,512),n($,{class:"uni-btn",type:"primary",onClick:D.submit},{default:l((()=>[m("注册")])),_:1},8,["onClick"]),n($,{onClick:D.navigateBack,class:"register-back"},{default:l((()=>[m("返回")])),_:1},8,["onClick"]),n(x,{"min-width":690},{default:l((()=>[n(C,{class:"link-box"},{default:l((()=>[n(v,{class:"link",onClick:D.toLogin},{default:l((()=>[m("已有账号？点此登录")])),_:1},8,["onClick"])])),_:1})])),_:1})])),_:1},8,["value","rules"])])),_:1})}],["__scopeId","data-v-41218cca"]]);export{x as default};