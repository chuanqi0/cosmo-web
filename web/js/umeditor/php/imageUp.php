<?php
    header("Content-Type:text/html;charset=utf-8");
    error_reporting( E_ERROR | E_WARNING );
    date_default_timezone_set("Asia/chongqing");
    // Alibaba
    require_once('../alimedia/alimage.class.php');
    $ak = '23276563';								// 用户的AK (user app key)
    $sk = '9f9233f57959b112752534302c24442d';		// 用户的SK (user secret key)
    $namespace = 'cosmotest';						// 空间名称  (user namespace)
    /*第一步：（必须）引入AlibabaImage类，并设置AK和SK*/
    $aliImage  = new AlibabaImage($ak, $sk);		//设置AK和SK

    /*第二步：（必须）在上传策略UploadPolicy中指定用户空间名。也可以根据需要设置其他参数*/
    $uploadPolicy = new UploadPolicy( $namespace );	// 上传策略。并设置空间名
    $uploadPolicy->dir = '/fantastic/';	// 文件路径，(可选，默认根目录"/")
    $uploadPolicy->name = 'image_'.time();			// 文件名，(可选，不能包含"/"。若为空，则默认使用文件名)

    /*第三步：（必须）进行文件上传*/
    $file = $_FILES["upfile"];
    if ($file) {
        $state = "SUCCESS";
        $url = "";
        if ( !checkType($file["name"]) ) {
            $state = "不允许的文件类型";
        } else {
            $res = $aliImage->upload($file["tmp_name"], $uploadPolicy);
            $callback = $_GET['callback'];
            $url = $res["url"];
        }
        $info = array(
            "originalName" => $file["name"],
            "name" => $uploadPolicy->name,
            "url" => $url,
            "size" => $file["size"],
            "type" => getFileExt($file["name"]),
            "state" => $state
        );
        /**
         * 返回数据
         */
        if ($callback) {
            echo '<script>' . $callback . '(' . json_encode($info) . ')</script>';
        } else {
            echo json_encode($info);
        }
    } else {
        echo "Failed";
    }

    function checkType($name)
    {
        return in_array( getFileExt($name) , array( ".gif" , ".png" , ".jpg" , ".jpeg" , ".bmp" ) );
    }

    function getFileExt($name)
    {
        return strtolower( strrchr( $name , '.' ) );
    }
