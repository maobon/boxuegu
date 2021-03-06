/**
 * 使用requirejs 构建common模块
 */
define(['jquery', 'template', 'cookie'], function ($, template) {

    /**
     * 控制左侧导航菜单的显示和隐藏
     */
    $('.navs ul').prev('a').on('click', function () {
        $(this).next().slideToggle();
    });

    /**
     * 检测用户是否已经登录
     * 没有登录的时 自动跳转到登录页面
     */
    var pathName = location.pathname;
    var isHasSESSID = $.cookie('PHPSESSID');

    if (!isHasSESSID && pathName.indexOf("login") == -1) {
        // cookie中没有SESSIONID && 路径中不包含"login"
        location.href = '/login';
    }

    /**
     * 登录模块
     */
    $("#loginForm").submit(function () {
        // 序列化表单输入项 username=admin&pass=123456;
        var formData = $(this).serialize();

        // ajax 发送POST请求
        $.ajax({
            type: 'post',
            url: '/api/login', // /api 配置在服务端的反向代理
            data: formData,
            dataType: 'json', // 设置返回数据类型
            success: function (data) {

                // data.code == 200 登录成功
                if (data.code == 200) {

                    // 1. cookie储存登录成功后 用户的信息
                    // object -> String js对象转字符串储存
                    var loginInfo = JSON.stringify(data.result);
                    // cookie 本地储存loginInfo字符串(用户信息)
                    // 实现cookie数据的跨页面共享
                    $.cookie('loginInfo', loginInfo, {path: '/'});

                    // 2. 跳转页面
                    // 跳转页面到首页 index.html
                    location.href = '/index/index';
                }
            },
            error: function (data) {
                console.log(data.responseText);
            }
        });

        // return false; 阻止表单默认提交事件
        return false;
    });


    /**
     * 点击退出登录
     * 发送退出请求 请求成功后
     * 服务端返回相应 在responseHeader中 设置PHPSESSID = "delete" 删除浏览器cookie中的PHPSESSID
     */
    $("#btnLogout").click(function () {
        $.ajax({
            type: 'post',
            url: '/api/logout',
            dataType: 'json',
            success: function (data) {
                if (data.code == 200) {
                    location.href = "/login";
                }
            }
        });
    });


    /**
     * 用户登录成功 从cookie中获取已登录用户的信息
     * 使用模板引擎渲染到页面
     */
    var obj = JSON.parse($.cookie('loginInfo'));
    var tpl =
        '<div class="avatar img-circle">' +
        '<img src="{{tc_avatar}}">' +
        '</div>' +
        '<h4>{{tc_name}}</h4>';

    var render = template.compile(tpl);
    var html = render(obj);
    $(".aside .profile").html(html);

});
