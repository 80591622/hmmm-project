<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card shadow="never">
        <div>
          <el-row>
            <el-col>
              <!-- 面包屑 -->
              <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item>学科管理</el-breadcrumb-item>
                <el-breadcrumb-item>{{
                  this.$route.query.subjectName
                }}</el-breadcrumb-item>
                <el-breadcrumb-item>目录管理</el-breadcrumb-item>
              </el-breadcrumb>
            </el-col>
          </el-row>
          <div>
            <el-divider></el-divider>
          </div>
          <!-- 搜索框 -->
          <div class="box">
            <el-form :model="formData" :inline="true" class="demo-form-inline">
              <el-form-item label="目录名称">
                <el-input v-model="formData.directoryName"></el-input>
              </el-form-item>
              <el-form-item label="状态">
                <el-select v-model="formData.state">
                  <el-option label="已禁用" value="1"></el-option>
                  <el-option label="已启用" value="0"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button @click="clear">清除</el-button>
                <el-button type="primary" @click="imputSearch">搜索</el-button>
              </el-form-item>
            </el-form>
            <div>
              <!-- <template #default> -->
              <el-button type="text" icon="el-icon-back" @click="jumpSubject"
                >返回学科</el-button
              >
              <el-button type="success" icon="el-icon-edit" @click="isShowDialog = true">新增目录</el-button>
            </div>
          </div>
        </div>
        <!-- 数据统计 -->
        <el-alert type="info" show-icon>数据一共有{{ total }}条</el-alert>
        <!-- 表格组件 -->
        <el-table :data="catalogueData" style="width: 100%">
          <el-table-column type="index" label="序号"> </el-table-column>
          <el-table-column prop="subjectName" label="所属学科">
          </el-table-column>
          <el-table-column prop="directoryName" label="目录名称">
          </el-table-column>
          <el-table-column prop="username" label="创建者"> </el-table-column>
          <el-table-column prop="addDate" label="创建日期">
            <!-- 格式化时间 -->
            <template #default="{ row }">
              {{ formatDate(row.addDate) }}
            </template>
          </el-table-column>
          <el-table-column prop="totals" label="面试题数量"> </el-table-column>
          <el-table-column prop="state" label="状态">
            <template #default="{ row }">
              {{ row.state ? "已禁用" : "已启用" }}
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template #default="{ row }">
              <el-button type="text" size="medium" @click="clickBtn(row)">
                {{ row.state ? "启用" : "禁用" }}
              </el-button>
              <el-button type="text" size="medium" :disabled="row.state === 0" @click.native="editDirectory(row)"
                >修改</el-button
              >
              <el-button type="text" size="medium" :disabled="row.state === 0" @click.native="delDirectory(row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>

        <!-- 分页组件 -->
        <el-pagination
          :page-sizes="[2, 5, 10, 15,20]"
          :current-page="pageSize.page"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          background
          :page-size="pageSize.pagesize"
          layout="prev, pager, next, sizes, jumper"
          :total="total"
        >
        </el-pagination>
      </el-card>
    </div>
    <!-- 弹窗组件 -->
    <el-dialog
      :title="ChildFormData.id?'编辑目录':'新增目录'"
      :visible="isShowDialog"
      width="30%"
      :before-close="handleClose"
    >
      <el-form ref="formRef" :model="ChildFormData" :rules="rules" label-width="80px">
        <el-form-item prop="directoryName" label="标签名称">
            <el-input  v-model="ChildFormData.directoryName"></el-input>
        </el-form-item>
      </el-form>
        <!-- 弹层底部 -->
        <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="addDirectory"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { list, changeState, add, update, remove, detail } from '@/api/hmmm/directorys.js'
import dayjs from 'dayjs'
export default {
  name: 'jumpDirectory',
  data () {
    return {
      // 隐藏关闭弹层
      isShowDialog: false,
      // 搜索数据
      formData: {
        directoryName: '', // 目录名称
        state: '' // 状态
      },
      // 验证字段
      rules: {
        directoryName: [
          {
            required: true,
            min: 1,
            max: 10,
            messages: '最少输入一位,最多输入10位',
            trigger: blur
          }
        ]
      },
      ChildFormData: {
        // 学科ID
        subjectID: '',
        // 目录名称
        directoryName: ''
      },
      // 页码信息
      pageSize: {
        // 页大小
        pagesize: Number(localStorage.getItem('page')) || 10,
        // 当前页码
        page: 1
      },
      total: 0,
      // 数据容器
      catalogueData: []
    }
  },
  created () {
    this.jumpDirectoryData()
  },
  methods: {
    // 跳转学科页
    jumpSubject () {
      this.$router.push({
        path: 'list'
      })
    },
    // 按钮显示隐藏
    async clickBtn (row) {
      // true时是启用 flase时是禁用
      if (!row.state) {
        row.state = 1
      } else {
        row.state = 0
      }
      await changeState({ id: row.id, state: !row.state })
      this.$message.success('操作成功')
    },
    // 分页
    handleSizeChange (val) {
      // console.log(`每页 ${val} 条`)
      this.pageSize.page = 1
      this.pageSize.pagesize = val
      localStorage.setItem('page', val)
      this.jumpDirectoryData()
    },
    // 点击跳转当前页
    handleCurrentChange (newPage) {
      this.pageSize.page = newPage
      // console.log('':this.pageSize.page)
      this.jumpDirectoryData()
    },
    // 格式化时间
    formatDate (value, str = 'YYYY-MM-DD HH:MM:ss') {
      return dayjs(value).format(str)
    },
    // 获取跳转目录页数据
    async jumpDirectoryData () {
      if (this.$route.query.id) {
        // 如果下拉框为空值
        // if (!this.formData.state) {
        //   delete this.formData.state
        // }
        this.pageSize.subjectID = this.$route.query.id
        this.dataObj = this.flag ? { ...this.pageSize, ...this.formData } : { ...this.pageSize }

        const { data } = await list(this.dataObj)
        this.total = data.counts // 总数据数
        this.catalogueData = data.items // 渲染数据
      }
    },
    // 点击搜索按钮查询数据
    async imputSearch () {
      // 如果标识 state 下拉表单为空则获取全部数据
      this.flag = this.formData.state === '' ? this.flag = false : this.flag = true
      // 点击搜索跳转第一页再搜索数据
      this.pageSize.page = 1
      this.jumpDirectoryData()
    },
    // 清除搜索框的值
    clear () {
      this.formData = {}
    },
    // 关闭弹层的操作
    handleClose () {
      this.isShowDialog = false
      this.ChildFormData = {
        subjectID: '',
        directoryName: ''
      }
    },
    // 新增数据
    addDirectory () {
      this.$refs.formRef.validate(async (isOk) => {
        if (isOk) {
          if (this.$route.query.id) {
            this.ChildFormData.subjectID = Number(this.$route.query.id)
          }
          if (this.ChildFormData.id) {
            // 编辑
            await update(this.ChildFormData)
          } else {
            // 新增
            await add(this.ChildFormData)
          }
          this.$message.success('操作成功')
          this.jumpDirectoryData()
          this.isShowDialog = false
        }
      })
    },
    // 修改目录
    async  editDirectory (row) {
      // console.log(row)
      const { data } = await detail(row)
      // console.log(data)
      this.ChildFormData = data
      this.$nextTick(() => {
        this.isShowDialog = true
      })
    },
    // 删除目录
    delDirectory (row) {
      this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await remove(row)
        this.$message.success('删除成功')
        // 如果当前页没有数据返回首页
        const newTotal = Math.ceil((this.total - 1) / this.pageSize.pagesize)
        // 比方说：newTotal = 8 ，但是this.pages.page = 9 =》需要改为最新的页码
        if (newTotal > 0) {
          this.pageSize.page = this.pageSize.page > newTotal ? newTotal : this.pageSize.page
        }
        this.jumpDirectoryData()
      }).catch(console.log)
    }
  }
}
</script>
<style scoped lang="scss">
.el-alert--info.is-light {
  ::v-deep .el-alert__icon.is-big {
    font-size: 18px;
    width: 20px;
  }
}
.box {
  display: flex;
  justify-content: space-between;
}

.el-table {
  margin-top: 15px;
}
// 分页样式
.el-pagination {
  margin: 15px;
  float: right;
}
</style>
