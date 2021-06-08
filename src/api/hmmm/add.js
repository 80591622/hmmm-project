import { createAPI } from '@/utils/request'

// 标签
class Add {
  // 标签列表
  tagList = data => createAPI('/tags', 'get', data)

  // 学科列表
  subjectList = data => createAPI('/subjects', 'get', data)

  // 目录列表
  directoryList = data => createAPI('/directorys', 'get', data)

  // 企业列表
  companyList = data => createAPI('/companys', 'get', data)

  // 题库详情
  questionsDetail = data => createAPI(`/questions/${data.id} `, 'get', data)

  // 基础题库添加
  questionAdd = data => createAPI('/questions', 'post', data)

  // 基础题库修改
  questionUpdate = data => createAPI(`/questions/${data.id}`, 'put', data)
}

export default new Add()
