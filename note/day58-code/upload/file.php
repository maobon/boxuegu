<?php 

    // $_FILES 文件上传
    print_r($_FILES);
    // 文件在服务器的绝对路径
    // D:\wamp\tmp\php6723.tmp
    $filename = $_FILES['picture']['tmp_name'];
    $newFile = './'.time().'.jpg';//time()当前时间对应的毫秒数
    // 移动文件
    move_uploaded_file($filename, $newFile);
    echo $newFile;
 ?>