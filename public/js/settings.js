/**
 * Created by xinbob on 3/22/17.
 *
 * 个人中心 (当前已登录用户)
 * 服务端根据PHPSESSID查询该用户的信息
 */

define(['jquery', 'template', 'ckeditor', 'utils', 'region', 'validate', 'form',
    'datepicker', 'language', 'uploadify', 'overlay'], function ($, template, CKEDITOR, utils) {

    // 设置当前选中item的背景
    utils.setMenuItemSelected("/index/index");

    /**
     * 首先查询当前已登录用户的信息展示在页面上
     * 用户在当前页面上修改后再提交给服务端
     */
    $.ajax({
        type: 'get',
        url: '/api/teacher/profile',
        dataType: 'json',
        success: function (data) {
            // 模板引擎渲染 查询回来的个人信息 旧的
            var strHTML = template("profileTpl", data.result);
            $("#profileInfo").html(strHTML);

            // 图片上传在此处做
            $("#upload_file").uploadify({
                buttonText: '',
                width: 120,
                height: 120,
                fileObjName: 'tc_avatar',
                swf: '/public/assets/uploadify/uploadify.swf',
                uploader: '/api/uploader/avatar',
                onUploadSuccess: function (file, data) {
                    // 将服务器端返回上传图片的路径 设置到img.src属性上
                    data = JSON.parse(data);
                    $('.preview img').attr('src', data.result.path);
                }
            });

            // 处理表单三级联动
            $('.hometown').region({
                url: '/public/assets/jquery-region/region.json'
            });

            // 富文本处理
            CKEDITOR.replace('ckeditor', {
                toolbarGroups: [
                    {name: 'clipboard', groups: ['clipboard', 'undo']}
                ]
            });

            // jQuery-validate plugin
            $("#profile_form").validate({
                sendForm: false,
                valid: function () {
                    // 同步更新富文本的内容变化 ckeditor api
                    for (var instance in CKEDITOR.instances) {
                        CKEDITOR.instances[instance].updateElement();
                    }

                    // Province + City + District
                    var p = $("#p option:selected").text();
                    var c = $("#c option:selected").text();
                    var d = $("#d option:selected").text();
                    var hometown = p + '|' + c + '|' + d;

                    // submit form use with jQuery-form plugin
                    $(this).ajaxSubmit({
                        type: 'post',
                        url: '/api/teacher/modify',
                        data: {tc_hometown: hometown},
                        dataType: 'json',
                        success: function (data) {
                            if (data.code == 200) {
                                Location.href = 'index/settings';
                            }
                        }
                    });
                }
            });
        }
    });

});
