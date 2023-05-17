"use strict";
const common_vendor = require("../../../common/vendor.js");
class Gps {
  constructor(arg) {
    this.lock = false;
  }
  async getLocation(param = {
    type: "wgs84"
  }) {
    return new Promise(async (callback) => {
      if (this.lock) {
        callback(false);
        return false;
      }
      this.lock = true;
      common_vendor.index.getLocation({
        ...param,
        success: (res) => {
          this.lock = false;
          callback(res);
        },
        fail: async (err) => {
          common_vendor.index.showToast({
            title: "\u5B9A\u4F4D\u83B7\u53D6\u5931\u8D25",
            icon: "none"
          });
          console.error(err);
          callback(false);
          if (err.errMsg == "getLocation:fail auth deny") {
            common_vendor.index.showModal({
              content: "\u5E94\u7528\u65E0\u5B9A\u4F4D\u6743\u9650",
              confirmText: "\u524D\u5F80\u8BBE\u7F6E",
              complete: (e) => {
                if (e.confirm) {
                  common_vendor.index.openSetting({
                    success(res) {
                      console.log(res.authSetting);
                    }
                  });
                }
                this.lock = false;
              }
            });
          }
          if (err.errMsg == "getLocation:fail:ERROR_NOCELL&WIFI_LOCATIONSWITCHOFF") {
            common_vendor.index.showModal({
              content: "\u672A\u5F00\u542F\u5B9A\u4F4D\u6743\u9650\uFF0C\u8BF7\u524D\u5F80\u624B\u673A\u7CFB\u7EDF\u8BBE\u7F6E\u4E2D\u5F00\u542F",
              showCancel: false,
              confirmText: "\u77E5\u9053\u4E86"
            });
          }
        }
      });
    });
  }
}
exports.Gps = Gps;
