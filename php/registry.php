<?php
include 'conn.php';

if(isset($_POST['name'])){
    $username=$_POST['name']; //获取前端传入的用户名
    $result= $conn->query("select * from word where username ='$username'");// 和后端进行匹配
    if($result->fetch_assoc()){//判断数组用户名是否存在
        echo true; //存在
    }else{
        echo false;//不存在
    }
}

//判断是否点击subit
if(isset($_POST['submit'])){
    $user = $_POST['username'];
    $pass =($_POST['password']);
    $repass =($_POST['repass']);
    $email =$_POST['email'];
    $conn->query("insert word values(null,'$user','$pass','$repass','$email')");

    header('location:http://localhost/WWW/TMALL/login.html');
}


// if(isset($_POST['submit'])){
//     $user=$_POST['username'];
//     $pass=$_POST['password'];
//     $repass=$_POST['repass'];
//     $email=$_POST['email'];

//     $conn->query("insert word values(null,'$user','$pass','$repass','$email')");
// }
// if(isset($_POST['name'])){ //检查ajax传入的用户名 
//     $username=$_POST['name'];
//     $result=$conn->query(("select * from word where username='$username'"));
//     if($result->fetch_assoc()){//判断数组用户名是否存在
//         echo true;
//     }else{
//         echo false;
//     }
// }
// header('location:http://localhost/WWW/login/login.html');