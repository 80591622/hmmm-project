<template>
  <div class='container'>
    <el-dialog
      title="题目审核"
      :visible="dialogCheck"
      width="40%"
      @close="closeDialog()"
    >
      <el-form :model="formData">
        <el-form-item>
            <el-radio v-model="formData.chkState" label="1">通过</el-radio>
            <el-radio v-model="formData.chkState" label="2">拒绝</el-radio>
        </el-form-item>
        <el-form-item>
          <el-input type="textarea" v-model="formData.chkRemarks"></el-input>
        </el-form-item>
        <el-form-item class="dialog-footer">
          <el-button @click="closeDialog">取 消</el-button>
          <el-button type="primary" @click="upCheck">确 认</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { choiceCheck, choice } from '@/api/hmmm/questions' // 试题审核

export default {
  name: 'QuestionsCheck',
  data () {
    return {
      formData: {
        chkState: '1',
        chkRemarks: '',
        id: ''
      }
    }
  },
  props: {
    dialogCheck: {
      type: Boolean,
      default: false
    },
    pages: {
      type: Object,
      default: () => ({})
    },
    total: {
      type: Number,
      default: 0
    },
    tableList: {
      type: Array,
      default: () => []
    },
    activeName: {
      type: String,
      default: 'first'
    }
  },
  methods: {
    handleClose (row) {
      this.formData.id = row.id
    },
    // 取消 关闭弹窗
    closeDialog () {
      this.$emit('update:dialogCheck', false)
      this.formData = {
        chkState: '1',
        chkRemarks: '',
        id: ''
      }
    },
    // 确认审核
    async upCheck () {
      if (this.formData.chkRemarks === '') {
        this.$message({
          type: 'warning',
          message: '审核意见不能为空！'
        })
        return
      }
      this.formData.chkState = Number(this.formData.chkState)
      await choiceCheck(this.formData)
      // 关闭弹窗
      this.$emit('update:dialogCheck', false)
      // 刷新（刷新的是所有列表）
      if (this.activeName === 'second') {
        const { data } = await choice({ page: this.pages.page, pagesize: this.pages.pagesize, chkState: 0 })
        this.$emit('update:total', data.counts)
        this.$emit('update:tableList', data.items)
      } else {
        const { data } = await choice({ ...this.pages })
        this.$emit('update:total', data.counts)
        this.$emit('update:tableList', data.items)
      }
      this.formData = {
        chkState: '1',
        chkRemarks: '',
        id: ''
      }
    }
  }
}
</script>

<style scoped lang='scss'>
.dialog-footer{
  height: 36px ;
  .el-button{
    float: right;
    margin-right: 5px;
  }
}
</style>
