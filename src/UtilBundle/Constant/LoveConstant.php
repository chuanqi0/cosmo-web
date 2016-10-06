<?php

namespace UtilBundle\Constant;

class LoveConstant
{
    // 提示信息
    const STATUS_SUCCESS = 0;
    const STATUS_FAILED = -1;

    const MESSAGE_SUCCESS = '请求执行成功';
    const MESSAGE_FAILED = '请求执行失败';
    const MESSAGE_CASUS_PUBLISH_SUCCESS = '案例发布成功';
    const MEESAGE_CASUS_UPDATE_SUCCESS = '案例更新成功';
    const MEESAGE_CASUS_DETAIL_SUCCESS = '案例详情获取成功';
    const MEESAGE_CASUS_CANCEL_SUCCESS = '案例取消成功';
    const MEESAGE_CASUS_EXTRA_SUCCESS = '案例内容补充成功';
    const MEESAGE_CASUS_LIST_SUCCESS = '案例列表获取成功';
    const MEESAGE_CASUS_PERSONAL_SUCCESS = '个人案例列表获取成功';
    const MEESAGE_REGION_SUCCESS = '获取地区列表成功';

    const ERROR_CASUS_NOT_EXIST = '案例不存在';
    const ERROR_USER_NOT_EXIST = '用户未补全信息';
    const ERROR_AWARD_NOT_EXIST = '奖项不存在';
    const ERROR_CASUS_PAID = '案例已支付, 不可取消';
    const ERROR_COVER_NOT_EXIST = '内容不包含图片';
}