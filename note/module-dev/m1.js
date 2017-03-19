/**
 * Created by xinbob on 3/18/17.
 */

define(function () {
    console.log("this is module m1");

    function sum(a, b) {
        return parseInt(a) + parseInt(b);
    }

    // 让别的模块可以使用该方法
    return sum;
});