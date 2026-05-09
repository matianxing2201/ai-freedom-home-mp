# AI Freedom Home（AI自由家）

基于 **uni-app + Vue 3 + TypeScript + Vite 5 + UnoCSS** 的跨平台应用，支持 H5、微信小程序、APP（iOS/Android/HarmonyOS）多端运行。

## 技术栈

| 类别 | 技术 |
|------|------|
| 框架 | uni-app 3.0 |
| UI 框架 | Vue 3 (Composition API) |
| 语言 | TypeScript |
| 构建工具 | Vite 5 |
| CSS 方案 | UnoCSS (原子化 CSS) |
| 状态管理 | Pinia |
| HTTP 请求 | alova |
| 包管理器 | pnpm |
| 代码规范 | ESLint + @uni-helper/eslint-config |

## 功能模块

### AI 装修
- **户型选择** - 选择合适的房屋户型
- **风格定制** - 选择心仪的装修风格
- **图片上传** - 上传房屋照片
- **方案生成** - AI 自动生成装修效果图
- **结果展示** - 查看和分享生成的设计方案
- **任务列表** - 管理历史装修任务

### AI 自由家
- **首页** - 视频展示、功能入口
- **登录/注册** - 用户认证
- **个人中心** - 用户信息管理
- **作品集** - 管理设计作品
- **日记** - 装修日记记录
- **反馈** - 用户意见反馈
- **账号设置** - 账号安全与偏好设置

## 环境要求

- **Node.js** >= 20
- **pnpm** >= 9

## 快速开始

```bash
# 安装依赖
pnpm install

# 开发 H5 版本
pnpm dev

# 开发微信小程序
pnpm dev:mp

# 开发 APP
pnpm dev:app
```

## 开发命令

### 开发

```bash
pnpm dev              # H5 开发
pnpm dev:mp           # 微信小程序开发
pnpm dev:mp-alipay    # 支付宝小程序开发
pnpm dev:app          # APP 开发
pnpm dev:app-android  # Android 开发
pnpm dev:app-ios      # iOS 开发
```

### 构建

```bash
pnpm build            # H5 构建
pnpm build:mp         # 微信小程序构建
pnpm build:mp-alipay  # 支付宝小程序构建
pnpm build:app        # APP 构建
```

### 代码检查

```bash
pnpm lint             # ESLint 检查
pnpm lint:fix         # ESLint 自动修复
pnpm type-check       # TypeScript 类型检查
```

## 环境变量

环境变量配置文件位于 `env/` 目录：

| 文件 | 说明 |
|------|------|
| `.env` | 通用配置（所有环境生效） |
| `.env.development` | 开发环境配置 |
| `.env.production` | 生产环境配置 |
| `.env.test` | 测试环境配置 |

### 主要环境变量

| 变量名 | 说明 |
|--------|------|
| `VITE_APP_TITLE` | 应用名称 |
| `VITE_SERVER_BASEURL` | API 请求地址 |
| `VITE_UNI_APPID` | uni-app AppID |
| `VITE_WX_APPID` | 微信小程序 AppID |
| `VITE_APP_PUBLIC_BASE` | H5 部署路径 |
| `VITE_APP_PROXY_ENABLE` | 是否启用 H5 代理 |

## 目录结构

```
src/
├── api/                # API 接口定义
├── components/         # 全局组件
├── hooks/              # 组合式函数
├── http/               # alova HTTP 请求封装
├── layouts/            # 布局组件
├── pages/              # 页面文件（约定式路由）
│   ├── aifreedom/      # AI 自由家模块
│   │   ├── home/       # 首页
│   │   ├── login/      # 登录
│   │   ├── profile/    # 个人中心
│   │   ├── gallery-list/   # 作品集
│   │   ├── diary-list/     # 日记列表
│   │   ├── feedback/       # 反馈
│   │   └── settings/       # 设置
│   └── ai-renovation/  # AI 装修模块
│       ├── type-select/  # 户型选择
│       ├── style-step/   # 风格定制
│       ├── upload/       # 图片上传
│       └── result/       # 结果展示
├── store/              # Pinia 状态管理
├── static/             # 静态资源
├── tabbar/             # 底部导航栏配置
├── types/              # TypeScript 类型定义
└── utils/              # 工具函数
```

## 微信小程序上传

```bash
pnpm upload:mp
```

## License

MIT
