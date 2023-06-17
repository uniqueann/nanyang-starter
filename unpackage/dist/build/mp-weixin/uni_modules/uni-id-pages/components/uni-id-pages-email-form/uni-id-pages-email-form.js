"use strict";const e=require("../../../../common/vendor.js");const t={name:"uni-email-code-form",model:{prop:"modelValue",event:"update:modelValue"},props:{event:["update:modelValue"],count:{type:[String,Number],default:60},email:{type:[String],default:""},type:{type:String,default:()=>"register"},focusCaptchaInput:{type:Boolean,default:()=>!1}},data:()=>({captcha:"",reverseNumber:0,reverseTimer:null,modelValue:"",focusEmailCodeInput:!1}),watch:{captcha(e,t){4==e.length&&4!=t.length&&this.start()},modelValue(e){this.$emit("input",e),this.$emit("update:modelValue",e)}},computed:{innerText(){return 0==this.reverseNumber?"获取邮箱验证码":"重新发送("+this.reverseNumber+"s)"}},created(){this.initClick()},methods:{getImageCaptcha(e){this.$refs.captcha.getImageCaptcha(e)},initClick(){this.start=function(e,t){let i;return t=t||500,function(){let a=this,n=arguments;i&&clearTimeout(i);let s=!i;i=setTimeout((()=>{i=null}),t),s&&e.apply(a,n)}}((()=>{0==this.reverseNumber&&this.sendMsg()}))},sendMsg(){if(4!=this.captcha.length)return this.$refs.captcha.focusCaptchaInput=!0,e.index.showToast({title:"请先输入图形验证码",icon:"none",duration:3e3});if(!this.email)return e.index.showToast({title:"请输入邮箱",icon:"none",duration:3e3});if(!/@/.test(this.email))return e.index.showToast({title:"邮箱格式错误",icon:"none",duration:3e3});const t=e.Ds.importObject("uni-id-co",{customUI:!0});console.log("sendEmailCode",{email:this.email,scene:this.type,captcha:this.captcha}),t.sendEmailCode({email:this.email,scene:this.type,captcha:this.captcha}).then((t=>{e.index.showToast({title:"邮箱验证码发送成功",icon:"none",duration:3e3}),this.reverseNumber=Number(this.count),this.getCode()})).catch((t=>{"uni-id-invalid-mail-template"==t.code?(this.modelValue="123456",e.index.showToast({title:"已启动测试模式,详情【控制台信息】",icon:"none",duration:3e3}),console.warn(t.message)):(this.getImageCaptcha(),this.captcha="",e.index.showToast({title:t.message,icon:"none",duration:3e3}))}))},getCode(){if(0==this.reverseNumber)return clearTimeout(this.reverseTimer),void(this.reverseTimer=null);this.reverseNumber--,this.reverseTimer=setTimeout((()=>{this.getCode()}),1e3)}}};if(!Array){(e.resolveComponent("uni-captcha")+e.resolveComponent("uni-easyinput"))()}Math||((()=>"../../../uni-captcha/components/uni-captcha/uni-captcha.js")+(()=>"../../../uni-easyinput/components/uni-easyinput/uni-easyinput.js"))();const i=e._export_sfc(t,[["render",function(t,i,a,n,s,o){return{a:e.sr("captcha","f58c7c06-0"),b:e.o((e=>s.captcha=e)),c:e.p({focus:a.focusCaptchaInput,scene:"send-email-code",modelValue:s.captcha}),d:e.o((e=>s.focusEmailCodeInput=!1)),e:e.o((e=>s.modelValue=e)),f:e.p({focus:s.focusEmailCodeInput,type:"number",inputBorder:!1,maxlength:"6",placeholder:"请输入邮箱验证码",modelValue:s.modelValue}),g:e.t(o.innerText),h:e.n(0==s.reverseNumber?"inner-text-active":""),i:e.o(((...e)=>t.start&&t.start(...e)))}}],["__scopeId","data-v-f58c7c06"]]);wx.createComponent(i);
