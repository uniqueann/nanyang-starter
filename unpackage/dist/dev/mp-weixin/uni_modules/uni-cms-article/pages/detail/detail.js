"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_uniCmsArticle_common_publishTime = require("../../common/publish-time.js");
const uniNavBar = () => "../../../uni-nav-bar/components/uni-nav-bar/uni-nav-bar.js";
const renderArticleDetail = () => "../../components/render-article-detail/index.js";
const db = common_vendor.Es.database();
const articleDBName = "uni-cms-articles";
const userDBName = "uni-id-users";
const _sfc_main = {
  components: {
    uniNavBar,
    renderArticleDetail
  },
  data() {
    return {
      showNavBar: false,
      coverImage: {
        url: "",
        exists: true,
        show: false,
        width: 1,
        height: 1
      },
      id: "",
      title: "",
      formData: {},
      adpId: "",
      watchAdUniqueType: "device"
    };
  },
  computed: {
    where() {
      return `_id =="${this.id}"`;
    },
    collection() {
      return [
        db.collection(articleDBName).where(this.where).field("user_id,thumbnail,excerpt,publish_date,title,content").getTemp(),
        db.collection(userDBName).field("_id, nickname").getTemp()
      ];
    }
  },
  onReady() {
    if (this.id) {
      this.$refs.detail.loadData();
    } else {
      common_vendor.index.showToast({
        icon: "none",
        title: "id \u4E0D\u80FD\u4E3A\u7A7A"
      });
    }
  },
  onLoad(event) {
    if (event.id) {
      this.id = event.id;
    }
    common_vendor.index.$on("onUnlockContent", this.onUnlockContent);
  },
  onUnload() {
    common_vendor.index.$off("onUnlockContent", this.onUnlockContent);
  },
  onPageScroll(e) {
    const coverHeight = this.coverImage.height - 100 > 0 ? this.coverImage.height - 100 : 200;
    if (e.scrollTop > coverHeight) {
      this.showNavBar = true;
    } else {
      this.showNavBar = false;
    }
  },
  methods: {
    publishTime(timestamp) {
      return uni_modules_uniCmsArticle_common_publishTime.translatePublishTime(timestamp);
    },
    back() {
      const pages = getCurrentPages().length;
      const pageUrl = "/uni_modules/uni-cms-article/pages/list/list";
      if (pages.length > 1) {
        common_vendor.index.navigateBack({});
      } else {
        common_vendor.index.redirectTo({
          url: pageUrl,
          fail: (e) => {
            if (e.errMsg.indexOf("tabbar") !== -1) {
              common_vendor.index.switchTab({
                url: pageUrl
              });
            }
          }
        });
      }
    },
    setReadHistory() {
      const historyCache = common_vendor.index.getStorageSync("readHistory") || [];
      const readHistory = historyCache.filter((item) => item.article_id !== this.id);
      readHistory.unshift({
        article_id: this.id,
        last_time: Date.now()
      });
      common_vendor.index.setStorageSync("readHistory", readHistory);
    },
    loadData(data) {
      if (!data.thumbnail) {
        this.coverImage.exists = false;
      }
      this.title = data.title;
      this.setReadHistory();
    },
    setCoverImageSize(e) {
      const { width, height } = e.detail;
      common_vendor.index.getSystemInfo({
        success: ({ windowWidth }) => {
          this.coverImage.width = windowWidth;
          this.coverImage.height = windowWidth / width * height;
          this.coverImage.show = true;
        }
      });
    },
    async onUnlockContent() {
      this.$refs.detail.loadData();
    }
  }
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_nav_bar2 = common_vendor.resolveComponent("uni-nav-bar");
  const _component_render_article_detail = common_vendor.resolveComponent("render-article-detail");
  const _easycom_unicloud_db2 = common_vendor.resolveComponent("unicloud-db");
  (_easycom_uni_icons2 + _easycom_uni_nav_bar2 + _component_render_article_detail + _easycom_unicloud_db2)();
}
const _easycom_uni_icons = () => "../../../uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_nav_bar = () => "../../../uni-nav-bar/components/uni-nav-bar/uni-nav-bar.js";
const _easycom_unicloud_db = () => "../../../../node-modules/@dcloudio/uni-components/lib/unicloud-db/unicloud-db.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_nav_bar + _easycom_unicloud_db)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.w(({
      data,
      loading,
      error,
      options
    }, s0, i0) => {
      return common_vendor.e({
        a: "4ca78bc2-2-" + i0 + "," + ("4ca78bc2-1-" + i0),
        b: "4ca78bc2-1-" + i0 + ",4ca78bc2-0",
        c: data && data.thumbnail
      }, data && data.thumbnail ? {
        d: common_vendor.n($data.coverImage.show ? "show" : ""),
        e: data.thumbnail,
        f: common_vendor.o((...args) => $options.setCoverImageSize && $options.setCoverImageSize(...args)),
        g: `100%`,
        h: `100%`
      } : {}, {
        i: !loading && data
      }, !loading && data ? common_vendor.e({
        j: common_vendor.t(data.title),
        k: common_vendor.t(data.excerpt),
        l: data.user_id[0]
      }, data.user_id[0] ? {
        m: common_vendor.t(data.user_id[0].nickname || "")
      } : {}, {
        n: common_vendor.t($options.publishTime(data.publish_date)),
        o: "4ca78bc2-3-" + i0 + ",4ca78bc2-0",
        p: common_vendor.p({
          delta: data.content,
          ["ad-config"]: {
            adpId: $data.adpId,
            watchAdUniqueType: $data.watchAdUniqueType
          }
        })
      }) : {
        q: "4ca78bc2-4-" + i0 + ",4ca78bc2-0",
        r: common_vendor.p({
          type: "spinner-cycle",
          size: "35px"
        })
      }, {
        s: i0,
        t: s0
      });
    }, {
      name: "d",
      path: "a",
      vueId: "4ca78bc2-0"
    }),
    b: common_vendor.p({
      color: $data.showNavBar ? "#333333" : "#ffffff",
      type: "left",
      size: "48rpx"
    }),
    c: common_vendor.o((...args) => $options.back && $options.back(...args)),
    d: common_vendor.t($data.title),
    e: common_vendor.n($data.showNavBar ? "show" : ""),
    f: common_vendor.p({
      statusBar: true,
      border: false,
      rightWidth: "180rpx",
      backgroundColor: "transparent"
    }),
    g: !$data.coverImage.show ? 1 : "",
    h: !$data.coverImage.exists ? 1 : "",
    i: common_vendor.sr("detail", "4ca78bc2-0"),
    j: common_vendor.o($options.loadData),
    k: common_vendor.p({
      collection: $options.collection,
      options: $data.formData,
      getone: true,
      where: $options.where,
      manual: true,
      foreignKey: "uni-cms-articles.user_id"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-4ca78bc2"], ["__file", "E:/uni-App/nanyang-starter/uni_modules/uni-cms-article/pages/detail/detail.vue"]]);
_sfc_main.__runtimeHooks = 1;
wx.createPage(MiniProgramPage);
