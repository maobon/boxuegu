/**
 * 控制左侧导航菜单的显示和隐藏
 */
$('.navs ul').prev('a').on('click', function () {
    $(this).next().slideToggle();
});

/**
 * 检测用户是否已经登录
 * 没有登录的时 自动跳转到登录页面
 *
 * var pathname = location.pathname;
 */

var flag = $.cookie('PHPSESSID');
if (!flag) {
    console.log("check PHPSESSID is none");
    location.href = '/login';
}