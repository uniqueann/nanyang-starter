<template>
  <view>
    <view class="paragraph" v-for="(row, rowIndex) in renderData" :class="row.rowClass" :style="row.rowStyle">
      <template v-for="(item, index) in row.rowItems">
        <template v-if="item.type === 'text'">
          <template v-if="item.data.texts.length > 1">
            <view class="p" v-for="text in item.data.texts" :class="item.data.class" :style="item.data.style">{{ text }}
            </view>
          </template>
          <template v-else v-for="text in item.data.texts">
            <text v-if="item.data.attributes.link" :class="item.data.class" :style="item.data.style"
                  @click="goLink(item.data.attributes.link)">{{ text }}
            </text>
            <text v-else :class="item.data.class" :style="item.data.style">{{ text }}</text>
          </template>
        </template>
        <view v-else-if="item.type === 'list'" class="list" :class="item.data.type">
          <view class="li" v-for="(listItem, index) in item.data.items">
            <text v-if="item.data.type === 'ordered'" class="no">{{ index + 1 }}.</text>
            <text v-else-if="item.data.type === 'bullet'" class="no"></text>
            <template v-for="listRow in listItem">
              <template v-for="text in listRow.data.texts">
                <text v-if="listRow.data.attributes.link" :class="listRow.data.class" :style="listRow.data.style"
                      @click="goLink(listRow.data.attributes.link)">{{ text }}
                </text>
                <text v-else :class="listRow.data.class" :style="listRow.data.style">{{ text }}</text>
              </template>
            </template>
          </view>
        </view>
        <view v-else-if="item.type === 'image'" class="image">
          <image :src="item.data.url" class="img" :class="item.data.class" :alt="item.data.attributes.alt || ''"
                 :style="{ width: `${item.data.attributes.width}px`, height: `${item.data.attributes.height}px` }"
                 mode="aspectFill" :data-row-idx="rowIndex" :data-idx="index" @load="imageLoad"
                 @click="imagePreview(item.data.url)"></image>
        </view>
        <unlock-content v-else-if="item.type === 'unlockContent'" :adp-id="adConfig.adpId"
                        :watch-ad-unique-type="adConfig.watchAdUniqueType"></unlock-content>
        <view v-else-if="item.type === 'divider'" class="divider"></view>
      </template>
    </view>
  </view>
</template>

<script>

import unlockContent from './unlock-content.vue'

export default {
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
    }
  },
  components: {
    unlockContent
  },
  mounted() {
    this.dataPreHandler()
  },
  methods: {
    getRowClass (row) {
      if (row) {
        return Array.from(row.reduce((res, item) => {
          res.add(item.type)
          return res
        }, new Set()))
      } else {
        return []
      }
    },
    deltaHandler(ops) {
      return [].concat.apply([], ops.map(op => {
        if (typeof op.insert !== 'string') return op
        if (op.insert === '\n') return op

        const splitText = op.insert.split('\n')

        return [].concat.apply([], splitText.flatMap((item, index) => {
          if (item || index === splitText.length - 1 && !item) {
            const result = []

            if (index > 0) {
              result.push({
                insert: '\n',
                attributes: {}
              })
            }

            result.push({
              insert: item,
              attributes: op.attributes
            })

            return result
          }
        }).filter(item => item))

      }))
    },
    dataPreHandler() {
      // 转换delta为可渲染的数据格式
      // 初始化渲染数据
      const renderData = []
      // 初始化行数据
      let rowItems = []
      // 初始化列表数据
      let tempList = null

      const ops = this.deltaHandler(this.delta.ops)

      // 遍历delta操作
      for (const op of ops) {
        // 文本类型
        // 如果是文本
        if (typeof op.insert === 'string') {
          // 行结束
          // 如果是行结束符
          if (op.insert === '\n') {
            // 填充 list 数据结构
            // 如果存在列表数据且列表类型不同
            if (tempList && (tempList.data.type !== op.attributes.list)) {
              renderData.push({
                rowItems: [tempList], // 将列表数据添加到渲染数据中
                rowAttributes: {},
                rowClass: "",
                rowStyle: ""
              })
              // 重置列表数据
              tempList = null
            }

            // 组装 list 数据结构
            // 如果存在列表属性
            if (op.attributes && op.attributes.list) {
              // 如果列表数据不存在
              if (!tempList) {
                tempList = {
                  type: 'list',
                  data: {
                    type: op.attributes.list,
                    items: []
                  }
                }
              }
              // 将行数据添加到列表数据中
              tempList.data.items.push(rowItems.length > 0 ? rowItems : [rowItems])
              // 重置行数据
              rowItems = []
              continue
            }

            renderData.push({
              rowItems, // 将行数据添加到渲染数据中
              rowAttributes: op.attributes || {},
              rowClass: this.attributes2class(rowItems, op.attributes, 'block'),
              rowStyle: this.attributes2style(op.attributes, 'block')
            })
            // 重置行数据
            rowItems = []
            continue
          }

          // 将文本按行分割
          const splitText = op.insert.split('\n').filter(text => text)
          if (splitText.length > 0) {
            rowItems.push({
              type: 'text',
              data: {
                texts: splitText,
                attributes: op.attributes || {},
                class: this.attributes2class(null, op.attributes, 'inline'),
                style: this.attributes2style(op.attributes, 'inline')
              }
            })
          }

          // 如果是图片
        } else if (op.insert.image) {
          rowItems.push({
            type: 'image',
            data: {
              url: op.insert.image,
              attributes: op.attributes || {},
              class: this.attributes2class(null, op.attributes, 'inline'),
              style: this.attributes2style(op.attributes, 'inline')
            }
          })
          // 如果是分割线
        } else if (op.insert.divider) {
          rowItems.push({
            type: 'divider'
          })
          // 如果是解锁内容
        } else if (op.insert.unlockContent) {
          rowItems.push({
            type: 'unlockContent'
          })
        }
      }

      if (tempList) {
        renderData.push({
          rowItems: [tempList], // 将列表数据添加到渲染数据中
          rowAttributes: {},
          rowClass: "",
          rowStyle: ""
        })
      }

      // 如果行数据不为空
      if (rowItems.length > 0) {
        renderData.push({
          rowItems // 将行数据添加到渲染数据中
        })
        // 重置行数据
        rowItems = []
      }

      // 将渲染数据赋值给组件数据
      this.renderData = renderData

    },
    // 将属性转换为class
    attributes2class(rowItems, attributes, type) {
      if (!attributes) return ''
      // 定义允许的属性
      const allowAttr = {
        inline: ['bold', 'italic', 'underline', 'strike', 'ins', 'link'],
        block: ['header', 'list']
      }[type]

      // 如果不支持该类型的属性，则抛出错误
      if (!allowAttr) throw new Error('type not supported')

      // 将属性转换为class列表
      const classList = allowAttr.reduce((res, item) => {
        // 如果属性为空，则返回空字符串
        if (!attributes) return res
        // 如果属性为true，则将属性名添加到class列表中
        if (attributes[item] === true) {
          res.push(item)
          // 如果属性不为undefined，则将属性名和属性值添加到class列表中
        } else if (attributes[item] !== undefined) {
          res.push(`${item}-${attributes[item]}`)
        }
        return res

      }, [])

      // 如果属性中包含link，则添加link类
      if ('link' in attributes) {
        classList.push('link')
      }

      if (rowItems) {
        const cls = this.getRowClass(rowItems)
        if (cls && cls.length) {
          classList.push(...cls)
        }
      }

      return classList.join(' ')
    },

    // 将属性转换为style
    attributes2style(attributes, type) {
      if (!attributes) return ''
      // 定义允许的属性
      const allowAttr = {
        inline: ['align', 'color', 'background', 'font', 'fontSize', 'fontStyle', 'fontVariant', 'fontWeight', 'fontFamily', 'lineHeight', 'letterSpacing', 'textDecoration', 'textIndent', 'wordWrap', 'wordBreak', 'whiteSpace'],
        block: ['align', 'margin', 'marginTop', 'marginBottom', 'marginLeft', 'marginRight', 'padding', 'paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight']
      }[type]

      // 定义属性适配器
      const adp = {
        align: 'text-align',
      }

      // 如果不支持该类型的属性，则抛出错误
      if (!allowAttr) throw new Error('type not supported')

      // 将属性转换为style
      return allowAttr.reduce((res, item) => {
        // 如果属性为空，则返回空字符串
        if (!attributes) return res
        // 如果属性不为undefined，则将属性名和属性值添加到style列表中
        if (attributes[item] !== undefined) {
          // 如果属性适配器中存在该属性，则使用适配器中的属性名
          // 否则，将属性名转换为短横线连接的形式
          res.push(`${adp[item] || item.replace(/([A-Z])/g, (s, m) => `-${m.toLowerCase()}`)}: ${attributes[item]}`)
        }
        return res

      }, []).join(';')
    },

    // 点击链接跳转
    goLink(link) {
      // 如果链接为空，则返回
      if (!link) return

      // #ifdef H5
      // 在新窗口中打开链接
      window.open(link, '_blank')
      // #endif

      // #ifdef MP
      // 微信小程序不支持打开外链，复制链接到剪贴板
      uni.setClipboardData({
        data: link,
        success: () => {
          uni.showToast({
            title: '链接已复制',
            icon: 'none'
          })
        }
      })
      // #endif

      // #ifdef APP
      // 在webview中打开链接
      uni.navigateTo({
        url: `/uni_modules/uni-cms-article/pages/webview/webview?url=${encodeURIComponent(link)}`
      })
      // #endif
    },
    // 点击图片预览
    imagePreview(src) {
      if (src) {
        uni.previewImage({
          current: src.split('?')[0], // 当前显示图片的http链接
          urls: [src.split('?')[0]] // 需要预览的图片http链接列表
        })
      }
    },

    // 图片加载完成
    imageLoad(e) {
      const {idx, rowIdx} = e.target.dataset
      const recal = this.wxAutoImageCal(e.detail.width, e.detail.height, 15) // 计算图片宽高
      const image = this.renderData[rowIdx].rowItems[idx]

      // ::TODO 关注一下在多端得表现情况
      if (!image.data.attributes.width || image.data.attributes.width > recal.imageWidth) {
        // 如果图片宽度不存在或者图片宽度大于计算出来的宽度，则设置图片宽高
        this.$set(this.renderData[rowIdx].rowItems[idx].data.attributes, 'width', recal.imageWidth)
        this.$set(this.renderData[rowIdx].rowItems[idx].data.attributes, 'height', recal.imageheight)
      }
    },

    // 计算图片宽高
    wxAutoImageCal(originalWidth, originalHeight, imagePadding = 0) {
      // 获取系统信息
      const systemInfo = uni.getSystemInfoSync()
      let windowWidth = 0, windowHeight = 0;
      let autoWidth = 0, autoHeight = 0;
      let results = {};
      // 计算图片宽度
      windowWidth = systemInfo.windowWidth - 2 * imagePadding;
      windowHeight = systemInfo.windowHeight;
      if (originalWidth > windowWidth) {//在图片width大于手机屏幕width时候
        autoWidth = windowWidth;
        autoHeight = (autoWidth * originalHeight) / originalWidth;
        results.imageWidth = autoWidth;
        results.imageheight = autoHeight;
      } else {//否则展示原来的数据
        results.imageWidth = originalWidth;
        results.imageheight = originalHeight;
      }
      return results;

    }
  }

}
</script>

<style scoped lang="scss">
.paragraph {
  word-break: break-all;
  > .image {
    margin-bottom: 0;
  }
  &.image {
    font-size: 0;
  }
}

.paragraph,
.image {
  margin-bottom: 40rpx;
  line-height: 1.75;
  font-size: 34rpx;
}

.texts .text {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.header-1,
.header-2,
.header-3,
.header-4,
.header-5,
.header-6 {
  font-weight: bold;
}

.header-1 {
  font-size: 44rpx;
}

.header-2 {
  font-size: 40rpx;
}

.header-3 {
  font-size: 38rpx;
}

.header-4 {
  font-size: 32rpx;
}

.header-5 {
  font-size: 28rpx;
}

.header-6 {
  font-size: 24rpx;
}

.bold {
  font-weight: bold;
}

.italic {
  font-style: italic;
}

.strike {
  text-decoration: line-through;
}

.underline {
  text-decoration: underline;
}

.link {
  color: #0064f9;
  text-decoration: underline;
}

:not(.paragraph).image {
  border-radius: 5px;
  overflow: hidden;
  display: inline-block;

  .img {
    width: 100%;
    display: block;
  }
}

.divider {
  height: 1px;
  background: #d8d8d8;
  width: 100%;
  margin: 40rpx 0;
}

.list {
  &.ordered {
    .li {
      .no {
        margin-right: 10rpx;
        user-select: none;
      }
    }
  }

  &.bullet {
    .li {
      padding-left: 30rpx;
      position: relative;

      .no {
        width: 10rpx;
        height: 10rpx;
        background: #222;
        border-radius: 50%;
        margin-right: 10rpx;
        user-select: none;
        display: inline-block;
        position: absolute;
        left: 0;
        top: 24rpx;
      }
    }
  }

  .li {
    margin-bottom: 20rpx;
  }
}
</style>

