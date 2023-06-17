"use strict";const e=require("../../../../common/vendor.js");require("./validator.js");const o=require("../../common/login-page.mixin.js"),s=require("../../common/password.js");require("../../common/store.js"),require("../../config.js");const r=e.Ds.importObject("uni-id-co"),a={mixins:[o.mixin],data:()=>({formData:{email:"",nickname:"",password:"",password2:"",code:""},rules:{email:{rules:[{required:!0,errorMessage:"请输入邮箱"},{format:"email",errorMessage:"邮箱格式不正确"}]},nickname:{rules:[{minLength:3,maxLength:32,errorMessage:"昵称长度在 {minLength} 到 {maxLength} 个字符"},{validateFunction:function(e,o,s,r){return(/^1\d{10}$/.test(o)||/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(o))&&r("昵称不能是：手机号或邮箱"),/^\d+$/.test(o)&&r("昵称不能为纯数字"),/[\u4E00-\u9FA5\uF900-\uFA2D]{1,}/.test(o)&&r("昵称不能包含中文"),!0}}],label:"昵称"},...s.passwordMod.getPwdRules(),code:{rules:[{required:!0,errorMessage:"请输入邮箱验证码"},{pattern:/^.{6}$/,errorMessage:"邮箱验证码不正确"}]}},focusEmail:!1,focusNickname:!1,focusPassword:!1,focusPassword2:!1,logo:"/static/logo.png"}),onReady(){this.$refs.form.setRules(this.rules)},onShow(){},methods:{submit(){this.$refs.form.validate().then((e=>{if(this.needAgreements&&!this.agree)return this.$refs.agreements.popup((()=>{this.submitForm(e)}));this.submitForm(e)})).catch((e=>{let o=e[0].key;o=o.replace(o[0],o[0].toUpperCase()),this["focus"+o]=!0}))},submitForm(o){r.registerUserByEmail(this.formData).then((o=>{e.index.navigateTo({url:"/uni_modules/uni-id-pages/pages/login/login-withpwd",complete:e=>{}})})).catch((e=>{console.log(e.message)}))},navigateBack(){e.index.navigateBack()},toLogin(){e.index.navigateTo({url:"/uni_modules/uni-id-pages/pages/login/login-withpwd"})},registerByUserName(){e.index.navigateTo({url:"/uni_modules/uni-id-pages/pages/register/register"})}}};if(!Array){(e.resolveComponent("uni-easyinput")+e.resolveComponent("uni-forms-item")+e.resolveComponent("uni-id-pages-email-form")+e.resolveComponent("uni-id-pages-agreements")+e.resolveComponent("uni-forms"))()}Math||((()=>"../../../uni-easyinput/components/uni-easyinput/uni-easyinput.js")+(()=>"../../../uni-forms/components/uni-forms-item/uni-forms-item.js")+(()=>"../../components/uni-id-pages-email-form/uni-id-pages-email-form.js")+(()=>"../../components/uni-id-pages-agreements/uni-id-pages-agreements.js")+(()=>"../../../uni-forms/components/uni-forms/uni-forms.js"))();const i=e._export_sfc(a,[["render",function(o,s,r,a,i,t){return{a:i.logo,b:e.o((e=>i.focusEmail=!1)),c:e.o((e=>i.formData.email=e)),d:e.p({inputBorder:!1,focus:i.focusEmail,placeholder:"请输入邮箱",trim:"both",modelValue:i.formData.email}),e:e.p({name:"email",required:!0}),f:e.o((e=>i.focusNickname=!1)),g:e.o((e=>i.formData.nickname=e)),h:e.p({inputBorder:!1,focus:i.focusNickname,placeholder:"请输入用户昵称",trim:"both",modelValue:i.formData.nickname}),i:e.p({name:"nickname"}),j:e.o((e=>i.focusPassword=!1)),k:e.o((e=>i.formData.password=e)),l:e.p({inputBorder:!1,focus:i.focusPassword,maxlength:"20",placeholder:"请输入"+("weak"==o.config.passwordStrength?"6":"8")+"-16位密码",type:"password",trim:"both",modelValue:i.formData.password}),m:e.o((e=>i.formData.password=e)),n:e.p({name:"password",required:!0,modelValue:i.formData.password}),o:e.o((e=>i.focusPassword2=!1)),p:e.o((e=>i.formData.password2=e)),q:e.p({inputBorder:!1,focus:i.focusPassword2,placeholder:"再次输入密码",maxlength:"20",type:"password",trim:"both",modelValue:i.formData.password2}),r:e.o((e=>i.formData.password2=e)),s:e.p({name:"password2",required:!0,modelValue:i.formData.password2}),t:e.sr("shortCode","161649d4-10,161649d4-9"),v:e.o((e=>i.formData.code=e)),w:e.p({email:i.formData.email,type:"register",modelValue:i.formData.code}),x:e.p({name:"code"}),y:e.sr("agreements","161649d4-11,161649d4-0"),z:e.p({scope:"register"}),A:e.o(((...e)=>t.submit&&t.submit(...e))),B:e.o(((...e)=>t.navigateBack&&t.navigateBack(...e))),C:e.o(((...e)=>t.registerByUserName&&t.registerByUserName(...e))),D:e.o(((...e)=>t.toLogin&&t.toLogin(...e))),E:e.sr("form","161649d4-0"),F:e.p({value:i.formData,rules:i.rules,"validate-trigger":"submit","err-show-type":"toast"})}}]]);wx.createPage(i);
