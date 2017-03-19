/**
 * Created by xinbob on 3/19/17.
 * 查询教师列表
 * 使用jquery发送ajax请求 对数据使用模板引擎渲染生成html 填充页面
 */

define(['jquery', 'template'], function ($, template) {

    $.ajax({
        type: 'get',
        url: '/api/teacher',
        dataType: 'json',
        success: function (data) {
            var strHTML = template('teacherlistTpl', {list: data.result});
            $("#teacherList").html(strHTML);
        }
    });

});