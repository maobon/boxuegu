/**
 * Created by xinbob on 3/23/17.
 *
 * 课程管理 -> 课程添加(课程添加欢迎页)
 */

define(['jquery', 'utils', 'validate', 'form'], function ($, utils) {

    // 设置当前选中的item
    utils.setMenuItemSelected('/course/course_add');

    // 表单验证 sendForm: false 直接设置boolean
    $("#course_form").validate({
        sendForm: false, // 不要写成 sendForm:'flase'
        valid: function () {
            // 表单提交
            $(this).ajaxSubmit({
                type: 'post',
                url: '/api/course/create',
                dataType: 'json',
                success: function (data) {
                    if (data.code == 200) {
                        console.log(data.result);
                        // 利用地址栏传递参数
                        location.href = '/course/course_add_basic?cs_id=' + data.result.cs_id;
                    }
                }
            });
        }
    });
});
