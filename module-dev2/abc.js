/**
 * Created by xinbob on 3/19/17.
 * 一个非标准模块化的模块 使用requirejs导出为模块
 */

function showInfo() {
    console.log("abc")
}

function showMessage() {
    console.log("hello")
}

var obj = {
    showInfo: showInfo,
    showMessage: showMessage
};