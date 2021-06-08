<template>
  <div class="dashboard-container">
    <!-- <div class="app-container"> -->
      <el-card shadow="never">
        <!-- 学科管理 -->
        <el-form :model="form" >
          <!-- <h3>{{form.name}}</h3> -->
          <el-form-item label="学科名称" class="subject">
            <el-input v-model.trim="form.subjectName" style="width: 200px;"></el-input>
            <el-button class='btn' @click="clearInp">清除</el-button>
            <el-button type="primary" @click="search" >搜索</el-button>
            <el-button class="subject-btn" type="success"  icon="el-icon-edit" @click="showDialog=true">新增科目</el-button>
          </el-form-item>
          <el-form-item >
            <!-- <el-input v-model="input" placeholder="请输入内容"></el-input> -->
            <!-- <el-select v-model="form.province">
              <el-option v-for="item in list" :key="item" :label="item" :value="item"></el-option>
              </el-select> -->
            <el-alert
              :title="index.titles"
              type="info"
              :closable="false"
              show-icon>
            </el-alert>
              </el-form-item>
              <el-form-item>
                <!-- 学科列表 -->
                <el-table
                :data="list"
                style="width: 100%">
                <el-table-column
                  fixed
                 type="index"
                  label="序号"
                  width="60">
                </el-table-column>
                <el-table-column
                  prop="subjectName"
                  label="学科名称"
                  width="200">
                </el-table-column>
                <el-table-column
                  prop="username"
                  label="创建者"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="addDate"
                  label="创建日期"
                  width="180">
                  <template #default='{row}'>
                    {{formDate(row.addDate)}}
                  </template>
                </el-table-column>
                <el-table-column
                  prop="isFrontDisplay"
                  label="前台是否显示"
                  width="240">
                </el-table-column>
                <el-table-column
                  prop="twoLevelDirectory"
                  label="二级目录"
                  width="170">
                </el-table-column>
                <el-table-column
                  prop="tags"
                  label="标签"
                  width="150">
                </el-table-column>
                <el-table-column
                  prop="totals"
                  label="题目数量"
                  width="150">
                </el-table-column>
                <el-table-column
                  fixed="right"
                  label="操作"

                  >
                  <template #default="{row}">
                  <!-- <template slot-scope="scope"> -->
                    <el-button
                      type="text"
                      size="small"
                      @click.native.prevent="directorys(row)">
                      学科分类
                    </el-button>
                    <el-button
                      @click.native.prevent="getdetail(row)"
                      type="text"
                      size="small">
                      学科标签
                    </el-button>
                    <el-button
                      type="text"
                      size="small"
                       @click.native.prevent="editor(row)"
                      >
                      修改
                    </el-button>
                    <el-button
                      @click.native.prevent="del(row)"
                      type="text"
                      size="small">
                      删除
                    </el-button>
                  </template>
                  <!-- </template> -->
                </el-table-column>
              </el-table>

              </el-form-item>
        </el-form>
         <!-- 分页 -->
      <el-row
            type="flex"
            justify="center"
            align="middle"
            style="height: 60px"
          >
            <el-pagination
              :total="total"
              :current-page="pages.page"
              :page-size="pages.pagesize"
              :page-sizes="[2,5,10,15,20]"
              layout="total, sizes, prev, pager, next, jumper"
              @current-change="changePage"
              @size-change="sizeChange"
            />
          </el-row>
      </el-card>

    <!-- </div> -->
    <Dialog :show-dialog.sync="showDialog" :pages='pages'  />

    <!-- <el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button> -->
<!-- 编辑学科 -->
      <el-dialog
        title="编辑学科"
        :visible.sync="isShowDialog"
        width="23%"
        :before-close="handleClose">
        <el-form ref="roleForm" :model="roleForm" :rules='rules'>
            <el-form-item label="学科名称" prop="subjectName">
              <el-input v-model="roleForm.subjectName"  class="inputw"></el-input>
            </el-form-item>
            <el-form-item label="是否显示">
              <el-switch v-model="roleForm.isFrontDisplay"></el-switch>
        </el-form-item>
        <el-form-item class="btn2">
          <!-- <span slot="footer" class="dialog-footer"> -->
          <el-button @click="showDialog=false">取 消</el-button>
          <el-button type="primary" @click="onSubmit">确 定</el-button>
        <!-- </span> -->
        </el-form-item>
        </el-form>
      </el-dialog>

  </div>

</template>

<script>

import Subject from '@/api/hmmm/subjects.js'
// import { update } from '@/api/hmmm/subjects.js'

// import { list as getList, detail, update, remove } from '@/api/hmmm/subjects.js'

import * as dayjs from 'dayjs'
// import { detail } from '@/api/hmmm/tags.js'
import Dialog from '@/module-hmmm/components/subjects-add.vue'

export default {
  components: {
    Dialog
  },
  data () {
    return {
      // 学科列表
      list: [], // 从接口处取回
      // 数据条数
      index: {
        title: '数据一共',
        num: '条',
        // 显示的数据条数文字
        titles: ''
      },
      form: {
        subjectName: ''
        // province: '潜江' // 从接口处取回
      },
      // 添加学科弹窗
      showDialog: false,
      // 编辑
      isShowDialog: false,
      dialogVisible: false,
      roleForm: {
        subjectName: '',
        isFrontDisplay: false
      },
      rules: {
        subjectName: [{ required: true, message: '角色名称不能为空', trigger: 'blur' }]
      },
      // 分页数据
      pages: {
        // pages: '', // 总页数
        page: 1, // 页码
        pagesize: Number(localStorage.getItem('page')) || 10 // 每页多少条数据
      },
      total: 0 // 总条数
      // flog: false,
      // dataObj: {}

    }
  },
  created () {
    this.GetList()
  },
  methods: {
    // 获取学科列表
    async GetList () {
      // console.log(this.pages)
      // this.dataObj = this.flog ? { ...this.pages, subjectName: this.form.subjectName } : this.pages
      // const { data } = await getList(this.dataObj)
      const { data } = await Subject.list(this.pages)
      // console.log(data)
      this.list = data.items
      // 学科总数
      this.total = data.counts
      // console.log(this.list)
      // this.index.index = this.list.length
      this.index.titles = this.index.title + this.total + this.index.num
    },
    // 时间格式化
    formDate (value, str = 'YYYY-MM-DD HH:MM:ss') {
      return dayjs(value).format(str)
    },
    // // 点击搜索
    async search () {
      // console.log('123', res, res.data.items)
      // this.flog = this.form.subjectName ? this.flog = true : this.flog = false
      // console.log(123)
      this.pages.page = 1
      const res = await Subject.list({ ...this.pages, subjectName: this.form.subjectName })
      this.list = res.data.items
      // 搜索到的总数
      this.total = res.data.counts
      this.index.titles = this.index.title + this.total + this.index.num
    },
    // async search () {
    //   const res = await getList({ ...this.pages, subjectName: this.form.subjectName })
    //   console.log(res)
    //   this.list = res.data.items
    // const a = this.form.name
    // console.log(res)
    // const arr = []
    // try {
    //   res.data.items.forEach(item => {
    //   // 利用正则，配合match找到用户输入的字符串
    //     const reg = new RegExp(this.form.subjectName, 'ig')
    //     // console.log('112', item)
    //     if (item.subjectName.match(reg)) {
    //       // this.list = item
    //       arr.push(item)
    //       // console.log(arr)
    //     }
    //   })
    //   this.list = arr
    //   // this.sizeChange(this.list.length + 1)
    //   // 搜索到的学科总数
    //   // this.pages.pages = this.list.length
    //   this.total = this.list.length
    //   this.index.titles = this.index.title + this.total + this.index.num
    //   // console.log('22', this.list)
    // } catch { console.log() }

    // console.log('123', res, res.data.items)
    // },
    // 点击清除
    clearInp () {
      this.form.subjectName = ''
    },
    // 跳转到目录页
    directorys (row) {
      this.$router.push({
        path: 'directorys',
        query: {
          id: row.id,
          subjectName: row.subjectName
        }
      })
    },
    getdetail (row) {
      // await detail(id)
      this.$router.push({
        path: 'tags',
        query: {
          id: row.id,
          subjectName: row.subjectName
        }
      })
    },
    // 页数发生变化触发--当前页
    changePage (page) {
      this.pages.page = page
      if (!this.form.subjectName) {
      // this.pages.page = page
        this.GetList()
      } else {
        // this.pages.page = page
        this.search()
      }
    },
    // 每页数量
    sizeChange (sizes) {
    // console.log(sizes)
      this.pages.pagesize = sizes
      localStorage.setItem('page', sizes)
      if (!this.form.subjectName) {
        this.GetList()
        this.pages.page = 1
      } else {
        this.search()
        this.pages.page = 1
        // console.log(this.form.subjectName)
      }
    },
    // 点击修改--获取数据详情
    async editor (row) {
      const res = await Subject.detail(row)
      this.roleForm = res.data
      if (this.roleForm.isFrontDisplay) {
        this.roleForm.isFrontDisplay = true
      } else {
        this.roleForm.isFrontDisplay = false
      }
      // console.log('123', res, this.roleForm)
      this.isShowDialog = true
    },
    // 点击确定提交
    onSubmit () {
      this.$refs.roleForm.validate(async (isOk) => {
        if (isOk) {
          await Subject.update(this.roleForm)
          // 重新拉取数据
          this.GetList()
          this.$message.success('操作成功')
          // 验证完成后清空
          this.roleForm.subjectName = ''
          this.roleForm.isFrontDisplay = ''
          this.isShowDialog = false
        }
      })
    },
    // 点击取消关闭弹窗
    handleClose () {
      this.isShowDialog = false
    },
    // 点击删除
    del (row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // 确认
        // console.log('确认')
        await Subject.remove(row)

        // console.log(row.id)
        this.$message.success('删除成功')

        const newTotal = Math.ceil((this.total - 1) / this.pages.pagesize)
        // 比方说：newTotal = 8 ，但是this.pages.page = 9 =》需要改为最新的页码
        if (newTotal > 0) {
          this.pages.page = this.pages.page > newTotal ? newTotal : this.pages.page
        }
        // 判断是否是在搜索页删除，如果是，就用搜索页刷新
        if (!this.form.subjectName) {
          this.GetList()
        } else {
          this.search()
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

<style scoped lang='scss'>
.subject-btn{
float: right;
}
.btn{
  margin-left: 10px;
}
.inputw{
  width: 250px;
}
.btn2{
  display: flex;
  justify-content:space-around;
}
</style>
