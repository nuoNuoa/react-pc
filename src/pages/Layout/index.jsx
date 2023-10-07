import { Layout, Menu, Popconfirm, message } from 'antd'
import {
  HomeOutlined,
  DiffOutlined,
  EditOutlined,
  LogoutOutlined,
} from '@ant-design/icons'
import './index.scss'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

import { useEffect, useState } from 'react'
import { useStore } from '@/store'
import { observer } from 'mobx-react-lite'
const { Header, Sider } = Layout

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  }
}
const items = [
  getItem('数据概览', '/', <HomeOutlined />),
  getItem('内容管理', '/article', <DiffOutlined />),
  getItem('发布文章', '/publish', <EditOutlined />),
]

const PcLayout = observer(() => {
  const navigate = useNavigate()

  const routerChange = (e) => {
    navigate(e.key, { replace: true })
  }
  const location = useLocation()
  const [selectedKey, setSelectedKey] = useState('')
  useEffect(() => {
    // 在路由变化时更新选中的菜单项
    const path = location.pathname
    setSelectedKey(path)
  }, [location])

  const { userStore, loginStore, channelStore } = useStore()
  // 获取用户数据
  useEffect(() => {
    try {
      userStore.getUserInfo()
      channelStore.loadChannelList()
    } catch {
      message.error('获取信息失败')
    }
  }, [userStore, channelStore])

  const onLogout = () => {
    loginStore.loginOut()
    navigate('/login')
  }
  return (
    <Layout style={{ height: '100vh' }}>
      <Header className="header">
        <div className="logo" />
        <div className="user-info">
          <span className="user-name">{userStore.userInfo.name}</span>
          <span className="user-logout">
            <Popconfirm
              title="是否确认退出"
              okText="退出"
              cancelText="取消"
              onConfirm={onLogout}>
              <LogoutOutlined /> 退出
            </Popconfirm>
          </span>
        </div>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            theme="dark"
            selectedKeys={[selectedKey]}
            style={{ height: '100%', borderRight: 0 }}
            items={items}
            onClick={routerChange}
          />
        </Sider>
        <Layout className="layout-content" style={{ padding: 20 }}>
          <Outlet />
        </Layout>
      </Layout>
    </Layout>
  )
})
export default PcLayout
