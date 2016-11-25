<?php

namespace FantasticBundle\Controller;

use AppBundle\Common\LoveException;
use FantasticBundle\Entity\Receipt;
use Symfony\Component\Routing\Annotation\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Component\HttpFoundation\Request;

use AppBundle\Controller\BaseController;
use FantasticBundle\Entity\Ticket;
use UtilBundle\Constant\LoveConstant;

/**
 * @Route("/api/cbwa")
 */
class ReceiptApiController extends BaseController
{
    /**
     * @Route("/receipt/apply")
     * @Method({"POST"})
     */
    public function receiptApplyAction(Request $request)
    {
        $entityManager = $this->getDoctrine()->getManager();
        try {
            $entityManager->getConnection()->beginTransaction();
            $userUuid = $request->get('userUuid');
            $receiptFee = $request->get('receiptFee');
            $receiptTitle = $request->get('receiptTitle');
            $receiptAddress = $request->get('receiptAddress');
            $receiptNumber = $request->get('receiptNumber');
            $receiptBankName = $request->get('receiptBankName');
            $receiptBankNumber = $request->get('receiptBankNumber');
            // 处理业务
            $userRepository = $this->getDoctrine()->getRepository('FantasticBundle:User');
            $receiptRepository = $this->getDoctrine()->getRepository('FantasticBundle:Receipt');
            $cbwaUser = $userRepository->findUserByUserUuid($userUuid);
            if (!$cbwaUser) {
                throw new LoveException(LoveConstant::ERROR_USER_NOT_EXIST);
            }
            $receipt = new Receipt();
            $receipt->setUserId($cbwaUser->getUserId());
            $receipt->setFee($receiptFee);
            $receipt->setTitle($receiptTitle);
            $receipt->setAddress($receiptAddress);
            $receipt->setNumber($receiptNumber);
            $receipt->setBankName($receiptBankName);
            $receipt->setBankNumber($receiptBankNumber);
            $receiptApply = number_format($cbwaUser->getReceiptApply() + $receiptFee, 2);
            $receiptApply = str_replace(',', '', $receiptApply);
            $cbwaUser->setReceiptApply($receiptApply);
            // 保存
            $receiptRepository->saveReceipt($receipt);
            $userRepository->saveUser($cbwaUser);
            $entityManager->getConnection()->commit();
            // 设置返回数据
            $this->setSuccess();
        } catch (\Exception $e) {
            $this->setFailedMessage($e->getMessage());
            $entityManager->getConnection()->rollback();
        }
        $jsonResponse = $this->makeJsonResponse();
        return $jsonResponse;
    }
}