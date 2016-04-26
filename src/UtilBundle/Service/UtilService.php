<?php

namespace UtilBundle\Service;

class UtilService
{
    public static function getCurrentTime()
    {
        return date_create(date("Y-m-d H:i:s"));
    }

    public static function getGUID()
    {
        if (function_exists('com_create_guid')) {
            return com_create_guid();
        } else {
            mt_srand((double)microtime() * 10000); // PHP 4.2.0 以上可选
            $charid = strtoupper(md5(uniqid(rand(), true)));
            $hyphen = chr(45); // '-'
            $uuid = substr($charid, 0, 8) . $hyphen
                . substr($charid, 8, 4) . $hyphen
                . substr($charid, 12, 4) . $hyphen
                . substr($charid, 16, 4) . $hyphen
                . substr($charid, 20, 12);
            return $uuid;
        }
    }
}