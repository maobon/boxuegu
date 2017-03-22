/**
 * Created by xinbob on 3/20/17.
 * 遮罩层
 * 页面加载时 页面呈现遮罩层 表示loading状态
 */

define(['jquery', 'nprogress'], function ($, nprogress) {

    // 全局监听 ajax发送请求的状态
    $(document).ajaxStart(function () {
        $(".overlay").show();
    });

    $(document).ajaxStop(function () {
        $(".overlay").hide();
    });

    // nprogress 页面顶部进度条插件
    nprogress.start();
    nprogress.done();
});