<?php

namespace UtilBundle\Constant;

class LoveConstant
{
    // 提示信息
    const STATUS_SUCCESS = 0;
    const STATUS_FAILED = -1;

    const MESSAGE_SUCCESS = '请求执行成功';
    const MESSAGE_FAILED = '请求执行失败';
    const MESSAGE_USER_REGISTER_SUCCESS = '用户注册成功';
    const MESSAGE_USER_LOGIN_SUCCESS = '用户登录成功';
    const MESSAGE_USER_UPDATE_SUCCESS = '用户更新成功';
    const MESSAGE_CASUS_PUBLISH_SUCCESS = '案例发布成功';
    const MEESAGE_CASUS_UPDATE_SUCCESS = '案例更新成功';
    const MEESAGE_CASUS_EDIT_SUCCESS = '案例编辑成功';
    const MEESAGE_CASUS_LIST_SUCCESS = '案例列表获取成功';
    const MEESAGE_CASUS_DETAIL_SUCCESS = '案例详情获取成功';
    const MEESAGE_REGION_SUCCESS = '获取地区列表成功';

    const ERROR_TELEPHONE_EXIST = '手机号已注册';
    const ERROR_TELEPHONE_NOT_EXIST = '手机号未注册';
    const ERROR_USER_PASSWORD = '密码不正确';
    const ERROR_USER_NOT_EXIST = '用户不存在';
    const ERROR_CASUS_NOT_EXIST = '案例不存在';
    const ERROR_AWARD_NOT_EXIST = '奖项不存在';
}