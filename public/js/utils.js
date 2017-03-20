/**
 * Created by xinbob on 3/20/17.
 * 工具方法
 */

define(['jquery'], function ($) {
    return {
        /**
         * 根据路径筛选a标签 添加active类样式
         * 根据location.pathname属性 对应a标签的href属性
         * @param pathname
         */
        setMenuItemSelected: function (pathname) {
            $('.navs a[href="' + pathname + '"]').addClass('active');
        }
    };
});
