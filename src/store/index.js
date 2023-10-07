import React from "react"
import LoginStore from './login.Store'
import UserStore from "./user.Store"
import ChannelStore from "./channel.Store"

import { configure } from "mobx"

configure({
  enforceActions: 'never'
})

class RootStore {
  // 组合模块
  constructor() {
    this.loginStore = new LoginStore()
    this.userStore = new UserStore()
    this.channelStore = new ChannelStore()
  }
}
// 导入useStore方法供组件使用数据
const StoresContext = React.createContext(new RootStore())
const useStore = () => React.useContext(StoresContext)
export { useStore }