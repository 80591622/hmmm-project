<template>
  <div>
    <template slot="questionsTable">
      <!-- 列表 -->
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          prop="date"
          label="试题编号"
          width="150">
        </el-table-column>
        <el-table-column
          prop="name"
          label="学科"
          width="120">
        </el-table-column>
        <el-table-column
          prop="province"
          label="目录"
          width="120">
        </el-table-column>
        <el-table-column
          prop="city"
          label="题型"
          width="120">
        </el-table-column>
        <el-table-column
          prop="address"
          label="题干"
          width="300">
        </el-table-column>
        <el-table-column
          prop="zip"
          label="录入时间"
          width="120">
        </el-table-column>
        <el-table-column
          prop="zip"
          label="难度"
          width="120">
        </el-table-column>
        <el-table-column
          prop="zip"
          label="录入人"
          width="120">
        </el-table-column>
        <el-table-column
          prop="zip"
          label="审核状态"
          width="120">
        </el-table-column>
        <el-table-column
          prop="zip"
          label="审核意见"
          width="120">
        </el-table-column>
        <el-table-column
          prop="zip"
          label="审核人"
          width="120">
        </el-table-column>
        <el-table-column
          prop="zip"
          label="发布状态"
          width="120">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template template-scope="scope">
            <el-button @click="handleClicks(scope.row)" type="text" size="small">查看</el-button>
            <el-button type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        background
        layout="prev, pager, next"
        :total="1000">
      </el-pagination>

    </template>
  </div>
</template>

<script>
// import QuestionsChoice from '../pages/questions-choice'

export default {
  name: 'questionsTable',
  data () {
    return {
      tableData: []
    }
  },
  methods: {
    handleClicks (row) {
      console.log(row)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
