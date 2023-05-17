"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_uniCmsArticle_common_publishTime = require("../../common/publish-time.js");
const searchLogDbName = "opendb-search-logs";
const articleDbName = "uni-cms-articles";
const associativeSearchField = "title";
const associativeField = "_id,title";
const localSearchListKey = "__local_search_history";
const db = common_vendor.Es.database();
const articleDBName = "uni-cms-articles";
const userDBName = "uni-id-users";
const arrUnique = (arr) => {
  for (let i = arr.length - 1; i >= 0; i--) {
    const curIndex = arr.indexOf(arr[i]);
    const lastIndex = arr.lastIndexOf(arr[i]);
    curIndex != lastIndex && arr.splice(lastIndex, 1);
  }
  return arr;
};
function debounce(fn, interval, isFirstAutoRun) {
  var _self = fn;
  var timer = null;
  var first = true;
  if (isFirstAutoRun) {
    _self();
  }
  return function() {
    var args = arguments;
    var _me = this;
    if (first) {
      first = false;
      _self.apply(_me, args);
    }
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(function() {
      clearTimeout(timer);
      timer = null;
      _self.apply(_me, args);
    }, interval || 200);
  };
}
const _sfc_main = {
  data() {
    return {
      articleDbName,
      searchLogDbName,
      statusBarHeight: "0px",
      localSearchList: common_vendor.index.getStorageSync(localSearchListKey),
      localSearchListDel: false,
      netHotListIsHide: false,
      searchText: "",
      iconColor: "#999999",
      associativeList: [],
      keyBoardPopup: false,
      hotWorld: "DCloud",
      focus: true,
      speechEngine: "iFly",
      isLoadData: false,
      where: '"article_status" == 1',
      listHeight: 0,
      associativeShow: false,
      noAssociativeShow: false
    };
  },
  created() {
    this.db = common_vendor.Es.database();
    this.searchLogDb = this.db.collection(this.searchLogDbName);
    this.articleDbName = this.db.collection(this.articleDbName);
    common_vendor.index.onKeyboardHeightChange((res) => {
      this.keyBoardPopup = res.height !== 0;
    });
  },
  computed: {
    colList() {
      return [
        db.collection(articleDBName).where(this.where).field("thumbnail,title,publish_date,user_id").getTemp(),
        db.collection(userDBName).field("_id,nickname").getTemp()
      ];
    }
  },
  onReady() {
    this.listHeight = "auto";
  },
  onLoad() {
  },
  methods: {
    clear(res) {
      console.log("res: ", res);
    },
    confirm(res) {
      this.search(res.value);
    },
    cancel(res) {
      common_vendor.index.hideKeyboard();
      this.searchText = "";
      this.isLoadData = false;
      this.associativeShow = false;
    },
    search(value) {
      if (!value && !this.hotWorld) {
        return;
      }
      if (value) {
        if (this.searchText !== value) {
          this.searchText = value;
        }
        this.localSearchListManage(value);
        this.searchLogDbAdd(value);
      } else if (this.hotWorld) {
        this.searchText = this.hotWorld;
      }
      common_vendor.index.hideKeyboard();
      this.loadList(this.searchText);
    },
    localSearchListManage(word) {
      let list = common_vendor.index.getStorageSync(localSearchListKey);
      if (list.length) {
        this.localSearchList.unshift(word);
        arrUnique(this.localSearchList);
        if (this.localSearchList.length > 10) {
          this.localSearchList.pop();
        }
      } else {
        this.localSearchList = [word];
      }
      common_vendor.index.setStorageSync(localSearchListKey, this.localSearchList);
    },
    LocalSearchListClear() {
      common_vendor.index.showModal({
        content: "\u786E\u8BA4\u6E05\u7A7A\u641C\u7D22\u5386\u53F2\u5417",
        confirmText: "\u5220\u9664",
        confirmColor: "red",
        cancelColor: "#808080",
        success: (res) => {
          if (res.confirm) {
            this.localSearchListDel = false;
            this.localSearchList = [];
            common_vendor.index.removeStorageSync(localSearchListKey);
          }
        }
      });
    },
    LocalSearchlistItemClick(word, index) {
      if (this.localSearchListDel) {
        this.localSearchList.splice(index, 1);
        common_vendor.index.setStorageSync(localSearchListKey, this.localSearchList);
        if (!this.localSearchList.length) {
          this.localSearchListDel = false;
        }
        return;
      }
      this.noAssociativeShow = true;
      this.search(word);
    },
    searchHotRefresh() {
      this.$refs.udb.refresh();
    },
    speech() {
    },
    searchLogDbAdd(value) {
      this.getDeviceId().then((device_id) => {
        this.searchLogDb.add({
          device_id,
          content: value,
          create_date: Date.now()
        });
      });
    },
    getDeviceId() {
      return new Promise((resolve, reject) => {
        const uniId = common_vendor.index.getStorageSync("uni_id");
        if (!uniId) {
          resolve(common_vendor.index.getSystemInfoSync().system + "_" + Math.random().toString(36).substr(2));
        } else {
          resolve(uniId);
        }
      });
    },
    associativeClick(item) {
      console.log("associativeClick: ", item, item.title);
      this.noAssociativeShow = true;
      this.searchText = item.title;
      this.loadList(item.title);
    },
    loadList(text = "") {
      let where = '"article_status" == 1 ';
      if (text) {
        this.where = where + `&& /${text}/.test(title)`;
      } else {
        this.where = where;
      }
      this.associativeList = [];
      this.associativeShow = false;
      setTimeout(() => {
        this.$refs.listUdb.loadData({
          clear: true
        });
      }, 0);
    },
    onDbLoad() {
      console.log("onDbLoad");
      this.isLoadData = true;
      this.noAssociativeShow = false;
    },
    onqueryerror(e) {
      console.error(e);
    },
    refresh() {
      this.$refs.listUdb.loadData({
        clear: true
      }, () => {
        common_vendor.index.stopPullDownRefresh();
      });
    },
    loadMore() {
      this.$refs.listUdb.loadMore();
    },
    publishTime(timestamp) {
      return uni_modules_uniCmsArticle_common_publishTime.translatePublishTime(timestamp);
    }
  },
  onReachBottom() {
    this.loadMore();
  },
  watch: {
    searchText: debounce(function(value, oldValue) {
      if (value === oldValue)
        return;
      if (this.noAssociativeShow)
        return;
      if (value) {
        this.articleDbName.where({
          [associativeSearchField]: new RegExp(value, "gi")
        }).field(associativeField).get().then((res) => {
          this.associativeList = res.result.data;
          this.associativeShow = true;
        });
      } else {
        this.associativeList = [];
      }
    }, 100)
  }
};
if (!Array) {
  const _easycom_uni_search_bar2 = common_vendor.resolveComponent("uni-search-bar");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_unicloud_db2 = common_vendor.resolveComponent("unicloud-db");
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_load_state2 = common_vendor.resolveComponent("uni-load-state");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  (_easycom_uni_search_bar2 + _easycom_uni_icons2 + _easycom_unicloud_db2 + _easycom_uni_list_item2 + _easycom_uni_load_state2 + _easycom_uni_list2)();
}
const _easycom_uni_search_bar = () => "../../../uni-search-bar/components/uni-search-bar/uni-search-bar.js";
const _easycom_uni_icons = () => "../../../uni-icons/components/uni-icons/uni-icons.js";
const _easycom_unicloud_db = () => "../../../../node-modules/@dcloudio/uni-components/lib/unicloud-db/unicloud-db.js";
const _easycom_uni_list_item = () => "../../../uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_load_state = () => "../../../../components/uni-load-state/uni-load-state.js";
const _easycom_uni_list = () => "../../../uni-list/components/uni-list/uni-list.js";
if (!Math) {
  (_easycom_uni_search_bar + _easycom_uni_icons + _easycom_unicloud_db + _easycom_uni_list_item + _easycom_uni_load_state + _easycom_uni_list)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.sr("searchBar", "9ed0b35e-0"),
    b: common_vendor.o($options.clear),
    c: common_vendor.o($options.confirm),
    d: common_vendor.o($options.cancel),
    e: common_vendor.o(($event) => $data.searchText = $event),
    f: common_vendor.p({
      radius: "100",
      focus: $data.focus,
      placeholder: $data.hotWorld,
      clearButton: "auto",
      cancelButton: "always",
      modelValue: $data.searchText
    }),
    g: common_vendor.w(({
      data,
      pagination,
      hasMore,
      loading,
      error,
      options
    }, s0, i0) => {
      return common_vendor.e(!$data.isLoadData ? common_vendor.e({
        a: $data.localSearchList.length
      }, $data.localSearchList.length ? common_vendor.e({
        b: !$data.localSearchListDel
      }, !$data.localSearchListDel ? {
        c: common_vendor.o(($event) => $data.localSearchListDel = true),
        d: "9ed0b35e-2-" + i0 + ",9ed0b35e-1",
        e: common_vendor.p({
          color: $data.iconColor,
          size: "18",
          type: "trash"
        })
      } : {
        f: common_vendor.o((...args) => $options.LocalSearchListClear && $options.LocalSearchListClear(...args)),
        g: common_vendor.o(($event) => $data.localSearchListDel = false)
      }, {
        h: common_vendor.f($data.localSearchList, (word, index, i1) => {
          return common_vendor.e({
            a: common_vendor.t(word),
            b: word
          }, $data.localSearchListDel ? {
            c: "9ed0b35e-3-" + i0 + "-" + i1 + ",9ed0b35e-1",
            d: common_vendor.p({
              size: "12",
              type: "closeempty"
            })
          } : {}, {
            e: index,
            f: common_vendor.o(($event) => $options.LocalSearchlistItemClick(word, index), index)
          });
        }),
        i: $data.localSearchListDel
      }) : {}, {
        j: !$data.netHotListIsHide
      }, !$data.netHotListIsHide ? {
        k: common_vendor.o($options.searchHotRefresh),
        l: "9ed0b35e-4-" + i0 + ",9ed0b35e-1",
        m: common_vendor.p({
          color: $data.iconColor,
          size: "14",
          type: "reload"
        })
      } : {}, {
        n: common_vendor.o(($event) => $data.netHotListIsHide = !$data.netHotListIsHide),
        o: "9ed0b35e-5-" + i0 + ",9ed0b35e-1",
        p: common_vendor.p({
          color: $data.iconColor,
          size: "18",
          type: $data.netHotListIsHide ? "eye-slash" : "eye"
        }),
        q: common_vendor.w(({
          data: data2,
          loading: loading2,
          error: error2,
          options: options2
        }, s1, i1) => {
          return common_vendor.e({
            a: loading2 && !$data.netHotListIsHide
          }, loading2 && !$data.netHotListIsHide ? {} : common_vendor.e({
            b: !$data.netHotListIsHide
          }, !$data.netHotListIsHide ? common_vendor.e({
            c: error2
          }, error2 ? {
            d: common_vendor.t(error2.message)
          } : {
            e: common_vendor.f(data2, (word, index, i2) => {
              return {
                a: common_vendor.t(word.content),
                b: index,
                c: common_vendor.o(($event) => $options.search(word.content), index)
              };
            })
          }) : {}), {
            f: i1,
            g: s1
          });
        }, {
          name: "d",
          path: "g[" + i0 + "].q",
          vueId: "9ed0b35e-6-" + i0 + ",9ed0b35e-1"
        }),
        r: common_vendor.sr("udb", "9ed0b35e-6-" + i0 + ",9ed0b35e-1"),
        s: "9ed0b35e-6-" + i0 + ",9ed0b35e-1",
        t: common_vendor.p({
          field: "content",
          collection: "opendb-search-hot",
          orderby: "create_date desc,count desc",
          ["page-data"]: "replace",
          ["page-size"]: 10
        })
      }) : {
        v: common_vendor.f(data, (item, index, i1) => {
          return {
            a: item.thumbnail,
            b: common_vendor.t(item.title),
            c: common_vendor.t(item.user_id[0] ? item.user_id[0].nickname : ""),
            d: common_vendor.t($options.publishTime(item.publish_date)),
            e: index,
            f: "9ed0b35e-8-" + i0 + "-" + i1 + "," + ("9ed0b35e-7-" + i0),
            g: common_vendor.p({
              to: "/uni_modules/uni-cms-article/pages/detail/detail?id=" + item._id
            })
          };
        }),
        w: common_vendor.o($options.refresh),
        x: common_vendor.o($options.loadMore),
        y: "9ed0b35e-9-" + i0 + "," + ("9ed0b35e-7-" + i0),
        z: common_vendor.p({
          state: {
            data,
            pagination,
            hasMore,
            loading,
            error
          }
        }),
        A: $data.listHeight,
        B: "9ed0b35e-7-" + i0 + ",9ed0b35e-1",
        C: common_vendor.p({
          border: false
        })
      }, {
        D: i0,
        E: s0
      });
    }, {
      name: "d",
      path: "g",
      vueId: "9ed0b35e-1"
    }),
    h: !$data.isLoadData,
    i: common_vendor.sr("listUdb", "9ed0b35e-1"),
    j: common_vendor.o($options.onqueryerror),
    k: common_vendor.o($options.onDbLoad),
    l: common_vendor.p({
      collection: $options.colList,
      ["page-size"]: 10,
      orderby: "publish_date desc",
      loadtime: "manual"
    }),
    m: $data.associativeShow
  }, $data.associativeShow ? {
    n: common_vendor.f($data.associativeList, (item, index, i0) => {
      return {
        a: item._id,
        b: common_vendor.o(($event) => $options.associativeClick(item), item._id),
        c: "9ed0b35e-11-" + i0 + ",9ed0b35e-10",
        d: common_vendor.p({
          ellipsis: 1,
          title: item.title,
          ["show-extra-icon"]: true,
          clickable: true,
          ["extra-icon"]: {
            size: 18,
            color: $data.iconColor,
            type: "search"
          }
        })
      };
    })
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-9ed0b35e"], ["__file", "E:/uni-App/nanyang-starter/uni_modules/uni-cms-article/pages/search/search.nvue"]]);
wx.createPage(MiniProgramPage);
