<template>
  <el-dialog
    :title="this.form.id ? '编辑文章' : '添加文章'"
    width="800px"
    :visible="isShowArticlleAdd"
    @close="close"
  >
    <el-form ref="form" :model="form" label-width="80px" :rules="rules">
      <!-- 文章标题 -->

      <el-form-item label="文章标题" prop="title">
        <el-input v-model="form.title" placeholder="请输入文章标题"></el-input>
      </el-form-item>

      <!-- 文章内容 -->
      <el-form-item label="文章内容" prop="articleBody">
        <quill-editor
          v-model="form.articleBody"
          class="editor"
          ref="myQuillEditor"
          :options="editorOption"
          @change="onEditorChange($event)"
        >
        </quill-editor>
      </el-form-item>

      <!-- 视频地址 -->
      <el-form-item label="视频地址" prop="videoURL">
        <el-input
          v-model="form.videoURL"
          placeholder="请输入视频地址"
        ></el-input>
      </el-form-item>

      <!-- 操作按钮 -->
      <el-form-item>
        <el-button type="primary" @click="onSubmit">{{
          this.form.id ? "立即修改" : "立即添加"
        }}</el-button>
        <el-button @click="close">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { add, update } from '@/api/hmmm/articles.js'
import { quillEditor } from 'vue-quill-editor'

export default {
  components: {
    quillEditor
  },
  props: {
    isShowArticlleAdd: {
      type: Boolean,
      default: false
    },
    form: {
      type: Object,
      default: () => ({})
    },
    page: {
      type: Number,
      default: 1
    }
  },
  data () {
    // 电影格式校验
    const checkMovie = (rule, value, callback) => {
      if (!value) return callback()
      if (!String(value).split('').includes('.')) return callback(new Error("电影格式为'mp4', 'mkv', 'avi', 'mov', 'asf', 'wmv'"))
      if (!String(value).split('').includes('/')) return callback(new Error('路径错误'))
      const arr = value.split('.')
      const reg = ['mp4', 'mkv', 'avi', 'mov', 'asf', 'wmv']
      reg.forEach(mv => {
        if (arr[arr.length - 1] === mv) {
          callback()
        } else {
          return callback(new Error("电影格式为'mp4', 'mkv', 'avi', 'mov', 'asf', 'wmv'"))
        }
      })
      if (this.isShowMovie === false) this.$message('失效的资源')
    }
    return {
      // 表单校验
      rules: {
        title: [{ required: true, message: '请输入文章标题', trigger: ['blur', 'change'] }],
        articleBody: [{ required: true, message: '请输入文章内容', trigger: 'blur' }],
        videoURL: [{ validator: checkMovie, trigger: 'blur' }]
      },
      // 富文本配置
      editorOption: {
        placeholder: '可上传图片, 大小50k以内',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'], // 加粗、倾斜、下划线、删除线
            [{ list: 'ordered' }, { list: 'bullet' }], // 列表
            ['blockquote'],
            ['code-block', 'image', 'link']
          ]
        }
      }
    }
  },
  methods: {
    // 关闭弹框
    close () {
      this.$emit('update:isShowArticlleAdd', false)
      this.$emit('update:form', {})
      this.$nextTick(() => {
        this.$refs.form.clearValidate()
      })
    },
    // 内容改变事件
    onEditorChange (e) {
      // console.log(e)
      this.$refs.form.clearValidate(['articleBody'])
    },
    // 提交表单
    onSubmit () {
      this.$refs.form.validate(async (isok) => {
        if (isok) {
          try {
            this.form.id ? await update(this.form) : await add(this.form) && this.$emit('update:page', 1)
            this.$message.success('操作成功')
            this.$parent.getArticleList()
            this.close()
          } catch {
            this.$message.closeAll()
            this.$nextTick(() => {
              this.$message.error('上传的图片太大')
            })
          }
        }
      })
    }
  }
}

</script>

<style scoped lang='scss'>
.editor {
  height: 200px;
  margin-bottom: 50px;
}
</style>
