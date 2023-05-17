"use strict";
const common_vendor = require("../../../../common/vendor.js");
const unlockContent = () => "./unlock-content.js";
const _sfc_main = {
  name: "render-article-detail",
  props: {
    delta: {
      type: Object,
      default: {}
    },
    adConfig: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      renderData: []
    };
  },
  components: {
    unlockContent
  },
  mounted() {
    this.dataPreHandler();
  },
  methods: {
    getRowClass(row) {
      if (row) {
        return Array.from(row.reduce((res, item) => {
          res.add(item.type);
          return res;
        }, /* @__PURE__ */ new Set()));
      } else {
        return [];
      }
    },
    deltaHandler(ops) {
      return [].concat.apply([], ops.map((op) => {
        if (typeof op.insert !== "string")
          return op;
        if (op.insert === "\n")
          return op;
        const splitText = op.insert.split("\n");
        return [].concat.apply([], splitText.flatMap((item, index) => {
          if (item || index === splitText.length - 1 && !item) {
            const result = [];
            if (index > 0) {
              result.push({
                insert: "\n",
                attributes: {}
              });
            }
            result.push({
              insert: item,
              attributes: op.attributes
            });
            return result;
          }
        }).filter((item) => item));
      }));
    },
    dataPreHandler() {
      const renderData = [];
      let rowItems = [];
      let tempList = null;
      const ops = this.deltaHandler(this.delta.ops);
      for (const op of ops) {
        if (typeof op.insert === "string") {
          if (op.insert === "\n") {
            if (tempList && tempList.data.type !== op.attributes.list) {
              renderData.push({
                rowItems: [tempList],
                rowAttributes: {},
                rowClass: "",
                rowStyle: ""
              });
              tempList = null;
            }
            if (op.attributes && op.attributes.list) {
              if (!tempList) {
                tempList = {
                  type: "list",
                  data: {
                    type: op.attributes.list,
                    items: []
                  }
                };
              }
              tempList.data.items.push(rowItems.length > 0 ? rowItems : [rowItems]);
              rowItems = [];
              continue;
            }
            renderData.push({
              rowItems,
              rowAttributes: op.attributes || {},
              rowClass: this.attributes2class(rowItems, op.attributes, "block"),
              rowStyle: this.attributes2style(op.attributes, "block")
            });
            rowItems = [];
            continue;
          }
          const splitText = op.insert.split("\n").filter((text) => text);
          if (splitText.length > 0) {
            rowItems.push({
              type: "text",
              data: {
                texts: splitText,
                attributes: op.attributes || {},
                class: this.attributes2class(null, op.attributes, "inline"),
                style: this.attributes2style(op.attributes, "inline")
              }
            });
          }
        } else if (op.insert.image) {
          rowItems.push({
            type: "image",
            data: {
              url: op.insert.image,
              attributes: op.attributes || {},
              class: this.attributes2class(null, op.attributes, "inline"),
              style: this.attributes2style(op.attributes, "inline")
            }
          });
        } else if (op.insert.divider) {
          rowItems.push({
            type: "divider"
          });
        } else if (op.insert.unlockContent) {
          rowItems.push({
            type: "unlockContent"
          });
        }
      }
      if (tempList) {
        renderData.push({
          rowItems: [tempList],
          rowAttributes: {},
          rowClass: "",
          rowStyle: ""
        });
      }
      if (rowItems.length > 0) {
        renderData.push({
          rowItems
        });
        rowItems = [];
      }
      this.renderData = renderData;
    },
    attributes2class(rowItems, attributes, type) {
      if (!attributes)
        return "";
      const allowAttr = {
        inline: ["bold", "italic", "underline", "strike", "ins", "link"],
        block: ["header", "list"]
      }[type];
      if (!allowAttr)
        throw new Error("type not supported");
      const classList = allowAttr.reduce((res, item) => {
        if (!attributes)
          return res;
        if (attributes[item] === true) {
          res.push(item);
        } else if (attributes[item] !== void 0) {
          res.push(`${item}-${attributes[item]}`);
        }
        return res;
      }, []);
      if ("link" in attributes) {
        classList.push("link");
      }
      if (rowItems) {
        const cls = this.getRowClass(rowItems);
        if (cls && cls.length) {
          classList.push(...cls);
        }
      }
      return classList.join(" ");
    },
    attributes2style(attributes, type) {
      if (!attributes)
        return "";
      const allowAttr = {
        inline: ["align", "color", "background", "font", "fontSize", "fontStyle", "fontVariant", "fontWeight", "fontFamily", "lineHeight", "letterSpacing", "textDecoration", "textIndent", "wordWrap", "wordBreak", "whiteSpace"],
        block: ["align", "margin", "marginTop", "marginBottom", "marginLeft", "marginRight", "padding", "paddingTop", "paddingBottom", "paddingLeft", "paddingRight"]
      }[type];
      const adp = {
        align: "text-align"
      };
      if (!allowAttr)
        throw new Error("type not supported");
      return allowAttr.reduce((res, item) => {
        if (!attributes)
          return res;
        if (attributes[item] !== void 0) {
          res.push(`${adp[item] || item.replace(/([A-Z])/g, (s, m) => `-${m.toLowerCase()}`)}: ${attributes[item]}`);
        }
        return res;
      }, []).join(";");
    },
    goLink(link) {
      if (!link)
        return;
      common_vendor.index.setClipboardData({
        data: link,
        success: () => {
          common_vendor.index.showToast({
            title: "\u94FE\u63A5\u5DF2\u590D\u5236",
            icon: "none"
          });
        }
      });
    },
    imagePreview(src) {
      if (src) {
        common_vendor.index.previewImage({
          current: src.split("?")[0],
          urls: [src.split("?")[0]]
        });
      }
    },
    imageLoad(e) {
      const { idx, rowIdx } = e.target.dataset;
      const recal = this.wxAutoImageCal(e.detail.width, e.detail.height, 15);
      const image = this.renderData[rowIdx].rowItems[idx];
      if (!image.data.attributes.width || image.data.attributes.width > recal.imageWidth) {
        this.$set(this.renderData[rowIdx].rowItems[idx].data.attributes, "width", recal.imageWidth);
        this.$set(this.renderData[rowIdx].rowItems[idx].data.attributes, "height", recal.imageheight);
      }
    },
    wxAutoImageCal(originalWidth, originalHeight, imagePadding = 0) {
      const systemInfo = common_vendor.index.getSystemInfoSync();
      let windowWidth = 0;
      let autoWidth = 0, autoHeight = 0;
      let results = {};
      windowWidth = systemInfo.windowWidth - 2 * imagePadding;
      systemInfo.windowHeight;
      if (originalWidth > windowWidth) {
        autoWidth = windowWidth;
        autoHeight = autoWidth * originalHeight / originalWidth;
        results.imageWidth = autoWidth;
        results.imageheight = autoHeight;
      } else {
        results.imageWidth = originalWidth;
        results.imageheight = originalHeight;
      }
      return results;
    }
  }
};
if (!Array) {
  const _component_unlock_content = common_vendor.resolveComponent("unlock-content");
  _component_unlock_content();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.renderData, (row, rowIndex, i0) => {
      return {
        a: common_vendor.f(row.rowItems, (item, index, i1) => {
          return common_vendor.e({
            a: item.type === "text"
          }, item.type === "text" ? common_vendor.e({
            b: item.data.texts.length > 1
          }, item.data.texts.length > 1 ? {
            c: common_vendor.f(item.data.texts, (text, k2, i2) => {
              return {
                a: common_vendor.t(text)
              };
            }),
            d: common_vendor.n(item.data.class),
            e: common_vendor.s(item.data.style)
          } : {
            f: common_vendor.f(item.data.texts, (text, k2, i2) => {
              return item.data.attributes.link ? {
                a: common_vendor.t(text),
                b: common_vendor.n(item.data.class),
                c: common_vendor.s(item.data.style),
                d: common_vendor.o(($event) => $options.goLink(item.data.attributes.link))
              } : {
                e: common_vendor.t(text),
                f: common_vendor.n(item.data.class),
                g: common_vendor.s(item.data.style)
              };
            }),
            g: item.data.attributes.link
          }) : item.type === "list" ? {
            i: common_vendor.f(item.data.items, (listItem, index2, i2) => {
              return common_vendor.e(item.data.type === "ordered" ? {
                a: common_vendor.t(index2 + 1)
              } : item.data.type === "bullet" ? {} : {}, {
                b: common_vendor.f(listItem, (listRow, k3, i3) => {
                  return {
                    a: common_vendor.f(listRow.data.texts, (text, k4, i4) => {
                      return listRow.data.attributes.link ? {
                        a: common_vendor.t(text),
                        b: common_vendor.n(listRow.data.class),
                        c: common_vendor.s(listRow.data.style),
                        d: common_vendor.o(($event) => $options.goLink(listRow.data.attributes.link))
                      } : {
                        e: common_vendor.t(text),
                        f: common_vendor.n(listRow.data.class),
                        g: common_vendor.s(listRow.data.style)
                      };
                    }),
                    b: listRow.data.attributes.link
                  };
                })
              });
            }),
            j: item.data.type === "ordered",
            k: item.data.type === "bullet",
            l: common_vendor.n(item.data.type)
          } : item.type === "image" ? {
            n: item.data.url,
            o: common_vendor.n(item.data.class),
            p: item.data.attributes.alt || "",
            q: `${item.data.attributes.width}px`,
            r: `${item.data.attributes.height}px`,
            s: rowIndex,
            t: index,
            v: common_vendor.o((...args) => $options.imageLoad && $options.imageLoad(...args)),
            w: common_vendor.o(($event) => $options.imagePreview(item.data.url))
          } : item.type === "unlockContent" ? {
            y: "ca4bc759-0-" + i0 + "-" + i1,
            z: common_vendor.p({
              ["adp-id"]: $props.adConfig.adpId,
              ["watch-ad-unique-type"]: $props.adConfig.watchAdUniqueType
            })
          } : item.type === "divider" ? {} : {}, {
            h: item.type === "list",
            m: item.type === "image",
            x: item.type === "unlockContent",
            A: item.type === "divider"
          });
        }),
        b: common_vendor.n(row.rowClass),
        c: common_vendor.s(row.rowStyle)
      };
    })
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-ca4bc759"], ["__file", "E:/uni-App/nanyang-starter/uni_modules/uni-cms-article/components/render-article-detail/index.vue"]]);
wx.createComponent(Component);
