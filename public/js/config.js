/**
 * Created by xinbob on 3/19/17.
 * 配置requirejs
 */

require.config({
    // 此处调整根路径会影响require全局的路径
    baseUrl: '/public/assets', // 手动设置根路径 调整根路径
    paths: {
        // 省略.js jquery: 相对路径 boxuegu/public/assets/jquery/jquery.min.js
        jquery: 'jquery/jquery.min',
        cookie: 'jquery-cookie/jquery.cookie',
        echarts: 'echarts/echarts.min',
        template: 'artTemplate/template',
        bootstrap: 'bootstrap/js/bootstrap',
        nprogress: 'nprogress/nprogress',
        datepicker: 'bootstrap-datepicker/js/bootstrap-datepicker',
        language: 'bootstrap-datepicker/locales/bootstrap-datepicker.zh-CN.min',
        validate: 'jquery-validate/jquery-validate',
        form: 'jquery-form/jquery.form',
        utils: '../js/utils',
        overlay: '../js/overlay'
    },
    shim: {
        bootstrap: {
            deps: ['jquery']
        },
        language: {
            deps: ['jquery', 'datepicker']
        },
        validate: {
            deps: ['jquery']
        }
    }
});