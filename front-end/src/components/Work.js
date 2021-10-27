import react, { useEffect } from "react"
import { Form, Input, Button } from "antd"

const Work = (props) => {
  const [form] = Form.useForm()
  useEffect(() => {
    form.setFieldsValue({
      title: "任务待办",
      url: "/toWork",
      createTime: "2021-07-05 16:00:00",
      formTitle: "标题",
      formContent: "内容",
    })
  }, [])

  const onSubmit = (data) => {
    props.onClick(data)
  }
  let usernamelist = []
  for (let i = 0; i < props.users.length; i++) {
    usernamelist.push(props.users[i].name)
  }
  if (props.showType === 2) {
    return (
      <div>
        <h4 className="title">创建任务</h4>
        <text className="littleTitle">代办人：{usernamelist.join(",")}</text>
        <Form form={form} onFinish={onSubmit}>
          <Form.Item label="任务标题" name="title">
            <Input placeholder="请输入标题" />
          </Form.Item>
          <Form.Item label="任务链接" name="url">
            <Input placeholder="请输入任务链接" />
          </Form.Item>
          <Form.Item label="待办时间" name="createTime">
            <Input placeholder="输入格式：yyyy-MM-dd hh:mm:ss" />
          </Form.Item>
          <Form.Item label="小标题" name="formTitle">
            <Input placeholder="请输入小标题" />
          </Form.Item>
          <Form.Item label="学习内容" name="formContent">
            <Input placeholder="请输入学习内容" />
          </Form.Item>
          <Button htmlType="submit" type="primary">
            提交
          </Button>
        </Form>
        {/* <div className="page-section">
          <div className="form-row">
            <div className="form-row-label">任务标题</div>
            <div className="form-row-content">
              <input
                name="title"
                className="input"
                placeholder="输入标题"
                value={props.form.title}
                onChange={props.onChange}
              />
            </div>
          </div>
          <div className="form-line" />
          <div className="form-row">
            <div className="form-row-label">任务链接</div>
            <div className="form-row-content">
              <input
                name="url"
                className="input"
                placeholder="输入任务链接"
                value={props.toWorkUrl}
                onChange={props.onChange}
              />
            </div>
          </div>
          <div className="form-line" />
          <div className="form-row">
            <div className="form-row-label">待办时间</div>
            <div className="form-row-content">
              <input
                name="createTime"
                className="input"
                placeholder="输入格式：yyyy-MM-dd hh:mm:ss"
                type="datetime"
                value={props.form.createTime}
                onChange={props.onChange}
              />
            </div>
          </div>
        </div>
        <div className="page-section">
          <div className="form-row">
            <div className="form-row-label">小标题</div>
            <div className="form-row-content">
              <input
                name="formTitle"
                className="input"
                placeholder="输入小标题"
                value={props.form.formTitle}
                onChange={props.onChange}
              />
            </div>
          </div>
          <div className="form-line" />
          <div className="form-row">
            <div className="form-row-label">任务内容</div>
            <div className="form-row-content">
              <input
                name="formContent"
                className="input"
                placeholder="任务内容"
                value={props.form.formContent}
                onChange={props.onChange}
              />
            </div>
          </div>
        </div>
        <div>
          <button type="button" onClick={props.onClick}>
            创建
          </button>
        </div> */}
      </div>
    )
  }
  return <div></div>
}

export default Work
