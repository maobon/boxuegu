/**
 *
 * Created by xinbob on 3/23/17.
 * 添加课程 - step1 基本信息
 */

define(['jquery', 'utils', 'template', 'ckeditor', 'validate', 'form'], function ($, utils, template, CKEDITOR) {
    // 设置被选中item的背景颜色
    utils.setMenuItemSelected('/course/course_add');
    // 获取URL中的cs_id参数
    var courseId = utils.queryStr('cs_id');

    // 查询对应cs_id的课程信息
    $.ajax({
        type: 'get',
        url: '/api/course/basic',
        data: {cs_id: courseId},
        dataTyle: 'json',
        success: function (data) {
            console.log(data);

            // 模板引擎生成页面
            var strHTML = template('courseInfoTpl', data.result);
            $("#course_info").html(strHTML);

            // 富文本编辑器 设置toolbar
            CKEDITOR.replace('ckeditor', {
                toolbarGroups: [
                    {name: 'clipboard', groups: ['clipboard', 'undo']}
                ]
            });

            // 父分类发生改变 就请求查询子分类
            $("#topCategory").change(function () {
                var $selected = $(this).find('option:selected');
                console.log("cg_id = " + $selected.val() + " text = " + $selected.text());

                // 请求查询子分类
                $.ajax({
                    type: 'get',
                    url: '/api/category/child',
                    data: {cg_id: $selected.val()},
                    dataType: 'json',
                    success: function (data) {
                        if (data.code == 200) {
                            var tpl = '{{each list as item}}<option value="{{item.cg_id}}">{{item.cg_name}}</option>{{/each}}';
                            var render = template.compile(tpl);
                            var strHTML = render({list: data.result});

                            $("#childCategory").html(strHTML);
                        }
                    }
                });

            });


            // jQuery-validate plugin
            $("#course_form").validate({
                sendForm: false,
                valid: function () {
                    // 同步更新富文本的内容变化
                    for (var instance in CKEDITOR.instances) {
                        CKEDITOR.instances[instance].updateElement();
                    }

                    // jQuery-form submit plugin
                    $(this).ajaxSubmit({
                        type: 'post',
                        url: '/api/course/update/basic',
                        dataType: 'json',
                        success: function (data) {
                            // if (data.code == 200) {
                            //     location.href = '/course/course_add_picture?cs_id' + data.result.cs_id;
                            // }
                        }
                    });

                }
            });
        }
    });

});