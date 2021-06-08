<template>
  <div style="overflow-x: auto">
    <div>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>{{ isEdit ? "修改试题" : "新增试题" }}</span>
        </div>
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <!-- 学科 -->
          <el-form-item label="学科：" prop="subjectID">
            <el-select
              v-model="ruleForm.subjectID"
              placeholder="请选择"
              style="width: 400px"
              @change="clickSubject"
            >
              <el-option
                v-for="(item, index) in subjectsList"
                :key="index"
                :label="item.subjectName"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>

          <!-- 目录 -->
          <el-form-item label="目录：" prop="catalogID">
            <el-select
              v-model="ruleForm.catalogID"
              placeholder="请选择"
              style="width: 400px"
              @change="directorysFn"
            >
              <el-option
                v-for="(item, index) in directorysList"
                :key="index"
                :label="item.directoryName"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>

          <!-- 企业 -->
          <el-form-item label="企业：" prop="enterpriseID">
            <el-select
              v-model="ruleForm.enterpriseID"
              placeholder="请选择"
              style="width: 400px"
            >
              <el-option
                v-for="item in companysList"
                :key="item.id"
                :label="item.company"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>

          <!-- 城市 -->
          <el-form-item label="城市：" prop="province">
            <el-row :gutter="1">
              <el-col :span="1" style="width: 200px">
                <el-form-item prop="province">
                  <el-select
                    v-model="ruleForm.province"
                    placeholder="请选择"
                    @change="change"
                  >
                    <el-option
                      v-for="(item, index) in provincesList"
                      :key="index"
                      :label="item"
                      :value="item"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="1" style="width: 200px">
                <el-form-item prop="city">
                  <el-select v-model="ruleForm.city" placeholder="请选择">
                    <el-option
                      v-for="(item, index) in citysList"
                      :key="index"
                      :label="item"
                      :value="item"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form-item>

          <!-- 方向 -->
          <el-form-item label="方向：" prop="direction">
            <el-select
              v-model="ruleForm.direction"
              placeholder="请选择"
              style="width: 400px"
            >
              <el-option
                v-for="(item, index) in directionList"
                :key="index"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>

          <!-- 题型 -->
          <el-form-item label="题型：" prop="questionType">
            <el-radio-group
              v-model="ruleForm.questionType"
              style="width: 400px"
            >
              <el-radio
                :label="item.value.toString()"
                v-for="(item, index) in questionTypeList"
                :key="index"
              >
                {{ item.label }}
              </el-radio>
            </el-radio-group>
          </el-form-item>

          <!-- 难度 -->
          <el-form-item label="难度：" prop="difficulty">
            <el-radio-group v-model="ruleForm.difficulty" style="width: 400px">
              <el-radio
                v-for="(item, index) in difficultyList"
                :key="index"
                :label="item.value.toString()"
              >
                {{ item.label }}
              </el-radio>
            </el-radio-group>
          </el-form-item>

          <!-- 题干 -->
          <el-form-item label="题干：" prop="question">
            <quill-editor
              id="editor"
              :options="editorOption"
              v-model="ruleForm.question"
            >
            </quill-editor>
          </el-form-item>

          <!-- 选项 -->
          <el-form-item label="选项：" v-if="ruleForm.questionType !== '3'">
            <el-row
              :gutter="5"
              type="flex"
              class="choice-row"
              v-for="(item, index) in arr"
              :key="index"
            >
              <el-col :span="2">
                <el-checkbox-group
                  v-model="checkList"
                  v-if="ruleForm.questionType === '2'"
                >
                  <el-checkbox :label="index">{{ item.code }}</el-checkbox>
                </el-checkbox-group>
                <el-radio-group v-else v-model="radio">
                  <el-radio :label="index">{{ item.code }}</el-radio>
                </el-radio-group>
              </el-col>

              <el-col :span="9">
                <el-input type="text" v-model="item.title"></el-input>
              </el-col>
              <el-col :span="4">
                <div @click="getImageIndex(index)">
                  <el-upload
                    class="avatar-uploader"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                    v-model="item.img"
                  >
                    <img v-if="item.img" :src="item.img" class="avatar" />
                    <span class="el-upload-text" v-else>上传图片</span>
                    <i @click.stop="deleteInput(index)">×</i>
                  </el-upload>
                </div>
              </el-col>
            </el-row>
          </el-form-item>

          <el-form-item>
            <el-button
              type="danger"
              size="small"
              class="el-button"
              @click="Addstatus"
              label="启用"
              :disabled="ruleForm.questionType === '1'"
              v-if="ruleForm.questionType !== '3'"
              >+增加选项与答案</el-button
            >
          </el-form-item>

          <!-- 解析视频 -->
          <el-form-item label="解析视频：" prop="videoURL">
            <el-input
              v-model="ruleForm.videoURL"
              style="width: 400px"
            ></el-input>
          </el-form-item>

          <!-- 答案解析 -->
          <el-form-item label="答案解析：" prop="answer">
            <quill-editor
              id="editor2"
              :options="editorOption"
              v-model="ruleForm.answer"
            >
            </quill-editor>
          </el-form-item>

          <!-- 题目备注 -->
          <el-form-item label="题目备注：" prop="remarks">
            <el-input
              type="textarea"
              v-model="ruleForm.remarks"
              style="width: 400px"
            ></el-input>
          </el-form-item>

          <!-- 试题标签 -->
          <el-form-item label="试题标签" prop="tagsArr"
            ><el-select
              v-model="ruleForm.tags"
              multiple
              filterable
              allow-create
              default-first-option
              placeholder="请选择试题标签"
              ><el-option
                v-for="(item, index) in tagsList"
                :key="index"
                :value="item.id"
                :label="item.tagName"
              ></el-option></el-select
          ></el-form-item>

          <!-- 提交按钮 -->
          <el-form-item>
            <el-button
              :type="isEdit ? 'success' : 'primary'"
              @click="submitForm('ruleForm')"
              >{{ isEdit ? "确认修改" : "确认提交" }}</el-button
            ></el-form-item
          >
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
// 富文本
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
// 接口
// 企业接口
import add from '@/api/hmmm/add'
import { difficulty, questionType, direction } from '../../api/hmmm/constants'
// 导入城市和区域/县
import { provinces, citys } from '@/api/hmmm/citys'
// 城市组件
export default {
  components: {
    quillEditor
  },
  data () {
    // 标签验证
    const checkTags = (rule, value, callback) => {
      if (!this.ruleForm.tags) {
        callback(new Error('请选择或添加自定义标签'))
      } else callback()
    }
    return {
      isEdit: false,
      // 富文本
      editorOption: {
        // 占位配置
        placeholder: '请输入',
        modules: {
          // 配置工具栏
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ header: 1 }, { header: 2 }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ indent: '-1' }, { indent: '+1' }]
          ]
        }
      },
      // 表单数据
      ruleForm: {
        subjectID: '', // 学科
        catalogID: '', // 目录
        enterpriseID: '', // 企业
        province: '', // 城市
        city: '', // 地区
        direction: '', // 方向
        questionType: '1', // 题型
        difficulty: '1', // 难度
        question: '', // 题干
        options: [
          {
            code: 'A',
            title: '',
            img: '',
            isRight: true
          },
          {
            code: 'B',
            title: '',
            img: '',
            isRight: false
          },
          {
            code: 'C',
            title: '',
            img: '',
            isRight: false
          },
          {
            code: 'D',
            title: '',
            img: '',
            isRight: false
          }
        ], // 选项
        videoURL: '', // 解析视频
        answer: '', // 答案解析
        remarks: '', // 题目备注
        tags: [] // 试题标签
      },
      arr: [
        {
          code: 'A',
          title: '',
          img: '',
          isRight: true
        },
        {
          code: 'B',
          title: '',
          img: '',
          isRight: false
        },
        {
          code: 'C',
          title: '',
          img: '',
          isRight: false
        },
        {
          code: 'D',
          title: '',
          img: '',
          isRight: false
        }
      ],
      // 表单验证
      rules: {
        subjectID: [{ required: true, message: '请选择学科', trigger: 'blur' }],
        catalogID: [
          { required: true, message: '请选择目录', trigger: 'change' }
        ],
        enterpriseID: [
          { required: true, message: '请选择企业', trigger: 'change' }
        ],
        province: [
          { required: true, message: '请选择城市', trigger: 'change' }
        ],
        city: [{ required: true, message: '请选择地区', trigger: 'change' }],
        direction: [
          { required: true, message: '请选择方向', trigger: 'change' }
        ],
        // videoURL: [
        //   { required: true, message: '请解析视频', trigger: 'change' }
        // ],
        remarks: [
          { required: true, message: '请输入题目备注', trigger: 'change' }
        ],
        tagsArr: [{ validator: checkTags, trigger: 'change' }],
        question: [
          { required: true, message: '请输入题干', trigger: 'change' }
        ],
        answer: [
          { required: true, message: '请输入答案解析', trigger: 'change' }
        ]
      },
      imageUrl: '', // 图片
      subjectsList: [], // 学科
      isShowRadio: true, // 单选
      isShowCheckout: false, // 多选
      provincesList: [], // 城市
      citysList: [], // 地区
      directorysList: [], // 目录
      companysList: [], // 企业
      directionList: [], // 方向
      questionTypeList: [], // 体型
      difficultyList: [], // 难度
      tagsList: [], // 标签存数据
      tagsArr: [], // 标签转字符串
      radio: '', // 单选
      checkList: [], // 复选框列表
      // 数组
      ENList: [
        'E',
        'F',
        'G',
        'H',
        'I',
        'J',
        'K',
        'L',
        'M',
        'N',
        'O',
        'P',
        'Q',
        'R',
        'S',
        'T',
        'U',
        'V',
        'W',
        'X',
        'Y',
        'Z'
      ],
      // 基础题库
      BasicQuestionList: [],
      editId: this.$route.query.id, // id
      // 上传index
      uploadImageType: ''
    }
  },
  created () {
    // 学科
    this.subjectsFn()

    // 企业
    this.companysFn()
    // 通常用量
    this.constantsFn()

    // 城市
    this.provincesFn()
    // 有id 进行编辑 基础题库
    if (this.editId) {
      this.isEdit = true
      this.detailFn()
    } else {
      this.isEdit = false
    }
  },
  // 监听
  watch: {
    // tags转字符串
    // tagsArr (newTags) {
    //   this.ruleForm.tags = newTags.split(',')
    // }
  },
  methods: {
    // 不为单选和多选时，清空输入框的内容
    removeInputValue () {
      if (this.ruleForm.questionType === 3) {
        this.ruleForm.options = [
          {
            code: 'A',
            title: '',
            img: '',
            isRight: true
          },
          {
            code: 'B',
            title: '',
            img: '',
            isRight: false
          },
          {
            code: 'C',
            title: '',
            img: '',
            isRight: false
          },
          {
            code: 'D',
            title: '',
            img: '',
            isRight: false
          }
        ]
      }
    },
    // 转格式
    buildParams () {
      const paramsObj = {}
      const {
        province,
        city,
        tags,
        remarks,
        answer,
        question,
        subjectID,
        videoURL,
        direction,
        enterpriseID,
        catalogID,
        difficulty,
        questionType
      } = this.ruleForm
      // 如果某一个参数是null,则axios就不会发这个参数
      // 如果某一个参数是""，axios是会发出这个参数
      paramsObj.province = province
      paramsObj.city = city
      paramsObj.tags = tags
      paramsObj.options = [...this.ruleForm.options]
      paramsObj.remarks = remarks
      paramsObj.answer = answer
      paramsObj.question = question
      paramsObj.videoURL = videoURL
      paramsObj.direction = direction
      paramsObj.enterpriseID = enterpriseID
      paramsObj.catalogID = catalogID
      paramsObj.subjectID = subjectID
      paramsObj.difficulty = difficulty.toString()
      paramsObj.questionType = questionType.toString()
      return paramsObj
    },
    // 获取学科
    async subjectsFn () {
      const { data: res } = await add.subjectList({ page: 1, pagesize: 100 })
      this.subjectsList = res.items

      // console.log('学科名', this.subjectsList)
    },
    // 学科选择后初始化目录
    async clickSubject (val) {
      this.ruleForm.tags = null
      this.ruleForm.catalogID = null
      const { data: res } = await add.directoryList({ subjectID: val })
      this.directorysList = res.items
      this.tagsList = []
    },
    // 目录初始化后初始化标签
    directorysFn () {
      // const { data: res } = await add.directoryList()
      // this.directorysList = res.items
      // console.log('目录名', this.directorysList)
      this.tagsFn()
    },
    // 学科选择后初始化标签
    async tagsFn () {
      const { data: res } = await add.tagList({ subjectID: this.ruleForm.subjectID })
      console.log(this.ruleForm.subjectID)
      this.tagsList = res.items
      // console.log('标签', this.tagsList)
    },
    // 获取企业
    async companysFn () {
      const res = await add.companyList()
      this.companysList = res.data.items
      // console.log('企业名', this.companysList)
    },
    // 城市
    async provincesFn () {
      const res = await provinces()
      this.provincesList = res
      // console.log(this.provincesList)
    },
    // 地区
    change () {
      this.citysList = citys(this.ruleForm.province)
    },
    // 通常用量
    constantsFn () {
      // 方向
      this.directionList = direction
      // console.log('方向', this.directionList)

      // 体型
      this.questionTypeList = questionType
      // console.log('体型', this.questionTypeList)

      // 难度
      this.difficultyList = difficulty
      // console.log('难度', this.difficultyList)
    },
    // 基础题库 数据回填
    async detailFn () {
      if (this.$route.query.id) {
        const res = await add.questionsDetail({ id: this.editId })
        this.ruleForm = res.data
        this.ruleForm.tags = res.data.tags.split(',')

        // 获取目录
        const { data } = await add.directoryList({ subjectID: this.ruleForm.subjectID })
        this.directorysList = data.items

        // 处理回填选项
        this.arr = this.ruleForm.options

        switch (this.ruleForm.questionType) {
          // 单选
          case '1':
            this.ruleForm.options.forEach((item, index) => {
              if (item.isRight === 1) {
                this.radio = index
              }
            })
            break
          case '2':
            // 多选
            this.ruleForm.options.forEach((item, index) => {
              if (item.isRight === 1) {
                this.checkList.push(index)
              }
            })
            break
        }
      }
    },
    // 添加 至 基础题库
    async addFn () {
      this.ruleForm.tags = this.ruleForm.tags.toString()
      // 试题选项操作 处理数据
      switch (this.ruleForm.questionType) {
        // 单选
        case '1': {
          const optionArr = this.arr.slice(0, 4)
          // 判断默认勾选
          optionArr.forEach((item, index) => {
            if (index === this.radio) {
              item.isRight = true
            } else {
              item.isRight = false
            }
          })
          this.ruleForm.options = optionArr
          break
        }

        // 多选的情况
        case '2': {
          const arr = this.arr.slice(0, this.ruleForm.options.length)
          // 判断默认勾选
          for (let i = 0; i < arr.length; i++) {
            this.checkList.forEach(item => {
              if (i === item) {
                arr[i].isRight = true
              }
            })
          }
          this.ruleForm.options = arr
          break
        }
      }
      await add.questionAdd(this.ruleForm)
        .then(() => {
          this.$message.success('添加成功')
        })
        .catch(() => {
          this.$message.error('添加失败')
        })
      console.log('this.ruleForm', this.ruleForm)
    },
    // 编辑
    async updateFn () {
      this.ruleForm.tags = this.unique(this.ruleForm.tags)
      this.ruleForm.tags = this.ruleForm.tags.toString()

      switch (this.ruleForm.questionType) {
        // 单选
        case '1': {
          const optionArr = this.arr.slice(0, 4)
          // 判断默认勾选
          optionArr.forEach((item, index) => {
            if (index === this.radio) {
              item.isRight = true
            } else {
              item.isRight = false
            }
          })
          this.ruleForm.options = optionArr.reverse()
          break
        }

        // 多选的情况
        case '2': {
          const arr = this.arr.slice(0, this.ruleForm.options.length)
          // 判断默认勾选
          for (let i = 0; i < arr.length; i++) {
            this.checkList.forEach(item => {
              if (i === item) {
                arr[i].isRight = true
              }
            })
          }
          this.ruleForm.options = arr.reverse()
          break
        }
      }

      await add.questionUpdate(this.ruleForm)
        .then(() => {
          this.$message.success('编辑成功')
        })
        .catch(() => {
          this.$message.error('编辑失败')
        })
      console.log('this.ruleForm', this.ruleForm)
      // 清空输入框
      this.removeInputValue()
    },
    // 添加多选
    Addstatus () {
      if (this.ENList.length === 0) {
        this.$alert('不能在添加选项了', '警告', {
          confirmButtonText: '确定',
          type: 'error'
        })
        return
      }
      this.arr.push({
        code: this.ENList[0],
        title: '',
        img: '',
        isRight: false
      })
      this.ENList.splice(0, 1)
    },
    // 删除选项
    deleteInput (index) {
      if (this.ruleForm.options.length <= 3) {
        this.$alert('最少三个选项', '警告', {
          confirmButtonText: '确定',
          type: 'error'
        })
        return
      }
      this.ruleForm.options.splice(index, 1)
      this.$message.success('删除成功')
    },
    // 提交按钮
    submitForm (formName) {
      this.$confirm('是否提交?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'success',
        center: true,
        callback: action => {
          if (action === 'confirm') {
            // 转格式
            this.buildParams()
            // 手动兜底
            this.$refs[formName].validate((valid) => {
              if (valid) {
                console.log('submit!')
              } else {
                this.$message.error('请输入必填项')
                return
              }
              this.isEdit ? this.updateFn() : this.addFn()
              this.$router.back()
            })
          } else {
            this.$message.info('已取消操作')
          }
        }
      })
    },
    unique (arr) {
      return Array.from(new Set(arr))
    },
    // 校验
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    getImageIndex (index) {
      this.uploadImageType = index
    },
    handleAvatarSuccess (raw, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
      this.ruleForm.options[this.uploadImageType].img = this.imageUrl

      // console.log('this.imageUrl', this.imageUrl)
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传图片只能是 JPG 格式')
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB')
      }
      return isJPG && isLt2M
    },
    redio () {
      console.log(123)
    }
  }
}
</script>

<style scoped>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  margin: 20px;
}
.choice-row {
  width: 720px;
  height: 75px;
  line-height: 60px;
}
.avatar-uploader {
  position: relative;
  display: inline-block;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  width: 100px;
  height: 60px;
  text-align: center;
}
.avatar {
  width: 100px;
  height: 60px;
}
.avatar-uploader:hover {
  border-color: #409eff;
}
.el-upload-text {
  line-height: 60px;
}
.avatar-uploader i {
  position: absolute;
  display: inline-block;
  border: 1px #9e9e9e solid;
  background-color: #fff;
  width: 16px;
  height: 16px;
  color: #9e9e9e;
  text-align: center;
  border-radius: 15px;
  line-height: 15px;
  right: -7px;
  top: -7px;
  padding-right: 1px;
}
#editor,
#editor2 {
  display: inline-block;
  padding: 5px;
  height: 200px;
  width: 918px;
  font-size: 16px;
  resize: none;
  outline: none;
}
</style>
