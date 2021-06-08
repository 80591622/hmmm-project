<template>
  <div>
    <!-- <el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button> -->

<el-dialog
  title="编辑学科"
  :visible.sync="showDialog"
  width="23%"
  :before-close="handleClose">
  <el-form ref="roleForm" :model="roleForm">
      <el-form-item label="学科名称" >
        <el-input v-model="roleForm.subjectName"  placeholder='请输入学科名称' class="inputw"></el-input>
      </el-form-item>
      <el-form-item label="是否显示">
        <el-switch v-model="roleForm.isFrontDisplay"></el-switch>
  </el-form-item>
  <el-form-item class="btn">
    <!-- <span slot="footer" class="dialog-footer"> -->
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="onSubmit">确 定</el-button>
  <!-- </span> -->
  </el-form-item>
  </el-form>
</el-dialog>

  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>

</style>
