<template>
  <div class="dashboard-container article-container">
    <div class="app-container">
      <el-card shadow="never">
        <!-- 头部 ********************** ->  start -->

        <div id="header-setting">
          <!-- 表单项 -->
          <el-form ref="form" :model="form" :inline="true" size="small">
            <el-form-item label="关键字">
              <el-input
                v-model="form.keyword"
                placeholder="根据文章标题搜索"
              ></el-input>
            </el-form-item>
            <el-form-item label="状态">
              <el-select v-model="form.state">
                <el-option label="启用" value="1"></el-option>
                <el-option label="禁用" value="0"></el-option>
              </el-select>
            </el-form-item>
            <div class="form-btn">
              <el-button size="small" plain @click="form = {}">清除</el-button>
              <el-button size="small" type="primary" @click="search"
                >搜索</el-button
              >
            </div>
          </el-form>
          <!-- 按钮 -->
          <div>
            <el-button
              type="success"
              size="small"
              @click="addArticle"
              style="button-setting"
              ><i class="el-icon-edit"></i> 新增技巧</el-button
            >
          </div>
        </div>
        <!-- 数据统计 -->
        <el-row>
          <el-col :span="24"
            ><div class="grid-content bg-purple-dark">
              <i class="el-icon-info" />数据一共 {{ total }} 条
            </div></el-col
          >
        </el-row>
        <!-- 头部 ********************** ->  end -->

        <!-- 主体内容 ********************** ->  start-->

        <!-- 表格 -->
        <el-table :data="tableData" style="width: 100%">
          <!-- 序号 -->
          <el-table-column label="序号" type="index"> </el-table-column>
          <!-- 文章标题 -->
          <el-table-column prop="title" label="文章标题">
            <template #default="{ row }">
              {{ row.title }}
              <i
                v-if="row.videoURL"
                class="el-icon-film"
                @click="openMovies(row.videoURL)"
                id="movie"
              />
            </template>
          </el-table-column>

          <!-- 阅读数 -->
          <el-table-column prop="visits" label="阅读数"> </el-table-column>
          <!-- 录入人 -->
          <el-table-column prop="username" label="录入人"> </el-table-column>
          <!-- 录入时间 -->
          <el-table-column
            prop="createTime"
            label="录入时间"
            :formatter="dateFormat"
          >
          </el-table-column>
          <!-- 状态 -->
          <el-table-column label="状态">
            <template #default="{ row }">
              {{ stateFormat(row.state) }}
            </template>
          </el-table-column>
          <!-- 操作 -->
          <el-table-column label="操作">
            <template #default="{ row }">
              <el-button type="text" @click="previewArticle(row)"
                >预览</el-button
              >
              <el-button type="text" @click="toggleState(row)">{{
                stateFormat(row.state, true)
              }}</el-button>
              <el-button
                type="text"
                @click="changeArticle(row)"
                :disabled="row.state === 1"
                >修改</el-button
              >
              <el-button
                type="text"
                @click="delArticle(row)"
                :disabled="row.state === 1"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination
          style="float: right; padding: 15px"
          background
          :page-size="pages.pagesize"
          :current-page="pages.page"
          layout="total,prev, pager, next,sizes, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[2, 5, 10, 15, 20]"
        >
        </el-pagination>

        <!-- 主体内容 ********************** ->  end-->
      </el-card>
    </div>
    <!-- 电影播放器弹层 -->

    <div class="movie-container" v-show="isShowMovie">
      <span class="movie-close" @click="closeMovie">x</span>
      <video class="movies" :src="movieUrl" autoplay muted loop></video>
    </div>

    <!-- 遮罩层的实现 -->
    <div class="mask" v-show="isShowMovie"></div>

    <!-- 预览文章对话框 -->
    <ArticllePreview
      :isShowDetail.sync="isShowDetail"
      :articleDetails="articleDetails"
    />

    <!-- 添加文章 -->
    <ArticlleAdd
      :page.sync="pages.page"
      :form.sync="childform"
      :isShowArticlleAdd.sync="isShowArticlleAdd"
    />
  </div>
</template>

<script>
// 引入API
import { list, changeState, remove } from '@/api/hmmm/articles.js'
// 引入子组件
import ArticllePreview from '../components/articles-preview'
import ArticlleAdd from '../components/articles-add'
export default {
  components: {
    ArticllePreview,
    ArticlleAdd
  },
  data () {
    return {
      // 添加文章表单  --> 传子组件
      childform: {
        title: '',
        articleBody: '',
        videoURL: ''
      },
      // 条件搜索表单
      form: {
        keyword: '',
        state: ''
      },
      // 分页
      pages: {
        page: 1,
        pagesize: Number(localStorage.getItem('page')) || 10
      },
      // 接口参数
      dataObj: {},
      // 文章详情
      articleDetails: {},
      // 表格
      tableData: [],
      // 分页器总数
      total: 0,
      // 是否显示添加/编辑 弹层   -> 子组件
      isShowArticlleAdd: false,
      // 是否显示预览弹层   -> 子组件
      isShowDetail: false,
      // 是否使用搜索按钮按条件搜索, false代表默认获取全部数据
      flag: false,
      // 电影以及遮罩弹层
      isShowMovie: false,
      // 电影地址
      movieUrl: ''

    }
  },
  created () {
    this.getArticleList()
  },
  methods: {
    // 按表单条件搜索
    search () {
      this.flag = this.form.state === '' ? this.flag = false : this.flag = true
      this.pages.page = 1
      this.getArticleList()
    },
    // 获取文章列表
    async getArticleList () {
      this.dataObj = this.flag ? { ...this.pages, ...this.form } : { ...this.pages, keyword: this.form.keyword }
      const { data } = await list(this.dataObj)
      this.total = data.counts
      this.tableData = data.items
    },
    // 改变pagesize
    handleSizeChange (val) {
      this.pages.page = 1
      this.pages.pagesize = val
      localStorage.setItem('page', val)
      this.getArticleList()
    },
    // 改变页码
    handleCurrentChange (page) {
      this.pages.page = page
      this.getArticleList()
    },
    // 格式化状态
    stateFormat (code, flag) {
      const map = flag ? { 1: '禁用', 0: '启用' } : { 1: '已启用', 0: '已禁用' }
      return map[code]
    },
    // 禁用,启用状态切换
    async toggleState (row) {
      row.state = row.state === 0 ? 1 : 0
      await changeState(row)
      this.$message.success('操作成功')
    },
    // 播放电影弹层
    openMovies (url) {
      const arr = url.split('.')
      const reg = ['mp4', 'mkv', 'avi', 'mov', 'asf', 'wmv']
      this.movieUrl = url
      reg.some(mv => { return arr[arr.length - 1] === mv }) ? this.isShowMovie = true : this.$message('失效的资源')
    },
    // 关闭电影弹层
    closeMovie () {
      this.isShowMovie = false
      this.movieUrl = ''
    },
    // 预览文章
    previewArticle (row) {
      this.articleDetails = row
      this.articleDetails.createTime = this.dateFormat(row)
      this.isShowDetail = true
    },
    // 新增文章
    addArticle () {
      this.isShowArticlleAdd = true
      // this.form = {}
    },
    // 修改文章
    async changeArticle (row) {
      this.childform = JSON.parse(JSON.stringify(row))
      this.isShowArticlleAdd = true
    },
    // 删除文章
    delArticle (row) {
      this.$confirm('确定要删除该文章吗?', '提示').then(async () => {
        await remove(row)
        this.$message.success('删除成功')
        // 为了在删除最后一页的最后一条数据时能成功跳转回最后一页的上一页
        const totalPage = Math.ceil((this.total - 1) / this.pages.pagesize) // 总页数
        this.pages.page = this.pages.page > totalPage ? totalPage : this.pages.page
        this.pages.page = this.pages.page < 1 ? 1 : this.pages.page
        this.getArticleList()
      }).catch(() => { })
    },
    // 时间格式化
    dateFormat: function (row) {
      var t = new Date(row.createTime)// row 表示一行数据, createTime 表示要格式化的字段名称
      if (!t) {
        return ''
      }
      const year = t.getFullYear()
      const month = this.dateIfAddZero(t.getMonth() + 1)
      const day = this.dateIfAddZero(t.getDate())
      const hours = this.dateIfAddZero(t.getHours())
      const minutes = this.dateIfAddZero(t.getMinutes())
      const seconds = this.dateIfAddZero(t.getSeconds())
      return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds
    },
    dateIfAddZero: function (time) {
      return time < 10 ? '0' + time : time
    }
  }
}
</script>

<style scoped lang='scss'>
// 视频遮罩层
.mask {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9999;
}
// 视频容器
.article-container {
  min-height: 100vh;
}
.movie-container {
  z-index: 99999;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 800px;
  height: 600px;
  transform: translate(-50%, -50%);
  text-align: center;
  line-height: 800px;
  // 关闭视频按钮
  .movie-close {
    position: absolute;
    top: -100px;
    left: 50%;
    transform: translate(-50%);
    text-align: center;
    width: 50px;
    height: 50px;
    line-height: 50px;
    font-size: 30px;
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 50%;
    cursor: pointer;
    color: #fff;
    &:hover {
      color: #0aaefa;
    }
  }
  // 视频标签
  .movies {
    width: 800px;
    height: 400px;
  }
}
// 视频图标
#movie {
  cursor: pointer;
  color: #0065ff;
}
// 头部布局 ==> 表单, 按钮
#header-setting {
  padding-left: 35px;
  display: flex;
  justify-content: space-between;
  // 表单按钮
  .form-btn {
    display: inline-block;
    margin-top: 1px;
  }
}
// 个人信息
.el-icon-info {
  padding: 0 10px !important;
}
// 总数
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #f4f4f5;
  height: 30px;
}

.grid-content {
  border-radius: 4px;
  font-size: 13px;
  line-height: 30px;
  color: #909399;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
