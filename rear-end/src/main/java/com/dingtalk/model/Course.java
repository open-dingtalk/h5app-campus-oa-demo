package com.dingtalk.model;

import lombok.Data;

/**
 * 课程实体，此处简单模拟了课程的结构
 */
@Data
public class Course {

    /**
     * 课程编码
     */
    private String courseCode;
    /**
     * 课程介绍
     */
    private String introduce;
    /**
     * 课程名称
     */
    private String name;
    /**
     * 教师id，此处可对应钉钉中的userid或者企业自身维护的相关id
     */
    private String teacherUserid;
    /**
     * 老师名称
     */
    private String teacherName;
    /**
     * 上课班级id，此处可对应钉钉"家校通讯录"中class_id或者企业自身维护的相关id
     */
    private Integer classId;
    /**
     * 班级名称
     */
    private String className;
    /**
     * 上课时间
     */
    private String startTime;
    /**
     * 下课时间
     */
    private String endTime;

}
