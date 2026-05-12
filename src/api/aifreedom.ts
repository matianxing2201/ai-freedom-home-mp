import type {
  AiAppInitParams,
  AiAppInitResp,
  AiIndexMaterialResp,
  AiLoginParams,
  AiLoginResp,
  AiRenovationTaskListResp,
  AiSendLoginCodeParams,
  AiUserInfoResp,
  SubmitTaskPayload,
  SubmitTaskResp,
  TaskInfoResp,
} from './types/aifreedom'
import { http } from '@/http/http'

// 登录
export function aiLoginIn(params: AiLoginParams) {
  return http.post<AiLoginResp>('/app/login/loginIn', params)
}

// 发送登录验证码
export function aiSendLoginCode(params: AiSendLoginCodeParams) {
  return http.post('/app/login/sendLoginCode', params)
}

// 查询用户信息
export function aiUserInfoQuery() {
  return http.get<AiUserInfoResp>('/app/base/userInfo/query')
}

// 查询首页素材
export function aiIndexMaterialList() {
  return http.get<AiIndexMaterialResp>('/app/ai-renovation/index-material')
}

// 查询任务列表
export function aiRenovationTaskList(params: { pageNo: number, pageSize: number, taskType?: number }) {
  return http.post<AiRenovationTaskListResp>('/app/ai-renovation/task-list', params)
}

// 提交任务
export function aiRenovationSubmitTask(params: SubmitTaskPayload) {
  return http.post<SubmitTaskResp>('/app/ai-renovation/submit-task', params)
}

// 查询任务详情
export function aiRenovationTaskInfo(taskCode: string) {
  return http.get<TaskInfoResp>('/app/ai-renovation/task-info', { taskCode })
}

// 查询任务图片
export function aiRenovationTaskImagesQuery(taskCode: string) {
  return http.get<{ images: string[] }>('/app/ai-renovation/task-images/query', { taskCode })
}

// 查询风格列表
export function aiRenovationStyleList(params: { roomType: number, taskType: number }) {
  return http.post<Array<{ styleId: number, styleName: string, styleImage?: string }>>('/app/ai-renovation/style-list', params)
}

// 退出登录
export function aiLogout() {
  return http.post('/app/base/loginOut')
}

// 版本更新检查
export function aiAppInit(params: AiAppInitParams) {
  return http.post<AiAppInitResp>('/app/common/appInit', params)
}
