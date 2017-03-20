/**
 * Created by xinbob on 3/19/17.
 * 查询教师列表
 * 使用jquery发送ajax请求 对数据使用模板引擎渲染生成html 填充页面
 * 功能点: 1.查看 2.编辑 3.注销
 *
 * 加载顺序 jquery -> template -> utils -> bootstrap
 * 需要utils模块在 bootstrap之前加载
 */

define(['jquery', 'template', 'utils', 'bootstrap'], function ($, template, utils) {

    // 设置当前选中item的背景
    utils.setMenuItemSelected(location.pathname);

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
                var td = $(this).parent('td');

                var _this = this;
                $.ajax({
                    type: 'post',
                    url: '/api/teacher/handle',
                    data: {tc_id: teacherId, tc_status: td.attr('data-tcstatus')},
                    dataType: 'json',
                    success: function (data) {
                        if (data.code == 200) {

                            if (data.result.tc_status == 0) {
                                $(_this).html("启 用");
                            } else if (data.result.tc_status == 1) {
                                $(_this).html("注 销");
                            }

                            td.attr('data-tcstatus', data.result.tc_status);
                        }
                    }
                })

            });

        }
    });

});