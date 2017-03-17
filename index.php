<?php

$path = 'index';
$filename = 'index';

if(array_key_exists('PATH_INFO',$_SERVER)){
    // 获取url中的路径
	$pathinfo = $_SERVER['PATH_INFO'];
	$pathinfo = explode('/', substr($pathinfo, 1));
    // 去掉路径中的第一个字符(/)
	if(count($pathinfo) == 2) {
		$path = $pathinfo[0];
		$filename = $pathinfo[1];

	}else{
	    // 表示登录页面
        if($pathinfo[0] == 'favicon.ico'){
            header(200);
            header('Content-Type','image/x-icon');
            include './public/images/favicon.ico'; 
            exit;
        }
        $filename = 'login';
    }
}

// php的include 作用就是载入一个页面
include './view/' . $path . '/' . $filename . '.html';

?>