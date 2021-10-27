import react from "react"
import { Button, Input, Radio } from "antd"

const Courses = (props) => {
  return (
    <div>
      <div>
        <p className="littleTitle">我的课程</p>
        <div>
          <Radio.Group onChange={props.chooseMy}>
            {props.myCourses.map((e, i) => (
              <div key={"my" + i} className="radioList">
                <Radio
                  name="myCourse"
                  value={e.courseCode}
                  onChange={props.chooseMy}
                >
                  <span>课程名称：{e.name}</span>
                  <br />
                  <span>上课时间：{e.startTime + "~" + e.endTime}</span>
                  <br />
                  <span>任课老师：{e.teacherName}</span>
                  <br />
                  {/* <input
              type="radio"
              name="myCourse"
              value={e.courseCode}
              onChange={props.chooseMy}
            /> */}
                </Radio>
              </div>
            ))}
          </Radio.Group>
        </div>
      </div>
      <div>
        <p className="littleTitle">其他老师课程</p>
        <div>
          <Radio.Group onChange={props.chooseOther}>
            {props.otherCourses.map((e, i) => (
              <div key={"other" + i} className="radioList">
                <Radio
                  name="otherCourse"
                  value={e.courseCode}
                  onChange={props.chooseOther}
                >
                  <span>课程名称：{e.name}</span>
                  <br />
                  <span>上课时间：{e.startTime + "~" + e.endTime}</span>
                  <br />
                  <span>任课老师：{e.teacherName}</span>
                  <br />
                  {/* <Input
                  type="radio"
                  name="otherCourse"
                  value={e.courseCode}
                  onChange={props.chooseOther}
                /> */}
                </Radio>
              </div>
            ))}
          </Radio.Group>
        </div>
      </div>
      <p>
        <Button type="primary" onClick={props.onClick}>
          申请换课
        </Button>
      </p>
    </div>
  )
}

export default Courses
