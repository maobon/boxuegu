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
        },

        /**
         * 根据url截取其中的参数
         * 从location.search属性中截取传递过来的参数 封装成对象 传key得value
         * http://www.baidu.com?username=xinyi&age=28&nickname=maobon
         * @param paramName 属性名
         * @returns 值
         */
        queryStr: function (paramName) {
            var paramsStr = location.search;
            var paramsStr = paramsStr.slice(1); // 去掉最开始的?

            var obj = {};
            // 将参数的键和值封装进对象的属性
            if (paramsStr) {
                var arr = paramsStr.split("&");
                for (var i = 0; i < arr.length; i++) {
                    var kv = arr[i].split("=");
                    obj[kv[0]] = kv[1];
                }
            }

            return obj[paramName];
        }
    };
});
