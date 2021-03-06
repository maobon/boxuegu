/**
 * Created by xinbob on 3/19/17.
 * 配置requirejs
 */

require.config({
    // 此处调整根路径会影响require全局的路径 手动设置根路径 调整根路径
    baseUrl: '/public/assets',

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
        uploadify: 'uploadify/jquery.uploadify',
        jcrop: 'jquery-jcrop/Jcrop',
        region: 'jquery-region/jquery.region',
        ckeditor: 'ckeditor/ckeditor',
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
        },
        uploadify: {
            deps: ['jquery']
        },
        // ckeditor 需要导出处理
        ckeditor: {
            exports: 'CKEDITOR',
            deps: ['jquery']
        },
        jcrop: {
            deps: ['jquery']
        }
    }
});