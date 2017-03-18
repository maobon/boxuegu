/**
 * 使用requirejs 构建common模块
 */
define(['jquery', 'cookie'], function ($) {

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

    // BUG 写在最后 并不能保证可以获取到cookie 首次访问该网站的时候 cookie是空的
    /**
     * 读取cookie中的用户信息 设置到页面上
     * tc_avatar 用户头像
     * tc_name 用户名
     *
     * jQuery-cookie插件 读取cookie -> $.cookie('attrKey');
     */
    var obj = JSON.parse($.cookie('loginInfo'));
    // console.log(obj);
    $(".aside .profile .avatar img").attr('src', obj.tc_avatar);
    $(".aside .profile h4").html(obj.tc_name);
});
