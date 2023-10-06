// 登录模块
import { makeAutoObservable } from "mobx"
import { setToken, getToken, clearToken, http } from '@/utils'
import { message } from "antd"


class LoginStore {
  token = getToken || ''
  constructor() {
    makeAutoObservable(this)
  }
  // 登录
  login = async ({ mobile, code }) => {
    const res = await http.post('http://geek.itheima.net/v1_0/authorizations', {
      mobile,
      code
    })
    this.token = res.data.token
    setToken(res.data.token)
  }
  loginOut = () => {
    this.token = ''
    clearToken()
    message.success('成功退出')
  }
}
export default LoginStore