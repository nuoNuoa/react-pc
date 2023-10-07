import { useState, useEffect, useRef } from 'react'
import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  Input,
  Upload,
  Space,
  Select,
  message,
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import './index.scss'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useStore } from '@/store'
import { observer } from 'mobx-react-lite'
import { http } from '@/utils'
import { useNavigate, useSearchParams } from 'react-router-dom'

const { Option } = Select
// observer 函数/装饰器可以用来将 React 组件转变成响应式组件。
// 它包装了组件的 render 函数以确保任何组件渲染中使用的数据变化时都可以强制刷新组件。
const Publish = observer(() => {
  const navigate = useNavigate()
  // 频道列表
  const { channelStore } = useStore()
  // 上传图的数量
  const [imgCount, setImgCount] = useState(0)
  // 图像列表
  const [fileList, setFileList] = useState([])
  // 1. 声明一个暂存仓库
  const fileListRef = useRef([])
  // 上传成功回调
  const onUploadChange = (info) => {
    const fileList = info.fileList.map((file) => {
      if (file.response) {
        return {
          url: file.response.data.url,
        }
      }
      return file
    })
    setFileList(fileList)
    // 图片列表存入
    fileListRef.current = fileList
  }
  // 图片数量切换
  const changeType = (e) => {
    const count = e.target.value
    setImgCount(count)
    if (count === 1) {
      // 单图，只展示第一张
      const firstImg = fileListRef.current[0]
      setFileList(!firstImg ? [] : [firstImg])
    } else if (count === 3) {
      // 三图，展示所有图片
      setFileList(fileListRef.current)
    }
  }

  // 提交表单
  const onFinish = async (values) => {
    const { type, ...rest } = values
    const data = {
      ...rest,
      cover: {
        type: type,
        images: fileList.map((item) => item.url),
      },
    }
    if (articleId) {
      await http.put(`/mp/articles/${articleId}?draft=false`, data)
    } else {
      await http.post('/mp/articles?draft=false', data)
    }
    //  跳转列表，提示用户
    navigate('/article')
    message.success(`${articleId ? '更新成功' : '发布成功'}`)
  }
  // 编辑功能
  // 获取路由路径
  const [params] = useSearchParams()
  // 获取文章id
  const articleId = params.get('id')
  // 数据回填  id调用接口  1. 表单回填  2. 暂存列表  3. Upload组件fileList
  const form = useRef(null)
  useEffect(() => {
    async function getArticle() {
      const res = await http.get(`/mp/articles/${articleId}`)
      const { cover, ...formValue } = res.data
      // 表单数据回填 实例方法
      form.current.setFieldsValue({ ...formValue, type: cover.type })
      // 格式化封面图片数据
      const imageList = cover.images.map((url) => ({ url }))
      setFileList(imageList)
      setImgCount(cover.type)
      fileListRef.current = imageList
    }
    // 必须是编辑状态，才能发送请求
    if (articleId) {
      // 拉取数据回显
      getArticle()
    } else {
      form.current.resetFields()
      setFileList([])
      setImgCount(0)
      fileListRef.current = []
    }
  }, [articleId])

  return (
    <div className="publish">
      <Card
        title={
          <Breadcrumb
            separator=">"
            items={[
              { title: '首页', href: '/' },
              {
                title: `${articleId ? '修改文章' : '发布文章'}`,
                href: '',
              },
            ]}
          />
        }>
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ type: null, content: '' }}
          onFinish={onFinish}
          ref={form}>
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: '请输入文章标题' }]}>
            <Input placeholder="请输入文章标题" style={{ width: 400 }} />
          </Form.Item>
          <Form.Item
            label="频道"
            name="channel_id"
            rules={[{ required: true, message: '请选择文章频道' }]}>
            <Select placeholder="请选择文章频道" style={{ width: 400 }}>
              {channelStore.channelList.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="封面" name="type">
            <Radio.Group onChange={changeType}>
              <Radio value={0}>无图</Radio>
              <Radio value={1}>单图</Radio>
              <Radio value={3}>三图</Radio>
            </Radio.Group>
            {imgCount > 0 && (
              <Upload
                name="image"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList
                action="http://geek.itheima.net/v1_0/upload"
                maxCount={imgCount}
                multiple={imgCount > 1}
                fileList={fileList}
                onChange={onUploadChange}>
                <div style={{ marginTop: 8 }}>
                  <PlusOutlined />
                </div>
              </Upload>
            )}
          </Form.Item>
          <Form.Item
            label="内容"
            name="content"
            rules={[{ required: true, message: '请输入文章内容' }]}>
            <ReactQuill
              className="publish-quill"
              theme="snow"
              placeholder="请输入文章内容"
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                {articleId ? '修改文章' : '发布文章'}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
})

export default Publish
