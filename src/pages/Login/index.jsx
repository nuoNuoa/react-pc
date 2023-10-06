import { Form, Card, Input, Button, Checkbox, message } from 'antd'
import { useStore } from '@/store'
import './index.scss'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()
  const { loginStore } = useStore()
  const onFinish = async (values) => {
    const { mobile, code } = values
    try {
      // 登录
      await loginStore.login({ mobile, code })
      // 跳转首页
      navigate('/')
      // 提示用户
      message.success('登录成功')
    } catch (e) {
      // ?.  这是可选链操作符，它用于检查属性是否存在，以避免出现空引用错误。
      // 如果e.response为null或undefined，那么后面的表达式将不会执行。
      //以下代码是用于逐步检查各个属性是否存在
      message.error(e.response?.data?.message || '登录失败')
    }
  }
  return (
    <div className="login">
      <Card className="login-container">
        <Form
          onFinish={onFinish}
          initialValues={{
            mobile: '13911111111',
            code: '246810',
            remember: true,
          }}
          validateTrigger={['onBlur', 'onChange']}>
          <Form.Item
            name="mobile"
            rules={[
              {
                pattern: /^1[3-9]\d{9}$/,
                message: '手机号码格式不对',
                validateTrigger: 'onBlur',
              },
              { required: true, message: '请输入手机号' },
            ]}>
            <Input size="large" placeholder="请输入手机号"></Input>
          </Form.Item>
          <Form.Item
            name="code"
            rules={[
              { len: 6, message: '验证码6个字符', validateTrigger: 'onBlur' },
              { required: true, message: '请输入验证码' },
            ]}>
            <Input
              size="large"
              placeholder="请输入验证码"
              maxLength={6}></Input>
          </Form.Item>
          <Form.Item name="remember" valuePropName="checked">
            <Checkbox className="login-checkbox-label">
              我已阅读并同意「用户协议」和「隐私条款」
            </Checkbox>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}
export default Login
