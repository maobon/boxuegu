/**
 * Created by xinbob on 3/23/17.
 * 添加课程 - step2 课程图片
 */

define(['jquery', 'template', 'utils', 'uploadify', 'jcrop', 'form'], function ($, template, utils) {

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

                // 点击图片裁切按钮时进行裁切处理
                $('#cropPic').click(function () {
                    if ($(this).attr('data-status') == 'save') {
                        // 保存图片的操作(提交裁切图片的尺寸信息)
                        $('#cropForm').ajaxSubmit({
                            type: 'post',
                            url: '/api/course/update/picture',
                            data: {cs_id: courseId},
                            dataType: 'json',
                            success: function (data) {
                                if (data.code == 200) {
                                    location.href = '/course/course_add_lesson?cs_id=' + data.result.cs_id;
                                }
                            }
                        });
                    } else {
                        $(this).attr('data-status', 'save').val('保存图片');

                        cropPic();
                    }
                });

                // 图片裁切功能
                function cropPic() {
                    // 销毁原来的图片裁切实例对象
                    jcrop_api && jcrop_api.destroy();

                    preview.Jcrop({
                        boxWidth: 400,
                        aspectRatio: 2
                        // setSelect: [10, 10, 100, 100],
                    }, function () {
                        // 缓存原来的裁切实例对象
                        jcrop_api = this;

                        // 计算选取的尺寸
                        var width = jcrop_api.ui.stage.width,
                            height = jcrop_api.ui.stage.height,
                            x = 0;
                        y = height / 4;

                        // 创建选取
                        jcrop_api.newSelection();
                        jcrop_api.setSelect([x, y, width, height / 2]);
                        jcrop_api.initComponent('Thumbnailer', {
                            width: 240,
                            height: height,
                            thumb: '.thumb'
                        });

                        // 监听选区的变化
                        preview.parent().on('cropend', function (e, s, c) {
                            $('#crop_x').val(c.x);
                            $('#crop_y').val(c.y);
                            $('#crop_w').val(c.w);
                            $('#crop_h').val(c.h);
                        });
                    });
                }

            }
        }
    });

});