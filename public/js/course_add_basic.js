/**
 * Created by xinbob on 3/23/17.
 * 添加课程 - 基本信息
 */

define(['jquery', 'utils', 'validate', 'form'], function ($, utils) {
    // 设置被选中item的背景颜色
    utils.setMenuItemSelected('/course/course_add');
    // 获取URL中的cs_id参数
    var courseId = utils.queryStr('cs_id');

    // 查询对应cs_id的课程信息
    $.ajax({
        type: 'get',
        url: '/api/course/basic',
        data: {cs_id: courseId},
        dataTyle: 'json',
        success: function (data) {
            console.log(data);
        }
    });

});