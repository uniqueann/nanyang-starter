"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_uniCmsArticle_common_publishTime = require("../../common/publish-time.js");
const statusBar = () => "../../../uni-nav-bar/components/uni-nav-bar/uni-status-bar.js";
const db = common_vendor.Es.database();
const articleDBName = "uni-cms-articles";
const userDBName = "uni-id-users";
const _sfc_main = {
  components: {
    statusBar
  },
  computed: {
    inputPlaceholder(e) {
      if (common_vendor.index.getStorageSync("CURRENT_LANG") == "en") {
        return "Please enter the search content";
      } else {
        return "\u8BF7\u8F93\u5165\u641C\u7D22\u5185\u5BB9";
      }
    },
    colList() {
      return [
        db.collection(articleDBName).where(this.where).field("thumbnail,title,publish_date,user_id").getTemp(),
        db.collection(userDBName).field("_id,nickname").getTemp()
      ];
    }
  },
  data() {
    return {
      where: '"article_status" == 1',
      showRefresh: false,
      listHeight: 0,
      mpButtonPlaceholderSize: 87,
      navBarHeight: 44
    };
  },
  async onReady() {
    this.initNavBarSize();
    this.listHeight = "auto";
  },
  methods: {
    initNavBarSize() {
      let menuButtonInfo = common_vendor.index.getMenuButtonBoundingClientRect();
      this.mpButtonPlaceholderSize = menuButtonInfo.width + 10;
      this.navBarHeight = common_vendor.index.getSystemInfoSync().system.toLowerCase().includes("ios") ? 44 : 48;
    },
    publishTime(timestamp) {
      return uni_modules_uniCmsArticle_common_publishTime.translatePublishTime(timestamp);
    },
    searchClick(e) {
      common_vendor.index.hideKeyboard();
      common_vendor.index.navigateTo({
        url: "/uni_modules/uni-cms-article/pages/search/search"
      });
    },
    retry() {
      this.refresh();
    },
    refresh() {
      this.$refs.udb.loadData({
        clear: true
      }, () => {
        common_vendor.index.stopPullDownRefresh();
      });
    },
    loadMore() {
      this.$refs.udb.loadMore();
    },
    onqueryerror(e) {
      console.error(e);
    }
  },
  onPullDownRefresh() {
    this.refresh();
  },
  onReachBottom() {
    this.$refs.udb.loadMore();
  }
};
if (!Array) {
  const _component_statusBar = common_vendor.resolveComponent("statusBar");
  const _easycom_uni_search_bar2 = common_vendor.resolveComponent("uni-search-bar");
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_load_state2 = common_vendor.resolveComponent("uni-load-state");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  const _easycom_unicloud_db2 = common_vendor.resolveComponent("unicloud-db");
  (_component_statusBar + _easycom_uni_search_bar2 + _easycom_uni_list_item2 + _easycom_uni_load_state2 + _easycom_uni_list2 + _easycom_unicloud_db2)();
}
const _easycom_uni_search_bar = () => "../../../uni-search-bar/components/uni-search-bar/uni-search-bar.js";
const _easycom_uni_list_item = () => "../../../uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_load_state = () => "../../../../components/uni-load-state/uni-load-state.js";
const _easycom_uni_list = () => "../../../uni-list/components/uni-list/uni-list.js";
const _easycom_unicloud_db = () => "../../../../node-modules/@dcloudio/uni-components/lib/unicloud-db/unicloud-db.js";
if (!Math) {
  (_easycom_uni_search_bar + _easycom_uni_list_item + _easycom_uni_load_state + _easycom_uni_list + _easycom_unicloud_db)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: `${$data.navBarHeight}px`,
    b: common_vendor.sr("searchBar", "09d2da32-2"),
    c: common_vendor.p({
      radius: "100",
      cancelButton: "none",
      disabled: true,
      placeholder: $options.inputPlaceholder
    }),
    d: common_vendor.o((...args) => $options.searchClick && $options.searchClick(...args)),
    e: `${$data.mpButtonPlaceholderSize}px`,
    f: `${$data.navBarHeight}px`,
    g: common_vendor.w(({
      data,
      pagination,
      hasMore,
      loading,
      error,
      options
    }, s0, i0) => {
      return {
        a: common_vendor.f(data, (item, index, i1) => {
          return {
            a: item.thumbnail,
            b: common_vendor.t(item.title),
            c: common_vendor.t(item.user_id[0] ? item.user_id[0].nickname : ""),
            d: common_vendor.t($options.publishTime(item.publish_date)),
            e: index,
            f: "09d2da32-5-" + i0 + "-" + i1 + "," + ("09d2da32-4-" + i0),
            g: common_vendor.p({
              to: "/uni_modules/uni-cms-article/pages/detail/detail?id=" + item._id
            })
          };
        }),
        b: "09d2da32-6-" + i0 + "," + ("09d2da32-4-" + i0),
        c: common_vendor.p({
          state: {
            data,
            pagination,
            hasMore,
            loading,
            error
          }
        }),
        d: "09d2da32-4-" + i0 + ",09d2da32-3",
        e: i0,
        f: s0
      };
    }, {
      name: "d",
      path: "g",
      vueId: "09d2da32-3"
    }),
    h: common_vendor.o($options.refresh),
    i: common_vendor.o($options.loadMore),
    j: $data.listHeight,
    k: common_vendor.p({
      border: false
    }),
    l: common_vendor.sr("udb", "09d2da32-3"),
    m: common_vendor.o($options.onqueryerror),
    n: common_vendor.p({
      collection: $options.colList,
      ["page-size"]: 10,
      orderby: "publish_date desc"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-09d2da32"], ["__file", "E:/uni-App/nanyang-starter/uni_modules/uni-cms-article/pages/list/list.nvue"]]);
wx.createPage(MiniProgramPage);
