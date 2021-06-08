<template>
  <el-dialog title="预览文章" :visible="isShowDetail" @close="close">
    <!-- 文章标题 -->
    <h2 class="title">{{ articleDetails.title }}</h2>
    <!-- 时间, 录入人, 浏览次数 -->
    <p>
      <span>{{ articleDetails.createTime }}</span>
      <span class="username">{{ articleDetails.username }}</span>
      <span><i class="el-icon-view"></i> {{ articleDetails.visits }}</span>
    </p>
    <!-- 文章内容 -->
    <p class="articleBody" v-html="articleDetails.articleBody"></p>
  </el-dialog>
</template>

<script>
export default {
  props: {
    // 文章详情
    articleDetails: {
      type: Object,
      default: () => ({})
    },
    // 是否显示
    isShowDetail: {
      type: Boolean,
      default: false
    }
  },
  created () {
  },
  methods: {
    // 关闭回调
    close () {
      this.$emit('update:isShowDetail', false)
    }
  }
}
</script>

<style scoped lang='scss'>
.username {
  padding: 0 15px;
}

.articleBody {
  border-top: 1px dotted #000;
  background-color: #f5f5f5;
  padding: 15px;
}
</style>
