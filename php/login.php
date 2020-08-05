<?php
include "conn.php";

//检查用户名和密码是否已经传入
if(isset($_POST['name'])&& isset($_POST['pass'])){
    $name=$_POST['name'];
    $pass=$_POST['pass'];
    $result =$conn->query("select * from word where username='$name'and password='$pass'");
    if($result->fetch_assoc()){
        echo true;
    }else{
        echo false;
    }
}
// if(isset($_POST['name'])&& isset($_POST['pass'])){
//     $name=$_POST['name'];
//     $pass=$_POST['pass'];
//     $result=$conn->query("select * from word where uesrname='$name' and password='$pass'");
//     if($result->fetch_assoc()){
//         echo true;
//     }else{
//         echo false;
//     }
// }