<template>
  <div>
    <!-- <el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button> -->

<el-dialog
  title="新增学科"
  :visible.sync="showDialog"
  width="23%"
  :before-close="handleClose">
  <el-form ref="roleForm" :model="roleForm" :rules="rules">
      <el-form-item label="学科名称" prop="subjectName">
        <el-input v-model="roleForm.subjectName"  placeholder='请输入学科名称' class="inputw"></el-input>
      </el-form-item>
      <el-form-item label="是否显示">
        <el-switch v-model="roleForm.isFrontDisplay"></el-switch>
  </el-form-item>
  <el-form-item class="btn">
    <!-- <span slot="footer" class="dialog-footer"> -->
    <el-button @click="handleClose">取 消</el-button>
    <el-button type="primary" @click="onSubmit">确 定</el-button>
  <!-- </span> -->
  </el-form-item>
  </el-form>
</el-dialog>

  </div>
</template>
<script>
import Subject from '@/api/hmmm/subjects.js'
export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    pages: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      roleForm: {
        subjectName: '',
        isFrontDisplay: false
      },
      rules: {
        subjectName: [{ required: true, message: '角色名称不能为空', trigger: 'blur' }]
      }
    }
  },
  methods: {
    handleClose () {
      this.$emit('update:showDialog', false)
    },
    onSubmit () {
      this.$refs.roleForm.validate(async (isOk) => {
        if (isOk) {
          // 调用添加接口
          await Subject.add(this.roleForm)
          // 重新拉取数据--调用父组件方法

          this.$parent.GetList()
          this.$message.success('操作成功')
          // 验证完成后清空
          this.roleForm.subjectName = ''
          this.roleForm.isFrontDisplay = false
          // 关闭弹窗
          this.$emit('update:showDialog', false)
          // console.log(this.pages.page)
          this.pages.page = 1
        }
      })
    }
  }
}
</script>
<style scoped lang='scss'>
.inputw{
  width: 250px;
}
.btn{
  display: flex;
  justify-content:space-around;
}
</style>
