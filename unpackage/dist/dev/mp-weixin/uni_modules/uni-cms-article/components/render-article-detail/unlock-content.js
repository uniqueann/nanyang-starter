"use strict";
const common_vendor = require("../../../../common/vendor.js");
const db = common_vendor.Es.database();
const unlockContentDBName = "uni-cms-unlock-record";
const _sfc_main = {
  name: "ad",
  props: {
    adpId: String,
    watchAdUniqueType: {
      type: String,
      default: "device"
    }
  },
  data() {
    return {
      currentArticleId: "",
      currentPageRoute: "",
      adLoading: false,
      isLoadError: false
    };
  },
  computed: {
    urlCallback() {
      return {
        extra: JSON.stringify({
          article_id: this.currentArticleId,
          unique_id: this.uniqueId,
          unique_type: this.watchAdUniqueType
        })
      };
    },
    watchByDevice() {
      return this.watchAdUniqueType === "device";
    },
    watchByUser() {
      return this.watchAdUniqueType === "user";
    },
    uniqueId() {
      return this.watchByDevice ? common_vendor.index.getSystemInfoSync().deviceId : common_vendor.Es.getCurrentUserInfo().uid;
    }
  },
  mounted() {
    const pages = getCurrentPages();
    const currentPage = pages[pages.length - 1];
    this.currentArticleId = currentPage.options.id;
    this.currentPageRoute = currentPage.route;
    if (!this.adpId) {
      common_vendor.index.showModal({
        content: "\u5E7F\u544A\u4F4DID\u672A\u8BBE\u7F6E\uFF0C\u5E7F\u544A\u65E0\u6CD5\u6B63\u5E38\u52A0\u8F7D",
        showCancel: false
      });
    } else {
      this.$refs.rewardedVideo.load();
    }
  },
  methods: {
    callAd() {
      if (this.watchByUser) {
        const redirectUrl = "/uni_modules/uni-id-pages/pages/login/login-withoutpwd" + (this.currentPageRoute ? "?uniIdRedirectUrl=" + this.currentPageRoute + "?id=" + this.currentArticleId : "");
        if (common_vendor.Es.getCurrentUserInfo().tokenExpired < Date.now()) {
          common_vendor.index.showModal({
            content: "\u8BF7\u767B\u5F55\u540E\u64CD\u4F5C",
            success: ({ confirm }) => {
              confirm && common_vendor.index.redirectTo({
                url: redirectUrl
              });
            }
          });
        }
      }
      this.adLoading = true;
      this.$refs.rewardedVideo.show();
    },
    onAdLoad() {
      this.adLoading && this.$refs.rewardedVideo.show();
      console.log("\u5E7F\u544A\u6570\u636E\u52A0\u8F7D\u6210\u529F");
    },
    onAdClose(e) {
      console.log("close", e);
      const detail = e.detail;
      let i = 3;
      common_vendor.index.hideLoading();
      this.adLoading = false;
      if (detail && detail.isEnded) {
        common_vendor.index.showLoading({
          title: "\u6B63\u5728\u89E3\u9501\u5168\u6587",
          timeout: 7e3
        });
        let queryResult = setInterval(async () => {
          i--;
          const res = await db.collection(unlockContentDBName).where({
            unique_id: this.uniqueId,
            article_id: this.currentArticleId
          }).get();
          if (i <= 0) {
            console.log("\u89E3\u9501\u5931\u8D25", i);
            clearInterval(queryResult);
            common_vendor.index.hideLoading();
            common_vendor.index.showToast({
              title: "\u89E3\u9501\u5931\u8D25\uFF01",
              icon: "error",
              duration: 2e3
            });
          } else if (res.result && res.result.data.length) {
            console.log("\u89E3\u9501\u6210\u529F", i);
            clearInterval(queryResult);
            common_vendor.index.hideLoading();
            common_vendor.index.showToast({
              title: "\u89E3\u9501\u6210\u529F\uFF01",
              icon: "success",
              duration: 2e3
            });
            common_vendor.index.$emit("onUnlockContent");
          }
        }, 1500);
      } else {
        common_vendor.index.showModal({
          content: "\u8BF7\u89C2\u770B\u5B8C\u6574\u89C6\u9891\u540E\u89E3\u9501\u5168\u6587",
          showCancel: false
        });
      }
    },
    onAdError(e) {
      console.error("onaderror: ", e);
    }
  }
};
if (!Array) {
  const _easycom_ad_rewarded_video2 = common_vendor.resolveComponent("ad-rewarded-video");
  _easycom_ad_rewarded_video2();
}
const _easycom_ad_rewarded_video = () => "../../../../node-modules/@dcloudio/uni-components/lib/ad-rewarded-video/ad-rewarded-video.js";
if (!Math) {
  _easycom_ad_rewarded_video();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.w(({
      loading,
      error
    }, s0, i0) => {
      return common_vendor.e({
        a: error
      }, error ? {} : {}, {
        b: i0,
        c: s0
      });
    }, {
      name: "d",
      path: "a",
      vueId: "91fd83da-0"
    }),
    b: common_vendor.sr("rewardedVideo", "91fd83da-0"),
    c: common_vendor.o($options.onAdLoad),
    d: common_vendor.o($options.onAdClose),
    e: common_vendor.o($options.onAdError),
    f: common_vendor.p({
      adpid: $props.adpId,
      preload: false,
      disabled: true,
      loadnext: true,
      ["url-callback"]: $options.urlCallback
    }),
    g: !$data.isLoadError
  }, !$data.isLoadError ? {
    h: common_vendor.o((...args) => $options.callAd && $options.callAd(...args)),
    i: $data.adLoading
  } : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-91fd83da"], ["__file", "E:/uni-App/nanyang-starter/uni_modules/uni-cms-article/components/render-article-detail/unlock-content.vue"]]);
wx.createComponent(Component);
