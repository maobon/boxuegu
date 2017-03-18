/**
 * Created by xinbob on 3/19/17.
 * 配置requirejs
 */

require.config({
    baseUrl: '/public', // 手动设置根路径
    paths: {
        // 省略.js jquery: 相对路径 boxuegu/public/assets/jquery/jquery.min.js
        jquery: 'assets/jquery/jquery.min',
        cookie: 'assets/jquery-cookie/jquery.cookie',
        echarts: 'assets/echarts/echarts.min'
    }
});