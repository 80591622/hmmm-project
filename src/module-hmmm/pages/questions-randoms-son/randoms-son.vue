<template>
  <div>
    <el-form :model="form" >
          <!-- <h3>{{form.name}}</h3> -->
          <el-form-item label="关键字" class="subject">
            <el-input v-model.trim="pages.keyword" placeholder='根据编号搜索' style="width: 200px;"></el-input>
            <el-button class='btn' size="small" type="primary" @click="search" >搜索</el-button>
            <el-button class='btn' size="small" @click="clearInp">清除</el-button>
          </el-form-item>
          <el-alert
              :title="index.titles"
              type="info"
              :closable="false"
              show-icon>
            </el-alert>
            <el-form-item>
               <!-- 题组列表 -->
                <el-table
                :data="list"
                v-loading.fullscreen.lock="loading"
                style="width: 100%">
                <el-table-column
                  fixed
                 prop="id"
                  label="编号"
                  width="220">
                </el-table-column>
                <el-table-column
                  prop="questionType"
                  label="题型"
                  width="100">
                </el-table-column>
                <el-table-column
                  prop="questionIDs"
                  label="题目编号"
                  width="200">
                  <template #default='{row}'>
                  <a href="javascript:;"
                   @click="getQuestionIDs(item)"
                   style="display:block; color:blue"
                    v-for="item in row.questionIDs"
                    :key="item.number">
                    {{item.number}}
                    </a>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="addTime"
                  label="录入时间"
                  width="180">
                  <template #default='{row}'>
                    {{formDate(row.addDate)}}
                  </template>
                </el-table-column>
                <el-table-column
                  prop="totalSeconds"
                  label="答题时间(s)"
                  width="260">
                </el-table-column>
                <el-table-column
                  prop="accuracyRate"
                  label="正确率(%)"
                  width="260">
                </el-table-column>
                <el-table-column
                  prop="userName"
                  label="录入人"
                  width="260">
                </el-table-column>
                <el-table-column
                  fixed="right"
                  label="操作"
                  >
                  <template #default="{row}">
                  <!-- <template slot-scope="scope"> -->
                    <el-button type="danger" icon="el-icon-delete"  @click.native.prevent="del(row)" circle></el-button>
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
    <!-- 试题预览 -->
    <el-dialog
      title="题目预览"
      :visible.sync="isShowDialog"
      width="60%"
      :before-close="handleClose"
      :model="getData"
    >
      <el-row :gutter="100">
        <el-col :span="6" v-model="getData.questionType"
          ><div>【题型】：{{ getData.questionType }}</div></el-col
        >
        <el-col :span="6" v-model="getData.id"
          ><div>【编号】：{{ getData.id }}</div></el-col
        >
        <el-col :span="6" v-model="getData.difficulty"
          ><div>【难度】：{{ getData.difficulty }}</div></el-col
        >
        <el-col :span="6" v-model="getData.tags"
          ><div>【标签】：{{ getData.tags }}</div></el-col
        >
      </el-row>
      <el-row :gutter="100">
        <el-col :span="6" v-model="getData.subjectName"
          ><div>【学科】：{{ getData.subjectName }}</div></el-col
        >
        <el-col :span="6" v-model="getData.directoryName"
          ><div>【目录】：{{ getData.directoryName }}</div></el-col
        >
        <el-col :span="6" v-model="getData.direction"
          ><div>【方向】：{{ getData.direction }}</div></el-col
        >
      </el-row>
      <el-divider></el-divider>
      <el-row :gutter="100">
        <el-col>
          <div>【题干】：</div>
        </el-col>
      </el-row>
      <el-row :gutter="100">
        <el-col v-model="getData.question">
          <div style="color: blue" v-html="getData.question"></div>
        </el-col>
      </el-row>
      <!-- 判断如果是简答题，就不要显示选项 -->
      <div v-if="getData.questionType !== '简答'">
        <el-row :gutter="100">
          <el-col v-model="getData.questionType">
            <div>
              {{ getData.questionType }} 选项：（以下选中的选项为正确答案）
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="100">
          <el-col>
            <el-form>
              <el-form-item>
                <el-radio-group v-model="radio">
                  <!-- <el-radio> -->
                  <el-radio
                    v-for="item in this.getData.options"
                    :key="item.id"
                    :label="item.isRight"
                    class="radioSty"
                  >
                    {{ item.code }} {{ item.title }}
                  </el-radio>
                </el-radio-group>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </div>
      <el-divider></el-divider>
      <el-row :gutter="100">
        <el-col v-model="getData.videoURL"
          ><div>
            【参考答案】：<el-button @click="isShow = true" type="danger"
              >视频答案解析</el-button
            >
          </div></el-col
        >
        <el-col v-show="isShow">
          <div class="demo1-video">
            <video
              id="myVideo"
              controls = "true"
              class="video-js vjs-default-skin vjs-big-play-centered"
              muted
              loop
              autoplay="auto"
              preload
            >
              <source :src="getData.videoURL" type="video/mp4" ref="srcc" />
            </video>
          </div>
        </el-col>
      </el-row>
      <el-divider></el-divider>
      <el-row :gutter="100">
        <el-col v-model="getData.answer"
          ><span style="float: left; display: inline-block; margin-top: 13px"
            >【答案解析】：</span
          ><span v-html="getData.answer"></span
        ></el-col>
      </el-row>
      <el-divider></el-divider>
      <el-row :gutter="100">
        <el-col v-model="getData.remarks"
          ><div>【题目备注】：{{ getData.remarks }}</div></el-col
        >
      </el-row>
      <el-divider></el-divider>
    </el-dialog>
  </div>
</template>

<script>
import { randoms, removeRandoms, detail } from '@/api/hmmm/questions.js'
import * as dayjs from 'dayjs'
export default {
  name: 'randomsSon',
  data () {
    return {
      loading: false,
      radio: 1,
      // 控制视频显示隐藏
      isShow: false,
      // src: 'this.getData.videoURL', // url地址

      // 弹框获取的对象
      getData: {},
      isShowDialog: false,
      // 组题列表
      list: [],
      form: {
        type: ['选中且禁用', '复选框 A'],
        id: '',
        province: '潜江' // 从接口处取回
      },
      // 数据条数
      index: {
        title: '数据一共',
        num: '条',
        // 显示的数据条数文字
        titles: ''
      },
      roleForm: {

      },
      // 分页数据
      pages: {
        // pages: '', // 总页数
        page: 1, // 页码
        pagesize: Number(localStorage.getItem('page')) || 20, // 每页多少条数据
        keyword: ''// 关键字
      },
      total: 0, // 总条数
      number: ''
    }
  },
  created () {
    this.getRandoms()
  },
  methods: {
    handleClose () {
      this.isShowDialog = false
      this.isShow = false
    },
    // 页数发生变化触发--当前页
    changePage (page) {
      this.pages.page = page

      this.getRandoms()
    },
    // 每页数量
    sizeChange (sizes) {
      // console.log(sizes)
      this.pages.pagesize = sizes
      // localStorage.setItem('')
      localStorage.setItem('page', sizes)
      this.getRandoms()
      this.pages.page = 1
    },
    // 插槽--获取的弹框数据
    async getQuestionIDs (item) {
      try {
        const data = await detail(item)
        // 获取数据对象
        this.getData = data.data
        // 渲染题型--类型
        if (this.getData.questionType === '1') {
          this.getData.questionType = '单选'
        } else if (this.getData.questionType === '2') {
          this.getData.questionType = '多选'
        } else if (this.getData.questionType === '3') {
          this.getData.questionType = '简答'
        }
        // 渲染题型--难度
        if (this.getData.difficulty === '1') {
          this.getData.difficulty = '简单'
        } else if (this.getData.difficulty === '2') {
          this.getData.difficulty = '一般'
        } else if (this.getData.difficulty === '3') {
          this.getData.difficulty = '困难'
        }
        // console.log('222', this.getData)
        this.isShowDialog = true
      } catch {
        // 关闭后端500状态码
        this.$message.closeAll()
        this.$message.warning('链接过期')
      }
    },
    // 点击清除
    clearInp () {
      this.pages.keyword = ''
    },
    // 点击搜索
    async search () {
      if (this.pages.keyword === '') {
        this.getRandoms()
      } else {
        this.pages.page = 1
        const res = await randoms({ ...this.pages })
        // console.log(res)
        //   const res = await randoms()

        //   // const a = this.form.name
        //   // console.log(res)
        //   const arr = []
        //   try {
        //     res.data.items.forEach(item => {
        //       if (item.id === this.form.id) {
        //         arr.push(item)
        //       // console.log(item.label.match(reg))
        //       }
        //     })
        //     this.list = arr
        this.list = res.data.items

        //     // 搜索到的题目总数
        //     // this.total = JSON.parse(this.list.length)
        //     // console.log(this.list)
        this.total = res.data.counts
        //     this.total = this.list.length
        this.index.titles = this.index.title + this.total + this.index.num
        //   // console.log(this.list)
        //   // this.getList()
        //   } catch { console.log() }
        // const arr = []
        // try {
        //   res.data.items.forEach(item => {
        //     if (item.id === this.form.name) {
        //       arr.push(item)
        //       // console.log(item.label.match(reg))
        //     }
        //   })
        //   this.list = arr
        //   // 搜索到的题目总数
        //   // this.total = JSON.parse(this.list.length)
        //   // console.log(this.list)
        //   this.total = this.list.length
        //   this.index.titles = this.index.title + this.total + this.index.num
        //   // console.log(this.list)
        //   // this.getList()
        // } catch { console.log() }
      }
      // console.log('123', res, res.data.items)
    },
    // 获取内容
    async getRandoms () {
      this.loading = true
      const data = await randoms(this.pages)
      // console.log(data)
      // dayjs('data.items.')
      this.list = data.data.items
      // 渲染题型
      this.list.forEach(item => {
        if (item.questionType === '1') {
          item.questionType = '单选'
        } else if (item.questionType === '2') {
          item.questionType = '多选'
        } else if (item.questionType === '3') {
          item.questionType = '简答'
        }
      })
      // console.log(this.list.questionType)
      // 题目总数
      this.total = data.data.counts
      // console.log(this.list)
      this.index.titles = this.index.title + this.total + this.index.num
      this.loading = false
      // Tonumber(localStorage.getItem('sizes') || '10')
    },
    // 时间格式化
    formDate (value, str = 'YYYY-MM-DD HH:MM:ss') {
      return dayjs(value).format(str)
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
        await removeRandoms(row)
        // console.log(row.id)
        this.$message.success('删除成功')

        const newTotal = Math.ceil((this.total - 1) / this.pages.pagesize)
        // 比方说：newTotal = 8 ，但是this.pages.page = 9 =》需要改为最新的页码
        if (newTotal > 0) {
          this.pages.page = this.pages.page > newTotal ? newTotal : this.pages.page
        }
        this.getRandoms()
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

<style lang="scss" scoped>
.btn {
  float: right;
  margin-left: 10px;
}
.el-row {
  margin-bottom: 20px;
}
#myVideo {
  width: 50%;
  height: 30%;
}
.radioSty {
  pointer-events: none;
}
</style>
