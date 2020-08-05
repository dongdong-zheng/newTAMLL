<?php
header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Method:POST,GET');
include "conn.php";
$result = $conn->query("select * from taobaogoods");
$arr=array();
for($i=0;$i<$result->num_rows;$i++){
    $arr[$i]=$result->fetch_assoc();//遍历获取每一条数据
}
echo json_encode($arr);
