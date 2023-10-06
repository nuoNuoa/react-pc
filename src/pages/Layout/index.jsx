import { Layout, Menu, Popconfirm, message } from 'antd'
import {
  HomeOutlined,
  DiffOutlined,
  EditOutlined,
  LogoutOutlined,
} from '@ant-design/icons'
import './index.scss'
import { Outlet, useNavigate } from 'react-router-dom'

import { useEffect } from 'react'
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

const PcLayout = () => {
  const navigate = useNavigate()

  const routerChange = (e) => {
    navigate(e.key, { replace: true })
  }

  const { userStore, loginStore } = useStore()
  // 获取用户数据
  useEffect(() => {
    try {
      userStore.getUserInfo()
    } catch {
      message.error('获取信息失败')
    }
  }, [userStore])

  const onLogout = () => {
    loginStore.loginOut()
    navigate('/login')
  }
  return (
    <Layout>
      <Header>
        <div className="logo" />
        <div className="user-info">
          <span className="user-name">user.name</span>
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
            defaultSelectedKeys={['1']}
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
}
export default observer(PcLayout)
