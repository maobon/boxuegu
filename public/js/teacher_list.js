/**
 * Created by xinbob on 3/19/17.
 * 查询教师列表
 * 使用jquery发送ajax请求 对数据使用模板引擎渲染生成html 填充页面
 */

define(['jquery', 'template', 'bootstrap'], function ($, template) {

    $.ajax({
        type: 'get',
        url: '/api/teacher',
        dataType: 'json',
        success: function (data) {
            var strHTML = template('teacherlistTpl', {list: data.result});
            $("#teacherList").html(strHTML);

            // $(".teacherOperation a").eq(0).click();
            // $(".teacherOperation").find('a').eq(0).click();
            // $(".teacherOperation a:eq(0)");
            // $(".teacherOperation").find('a:eq(0)').click();

            /**
             * 查看按钮
             * 查看某一位教师的详情
             * 需求: table中每个td中的第一个a
             */
            $("td.teacherOperation").find('a:eq(0)').click(function () {

                var teacherId = $(this).parent("td").attr("data-tcid");
                $.ajax({
                    type: 'get',
                    url: '/api/teacher/view',
                    data: {tc_id: teacherId},
                    dataType: 'json',
                    success: function (data) {
                        if (data.code == 200) {
                            // 渲染前可以调整数据格式
                            data.result.tc_hometown = data.result.tc_hometown.split("|").join(" ");

                            var strHTML = template('teacherDetailInfoTpl', data.result);
                            $("#teacherDetailInfo").html(strHTML);
                        }
                    }
                });
            });

            /**
             * 编辑按钮
             */
            $("td.teacherOperation").find('a:eq(1)').click(function () {
                var teacherId = $(this).parent('td').attr('data-tcid');
                console.log(teacherId + " 编辑 is clicked");
            });

            /**
             * 注销按钮
             */
            $("td.teacherOperation").find('a:eq(2)').click(function () {
                var teacherId = $(this).parent('td').attr('data-tcid');
                console.log(teacherId + " 注销 is clicked");
            });

        }
    });

});