export interface ApiUploadConfig {
  endpoint?: string
  maxSize?: number
}

export interface AiIndexMaterialResp {
  emptyRoomDesignUrl: string
  existingRoomDesignUrl: string
  softFurnishingStyingUrl: string
  carouselList?: Array<{
    id: number
    fileUrl: string
    fileType: number
    materialType: number
    sort: number
  }>
}

export interface AiLoginParams {
  account: string
  code?: string
  password?: string
  accountType: 'mobile' | 'email'
  loginType: 'code' | 'password'
  countryCode?: string
}

export interface AiLoginResp {
  token: string
  refreshToken?: string
  userId?: number
}

export interface AiUserInfoResp {
  userId: number
  nickname: string
  avatar?: string
  email?: string
  mobile?: string
}

export interface AiRenovationTaskItem {
  taskCode: string
  status: string
  taskType: number
  roomType: number
  styleId?: number
  createTime?: string
  resultUrl?: string
  originUrl?: string
}

export interface AiRenovationTaskListResp {
  records: AiRenovationTaskItem[]
  total: number
  pageNo: number
  pageSize: number
}

export interface SubmitTaskPayload {
  taskType: number
  roomType: number
  styleId?: number
  originPicUrl: string
  furniturePicUrl?: string
  paintPoints?: Array<{ x: number, y: number, color?: string, width?: number }>
}

export interface SubmitTaskResp {
  taskCode: string
}

export interface TaskInfoResp {
  taskCode: string
  status: string
  progress?: number
  taskType: number
  roomType: number
  styleId?: number
  resultUrls?: string[]
}
