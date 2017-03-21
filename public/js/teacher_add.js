/**
 * Created by xinbob on 3/21/17.
 * 添加讲师信息 编辑讲师信息 共用模块
 */

define(['jquery', 'utils', 'template',
    'datepicker', 'language', 'validate', 'form'], function ($, utils, template) {

    var teacherId = utils.queryStr('tc_id');

    if (teacherId) {
        /**
         * 编辑讲师信息
         */
        $.ajax({
            type: 'post',
            url: '/api/teacher/edit',
            data: {tc_id: teacherId},
            dataType: 'json',
            success: function (data) {
                data.result.tInfo = "编辑讲师";

                var strHTML = template("teacherEditTpl", data.result);
                $("#teacherInfo").html(strHTML);

                // 验证并提交
                checkFormValidate("/api/teacher/update");
            }
        });
    } else {
        /**
         * 添加新讲师
         */
        var strHTML = template("teacherEditTpl", {
            tInfo: "添加讲师",
            tc_gender: 0
        });
        $("#teacherInfo").html(strHTML);

        // 验证并提交
        checkFormValidate("/api/teacher/update");
    }

    /**
     * form表单合法性验证 通过验证后提交
     * 编辑讲师信息 与 添加讲师信息 共用
     * @param submitURL 提交地址
     */
    function checkFormValidate(submitURL) {

        // jQuery-validate 表单验证插件
        $("#teacherInfoForm").validate({
            sendForm: false,
            valid: function () {
                // jQuery form表单提交插件
                $(this).ajaxSubmit({
                    type: 'post',
                    url: submitURL,
                    dataType: 'json',
                    success: function (data) {
                        if (data.code == 200) {
                            location.href = "/teacher/teacher_list";
                        }
                    }
                });
            },
            description: {
                tcName: {
                    required: "用户名不能为空"
                },
                tcPass: {
                    required: "密码不能为空",
                    pattern: "密码只能设置为六位数字"
                },
                joinDate: {
                    required: "入职日期不能为空"
                }
            }
        });
    }

});