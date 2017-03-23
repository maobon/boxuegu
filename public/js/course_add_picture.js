/**
 * Created by xinbob on 3/23/17.
 */

define(['jquery', 'utils', 'template'], function ($, utils, template) {

    // 设置当前导航item的选中项
    utils.setMenuItemSelected("/course/course_add");
    // 从url中获取上课页面传递回的参数 courseId
    var courseId = utils.queryStr("cs_id");

    // 查询该课程的信息
    $.ajax({
        type: 'get',
        url: '/api/course/picture',
        data: {cs_id: courseId},
        dataType: 'json',
        success: function (data) {
            console.log(data);
            if (data.code == 200) {
                var strHTML = template('course_picture_tpl', data.result);
                $("#course_picture").html(strHTML);
            }
        }

    });

});