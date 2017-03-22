/**
 * Created by xinbob on 3/22/17.
 * 个人中心
 */

define(['jquery', 'template', 'ckeditor', 'region', 'validate', 'form',
    'datepicker', 'language', 'uploadify'], function ($, template, CKEDITOR) {

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
                fileObjName: 'tc_avatar',
                swf: '/public/assets/uploadify/uploadify.swf',
                uploader: '/api/uploader/avatar',
                onUploadSuccess: function (file, data) {
                    console.log(data);
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
        }
    });

});
