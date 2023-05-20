"use strict";const e=require("../common/vendor.js"),n=require("./en.js"),a=require("./zh-Hans.js"),s=require("../uni-starter.config.js"),{i18n:{enable:o}}=s.config,t={en:n.langEn,"zh-Hans":a.zhHans};let l;if(l=o?e.index.getStorageSync("CURRENT_LANG"):"zh-Hans",!l)if(e.index.getLocale){console.log("获取应用语言:",e.index.getLocale());let n="en";"en"!=e.index.getLocale()&&(n="zh-Hans"),e.index.setStorageSync("CURRENT_LANG",n),l=n}else e.index.getSystemInfo({success:function(n){console.log("获取设备信息:",n);let a="zh-Hans";"en"==n.language&&(a="en"),e.index.setStorageSync("CURRENT_LANG",a),l=a},fail:e=>{console.error(e)}});let g={locale:l,messages:t};const i=e.createI18n(g);if(o){console.log("\n\t你已开启多语言国际化，将自动根据语言获取【lang/en.js】或【lang/en.js】文件中配置的tabbar的值，\n\t覆盖你在pages.json中的tabbar的值\n\t如果你不需要多语言国际化，请打开配置文件uni-starter.config.js找到 -> i18n -> enable把值设置为false\n");let n=()=>{setTimeout((function(){var n;(n="tabbar",i.global.messages[i.global.locale][n]).split(",").forEach(((n,a)=>{e.index.setTabBarItem({index:a,text:n,complete:e=>{}})}))}),1)};n(),e.index.$on("changeLanguage",(e=>{console.log("changeLanguage",e),n()}))}exports.i18n=i;
