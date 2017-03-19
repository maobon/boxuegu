/**
 * Created by xinbob on 3/18/17.
 */

define(function () {
    console.log("this is module m2");

    // 一个复杂的模块 内部有多个方法
    function fn1() {
        return 0;
    }

    function fn2() {
        return 0;
    }

    // 导出对象 信息量就比较大了
    return {
        fn1: fn1,
        fn2: fn2
    };
});