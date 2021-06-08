<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card shadow="never">
        <!-- 筛选区域 -->
        <div class="choice">
          <div slot="header" class="clearfix" style="margin-bottom:15px">
            <span style="font-size:10px;color:pink;">说明: 目前支持学科和关键字条件筛选</span>
            <el-button class="add" icon="el-icon-edit" type="success" @click="$router.push('/questions/new')">
              新增试题
            </el-button>
          </div>
          <!-- 表单区域 输入框 -->
          <el-form ref="form" :model="formData" label-width="70px" >
            <el-row :gutter="24">
              <el-col :span="6">
                <el-form-item label="学科">
                  <el-select v-model="formData.subjectID" placeholder="请选择">
                    <el-option
                      v-for="item in formInline"
                      :key="item.id"
                      :label="item.subjectName"
                      :value="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="二级目录">
                  <el-select v-model="formData.twoLevelDirectory" placeholder="请选择">
                    <el-option
                      v-for="item in directoryList"
                      :key="item.id"
                      :label="item.directoryName"
                      :value="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="标签">
                  <el-select v-model="formData.tags" placeholder="请选择">
                    <el-option
                      v-for="item in tagsList"
                      :key="item.id"
                      :label="item.label"
                      :value="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="关键字">
                  <el-input v-model="formData.keyword" placeholder="根据题干搜索"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="24">
              <el-col :span="6">
                <el-form-item label="试题类型">
                  <el-select v-model="formData.questionType" placeholder="请选择">
                    <el-option v-for="item in questionType" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="难度">
                  <el-select v-model="formData.difficulty" placeholder="请选择">
                    <el-option v-for="item in difficulty" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="方向">
                  <el-select v-model="formData.direction" placeholder="请选择">
                    <el-option v-for="item in direction" :key="item" :label="item" :value="item"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="录入人">
                  <el-select v-model="formData.creatorID" placeholder="请选择">
                    <el-option
                      v-for="item in userList"
                      :key="item.id"
                      :label="item.username"
                      :value="item.username"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="24">
              <el-col :span="6">
                <el-form-item label="题目备注">
                  <el-input v-model="formData.remarks"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="企业简称">
                  <el-input v-model="formData.shortName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="城市">
                  <el-select v-model="formData.province" placeholder="请选择" style="width:50%">
                    <el-option v-for="item in provincesList" :key="item" :label="item" :value="item"></el-option>
                  </el-select>
                  <el-select v-model="formData.city" placeholder="请选择" style="width:50%">
                    <el-option v-for="item in citysList" :key="item" :label="item" :value="item"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item>
                  <el-button @click="onCancel">清除</el-button>
                  <el-button type="primary" @click="onSubmit">搜索</el-button>
                </el-form-item>
              </el-col>
            </el-row>

          </el-form>
        </div>
        <!-- 列表区域 -->
        <div class="table">
          <!-- 标签 -->
          <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="全部" name="first"></el-tab-pane>
            <el-tab-pane label="待审核" name="second"></el-tab-pane>
            <el-tab-pane label="已审核" name="third"></el-tab-pane>
            <el-tab-pane label="已拒绝" name="fourth"></el-tab-pane>
          </el-tabs>
          <!-- 消息提示 -->
          <el-alert
            :title="'数据一共' + total + '条'"
            type="info"
            show-icon
            :closable="false"
            style="margin-bottom:15px">
          </el-alert>
          <!-- 列表 -->
          <el-table
            :data="tableList"
            border
            style="width: 100%">
            <el-table-column
              prop="number"
              label="试题编号"
              width="150">
            </el-table-column>
            <el-table-column
              prop="subject"
              label="学科"
              width="120">
            </el-table-column>
            <el-table-column
              prop="catalog"
              label="目录"
              width="120">
            </el-table-column>
            <el-table-column
              prop="questionType"
              label="题型"
              width="120">
              <template #default="{row}">
                {{questionTypeFormat(row.questionType)}}
              </template>
            </el-table-column>
            <el-table-column
              prop="question"
              label="题干"
              width="300">
              <template #default="{row}">
                <div v-html="row.question"></div>
              </template>
            </el-table-column>
            <el-table-column
              prop="addDate"
              label="录入时间"
              width="120">
            </el-table-column>
            <el-table-column
              prop="difficulty"
              label="难度"
              width="120">
              <template #default="{row}">
                <div>{{difFormat(row.difficulty)}}</div>
              </template>
            </el-table-column>
            <el-table-column
              prop="creatorID"
              label="录入人"
              width="120">
            </el-table-column>
            <el-table-column
              prop="chkState"
              label="审核状态"
              width="120"
              v-model="tableList.chkState"
            >
              <template #default="{row}">
                <div>{{chkFormat(row.chkState)}}</div>
              </template>
            </el-table-column>
            <el-table-column
              prop="chkRemarks"
              label="审核意见"
              width="120">
            </el-table-column>
            <el-table-column
              prop="chkUser"
              label="审核人"
              width="120">
            </el-table-column>
            <el-table-column
              prop="publishState"
              label="发布状态"
              width="120"
              v-model="tableList.publishState"
            >
              <template #default="{row}">
                <div>{{publishStateFormat(row)}}</div>
              </template>
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="200">
              <template #default='{row}'>
                <el-button
                  @click="lookBefore(row)"
                  type="text"
                  size="small"
                >
                  预览
                </el-button>
                <el-button
                  @click="checkQuestion(row)"
                  type="text"
                  size="small"
                  :disabled="row.chkState === 1 || row.chkState === 2"
                >
                  审核
                </el-button>
                <el-button
                  @click="editQuestion(row.id)"
                  type="text"
                  size="small"
                  :disabled="row.publishState === 1"
                >
                  修改
                </el-button>
                <el-button @click="publishState(row)" type="text" size="small">
                  {{row.publishState === 1?'下架':'上架'}}
                </el-button>
                <el-button
                  @click="deleteQuestion(row)"
                  type="text"
                  size="small"
                  :disabled="row.publishState === 1"
                >
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页 -->
          <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pages.page"
            :page-sizes="[2, 5, 10, 20, 50]"
            :page-size="pages.pagesize"
            layout="prev, pager, next, sizes, jumper"
            :total="total"
          >
          </el-pagination>
        </div>
      </el-card>
    </div>

    <!-- 弹窗  预览 -->
      <QuestionsPreview ref="Qpreview" :dialogPreview.sync="dialogPreview"/>
    <!-- 弹窗  审核 -->
      <QuestionsCheck
      ref="Qcheck"
      :dialogCheck.sync="dialogCheck"
      :pages.sync="pages"
      :total.sync="total"
      :tableList.sync="tableList"
      :activeName.sync="activeName"
    />
  </div>
</template>

<script>
import { choice, choicePublish, remove } from '@/api/hmmm/questions'
import Subject from '@/api/hmmm/subjects'
import QuestionsPreview from '../components/questions-preview'
import QuestionsCheck from '../components/questions-check'
import { questionType, difficulty, direction } from '@/api/hmmm/constants'
import { provinces, citys } from '@/api/hmmm/citys'
import { list as userListAPI } from '@/api/base/users'
import { list as directoryListAPI } from '@/api/hmmm/directorys'
import { simple as tagsListAPI } from '@/api/hmmm/tags'

export default {
  components: {
    QuestionsPreview,
    QuestionsCheck
  },
  name: 'QuestionsChoice',
  data () {
    return {
      flag: false,
      // 分页数据
      total: 0,
      pages: {
        page: 1,
        pagesize: Number(localStorage.getItem('page')) || 5
      },
      // 表单数据
      formData: {
        subjectID: '', // 学科
        difficulty: '', // 难度
        questionType: '', // 试题类型
        tags: '', // 标签
        province: '', // 省份
        city: '', // 城市
        keyword: '', // 关键字
        remarks: '', // 题目备注
        shortName: '', // 企业简称
        direction: '', // 方向
        creatorID: '', // 录入人
        catalogID: '', // 目录
        chkState: '' // 审核状态 0待审核 1通过 2拒绝
      },
      // 提交参数数组
      subFormData: {

      },
      // 获取来的学科列表 渲染下拉框用
      formInline: [],
      // 获取用户列表 渲染录入人下拉框
      userList: [],
      // 根据学科ID 获取二级目录列表
      directoryList: [],
      // 根据学科ID 获取标签列表
      tagsList: [],
      // 标签页
      activeName: 'first',
      // table 数据
      tableList: [],
      // 预览弹窗
      dialogPreview: false,
      // 审核弹窗
      dialogCheck: false,
      // 试题类型
      questionType,
      // 难度
      difficulty,
      // 方向
      direction,
      // 城市
      provincesList: [],
      // 地区
      citysList: []
    }
  },
  created () {
    this.getChoiceList()
    this.provincesF()
    this.getSubjectsList()
    this.getUserList()
  },
  watch: {
    'formData.province' (newValue, oldValue) {
      this.citysF(newValue)
    },
    'formData.subjectID' (newValue, oldValue) {
      this.directoryF(newValue)
      this.tagsF(newValue)
    }
  },
  methods: {
    handleSizeChange (val) {
      // console.log(`每页 ${val} 条`)
      this.pages.pagesize = val
      this.getChoiceList()
      localStorage.setItem('page', val)
    },
    handleCurrentChange (val) {
      // console.log(`当前页: ${val}`)
      this.pages.page = val
      this.getChoiceList()
    },
    // 获取精选题库列表
    async getChoiceList () {
      const { data } = await choice({ ...this.pages })
      console.log('精选列表', data)
      this.total = data.counts
      this.tableList = data.items
      // console.table('精选题库列表:', this.tableList)
    },
    // 获取学科列表 渲染筛选区域
    async getSubjectsList () {
      const res = await Subject.list({ page: 1, pagesize: 9999 })
      this.formInline = res.data.items
      // console.table('学科列表:', this.formInline)
    },
    // 获取用户列表 渲染筛选区域(data: page, pagesize, keyword)
    async getUserList () {
      const { data } = await userListAPI()
      // console.log('录入人：', data)
      this.userList = data.list
      // console.log('录入人：', this.userList)
    },
    // 城市 渲染筛选区域
    async provincesF () {
      const res = await provinces()
      // console.log(res)
      this.provincesList = res
    },
    // 地区 渲染筛选区域
    citysF (city) {
      const res = citys(city)
      // console.log(res)
      this.citysList = res
    },
    // 根据学科ID 获取二级目录列表 渲染
    async directoryF (id) {
      // 用学科名称获取学科ID
      // const { value } = await simple(id)
      // console.log('学科ID', id)
      // 用学科ID获取目录列表
      const res = await directoryListAPI({ subjectID: id })
      // console.log('目录：', res)
      this.directoryList = res.data.items
      // console.log(this.directoryList)
    },
    // 根据学科ID 获取标签列表 渲染
    async tagsF (id) {
      const res = await tagsListAPI({ subjectID: id })
      // console.log('标签', res)
      this.tagsList = res.data
    },
    // 清除按钮事件
    onCancel () {
      this.formData = {
        subjectName: '', // 学科
        difficulty: '', // 难度
        questionType: '', // 试题类型
        tags: '', // 标签
        province: '', // 省份
        city: '', // 城市
        keyword: '', // 关键字
        remarks: '', // 题目备注
        shortName: '', // 企业简称
        direction: '', // 方向
        creatorID: '', // 录入人
        catalogID: '', // 目录
        chkState: '' // 审核状态 0待审核 1通过 2拒绝
      }
    },
    // 表单提交事件
    async onSubmit () {
      if (this.formData.subjectID === '' && this.formData.keyword === '') {

      } else if (this.formData.keyword === '') {
        const { data } = await choice({ subjectID: this.formData.subjectID, page: this.pages.page, pagesize: this.pages.pagesize })
        // console.log('精选列表', data)
        this.total = data.counts
        this.tableList = data.items
      } else if (this.formData.subjectID === '') {
        const { data } = await choice({ keyword: this.formData.keyword, page: this.pages.page, pagesize: this.pages.pagesize })
        // console.log('精选列表', data)
        this.total = data.counts
        this.tableList = data.items
      } else {
        const { data } = await choice({ keyword: this.formData.keyword, subjectID: this.formData.subjectID, page: this.pages.page, pagesize: this.pages.pagesize })
        // console.log('精选列表', data)
        this.total = data.counts
        this.tableList = data.items
      }
    },
    // 标签点击切换事件
    async handleClick (tab, event) {
      // console.log(tab.label, event)
      if (tab.label === '全部') {
        this.formData.chkState = ''
        this.getChoiceList()
      } else if (tab.label === '待审核') {
        this.formData.chkState = 0
        this.pages.page = 1
        const { data } = await choice({ page: this.pages.page, pagesize: this.pages.pagesize, chkState: this.formData.chkState })
        this.total = data.counts
        this.tableList = data.items
      } else if (tab.label === '已审核') {
        this.formData.chkState = 1
        this.pages.page = 1
        const { data } = await choice({ page: this.pages.page, pagesize: this.pages.pagesize, chkState: this.formData.chkState })
        this.total = data.counts
        this.tableList = data.items
      } else if (tab.label === '已拒绝') {
        this.formData.chkState = 2
        this.pages.page = 1
        const { data } = await choice({ page: this.pages.page, pagesize: this.pages.pagesize, chkState: this.formData.chkState })
        this.total = data.counts
        this.tableList = data.items
      }
    },
    // 预览
    lookBefore (id) {
      try {
        this.dialogPreview = true
        this.$refs.Qpreview.getQuestionDetail(id)
      } catch {
        this.$message('数据已失效！')
      }
    },
    // 审核
    async checkQuestion (row) {
      this.dialogCheck = true
      this.$refs.Qcheck.handleClose(row)
      // 刷新列表

      // if (this.formData.chkState === 0) {
      //   const { data } = await choice({ page: this.pages.page, pagesize: this.pages.pagesize, chkState: 0 })
      //   this.total = data.counts
      //   this.tableList = data.items
      // } else if (this.formData.chkState === 1) {
      //   const { data } = await choice({ page: this.pages.page, pagesize: this.pages.pagesize, chkState: 1 })
      //   this.total = data.counts
      //   this.tableList = data.items
      // } else if (this.formData.chkState === 2) {
      //   const { data } = await choice({ page: this.pages.page, pagesize: this.pages.pagesize, chkState: 2 })
      //   this.total = data.counts
      //   this.tableList = data.items
      // }
    },
    // 修改
    editQuestion (id) {
      this.$router.push('/questions/new?id=' + `${id}`)
    },
    // 上架下架
    publishState (row) {
      // console.log(row.publishState)
      // 如果tableList.publishState === 1，目前处于上架状态，点击后询问是否下架，然后将1改成0
      const q = row.publishState === 1 ? '下架' : '上架'
      // if (row.publishState === 1) {
      this.$confirm(`您确认${q}这道题目吗?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        if (row.publishState === 1) {
          row.publishState = 0
        } else {
          row.publishState = 1
        }
        await choicePublish({ id: row.id, publishState: row.publishState })
        this.$message({
          type: 'success',
          message: `${q}成功！`
        })
      }).catch(() => {
        this.$message({
          type: 'success',
          message: '已取消'
        })
      })
    },
    // 删除
    deleteQuestion (row) {
      this.$confirm('此操作将永久删除该题目，是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // 点击确认按钮后 调用删除接口 刷新列表
        await remove(row)
        this.$message({
          type: 'success',
          message: '删除成功！'
        })
        const newPage = Math.ceil((this.total - 1) / this.pages.pagesize)
        if (newPage > 0) {
          this.pages.page = this.pages.page > newPage ? newPage : this.pages.page
        }
        // 刷新
        if (this.formData.chkState === '') {
          const { data } = await choice({ ...this.pages })
          // console.log(111)
          this.total = data.counts
          this.tableList = data.items
        } else {
          const { data } = await choice({ page: this.pages.page, pagesize: this.pages.pagesize, chkState: this.formData.chkState })
          // console.log(222)
          this.total = data.counts
          this.tableList = data.items
        }
      }).catch(() => {
        // 点击取消按钮后
        this.$message({
          type: 'success',
          message: '已取消'
        })
      })
    },
    // 格式化难度
    difFormat (code) {
      if (code === '1') {
        return '简单'
      } else if (code === '2') {
        return '中等'
      } else {
        return '困难'
      }
    },
    // 格式化审核状态
    chkFormat (code) {
      if (code === 0) {
        return '待审核'
      } else if (code === 1) {
        return '通过'
      } else {
        return '拒绝'
      }
    },
    // 格式化题型
    questionTypeFormat (code) {
      if (code === '1') {
        return '单选题'
      } else if (code === '2') {
        return '多选题'
      } else {
        return '简答题'
      }
    },
    // 格式化发布状态
    publishStateFormat (row) {
      // 判断是已通过审核
      if (row.chkState === 1) {
        // 再判断上下架 0下架 已发布     1上架 已下架
        if (row.publishState === 0) {
          return '已下架'
        } else {
          return '已发布'
        }
      } else {
        // 已拒绝或者待审核 审核状态
        return '待发布'
      }
    }
  }
}
</script>

<style scoped lang='scss'>
.add{
  float: right;
  padding: 8px 10px;
  font-size:10px;
}
.el-form-item{
  .el-select{
    width: 100%;
  }
}
.el-pagination{
  display: inline-block;
  position: relative;
  top: 10px;
  left: 100%;
  transform: translateX(-100%);
}
</style>
