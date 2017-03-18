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