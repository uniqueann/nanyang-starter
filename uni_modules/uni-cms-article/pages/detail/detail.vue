<template>
  <unicloud-db v-slot:default="{data, loading, error, options}" :collection="collection" :options="formData"
               :getone="true" :where="where" :manual="true" ref="detail" foreignKey="uni-cms-articles.user_id"
               @load="loadData"
               class="article">
    <uni-nav-bar class="nav-bar" :class="showNavBar ? 'show' : ''" :statusBar="true" :border="false" rightWidth="180rpx"
                 backgroundColor="transparent">
      <template v-slot:left>
        <view class="back" @click="back">
          <uni-icons class="icon" :color="showNavBar ? '#333333' : '#ffffff'" type="left" size="48rpx"></uni-icons>
        </view>
      </template>
      <template v-slot:default>
        <view class="title">
          <text class="text">{{ title }}</text>
        </view>
      </template>
    </uni-nav-bar>
    <view class="cover" :class="{ placeholder: !coverImage.show, 'not-cover': !coverImage.exists }">
      <image v-if="data && data.thumbnail" class="img" :class="coverImage.show ? 'show' : ''" :src="data.thumbnail"
             mode="aspectFill" @load="setCoverImageSize" :style="{ width: `100%`, height: `100%` }"></image>
      <!--          :style="{width: `${coverImage.width}px`, height: `${coverImage.height}px`}"-->

      <view class="mask"></view>
    </view>
    <template v-if="!loading && data">
      <view class="meta">
        <view class="title">
          <text class="text">{{ data.title }}</text>
        </view>
        <view class="excerpt">
          <text class="text">{{ data.excerpt }}</text>
        </view>
        <view class="author">
          <template v-if="data.user_id[0]">
            <text class="at">{{ data.user_id[0].nickname || '' }}</text>
            <text class="split">·</text>
          </template>
          <text class="date">{{ publishTime(data.publish_date) }}</text>
        </view>
      </view>
      <view class="content">
        <render-article-detail :delta="data.content" :ad-config="{ adpId, watchAdUniqueType }"></render-article-detail>
      </view>
    </template>
    <view class="detail-loading" v-else>
      <uni-icons type="spinner-cycle" size="35px"/>
    </view>
  </unicloud-db>
</template>

<script>
import uniNavBar from '@/uni_modules/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.vue';
import renderArticleDetail from "@/uni_modules/uni-cms-article/components/render-article-detail/index.vue";
import translatePublishTime from "@/uni_modules/uni-cms-article/common/publish-time";

const db = uniCloud.database()
const articleDBName = 'uni-cms-articles'
const userDBName = 'uni-id-users'

export default {
  components: {
    uniNavBar,
    renderArticleDetail
  },
  data() {
    return {
      showNavBar: false, // 是否显示导航栏
      coverImage: { // 封面图片相关信息
        url: '', // 图片链接
        exists: true, // 是否存在
        show: false, // 是否显示
        width: 1, // 宽度
        height: 1 // 高度
      },
      id: "", // 文章ID
      title: "", // 文章标题
      formData: {}, // 表单数据

      // 广告相关配置
      adpId: "", // TODO: 请填写广告位ID
      watchAdUniqueType: "device" // TODO: 观看广告的唯一标识类型，可选值为 user 或者 device，user 表示用户唯一，device 表示设备唯一
    }
  },
  computed: {
    where() {
      //拼接where条件 查询条件 ,更多详见 ：https://uniapp.dcloud.net.cn/uniCloud/unicloud-db?id=jsquery
      return `_id =="${this.id}"`
    },
    collection() {
      return [
        db.collection(articleDBName).where(this.where).field('user_id,thumbnail,excerpt,publish_date,title,content').getTemp(),
        db.collection(userDBName).field('_id, nickname').getTemp()
      ]
    }
  },
  onReady() {
    // 开始加载数据，修改 where 条件后才开始去加载 clinetDB 的数据 ，需要等组件渲染完毕后才开始执行 loadData，所以不能再 onLoad 中执行
    if (this.id) { // ID 不为空，则发起查询
      this.$refs.detail.loadData()
    } else {
      uni.showToast({
        icon: 'none',
        title: 'id 不能为空'
      })
    }
  },
  onLoad(event) {
    //获取文章id，通常 id 来自上一个页面
    if (event.id) {
      this.id = event.id
    }

    // 监听解锁内容事件
    uni.$on('onUnlockContent', this.onUnlockContent)
  },
  onUnload() {
    // 页面卸载时，移除监听事件
    uni.$off('onUnlockContent', this.onUnlockContent)
  },
  onPageScroll(e) {
    // 计算封面高度
    const coverHeight = this.coverImage.height - 100 > 0 ? this.coverImage.height - 100 : 200
    // 根据滚动位置判断是否显示导航栏
    if (e.scrollTop > coverHeight) {
      this.showNavBar = true
    } else {
      this.showNavBar = false
    }
  },
  methods: {
    // 将时间戳转换为可读的时间格式
    publishTime(timestamp) {
      return translatePublishTime(timestamp)
    },
    // 返回上一页或者跳转到文章列表页
    back() {
      // 获取当前页面数量
      const pages = getCurrentPages().length
      // 定义文章列表页的路径
      const pageUrl = '/uni_modules/uni-cms-article/pages/list/list'

      // 如果当前页面数量大于1，返回上一页
      if (pages.length > 1) {
        uni.navigateBack({})
      } else { // 否则跳转到文章列表页
        uni.redirectTo({
          url: pageUrl,
          fail: (e) => {
            // 如果跳转失败，说明当前页面是tabbar页面，需要使用switchTab跳转
            if (e.errMsg.indexOf('tabbar') !== -1) {
              uni.switchTab({
                url: pageUrl
              })
            }
          }
        })
      }
    },
    // 将文章加入阅读历史
    setReadHistory() {
      // 获取阅读历史缓存，如果不存在则为空数组
      const historyCache = uni.getStorageSync('readHistory') || []
      // 过滤掉当前文章的阅读历史
      const readHistory = historyCache.filter(item => item.article_id !== this.id)
      // 将当前文章的阅读历史添加到数组最前面
      readHistory.unshift({
        article_id: this.id,
        last_time: Date.now()
      })
      // 将更新后的阅读历史缓存到本地
      uni.setStorageSync('readHistory', readHistory)

    },
    // 加载数据
    loadData(data) {
      // 如果封面不存在，则不显示封面图片
      if (!data.thumbnail) {
        this.coverImage.exists = false
      }
      // 设置文章标题
      this.title = data.title

      // 将文章添加进阅读历史
      this.setReadHistory()
    },
    // 设置封面图片的大小
    setCoverImageSize(e) {
      const {width, height} = e.detail // 获取图片的宽和高
      uni.getSystemInfo({ // 获取系统信息
        success: ({windowWidth}) => { // 获取系统信息成功
          this.coverImage.width = windowWidth // 将封面图片的宽度设置为窗口宽度
          this.coverImage.height = (windowWidth / width) * height // 封面高度；将封面图片的高度设置为宽高比乘以窗口宽度
          this.coverImage.show = true // 显示封面图片
        }
      })

    },
    // 监听解锁内容事件，解锁内容后重新加载数据
    async onUnlockContent() {
      this.$refs.detail.loadData()
    }
  }

}
</script>

<style scoped lang="scss">
/* #ifdef APP-NVUE */
.article {
  background-color: #fff;
}

/* #endif */

@mixin cp {
  padding: 0 40rpx;
}

.nav-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;

  .back {
    width: 60rpx;
    height: 60rpx;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, .75);
    display: flex;
    justify-content: center;
    align-items: center;

    .icon {
      transform: translate(-2rpx, 2rpx);
      /* #ifdef APP-NVUE */
      transform: translate(-2rpx, 0);
      /* #endif */
    }
  }

  .title {
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    text-align: center;
    /* #ifndef APP-NVUE */
    height: 100%;
    width: 100%;
    /* #endif */
    /* #ifdef APP-NVUE */
    height: 44px;

    /* #endif */
    .text {
      font-size: 32rpx;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      /* #ifndef APP-NVUE */
      display: block;
      width: 100%;
      /* #endif */
      /* #ifdef APP-NVUE */
      lines: 1
      /* #endif */
    }
  }

  &.show {
    background-color: #fff;

    .back {
      background-color: transparent;
    }

    .title {
      opacity: 1;

      .text {
        color: #333;
      }
    }
  }
}

.detail-loading {
  margin: 100rpx auto 0;
  width: 35px;
  height: 35px;
  animation: rotate360 2s linear infinite;
}

@keyframes rotate360 {
  0% {
    transform: rotate(0deg);
    transform-origin: center center;
  }

  100% {
    transform: rotate(360deg);
    transform-origin: center center;
  }
}

.cover {
  position: relative;
  z-index: 0;
  background: #fff;
  transition: height .1s;
  height: 421rpx;
  overflow: hidden;

  &.placeholder {
    //height: 600rpx;
  }

  &.not-cover {
    background: transparent;
    //height: 200rpx;

    .img {
      display: none;
    }
  }

  .img {
    opacity: 0;
    transition: opacity .3s;

    &.show {
      opacity: 1;
    }
  }

  .mask {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1;
    background-image: linear-gradient(to bottom, transparent, #fff);
  }
}

.meta {
  @include cp;
  margin-top: -40rpx;
  position: relative;
  z-index: 1;

  .title {
    .text {
      font-size: 44rpx;
      line-height: 66rpx;
      font-weight: bold;
    }
  }

  .excerpt {
    margin-top: 10rpx;

    .text {
      font-size: 26rpx;
      line-height: 40rpx;
      color: #666;
    }
  }

  .author {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: row;
    margin-top: 20rpx;

    .at,
    .split,
    .date {
      font-size: 26rpx;
      color: #999;
    }

    .split {
      margin: 0 10rpx;
    }
  }
}

.content {
  @include cp;
  margin-top: 40rpx;
  padding-bottom: 80rpx;
}
</style>
