/**
 * Created by xinbob on 3/18/17.
 * module main 主模块中依赖 m1模块 同时依赖m2模块
 */

// 主模块引用 m1模块中的sum方法
define(['m1', 'm2'], function (m) {
    // 上面的数组是依赖模块的关系 需要路径的
    console.log("this is module main");

    var ret = m(12, 13);
    console.log(ret);
});
