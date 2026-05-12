export interface ApiUploadConfig {
  endpoint?: string;
  maxSize?: number;
}

export interface AiIndexMaterialResp {
  emptyRoomDesignUrl: string;
  existingRoomDesignUrl: string;
  softFurnishingStyingUrl: string;
  carouselList?: Array<{
    id: number;
    fileUrl: string;
    fileType: number;
    materialType: number;
    sort: number;
  }>;
}

// 登录参数
// loginType: 0-密码登录, 1-手机号验证码登录, 2-邮箱验证码登录
export interface AiLoginParams {
  loginType: number;
  // 手机号登录
  mobile?: string;
  countryCode?: string;
  // 邮箱登录
  email?: string;
  // 验证码
  captcha?: string;
  // 密码
  loginPassword?: string;
}

// Token 信息
export interface TokenInfoVO {
  uid: string;
  accessToken: string;
  expiresIn: number;
}

// 登录响应
export interface AiLoginResp {
  uid: string;
  newUserFlag: boolean;
  tokenInfoVO: TokenInfoVO;
  hasPwd: number;
}

export interface AiUserInfoResp {
  userId: number;
  nickname: string;
  avatar?: string;
  email?: string;
  mobile?: string;
  countryCode?: string;
}

export interface AiRenovationTaskItem {
  taskCode: string;
  status: string;
  taskType: number;
  roomType: number;
  styleId?: number;
  createTime?: string;
  resultUrl?: string;
  originUrl?: string;
}

export interface AiRenovationTaskListResp {
  records: AiRenovationTaskItem[];
  total: number;
  pageNo: number;
  pageSize: number;
}

export interface SubmitTaskPayload {
  taskType: number;
  roomType: number;
  styleId?: number;
  originPicUrl: string;
  furniturePicUrl?: string;
  paintPoints?: Array<{ x: number; y: number; color?: string; width?: number }>;
}

export interface SubmitTaskResp {
  taskCode: string;
}

export interface TaskInfoResp {
  taskCode: string;
  status: string;
  progress?: number;
  taskType: number;
  roomType: number;
  styleId?: number;
  resultUrls?: string[];
}

// 发送验证码参数
// verifyType: 1-手机号, 2-邮箱
export interface AiSendLoginCodeParams {
  verifyType: number;
  mobile?: string;
  email?: string;
  countryCode?: string;
}

// 版本更新检查参数
export interface AiAppInitParams {
  type: number; // 1-Android, 2-iOS
}

// 版本更新信息
export interface AiVersionInfo {
  id?: number;
  type: number;
  downloadType: number;
  version: string;
  link: string;
  enforce: number;
  content: string;
  createTime?: string;
  updateTime?: string;
}

// 版本更新检查响应
export interface AiAppInitResp {
  needUpdate: boolean;
  forceUpdate: boolean;
  versionInfo?: AiVersionInfo;
}
