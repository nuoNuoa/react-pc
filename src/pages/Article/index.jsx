import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  DatePicker,
  Select,
  Table,
  Tag,
  Space,
  Popconfirm,
} from 'antd'
import { useState, useEffect } from 'react'
import { http } from '@/utils'
import { history } from '@/utils/history'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
// 用于国际化
import locale from 'antd/es/date-picker/locale/zh_CN'
import './index.scss'
import img404 from '@/assets/error.png'
import { useStore } from '@/store'
import { observer } from 'mobx-react-lite'

const { Option } = Select
const { RangePicker } = DatePicker

const Article = observer(() => {
  // 获取频道列表
  const { channelStore } = useStore()
  // 文章列表数据管理
  const [article, setArticleList] = useState({
    list: [],
    count: 0,
  })
  // 参数管理
  const [params, setParams] = useState({
    page: 1,
    per_page: 10,
  })
  useEffect(() => {
    async function fetchArticleList() {
      const res = await http.get('/mp/articles', { params })
      const { results, total_count } = res.data
      setArticleList({
        list: results,
        count: total_count,
      })
    }
    fetchArticleList()
  }, [params])

  const columns = [
    {
      title: '封面',
      dataIndex: 'cover',
      width: 120,
      render: (cover) => {
        return (
          <img src={cover.images || img404} width={80} height={60} alt="" />
        )
      },
    },
    {
      title: '标题',
      dataIndex: 'title',
      width: 220,
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: (status) => {
        return <Tag color="green">{status === 2 ? '待审核' : '审核通过'}</Tag>
      },
    },
    {
      title: '发布时间',
      dataIndex: 'pubdate',
    },
    {
      title: '阅读数',
      dataIndex: 'read_count',
    },
    {
      title: '评论数',
      dataIndex: 'comment_count',
    },
    {
      title: '点赞数',
      dataIndex: 'like_count',
    },
    {
      title: '操作',
      render: (data) => {
        return (
          <Space size="middle">
            <Button
              type="primary"
              shape="circle"
              icon={<EditOutlined />}
              onClick={() => history.push(`/publish?id=${data.id}`)}
            />
            <Popconfirm
              title="确认删除该条文章吗?"
              onConfirm={() => delArticle(data)}
              okText="确认"
              cancelText="取消">
              <Button
                type="primary"
                danger
                shape="circle"
                icon={<DeleteOutlined />}
              />
            </Popconfirm>
          </Space>
        )
      },
    },
  ]

  const onSearch = (values) => {
    const { status, channel_id, date } = values
    const _params = {}

    _params.status = status
    if (channel_id) {
      _params.channel_id = channel_id
    }
    // 渲染列表之前传入的params 传入begin_pubdate和end_pubdate会报错
    if (date) {
      _params.begin_pubdate = date[0].format('YYYY-MM-DD')
      _params.end_pubdate = date[1].format('YYYY-MM-DD')
    }

    setParams({
      ...params,
      ..._params,
    })
  }
  const pageChange = (page) => {
    // 拿到当前页参数 修改params 引起接口更新
    setParams({
      ...params,
      page,
    })
  }

  const delArticle = async (data) => {
    await http.delete(`/mp/articles/${data.id}`)
    // 更新列表
    setParams({
      page: 1,
      per_page: 10,
    })
  }

  return (
    <div>
      <Card
        title={
          <Breadcrumb
            separator=">"
            items={[
              { title: '首页', href: '/' },
              {
                title: '内容管理',
                href: '',
              },
            ]}
          />
        }
        style={{ marginBottom: 20 }}>
        <Form initialValues={{ status: 0, channel_id: 0 }} onFinish={onSearch}>
          <Form.Item label="状态" name="status">
            <Radio.Group>
              <Radio value={0}>全部</Radio>
              <Radio value={1}>草稿</Radio>
              <Radio value={2}>待审核</Radio>
              <Radio value={3}>审核通过</Radio>
              <Radio value={4}>审核失败</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="频道" name="channel_id">
            <Select placeholder="请选择文章频道" style={{ width: 200 }}>
              {channelStore.channelList.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="日期" name="date">
            {/* 传入locale属性 控制中文显示*/}
            <RangePicker locale={locale}></RangePicker>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginLeft: 80 }}>
              筛选
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <Card title={`根据筛选条件共查询到  ${article.count} 条结果：`}>
        <Table
          rowKey="id"
          columns={columns}
          dataSource={article.list}
          pagination={{
            position: ['bottomCenter'],
            current: params.page,
            pageSize: 5 || params.per_page,
            onChange: pageChange,
          }}
        />
      </Card>
    </div>
  )
})

export default Article
