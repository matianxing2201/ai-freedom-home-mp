import type { AiLoginParams } from '@/api/types/aifreedom'
import { aiSendLoginCode } from '@/api/aifreedom'
import { useAifreedomAuthStore } from '@/store'

export function useLoginLogic() {
  const authStore = useAifreedomAuthStore()

  const account = ref('')
  const code = ref('')
  const password = ref('')
  const accountType = ref<'mobile' | 'email'>('mobile')
  const loginType = ref<'code' | 'password'>('code')
  const loading = ref(false)
  const sendCooldown = ref(0)
  let timer: ReturnType<typeof setInterval> | null = null

  const canSubmit = computed(() => {
    const validAccount = account.value.trim().length >= 6
    const validVerify = loginType.value === 'code'
      ? code.value.trim().length >= 4
      : password.value.trim().length >= 6
    return validAccount && validVerify && !loading.value
  })

  const canSendCode = computed(() => {
    if (sendCooldown.value > 0)
      return false

    if (accountType.value === 'mobile')
      return /^1\d{10}$/.test(account.value.trim())

    return /^\S+@\S+\.\S+$/.test(account.value.trim())
  })

  const sendCodeText = computed(() => {
    return sendCooldown.value > 0 ? `${sendCooldown.value}s` : '发送'
  })

  const startCooldown = () => {
    sendCooldown.value = 60
    if (timer)
      clearInterval(timer)

    timer = setInterval(() => {
      sendCooldown.value -= 1
      if (sendCooldown.value <= 0 && timer) {
        clearInterval(timer)
        timer = null
      }
    }, 1000)
  }

  const switchAccountType = (type: 'mobile' | 'email') => {
    accountType.value = type
    code.value = ''
    password.value = ''
    sendCooldown.value = 0
    if (timer) {
      clearInterval(timer)
      timer = null
    }
  }

  const switchLoginType = (type: 'code' | 'password') => {
    loginType.value = type
    code.value = ''
    password.value = ''
  }

  onUnmounted(() => {
    if (timer) {
      clearInterval(timer)
      timer = null
    }
  })

  const sendCode = async () => {
    if (!canSendCode.value) {
      uni.showToast({
        title: accountType.value === 'mobile' ? '请输入正确手机号' : '请输入正确邮箱',
        icon: 'none',
      })
      return
    }

    await aiSendLoginCode({
      account: account.value.trim(),
      accountType: accountType.value,
      countryCode: '+86',
    })

    startCooldown()
    uni.showToast({ title: '验证码已发送', icon: 'none' })
  }

  const submit = async () => {
    if (!canSubmit.value)
      return

    loading.value = true
    try {
      const params: AiLoginParams = {
        account: account.value.trim(),
        accountType: accountType.value,
        loginType: loginType.value,
        countryCode: '+86',
      }

      if (loginType.value === 'code') {
        params.code = code.value.trim()
      }
      else {
        params.password = password.value
      }

      await authStore.login(params)
      uni.reLaunch({ url: '/pages/aifreedom/home/index' })
    }
    finally {
      loading.value = false
    }
  }

  return {
    account,
    code,
    password,
    accountType,
    loginType,
    loading,
    canSubmit,
    canSendCode,
    sendCodeText,
    switchAccountType,
    switchLoginType,
    sendCode,
    submit,
  }
}
