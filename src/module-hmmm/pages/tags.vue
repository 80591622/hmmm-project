<template>
  <div class="dashboard-container">
    <div v-show="!this.$route.query.id" class="app-container">
      <el-card shadow="never">
        <div class="box">
          <el-form ref="formRef" :model="formData" :inline="true" class="demo-form-inline">
            <el-form-item label="目录名称">
              <el-input v-model="formData.directoryName" ></el-input>
            </el-form-item>
            <el-form-item label="状态">
              <el-select  v-model="formData.state">
                <!-- <el-option
                  v-for="item in types"
                  :key="item.id"
                  :label="item.value"
                  :value="item.id"
                ></el-option> -->
                <el-option label="已禁用" value="1"></el-option>
                <el-option label="已启用" value="0"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button @click="clear">清除</el-button>
              <el-button type="primary" @click="imputSearch">搜索</el-button>
            </el-form-item>
          </el-form>
          <div class="successBtn">
            <el-button type="success" icon="el-icon-edit" @click="addDirectory()">新增目录</el-button>
          </div>
        </div>
        <!-- 数据统计 -->
        <el-alert type="info" :closable="false"  show-icon>数据一共有{{total}}条</el-alert>
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
          <el-table-column prop="creatorID" label="面试题数量">
          </el-table-column>
          <el-table-column prop="state" label="状态">
            <template #default="{ row }">
              {{ row.state?'已禁用':'已启用' }}
            </template>
          </el-table-column>
          <el-table-column  label="操作">
            <template #default="{ row }">
              <el-button type="text" size="medium"  @click="clickBtn(row)">
                {{row.state?'启用':'禁用'}}
              </el-button>
              <el-button type="text"  size="medium" :disabled="row.state ===0"  @click.native="editDirectory(row)" >修改</el-button>
              <el-button type="text" size="medium" :disabled="row.state ===0" @click.native="delDirectory(row)">删除</el-button>
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
    <!-- 弹层组件 -->
    <directorys-add :formData.sync="ChildFormData" :is-show-dialog.sync="isShowDialog" />
    <JumpTag v-show="this.$route.query.id" />
  </div>
</template>

<script>
import JumpTag from '@/module-hmmm/components/jump-tag.vue'
import { list, remove, changeState } from '@/api/hmmm/directorys'
// 导入弹层子组件
import directorysAdd from '@/module-hmmm/components/directorys-add.vue'
// 格式化时间
import dayjs from 'dayjs'

export default {
  name: 'Directorys',
  components: {
    directorysAdd,
    JumpTag
  },
  data () {
    return {
      // 弹层新增数据
      formData: {
        directoryName: '', // 目录名称
        state: '' // 状态
      },
      // 弹层数据
      ChildFormData: {
        // 学科ID
        subjectID: '',
        // 目录名称
        directoryName: ''
      },
      // 是否使用搜索按钮按条件搜索, false代表默认获取全部数据
      flag: false,
      // 隐藏关闭弹层
      isShowDialog: false,
      // 目录列表数据
      catalogueData: [],
      // 页码信息
      pageSize: {
        // 页大小
        pagesize: Number(localStorage.getItem('page')) || 10,
        // 当前页码
        page: 1
      },
      total: 0
    }
  },
  created () {
    this.initCatalogueData()
  },
  methods: {
    // 分页
    handleSizeChange (val) {
      // console.log(`每页 ${val} 条`)
      this.pageSize.page = 1
      this.pageSize.pagesize = val
      localStorage.setItem('page', val)
      this.initCatalogueData()
    },
    // 清空表单值
    clear () {
      this.formData = {}
    },
    // 搜索功能
    async imputSearch () {
      this.flag = this.formData.state === '' ? this.flag = false : this.flag = true
      // 点击搜索跳转第一页再搜索数据
      this.pageSize.page = 1
      this.initCatalogueData()
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
    // 新增目录
    addDirectory () {
      this.isShowDialog = true
    },
    // 修改目录
    editDirectory (row) {
      this.ChildFormData = row
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
        this.initCatalogueData()
      }).catch(console.log)
    },
    // 获取目录列表数据
    async initCatalogueData () {
      // 判断下拉选择搜索框是否为空
      if (!this.formData.state) {
        delete this.formData.state
      }
      this.dataObj = this.flag ? { ...this.pageSize, ...this.formData } : { ...this.pageSize, ...this.formData }
      const { data } = await list(this.dataObj)
      this.total = data.counts // 总数据数
      this.catalogueData = data.items // 渲染数据
    },
    // 点击跳转当前页
    handleCurrentChange (newPage) {
      this.pageSize.page = newPage
      // console.log(this.pageSize.page)
      this.initCatalogueData()
    },
    // 格式化时间
    formatDate (value, str = 'YYYY-MM-DD HH:MM:ss') {
      return dayjs(value).format(str)
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
