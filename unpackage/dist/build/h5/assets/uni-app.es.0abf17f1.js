import{av as a,aw as s,ax as r,ay as e,az as n,aA as o,a6 as t,aB as i}from"./index-0982dc28.js";const f=(a,f,u=!1)=>{const w=u?s(a):r(a);if("undefined"==typeof window)return w;const d=window[o];if(!d)return w;const c=t()?n:i;return function(a,s=!1){if(!a)throw new Error((s?"shallowSsrRef":"ssrRef")+": You must provide a key.")}(f,u),e(d[c],f)&&(w.value=d[c][f],c===n&&delete d[c][f]),w},u=(a,s)=>f(a,s),w=(a,s)=>f(a,s,!0);function d(s,r){return a(s)?r:s}export{u as a,d as r,w as s};