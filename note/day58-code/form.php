<?php 

    $uname = $_POST['username'];
    $pw = $_POST['repassword'];
    $age = $_POST['age'];

    $arr = array('uname'=>$uname,'pw'=>$pw,'age'=>$age);

    echo json_encode($arr);

 ?>