<?php

namespace FantasticBundle\Controller;

use Symfony\Component\Routing\Annotation\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Component\HttpFoundation\Request;

use AppBundle\Controller\BaseController;

/**
 * @Route("/api/cbwa")
 */
class CasusApiController extends BaseController
{
    /**
     * @Route("/payment/alipay/notify")
     * @Method({"POST"})
     */
    public function paymentAlipayNotifyAction(Request $request)
    {
        try {
            // 设置返回数据
            $this->setSuccess();
        } catch (\Exception $e) {
            $this->setFailedMessage($e->getMessage());
        }
        $jsonResponse = $this->makeJsonResponse();
        return $jsonResponse;
    }

    /**
     * @Route("/payment/wechat/notify")
     * @Method({"POST"})
     */
    public function paymentWechatNotifyAction(Request $request)
    {
        try {
            // 设置返回数据
            $this->setSuccess();
        } catch (\Exception $e) {
            $this->setFailedMessage($e->getMessage());
        }
        $jsonResponse = $this->makeJsonResponse();
        return $jsonResponse;
    }
}