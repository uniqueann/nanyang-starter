"use strict";
Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
const common_vendor = require("./common/vendor.js");
const common_appInit = require("./common/appInit.js");
require("./common/openApp.js");
const uni_modules_uniIdPages_init = require("./uni_modules/uni-id-pages/init.js");
const lang_i18n = require("./lang/i18n.js");
require("./uni-starter.config.js");
require("./uni_modules/uni-id-pages/config.js");
require("./lang/en.js");
require("./lang/zh-Hans.js");
if (!Math) {
  "./uni_modules/uni-cms-article/pages/list/list.js";
  "./uni_modules/uni-cms-article/pages/search/search.js";
  "./uni_modules/uni-cms-article/pages/detail/detail.js";
  "./uni_modules/uni-cms-article/pages/webview/webview.js";
  "./pages/list/list.js";
  "./pages/grid/grid.js";
  "./pages/list/search/search.js";
  "./pages/list/detail.js";
  "./pages/ucenter/ucenter.js";
  "./pages/uni-agree/uni-agree.js";
  "./pages/ucenter/settings/settings.js";
  "./pages/ucenter/read-news-log/read-news-log.js";
  "./uni_modules/uni-feedback/pages/opendb-feedback/opendb-feedback.js";
  "./uni_modules/uni-id-pages/pages/userinfo/userinfo.js";
  "./uni_modules/uni-id-pages/pages/login/login-withoutpwd.js";
  "./uni_modules/uni-id-pages/pages/login/login-withpwd.js";
  "./uni_modules/uni-id-pages/pages/userinfo/deactivate/deactivate.js";
  "./uni_modules/uni-id-pages/pages/userinfo/bind-mobile/bind-mobile.js";
  "./uni_modules/uni-id-pages/pages/login/login-smscode.js";
  "./uni_modules/uni-id-pages/pages/register/register.js";
  "./uni_modules/uni-id-pages/pages/retrieve/retrieve.js";
  "./uni_modules/uni-id-pages/pages/common/webview/webview.js";
  "./uni_modules/uni-id-pages/pages/userinfo/change_pwd/change_pwd.js";
  "./uni_modules/uni-id-pages/pages/register/register-by-email.js";
  "./uni_modules/uni-id-pages/pages/retrieve/retrieve-by-email.js";
  "./uni_modules/uni-id-pages/pages/userinfo/set-pwd/set-pwd.js";
}
const _sfc_main = {
  globalData: {
    searchText: "",
    appVersion: {},
    config: {},
    $i18n: {},
    $t: {}
  },
  onLaunch: function() {
    console.log("App Launch");
    this.globalData.$i18n = this.$i18n;
    this.globalData.$t = (str) => this.$t(str);
    common_appInit.initApp();
    uni_modules_uniIdPages_init.uniIdPageInit();
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  }
};
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "E:/uni-App/nanyang-starter/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  app.use(lang_i18n.i18n);
  return { app };
}
createApp().app.mount("#app");
exports.createApp = createApp;
