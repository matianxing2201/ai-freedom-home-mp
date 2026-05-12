import type { AiLoginParams } from "@/api/types/aifreedom";
import { aiLoginIn, aiSendLoginCode } from "@/api/aifreedom";
import { useAifreedomAuthStore } from "@/store";

const serviceUrlCN =
  "https://furnishare.andart.com.sg/ai-free-terms-service-cn.html";
const privacyUrlCN = "https://furnishare.andart.com.sg/ai-free-policy-cn.html";

export function useLoginLogic() {
  const authStore = useAifreedomAuthStore();

  const account = ref("");
  const code = ref("");
  const password = ref("");
  const accountType = ref<"mobile" | "email">("mobile");
  const loginType = ref<"code" | "password">("code");
  const loading = ref(false);
  const agreed = ref(false);
  const sendCooldown = ref(0);
  let timer: ReturnType<typeof setInterval> | null = null;

  // 初始化数据
  onLoad(() => {
    const savedAccount = uni.getStorageSync("login_account") || "";
    const savedEmail = uni.getStorageSync("login_email") || "";
    const savedAgree = uni.getStorageSync("login_agree") || false;

    agreed.value = savedAgree;

    if (accountType.value === "mobile") {
      account.value = savedAccount;
    } else {
      account.value = savedEmail;
    }
  });

  // 计算属性：是否可以提交
  const canSubmit = computed(() => {
    const validAccount = account.value.trim().length >= 6;
    const validVerify =
      loginType.value === "code"
        ? code.value.trim().length >= 4
        : password.value.trim().length >= 6;
    return validAccount && validVerify && agreed.value && !loading.value;
  });

  // 计算属性：是否可以发送验证码
  const canSendCode = computed(() => {
    if (sendCooldown.value > 0) return false;

    if (accountType.value === "mobile") {
      const mobile = account.value.trim();
      return /^1\d{10}$/.test(mobile);
    }

    return /^\S[^\s@]*@\S[^\s.]*\.\S+$/.test(account.value.trim());
  });

  // 计算属性：发送按钮文字
  const sendCodeText = computed(() => {
    return sendCooldown.value > 0 ? `${sendCooldown.value}s` : "获取验证码";
  });

  // 开始倒计时
  function startCooldown() {
    sendCooldown.value = 60;
    if (timer) clearInterval(timer);

    timer = setInterval(() => {
      sendCooldown.value -= 1;
      if (sendCooldown.value <= 0 && timer) {
        clearInterval(timer);
        timer = null;
      }
    }, 1000);
  }

  // 切换账号类型
  function switchAccountType(type: "mobile" | "email") {
    if (accountType.value === type) return;

    accountType.value = type;
    account.value = "";
    code.value = "";
    password.value = "";
    sendCooldown.value = 0;
    if (timer) {
      clearInterval(timer);
      timer = null;
    }

    if (type === "mobile") {
      account.value = uni.getStorageSync("login_account") || "";
    } else {
      account.value = uni.getStorageSync("login_email") || "";
    }
  }

  // 切换登录方式
  function switchLoginType(type: "code" | "password") {
    loginType.value = type;
    code.value = "";
    password.value = "";
  }

  // 发送验证码
  async function sendCode() {
    if (!canSendCode.value) {
      uni.showToast({
        title:
          accountType.value === "mobile"
            ? "请输入正确的手机号"
            : "请输入正确的邮箱",
        icon: "none",
      });
      return;
    }

    const params: {
      verifyType: number;
      countryCode?: string;
      mobile?: string;
      email?: string;
    } = {
      verifyType: accountType.value === "mobile" ? 1 : 2,
    };

    if (accountType.value === "mobile") {
      params.countryCode = "+86";
      params.mobile = account.value.trim();
    } else {
      params.email = account.value.trim();
    }

    const res = await aiSendLoginCode(params);

    if (res) {
      startCooldown();
      uni.showToast({ title: "验证码已发送", icon: "none" });
    }
  }

  // 登录提交
  async function submit() {
    if (!canSubmit.value) return;

    if (!agreed.value) {
      uni.showToast({ title: "请先同意用户协议和隐私政策", icon: "none" });
      return;
    }

    loading.value = true;

    try {
      const params: AiLoginParams = {
        loginType:
          loginType.value === "code"
            ? accountType.value === "mobile"
              ? 1
              : 2
            : 0,
      };

      if (accountType.value === "mobile") {
        params.countryCode = "+86";
        params.mobile = account.value.trim();
      } else {
        params.email = account.value.trim();
      }

      if (loginType.value === "code") {
        params.captcha = code.value.trim();
      } else {
        params.loginPassword = password.value.trim();
      }

      const res = await aiLoginIn(params);

      if (res) {
        authStore.setToken(res.tokenInfoVO?.accessToken || "", res.uid);
        authStore.setUserInfo({
          userId: Number(res.uid),
        });

        if (accountType.value === "mobile") {
          uni.setStorageSync("login_account", account.value.trim());
        } else {
          uni.setStorageSync("login_email", account.value.trim());
        }
        uni.setStorageSync("login_agree", true);

        code.value = "";
        sendCooldown.value = 0;
        if (timer) {
          clearInterval(timer);
          timer = null;
        }

        uni.showToast({ title: "登录成功", icon: "success" });

        // 延迟跳转：有记录的目标页面则直接跳目标页，否则回首页
        setTimeout(() => {
          const redirectUrl = uni.getStorageSync("aifreedom_login_redirect");
          uni.removeStorageSync("aifreedom_login_redirect");
          if (redirectUrl) {
            uni.reLaunch({ url: redirectUrl });
          } else {
            uni.reLaunch({ url: "/pages/aifreedom/home/index" });
          }
        }, 500);
      }
    } finally {
      loading.value = false;
    }
  }

  // 切换协议同意状态
  function toggleAgree() {
    agreed.value = !agreed.value;
  }

  // 打开用户协议
  function openUserProtocol() {
    uni.navigateTo({
      url: `/pages/webview/index?url=${encodeURIComponent(serviceUrlCN)}&title=用户协议`,
    });
  }

  // 打开隐私政策
  function openPrivacyProtocol() {
    uni.navigateTo({
      url: `/pages/webview/index?url=${encodeURIComponent(privacyUrlCN)}&title=隐私政策`,
    });
  }

  onUnmounted(() => {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  });

  return {
    account,
    code,
    password,
    accountType,
    loginType,
    loading,
    agreed,
    canSubmit,
    canSendCode,
    sendCodeText,
    switchAccountType,
    switchLoginType,
    sendCode,
    submit,
    toggleAgree,
    openUserProtocol,
    openPrivacyProtocol,
  };
}
