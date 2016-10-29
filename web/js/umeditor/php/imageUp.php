<?php

header("Content-Type:text/html;charset=utf-8");
error_reporting(E_ERROR | E_WARNING);
date_default_timezone_set("Asia/chongqing");
// Alibaba
require_once('../alimedia/alimage.class.php');
require_once('../magician/php_image_magician.php');
$ak = '23276563';                                // 用户的AK (user app key)
$sk = '9f9233f57959b112752534302c24442d';        // 用户的SK (user secret key)
$namespace = 'cosmolove';                        // 空间名称  (user namespace)
/*第一步：（必须）引入AlibabaImage类，并设置AK和SK*/
$aliImage = new AlibabaImage($ak, $sk);        //设置AK和SK

/*第二步：（必须）在上传策略UploadPolicy中指定用户空间名。也可以根据需要设置其他参数*/
$uploadPolicy = new UploadPolicy($namespace);    // 上传策略。并设置空间名
$uploadPolicy->dir = '/cbwa/casus/';    // 文件路径，(可选，默认根目录"/")
$file = $_FILES["upfile"];
$type = getFileExt($file["name"]);
$uploadPolicy->name = 'image_' . time();            // 文件名，(可选，不能包含"/"。若为空，则默认使用文件名)

/*第三步：（必须）进行文件上传*/
if ($file) {
    $state = "SUCCESS";
    $url = "";
    if (!checkType($file["name"])) {
        $state = "图片仅支持JPG格式";
    } else {
        $im = imagecreatefromjpeg($file["tmp_name"]);
        if ($im) {
            $resizeFile = '/opt/cbwa/' . $uploadPolicy->name . $type;
            resizeImage($im, 1080, 1080, $resizeFile, $type);
            $res = $aliImage->upload($resizeFile, $uploadPolicy);
            $callback = $_GET['callback'];
            $url = $res["url"];
        }
    }
    $info = array(
        "originalName" => $file["name"],
        "name" => $uploadPolicy->name,
        "url" => $url,
        "size" => $file["size"],
        "type" => $type,
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
    return in_array(getFileExt($name), array(".jpg", ".jpeg"));
}

function getFileExt($name)
{
    return strtolower(strrchr($name, '.'));
}

function resizeImage($im, $maxwidth, $maxheight, $resizeFile, $type)
{
    $pic_width = imagesx($im);
    $pic_height = imagesy($im);
    if (($maxwidth && $pic_width > $maxwidth) || ($maxheight && $pic_height > $maxheight)) {
        if ($maxwidth && $pic_width > $maxwidth) {
            $widthratio = $maxwidth / $pic_width;
            $resizewidth_tag = true;
        }
        if ($maxheight && $pic_height > $maxheight) {
            $heightratio = $maxheight / $pic_height;
            $resizeheight_tag = true;
        }
        if ($resizewidth_tag && $resizeheight_tag) {
            if ($widthratio < $heightratio)
                $ratio = $widthratio;
            else
                $ratio = $heightratio;
        }
        if ($resizewidth_tag && !$resizeheight_tag)
            $ratio = $widthratio;
        if ($resizeheight_tag && !$resizewidth_tag)
            $ratio = $heightratio;
        $newwidth = $pic_width * $ratio;
        $newheight = $pic_height * $ratio;
        if (function_exists("imagecopyresampled")) {
            $newim = imagecreatetruecolor($newwidth, $newheight); //PHP系统函数
            imagecopyresampled($newim, $im, 0, 0, 0, 0, $newwidth, $newheight, $pic_width, $pic_height); //PHP系统函数
        } else {
            $newim = imagecreate($newwidth, $newheight);
            imagecopyresized($newim, $im, 0, 0, 0, 0, $newwidth, $newheight, $pic_width, $pic_height);
        }
        if (file_exists($resizeFile)) {
            unlink($resizeFile);
        }
        imagejpeg($newim, $resizeFile);
        imagedestroy($newim);
        imagedestroy($im);
    } else {
        imagejpeg($im, $resizeFile);
        imagedestroy($im);
    }
}
