import type {
  AiIndexMaterialResp,
  AiLoginParams,
  AiLoginResp,
  AiRenovationTaskListResp,
  AiUserInfoResp,
  SubmitTaskPayload,
  SubmitTaskResp,
  TaskInfoResp,
} from './types/aifreedom'
import { http } from '@/http/http'

export function aiLoginIn(params: AiLoginParams) {
  return http.post<AiLoginResp>('/app/login/loginIn', params)
}

export function aiSendLoginCode(params: { account: string, accountType: 'mobile' | 'email', countryCode?: string }) {
  return http.post('/app/login/sendLoginCode', params)
}

export function aiUserInfoQuery() {
  return http.get<AiUserInfoResp>('/app/base/userInfo/query')
}

export function aiIndexMaterialList() {
  return http.get<AiIndexMaterialResp>('/app/ai-renovation/index-material')
}

export function aiRenovationTaskList(params: { pageNo: number, pageSize: number, taskType?: number }) {
  return http.post<AiRenovationTaskListResp>('/app/ai-renovation/task-list', params)
}

export function aiRenovationSubmitTask(params: SubmitTaskPayload) {
  return http.post<SubmitTaskResp>('/app/ai-renovation/submit-task', params)
}

export function aiRenovationTaskInfo(taskCode: string) {
  return http.get<TaskInfoResp>('/app/ai-renovation/task-info', { taskCode })
}

export function aiRenovationTaskImagesQuery(taskCode: string) {
  return http.get<{ images: string[] }>('/app/ai-renovation/task-images/query', { taskCode })
}

export function aiRenovationStyleList(params: { roomType: number, taskType: number }) {
  return http.post<Array<{ styleId: number, styleName: string, styleImage?: string }>>('/app/ai-renovation/style-list', params)
}

export function aiLogout() {
  return http.post('/app/base/loginOut')
}
