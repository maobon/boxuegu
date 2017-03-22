/**
 * Created by xinbob on 3/21/17.
 * 添加讲师信息 编辑讲师信息 共用模块
 */

define(['jquery', 'utils', 'template',
    'datepicker', 'language', 'validate', 'form', 'overlay'], function ($, utils, template) {

    // 设置侧边导航菜单当前选中项
    utils.setMenuItemSelected('/teacher/teacher_list');

    // 从URL后面截取出字符串参数
    // http://www.baidu.com?tc_id=1&tc_name=bob
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
                if (data.code == 200) {
                    data.result.tInfo = "编辑讲师";

                    var strHTML = template("teacherEditTpl", data.result);
                    $("#teacherInfo").html(strHTML);

                    // 验证并提交
                    checkFormValidate("/api/teacher/update");
                }
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
        checkFormValidate("/api/teacher/add");
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
                    pattern: "密码最大六位数字"
                },
                joinDate: {
                    required: "入职日期不能为空"
                }
            },
            // eachInvalidField eachValidField 验证通过或不通过时的效果
            eachInvalidField: function () {
                $(this).closest('.form-group').removeClass('has-success').addClass('has-error');
            },
            eachValidField: function () {
                $(this).closest('.form-group').removeClass('has-error').addClass('has-success');
            }
        });
    }

});