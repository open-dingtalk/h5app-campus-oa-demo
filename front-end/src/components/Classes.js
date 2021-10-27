import react from "react"
import { Checkbox, Button } from "antd"

const Classes = (props) => {
  const { TextArea } = Input
  if (props.showType === 1) {
    return (
      <div>
        <h3 className="title">{props.className}</h3>
        <h4 className="littleTitle">老师列表</h4>
        {props.teachers.map((item, i) => (
          <div key={"teacher" + i}>
            <Checkbox
              value={item.userid}
              name={item.name}
              onChange={props.addUser}
            >
              {item.name}
            </Checkbox>
          </div>
        ))}
        <p>
          输入通知内容：
          <TextArea value={props.text} onChange={props.onChange} rows={4} />
        </p>
        <p>
          <Button type="primary" onClick={props.onClick}>
            发送通知
          </Button>
        </p>
        <p onClick={props.showWork}>
          <a className="AppLink">创建待办</a>
        </p>
      </div>
    )
  } else {
    return <div></div>
  }
}
export default Classes
