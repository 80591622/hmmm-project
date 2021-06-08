<template>
  <div class="question-container">
    <el-card class="box-card">
      <!-- 头部 -->
      <div class="head-btn">
        <span style="font-size: 12px; color: pink">
          说明：目前支持学科和关键字条件筛选
        </span>
        <el-button type="success" size="small" @click="writeNew">
          <i class="el-icon-edit"></i>
          <span>新增试题</span>
        </el-button>
      </div>
      <!-- 表单 -->
      <el-form class="question-form" :model="questionsList" ref="niceFrom">
        <el-row class="question-row" :gutter="24">
          <!-- 学科 -->
          <el-col :span="6">
            <div class="grid-content">
              <el-form-item label="学科目录" style="margin-bottom: 18px">
                <el-select
                  placeholder="请选择学科"
                  style="width: 80%"
                  v-model="questionsList.subjectID"
                >
                  <el-option
                    :label="item.subjectName"
                    :value="item.id"
                    v-for="item in subjectsList.items"
                    :key="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
          <!-- 二级目录 -->
          <el-col :span="6">
            <div class="grid-content">
              <el-form-item label="二级目录" style="margin-bottom: 18px">
                <el-select
                  placeholder="请选择目录"
                  v-model="questionsList.catalogID"
                  style="width: 80%"
                >
                  <el-option
                    v-show="showSelect"
                    :label="item.directoryName"
                    :value="item.id"
                    v-for="item in directorysList.items"
                    :key="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
          <!-- 标签 -->
          <el-col :span="6">
            <div class="grid-content">
              <el-form-item label="标签" style="margin-bottom: 18px">
                <el-select
                  placeholder="请选择"
                  v-model="questionsList.tags"
                  style="width: 80%"
                >
                  <el-option
                    v-show="showSelect"
                    :label="item.tagName"
                    :value="item.id"
                    v-for="item in tagsList.items"
                    :key="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
          <!-- 关键字 -->
          <el-col :span="6">
            <div class="grid-content">
              <el-form-item label="关键字" style="margin-bottom: 18px">
                <el-input
                  type="text"
                  placeholder="根据题干搜索"
                  style="width: 80%"
                  v-model="questionsList.keyword"
                ></el-input>
              </el-form-item>
            </div>
          </el-col>
          <!-- 试题类型 -->
          <el-col :span="6">
            <div class="grid-content">
              <el-form-item label="试题类型" style="margin-bottom: 18px">
                <el-select
                  placeholder="请选择"
                  v-model="questionsList.questionType"
                  style="width: 80%"
                >
                  <el-option
                    :label="item.label"
                    :value="item.label"
                    v-for="item in questionType"
                    :key="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
          <!-- 难度等级 -->
          <el-col :span="6">
            <div class="grid-content">
              <el-form-item label="难度等级" style="margin-bottom: 18px">
                <el-select
                  placeholder="请选择"
                  v-model="questionsList.difficulty"
                  style="width: 80%"
                >
                  <el-option
                    :label="item.label"
                    :value="item.label"
                    v-for="item in difficulty"
                    :key="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
          <!-- 方向 -->
          <el-col :span="6">
            <div class="grid-content">
              <el-form-item label="方向" style="margin-bottom: 18px">
                <el-select
                  placeholder="请选择"
                  v-model="questionsList.direction"
                  style="width: 80%"
                >
                  <el-option
                    :label="item"
                    :value="item"
                    v-for="(item, index) in qsConstants"
                    :key="index"
                  ></el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
          <!-- 录入人 -->
          <el-col :span="6">
            <div class="grid-content">
              <el-form-item label="录入人" style="margin-bottom: 18px">
                <el-select
                  placeholder="请选择"
                  v-model="questionsList.creatorID"
                  style="width: 80%"
                >
                  <el-option
                    :label="item.username"
                    :value="item.id"
                    v-for="item in userList.list"
                    :key="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
          <!-- 题目备注 -->
          <el-col :span="6">
            <div class="grid-content">
              <el-form-item label="题目备注" style="margin-bottom: 18px">
                <el-input
                  v-model="questionsList.remarks"
                  style="width: 80%"
                ></el-input>
              </el-form-item>
            </div>
          </el-col>
          <!-- 企业简称 -->
          <el-col :span="6">
            <div class="grid-content">
              <el-form-item label="企业简称" style="margin-bottom: 18px">
                <el-input
                  v-model="questionsList.shortName"
                  style="width: 80%"
                ></el-input>
              </el-form-item>
            </div>
          </el-col>
          <!-- 城市 -->
          <el-col :span="6">
            <div class="grid-content">
              <el-form-item label="城市" style="margin-bottom: 18px">
                <!-- 选择城市 -->
                <el-select
                  placeholder="请选择"
                  v-model="questionsList.province"
                  style="width: 40%"
                  @change="getArea"
                >
                  <el-option
                    :label="item"
                    :value="item"
                    v-for="(item, index) in cityList"
                    :key="index"
                  ></el-option>
                </el-select>
                <!-- 选择地区 -->
                <el-select
                  placeholder="请选择"
                  v-model="questionsList.city"
                  style="width: 40%"
                >
                  <el-option
                    :label="item"
                    :value="item"
                    v-for="(item, index) in areaList"
                    :key="index"
                  ></el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
          <!-- 按钮 -->
          <el-col :span="6">
            <div class="grid-content">
              <el-form-item style="margin-left: 240px">
                <el-button @click="clearForm">清除</el-button>
                <el-button
                  type="primary"
                  @click="getQuestionsList(questionsList)"
                >
                  搜索
                </el-button>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
      </el-form>
      <!-- 提示栏 -->
      <div class="question-alert" style="margin-bottom: 15px">
        <el-alert
          :title="'数据一共' + counts + '条'"
          type="info"
          show-icon
          :closable="false"
        >
        </el-alert>
      </div>
      <!-- 题目列表 -->
      <div class="question-table">
        <el-table :data="baseList" style="width: 100%">
          <el-table-column prop="number" label="试题编号" width="250">
          </el-table-column>
          <el-table-column prop="subject" label="学科" width="150">
          </el-table-column>
          <el-table-column prop="catalog" label="目录" width="150">
          </el-table-column>
          <el-table-column prop="questionType" label="题型" width="150">
            <template #default="{ row }">{{
              getTypeList(row.questionType)
            }}</template>
          </el-table-column>
          <el-table-column label="题干">
            <!-- 写<template #default={row}>不管用？ -->
            <template slot-scope="scope">
              <div v-html="scope.row.question"></div>
            </template>
          </el-table-column>
          <el-table-column prop="addDate" label="录入时间" width="160">
            {{ formData(baseList.addDate) }}
          </el-table-column>
          <el-table-column prop="difficulty" label="难度" width="150">
            <template #default="{ row }">{{
              getDifficultyList(row.difficulty)
            }}</template>
          </el-table-column>
          <el-table-column prop="creator" label="录入人" width="150">
          </el-table-column>
          <el-table-column label="操作" width="200">
            <template #default="{ row }">
              <el-row>
                <!-- 预览按钮 -->
                <el-button
                  type="primary"
                  icon="el-icon-view"
                  circle
                  size="small"
                  @click="getQuestionPreview(row)"
                ></el-button>
                <!-- 修改按钮 -->
                <el-button
                  type="success"
                  icon="el-icon-edit"
                  circle
                  size="small"
                  @click="$router.push(`/questions/new/?id=${row.id}`)"
                ></el-button>
                <!-- 删除按钮 -->
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  circle
                  size="small"
                  @click="delQuestion(row)"
                ></el-button>
                <!-- 加入精选按钮 -->
                <el-button
                  type="warning"
                  icon="el-icon-check"
                  circle
                  size="small"
                  @click="addNiceQuestion(row)"
                ></el-button>
              </el-row>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 分页 -->
      <div
        class="question-pagination"
        style="text-align: right; margin-top: 20px"
      >
        <el-pagination
          background
          layout="prev, pager, next,sizes, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pages.page"
          :page-sizes="[5, 10, 20, 50]"
          :page-size="pages.pagesize"
          :total="counts"
        >
        </el-pagination>
      </div>
    </el-card>
    <!-- 预览弹框 -->
    <el-dialog
      title="题目预览"
      :visible.sync="dialogVisible"
      width="50%"
      @close="closeVideo"
    >
      <span>
        <el-row class="preview-row">
          <el-col :span="6" class="preview-col">
            <div>【题型】:{{ detailsList.questionType }}</div>
          </el-col>
          <el-col :span="6" class="preview-col">
            <div>【编号】:{{ detailsList.id }}</div>
          </el-col>
          <el-col :span="6" class="preview-col">
            <div>【难度】:{{ detailsList.difficulty }}</div>
          </el-col>
          <el-col :span="6" class="preview-col">
            <div>【标签】:{{ detailsList.tags }}</div>
          </el-col>
          <el-col :span="6" class="preview-col">
            <div>【学科】:{{ detailsList.subjectName }}</div>
          </el-col>
          <el-col :span="6" class="preview-col">
            <div>【目录】:{{ detailsList.directoryName }}</div>
          </el-col>
          <el-col :span="6" class="preview-col">
            <div>【方向】:{{ detailsList.direction }}</div>
          </el-col>
        </el-row>
        <el-divider class="preview-divider"></el-divider>
        <el-row>
          <el-col>
            <div>【题干】:</div>
            <div v-html="detailsList.question"></div>
          </el-col>
        </el-row>
        <el-divider class="preview-divider"></el-divider>
        <el-row>
          <el-col>
            【参考答案】:
            <el-button type="danger" @click="showVideo">视频答案预览</el-button>
            <video
              :src="detailsList.videoURL"
              v-show="videoShow"
              style="width: 500px; display: block"
              controls
            ></video>
          </el-col>
        </el-row>
        <el-divider class="preview-divider"></el-divider>
        <el-row>
          <el-col>
            【答案解析】:
            <span v-html="detailsList.answer"> </span>
          </el-col>
        </el-row>
        <el-divider class="preview-divider"></el-divider>
        <el-row>
          <el-col>【题目备注】: {{ detailsList.remarks }}</el-col>
        </el-row>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">
          关闭
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// 题库列表api
import { list as qslist, remove, choiceAdd, detail } from '../../api/hmmm/questions.js'
// 学课列表api
import Subject from '../../api/hmmm/subjects.js'
// 人员列表api
import { list as uslist } from '../../api/base/users.js'
// 目录列表api
import { list as dirlist } from '../../api/hmmm/directorys.js'
// 题目方向,难度，题型
import { direction, difficulty, questionType } from '../../api/hmmm/constants.js'
// 标签列表
import { list as taglist } from '../../api/hmmm/tags.js'
// 城市列表
import { provinces, citys } from '../../api/hmmm/citys.js'
// dayjs
import dayjs from 'dayjs'
export default {
  data () {
    return {
      showSelect: true,
      difficulty: difficulty,
      questionType: questionType,
      // 视频是否显示
      videoShow: false,
      // 弹框是否显示
      dialogVisible: false,
      // 基础题库请求参数
      pages: {
        page: 1,
        pagesize: 10
      },
      // 表单数据
      questionsList: {
        questionsType: '', // 题目类型
        subjectID: '', // 学科
        catalogID: '', // 二级目录
        tags: '', // 标签
        difficulty: '', // 难度
        direction: '', // 方向
        creatorID: '', // 录入人
        remarks: '', // 题目备注
        shortName: '', // 企业名称
        province: '', // 城市
        city: '', // 地区
        keyword: '' // 关键字
      },
      // 题目总数
      counts: 0,
      // 题目详情
      detailsList: {},
      // 题目方向
      qsConstants: [],
      // 基础题库
      baseList: [],
      // 学课列表
      subjectsList: {},
      // 目录列表
      directorysList: {},
      // 标签列表
      tagsList: {},
      // 录入人列表
      userList: {},
      // 城市列表
      cityList: {},
      // 地区列表
      areaList: {},
      // 城市名字
      cityName: '',
      // 题目难度
      difficultyList: {},
      // 题目类型
      typeList: {},
      // 获取目录和标签的参数对象
      directorysType: {
        subjectID: '',
        state: 1
      }
    }
  },
  created () {
    this.getQuestionsList()
    this.getSubjectsList()
    this.getUserList()
    this.getCityList()
    this.getQsConstantsList()
    this.getDifficultyList()
    this.getTypeList()
  },
  watch: {
    // 监听学课是否选择
    'questionsList.subjectID' (value) {
      this.directorysType.subjectID = value
      // 调用获取目录、标签列表方法
      this.getDirectorysList()
      this.getTagsList()
    }
  },
  methods: {
    // 如果没有地址不显示video组件
    showVideo () {
      if (this.detailsList.videoURL !== '') {
        this.videoShow = true
      }
    },
    // 清除form表单
    clearForm () {
      // this.$nextTick(console.log(this.$refs.niceFrom))
      this.questionsList = {
        questionsType: '', // 题目类型
        subjectID: '', // 学科
        catalogID: '', // 二级目录
        tags: '', // 标签
        difficulty: '', // 难度
        direction: '', // 方向
        creatorID: '', // 录入人
        remarks: '', // 题目备注
        shortName: '', // 企业名称
        province: '', // 城市
        city: '', // 地区
        keyword: '' // 关键字
      }
      this.showSelect = false

      // this.questionsList = {}
    },
    // 获取题目方向列表
    getQsConstantsList () {
      this.qsConstants = direction
      // console.log('题目方向', this.qsConstants)
    },
    // 获取城市列表
    async getCityList () {
      this.cityList = await provinces()
      // console.log('这里是城市', this.cityList)
    },
    // 获取选中城市名字
    getArea (value) {
      this.cityName = value
      this.getAreaList()
    },
    // 获取地区列表
    async getAreaList () {
      this.areaList = await citys(this.cityName)
      // console.log('这里是地区', this.areaList)
    },
    // 获取题目难度
    getDifficultyList (val) {
      const map = {}
      difficulty.forEach(
        item => {
          map[item.value] = item.label
        }
      )
      return map[val]
      // console.log('这里是难度', this.difficultyList)
    },
    // 获取题目类型
    getTypeList (val) {
      const maps = {}
      questionType.forEach(
        item => {
          maps[item.value] = item.label
        }
      )
      return maps[val]
      // console.log('这里是题目类型', this.typeList)
    },
    // 获取目录列表
    async getDirectorysList () {
      this.showSelect = true
      const dirData = await dirlist(this.directorysType)
      this.directorysList = dirData.data
      console.log('这里是目录：', this.directorysList)
    },
    // 获取标签列表
    async getTagsList () {
      this.showSelect = true
      const tagData = await taglist(this.directorysType)
      this.tagsList = tagData.data
      // console.log('这里是目录：', this.tagsList)
    },
    // 添加题目进精选题库
    addNiceQuestion (val) {
      this.$confirm('是否将题目加入精选题库？', '提示', { type: 'info' }).then(
        async () => {
          await choiceAdd({ ...val, choiceState: 1 })
          this.$message.success('加入精选题库成功')
          this.$router.push('choice')
        }
      ).catch(
        () => { })
    },
    // 预览题目，获取题目详情
    async getQuestionPreview (val) {
      // 弹框打开
      this.dialogVisible = true
      // 获取数据
      const { data } = await detail(val)
      this.detailsList = data
      // console.log('这里是点击题目的详情：', this.detailsList)
    },
    // 每页条数
    handleCurrentChange (val) {
      // console.log(val)
      this.pages.page = val
      this.getQuestionsList()
    },
    // 当前页
    handleSizeChange (val) {
      // console.log(val)
      this.pages.pagesize = val
      this.getQuestionsList()
    },
    // 获取基础题库信息
    async getQuestionsList (val) {
      const arr = Object.values(this.questionsList)
      let dataObj = {}
      if (arr.every(item => item === '')) {
        // 获取全部
        dataObj = { ...this.pages }
      } else {
        // 搜索
        dataObj = { ...this.pages, ...val }
      }

      // console.log(Object.values(val))
      if (val) { this.pages.page = 1 }

      const { data } = await qslist(dataObj)
      // console.log('这是基础题库', data)
      this.counts = data.counts
      this.baseList = data.items
      console.log('基础题库信息：', data)
    },
    // 时间格式化
    formData (val) {
      return dayjs(val).format('YYYY-MM-DD HH:mm:ss')
    },
    // 获取录入人列表信息
    async getUserList () {
      const newData = await uslist()
      this.userList = newData.data
      // console.log('录入人：', this.userList)
    },
    // 获取学科列表信息
    async getSubjectsList () {
      const newData = await Subject.list({ page: 1, pagesize: 999 })
      this.subjectsList = newData.data
      // console.log('学科列表数据：', this.subjectsList)
    },
    // ---删除题目
    delQuestion (val) {
      this.$confirm('确定要移除本题吗？', '提示', { type: 'warning' }).then(
        async () => {
          // console.log('这是id', val)
          await remove(val)
          this.$message.success('删除成功')
          // console.log('删除成功')
          // 解决删除带来的页码问题
          const newTotal = Math.ceil((this.total - 1) / this.pages.pagesize)
          if (newTotal > 0) {
            this.pages.page = this.pages.page > newTotal ? newTotal : this.pages.page
          }
          this.getQuestionsList()
        }
      ).catch(console.log)
    },
    // 录入试题跳转
    writeNew () {
      this.$router.push('new')
    },
    // 弹框关闭视频关闭
    closeVideo () {
      this.videoShow = false
    }
  }
}
</script>

<style scoped lang='scss'>
.question-container {
  padding: 0 10px;
  margin: 10px 0;
}
.head-btn {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
}
.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
  .el-col {
    border-radius: 4px;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .preview-col {
    padding: 10px 0;
    font-size: 14px;
  }
}
.preview-divider {
  margin: 7px 0;
}
</style>
