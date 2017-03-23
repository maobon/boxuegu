/**
 * Created by xinbob on 3/23/17.
 * 添加课程 - step2 课程图片
 */

define(['jquery', 'template', 'utils', 'uploadify', 'jcrop', 'form'], function ($, template, utils) {

    // 设置当前导航item的选中项
    utils.setMenuItemSelected("/course/course_add");
    // 从url中获取上课页面传递回的参数 courseId
    var courseId = utils.queryStr("cs_id");
    console.log(courseId);

    // 查询该课程的信息
    $.ajax({
        type: 'get',
        url: '/api/course/picture',
        data: {cs_id: courseId},
        dataType: 'json',
        success: function (data) {
            if (data.code == 200) {
                var strHTML = template('course_picture_tpl', data.result);
                $("#course_picture").html(strHTML);

                var preview = $('.preview img'), jcrop_api;

                // 上传图片
                // 处理文件上传
                $('#upfile').uploadify({
                    width: 80,
                    height: 'auto',
                    buttonText: '选择图片',
                    buttonClass: 'btn btn-success btn-sm',
                    fileObjName: 'cs_cover_original',
                    itemTemplate: '<span></span>',
                    formData: {cs_id: courseId},
                    swf: '/public/assets/uploadify/uploadify.swf',
                    uploader: '/api/uploader/cover',
                    onUploadSuccess: function (file, data) {
                        data = JSON.parse(data);
                        $('.preview img').attr('src', data.result.path);
                        $('#cropPic').prop('disabled', false);
                    }
                });

            }
        }
    });

});