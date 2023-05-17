"use strict";
const common_vendor = require("./vendor.js");
const uniStarter_config = require("../uni-starter.config.js");
const db = common_vendor.Es.database();
async function initApp() {
  uniStarter_config.config.debug;
  setTimeout(() => {
    getApp({
      allowDefault: true
    }).globalData.config = uniStarter_config.config;
  }, 1);
  function onDBError({
    code,
    message
  }) {
    console.log("onDBError", {
      code,
      message
    });
    console.error(code, message);
  }
  db.on("error", onDBError);
  common_vendor.Es.interceptObject({
    async invoke({
      objectName,
      methodName,
      params
    }) {
      if (objectName == "uni-id-co" && (methodName.includes("loginBy") || ["login", "registerUser"].includes(methodName))) {
        console.log("\u6267\u884C\u767B\u5F55\u76F8\u5173\u4E91\u5BF9\u8C61");
        params[0].inviteCode = await new Promise((callBack) => {
          common_vendor.index.getClipboardData({
            success: function(res) {
              console.log("\u526A\u5207\u677F\u5185\u5BB9\uFF1A" + res.data);
              if (res.data.slice(0, 18) == "uniInvitationCode:") {
                let uniInvitationCode = res.data.slice(18, 38);
                console.log("\u5F53\u524D\u7528\u6237\u662F\u5176\u4ED6\u7528\u6237\u63A8\u8350\u4E0B\u8F7D\u7684,\u63A8\u8350\u8005\u7684code\u662F\uFF1A" + uniInvitationCode);
                callBack(uniInvitationCode);
              } else {
                callBack();
              }
            },
            fail() {
              console.log("error--");
              callBack();
            },
            complete() {
              common_vendor.index.hideToast();
            }
          });
        });
      }
    },
    success(e) {
      console.log(e);
    },
    complete() {
    },
    fail(e) {
      console.error(e);
    }
  });
}
exports.initApp = initApp;
