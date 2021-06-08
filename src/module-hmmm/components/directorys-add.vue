<template>
  <div class="container">
    <el-dialog
      :title="this.formData.id ? '编辑' : '新增'"
      :visible="isShowDialog"
      width="30%"
      @close="handleClose"
    >
      <div>
        <el-form ref="formRef" :model="formData" :rules="rules" label-width="120px" >

          <el-form-item label="所属学科" >
            <el-select style="80%" placeholder="请选择学科" v-model="formData.subjectID" class="selectBtn" >
              <el-option v-for="item in subjectList" :label="item.subjectName" :key="item.id" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="目录名称" prop="directoryName">
            <el-input style="80%" v-model="formData.directoryName" class="inputBtn"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <!-- 弹层底部 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click.native="handleClose">取 消</el-button>
        <el-button type="primary" @click="addDirectorys()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { add, update } from '@/api/hmmm/directorys.js'
import Subject from '@/api/hmmm/subjects.js'
export default {
  name: 'directorysAdd',
  // 接收父组件传递的数据,控制弹窗是否显示
  props: {
    // 控制弹层是否显示
    isShowDialog: {
      type: Boolean,
      default: false
    },
    formData: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      // 所属学科
      subjectList: [],

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
      }
    }
  },
  created () {
    this.getSubjects()
  },
  methods: {
    // 关闭弹窗
    handleClose () {
      this.$refs.formRef.clearValidate()
      this.$emit('update:isShowDialog', false)
      this.$emit('update:formData', {})
    },
    // 获取所属学科数据
    async getSubjects () {
      const { data } = await Subject.list({ pagesize: 1000 })
      this.subjectList = data.items
    },
    // 新增目录
    addDirectorys () {
      this.$refs.formRef.validate(async (isOk) => {
        if (isOk) {
          // console.log('formData.id:', this.formData.id)
          if (this.formData.id) {
            // 编辑
            await update(this.formData)
          } else {
            // 新增
            await add(this.formData)
          }
          this.$message.success('操作成功')
          this.$parent.initCatalogueData()
          this.$emit('update:isShowDialog', false)
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.inputBtn {
  width: 217px;
}
</style>
