<template>
  <div class='container'>
    <el-dialog
      title="题目预览"
      :visible="dialogPreview"
      width="900px"
      @close="closeDialog"
    >
      <!-- 题型等 -->
      <div>
        <el-row :gutter="24" style="margin-bottom:20px">
          <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
            <span>【题型】：{{questionTypeFormat(QuestionDetail.questionType)}}</span>
          </el-col>
          <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
            <span>【编号】：{{QuestionDetail.id}}</span>
          </el-col>
          <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
            <span>【难度】：{{difficultyFormat(QuestionDetail.difficulty)}}</span>
          </el-col>
          <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
            <span>【标签】：{{QuestionDetail.tags}}</span>
          </el-col>
        </el-row>

        <el-row :gutter="24" style="margin-bottom:20px">
          <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
            <span>【学科】：{{QuestionDetail.subjectName}}</span>
          </el-col>
          <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
            <span>【目录】：{{QuestionDetail.directoryName}}</span>
          </el-col>
          <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
            <span>【方向】：{{QuestionDetail.direction}}</span>
          </el-col>
          <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
            <span></span>
          </el-col>
        </el-row>
      </div>
      <hr style="margin-bottom:20px">
      <!-- 题干 -->
      <div style="margin-bottom:20px">
        <div>【题干】：</div>
        <div v-html="QuestionDetail.question" style="color:blue;"></div>
        <!-- 单选题 题干布局 -->
        <div v-show="QuestionDetail.questionType === '1'">
          <div style="margin-bottom:20px">单选题 选项：(以下选中的选项为正确答案)</div>
          <div>
            <el-radio-group v-model="radio">
              <el-radio
                v-for="item in QuestionDetail.options"
                :key="item.id"
                :label="item.isRight"
                :value="item.id"
                style="display:block;margin-bottom:15px;pointer-events:none"
              >
                {{item.title}}
              </el-radio>
            </el-radio-group>
          </div>
        </div>
        <!-- 多选题 题干布局 -->
        <div v-show="QuestionDetail.questionType === '2'">
          <div style="margin-bottom:20px">多选题 选项：(以下选中的选项为正确答案)</div>
          <div>
            <el-checkbox-group v-model="checkList">
              <el-checkbox
                v-for="item in QuestionDetail.options"
                :key="item.id"
                :label="item.isRight"
                :value="item.id"
                style="display:block;margin-bottom:15px;pointer-events:none"
              >
                {{item.title}}
              </el-checkbox>

            </el-checkbox-group>
          </div>
        </div>
        <!-- 简答题 题干布局 -->
        <div v-show="QuestionDetail.questionType === '3'">

        </div>
      </div>
      <hr>
      <!-- 参考答案 视频 -->
      <div>
        <span>【参考答案】：</span>
        <el-button type="danger" @click="showVideo = true">视频答案预览</el-button>
        <div class="videoBox" v-if="showVideo">
          <video
            style="width:100%;"
            :src="QuestionDetail.videoURL"
            controls="controls"
            autoplay
          ></video>
        </div>
      </div>
      <hr>
      <!-- 答案解析 -->
      <div>
        <span>【答案解析】：</span>
        <div v-html="QuestionDetail.answer" style="display:inline-block"></div>
      </div>
      <hr style="margin-bottom:20px">
      <!-- 题目备注 -->
      <div style="margin-bottom:20px">
        <span>【题目备注】：{{QuestionDetail.remarks}}</span>
      </div>
      <!-- 按钮 -->
      <div class="dialog-footer">
        <el-button type="primary" @click="closeDialog">关 闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { detail } from '@/api/hmmm/questions'

export default {
  name: 'QuestionsPreview',
  data () {
    return {
      // 题目详情
      QuestionDetail: {},
      // 单选题
      radio: 1,
      // 多选题
      checkList: [1],
      // 显示答案视频
      showVideo: false
    }
  },
  props: {
    dialogPreview: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    closeDialog () {
      this.showVideo = false
      this.$emit('update:dialogPreview', false)
    },
    // 获取题目详情
    async getQuestionDetail (data) {
      // console.log('预览id', data)
      const res = await detail(data)
      this.QuestionDetail = res.data
      console.log(this.QuestionDetail)
    },
    // 格式化题型
    questionTypeFormat (code) {
      if (code === '1') {
        return '单选题'
      } else if (code === '2') {
        return '多选题'
      } else {
        return '简答题'
      }
    },
    // 格式化难度
    difficultyFormat (code) {
      if (code === '1') {
        return '简单'
      } else if (code === '2') {
        return '一般'
      } else {
        return '困难'
      }
    }
  }
}
</script>

<style scoped lang='scss'>
.videoBox{
  width: 400px;
  height: 250px;
  padding-top: 20px;
}
.dialog-footer{
  height: 36px ;
  .el-button{
    float: right;
  }
}
</style>
