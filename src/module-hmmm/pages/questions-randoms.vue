<template>
<div class="dashboard-container">
    <!-- <div class="app-container"> -->
      <el-card shadow="never">
        <!-- 组题列表 -->
        <randomsSon />
      </el-card>
    <!-- </div> -->
  </div>
</template>

<script>
import randomsSon from './questions-randoms-son/randoms-son'
export default {
  components: {
    randomsSon
  }
}
</script>

<style scoped lang='less'></style>
