"use strict";
const common_vendor = require("../../../../../common/vendor.js");
const _sfc_main = {
  name: "AdRewardedVideo",
  mixins: [common_vendor.adMixin],
  props: {
    adType: {
      type: String,
      default: "RewardedVideo"
    }
  }
};
if (!Array) {
  const _component_uniad_plugin = common_vendor.resolveComponent("uniad-plugin");
  _component_uniad_plugin();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.r("d", {
      options: _ctx.options,
      loading: _ctx.loading,
      error: _ctx.errorMessage
    }),
    b: _ctx.adpid,
    c: _ctx.unitId,
    d: common_vendor.o(_ctx._onmpload),
    e: common_vendor.o(_ctx._onmpclose),
    f: common_vendor.o(_ctx._onmperror),
    g: common_vendor.o((...args) => _ctx._onclick && _ctx._onclick(...args))
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/360Downloads/Software/hx/HBuilderX.3.6.15.20221228/HBuilderX/plugins/uniapp-cli-vite/node_modules/@dcloudio/uni-components/lib/ad-rewarded-video/ad-rewarded-video.vue"]]);
wx.createComponent(Component);
