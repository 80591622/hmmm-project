/*
 * @Author: taoshiwei
 * @Date: 2019-04-09 14:39:32
 * @Last Modified by: taoshiwei
 * @Last Modified time: 2019-04-29 14:53:23
 *
 * 学科
 */

import { createAPI } from '@/utils/request'

class Subject {
  // 学科列表
  list = data => createAPI('/subjects', 'get', data)

  // 学科简单列表
  simple = data => createAPI('/subjects/simple', 'get', data)

  // 学科详情
  detail = data => createAPI(`/subjects/${data.id}`, 'get', data)

  // 学科添加
  add = data => createAPI('/subjects', 'post', data)

  // 学科修改
  update = data => createAPI(`/subjects/${data.id}`, 'put', data)

  // 学科删除
  remove = data => createAPI(`/subjects/${data.id}`, 'delete', data)
}

export default new Subject()
