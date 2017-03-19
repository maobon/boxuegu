/**
 * Created by xinbob on 3/19/17.
 */

// relavent path:boxuegu/module-dev2/assets/jquery/jquery.js

define(['jquery', 'template'], function ($, template) {
    console.log(123);

    var data = {};

    var html = template('tpl', data);
    $("#content").html(html);

    // 也可以有返回值 在引入此模块的require([],callback)方法中的回调函数中会接收到
    return data;
});