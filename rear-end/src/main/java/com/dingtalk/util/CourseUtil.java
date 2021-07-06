package com.dingtalk.util;

import com.alibaba.fastjson.JSONArray;
import com.dingtalk.model.Course;

import java.text.ParseException;
import java.util.List;

/**
 * 课程工具类，用于初始化课程数据，此步骤建议开发者从数据库完成
 */
public class CourseUtil {

    private static List<Course> courses = null;

    public static List<Course> list(){
        if(courses == null || courses.size() <= 0){
            init();
        }
        return courses;
    }

    public static void exchange(Course myCourse, Course otherCourse){
        Course temp = new Course();
        temp.setName(myCourse.getName());
        temp.setIntroduce(myCourse.getIntroduce());
        temp.setTeacherName(myCourse.getTeacherName());
        temp.setTeacherUserid(myCourse.getTeacherUserid());
        myCourse.setName(otherCourse.getName());
        myCourse.setIntroduce(otherCourse.getIntroduce());
        myCourse.setTeacherName(otherCourse.getTeacherName());
        myCourse.setTeacherUserid(otherCourse.getTeacherUserid());
        otherCourse.setName(temp.getName());
        otherCourse.setIntroduce(temp.getIntroduce());
        otherCourse.setTeacherName(temp.getTeacherName());
        otherCourse.setTeacherUserid(temp.getTeacherUserid());
        courses.removeIf(course -> course.getCourseCode().equals(myCourse.getCourseCode()));
        courses.removeIf(course -> course.getCourseCode().equals(otherCourse.getCourseCode()));
        courses.add(myCourse);
        courses.add(otherCourse);
        courses.sort((a,b) -> {
            long res = 0L;
            try {
                res = TimeUtil.stringDateToTimestamp(a.getStartTime()) - TimeUtil.stringDateToTimestamp(b.getStartTime());
            } catch (ParseException e) {
                e.printStackTrace();
            }
            return (int)res;
        });
    }

    private static void init(){
        //  演示数据
        String json = "[\n" +
                "    {\n" +
                "        \"courseCode\":\"cc_1\",\n" +
                "        \"introduce\":\"一年级语文课程\",\n" +
                "        \"name\":\"语文\",\n" +
                "        \"teacherUserid\":\"01186053144726141594\",\n" +
                "        \"teacherName\":\"李老师\",\n" +
                "        \"classId\":389289455,\n" +
                "        \"startTime\":\"2021-07-07 08:00:00\",\n" +
                "        \"endTime\":\"2021-07-07 08:50:00\"\n" +
                "    },\n" +
                "    {\n" +
                "        \"courseCode\":\"cc_2\",\n" +
                "        \"introduce\":\"一年级语文课程\",\n" +
                "        \"name\":\"语文\",\n" +
                "        \"teacherUserid\":\"01186053144726141594\",\n" +
                "        \"teacherName\":\"李老师\",\n" +
                "        \"classId\":389289455,\n" +
                "        \"startTime\":\"2021-07-07 09:00:00\",\n" +
                "        \"endTime\":\"2021-07-07 09:50:00\"\n" +
                "    },\n" +
                "    {\n" +
                "        \"courseCode\":\"cc_3\",\n" +
                "        \"introduce\":\"一年级数学课程\",\n" +
                "        \"name\":\"数学\",\n" +
                "        \"teacherUserid\":\"043217290519980938\",\n" +
                "        \"teacherName\":\"张老师\",\n" +
                "        \"classId\":389289455,\n" +
                "        \"startTime\":\"2021-07-07 14:00:00\",\n" +
                "        \"endTime\":\"2021-07-07 14:50:00\"\n" +
                "    },\n" +
                "    {\n" +
                "        \"courseCode\":\"cc_4\",\n" +
                "        \"introduce\":\"一年级数学课程\",\n" +
                "        \"name\":\"数学\",\n" +
                "        \"teacherUserid\":\"043217290519980938\",\n" +
                "        \"teacherName\":\"张老师\",\n" +
                "        \"classId\":389289455,\n" +
                "        \"startTime\":\"2021-07-07 15:00:00\",\n" +
                "        \"endTime\":\"2021-07-07 15:50:00\"\n" +
                "    }\n" +
                "]";
        courses = JSONArray.parseArray(json, Course.class);
    }
}
