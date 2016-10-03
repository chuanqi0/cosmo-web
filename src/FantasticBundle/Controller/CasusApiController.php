<?php

namespace FantasticBundle\Controller;

use AppBundle\Common\LoveException;
use Symfony\Component\Routing\Annotation\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Component\HttpFoundation\Request;

use AppBundle\Controller\BaseController;
use FantasticBundle\Entity\Casus;
use FantasticBundle\Entity\CasusAward;
use UtilBundle\Constant\LoveConstant;

/**
 * @Route("/api/cbwa")
 */
class CasusApiController extends BaseController
{
    /**
     * @Route("/award/list")
     * @Method({"GET"})
     */
    public function awardListAction()
    {
        try {
            // 处理业务
            $awardRepository = $this->getDoctrine()->getRepository('FantasticBundle:Award');
            $awardList = $awardRepository->getAwardList();
            // 设置返回数据
            $this->setSuccess($awardRepository->listToArray($awardList), LoveConstant::MEESAGE_AWARD_LIST_SUCCESS);
        } catch (\Exception $e) {
            $this->setFailedMessage($e->getMessage());
        }
        $jsonResponse = $this->makeJsonResponse();
        return $jsonResponse;
    }

    /**
     * @Route("/casus/personal")
     * @Method({"POST"})
     */
    public function casusPersonalAction(Request $request)
    {
        try {
            $userUuid = $request->get('userUuid');
            $userRepository = $this->getDoctrine()->getRepository('FantasticBundle:User');
            $cbwaUser = $userRepository->findUserByUserUuid($userUuid);
            if (!$cbwaUser) {
                throw new LoveException(LoveConstant::ERROR_USER_NOT_EXIST);
            }
            // 处理业务
            $casusRepository = $this->getDoctrine()->getRepository('FantasticBundle:Casus');
            $casusList = $casusRepository->getPersonalCasusList($cbwaUser->getUserId());
            // 设置返回数据
            $this->setSuccess($casusRepository->listToArray($casusList), LoveConstant::MEESAGE_CASUS_PERSONAL_SUCCESS);
        } catch (\Exception $e) {
            $this->setFailedMessage($e->getMessage());
        }
        $jsonResponse = $this->makeJsonResponse();
        return $jsonResponse;
    }

    /**
     * @Route("/casus/extra")
     * @Method({"POST"})
     */
    public function casusExtraAction(Request $request)
    {
        try {
            $casusGuid = $request->get('casusGuid');
            $content = $request->get('content');
            // 处理业务
            $casusRepository = $this->getDoctrine()->getRepository('FantasticBundle:Casus');
            $casus = $casusRepository->findCasusByGuid($casusGuid);
            if (!$casus) {
                throw new LoveException(LoveConstant::ERROR_CASUS_NOT_EXIST);
            }
            $casus->setContent($content);
            $casusRepository->saveCasus($casus);
            // 设置返回数据
            $this->setSuccess($casus->toArray(), LoveConstant::MEESAGE_CASUS_EXTRA_SUCCESS);
        } catch (\Exception $e) {
            $this->setFailedMessage($e->getMessage());
        }
        $jsonResponse = $this->makeJsonResponse();
        return $jsonResponse;
    }

    /**
     * @Route("/casus/detail")
     * @Method({"POST"})
     */
    public function casusDetailAction(Request $request)
    {
        try {
            $casusGuid = $request->get('casusGuid');
            // 处理业务
            $casusRepository = $this->getDoctrine()->getRepository('FantasticBundle:Casus');
            $casus = $casusRepository->findCasusByGuid($casusGuid);
            if (!$casus) {
                throw new LoveException(LoveConstant::ERROR_CASUS_NOT_EXIST);
            }
            // 设置返回数据
            $this->setSuccess($casus->toDetailArray(), LoveConstant::MEESAGE_CASUS_DETAIL_SUCCESS);
        } catch (\Exception $e) {
            $this->setFailedMessage($e->getMessage());
        }
        $jsonResponse = $this->makeJsonResponse();
        return $jsonResponse;
    }

    /**
     * @Route("/casus/publish")
     * @Method({"POST"})
     */
    public function casusPublishAction(Request $request)
    {
        $entityManager = $this->getDoctrine()->getManager();
        try {
            $entityManager->getConnection()->beginTransaction();
            $casusGuid = $request->get('casusGuid');
            $userUuid = $request->get('userUuid');
            $title = $request->get('title');
            $description = $request->get('description');
            $awardList = $request->get('awardList');
            $price = $request->get('price');
            $region = $request->get('region');
            $place = $request->get('place');
            // 处理业务
            $userRepository = $this->getDoctrine()->getRepository('FantasticBundle:User');
            $casusRepository = $this->getDoctrine()->getRepository('FantasticBundle:Casus');
            $awardRepository = $this->getDoctrine()->getRepository('FantasticBundle:Award');
            $casusAwardRepository = $this->getDoctrine()->getRepository('FantasticBundle:CasusAward');
            $cbwaUser = $userRepository->findUserByUserUuid($userUuid);
            if (!$cbwaUser) {
                throw new LoveException(LoveConstant::ERROR_USER_NOT_EXIST);
            }
            $casus = $casusRepository->findCasusByGuid($casusGuid);
            $newCasus = false;
            if (!$casus) {
                $casus = new Casus();
                $newCasus = true;
            } else {
                $casusAwardRepository->deleteCasusAwardByCasusId($casus->getId());
            }
            $casus->setUserId($cbwaUser->getUserId());
            $casus->setName($cbwaUser->getName());
            $casus->setTitle($title);
            $casus->setDescription($description);
            $casus->setPrice($price);
            $casus->setRegion($region);
            $casus->setPlace($place);
            // 第一次保存
            $casusRepository->saveCasus($casus);
            // 保存案例和奖项的关联关系
            $awardArray = json_decode($awardList, true);
            $totalFee = 0.00;
            foreach ($awardArray as $awardMini) {
                $award = $awardRepository->findAwardById($awardMini['id']);
                if (!$award) {
                    throw new LoveException(LoveConstant::ERROR_AWARD_NOT_EXIST);
                } else {
                    $this->get('logger')->info("EFEF");
                    $casusAward = new CasusAward();
                    $casusAward->setCasusId($casus->getId());
                    $casusAward->setAwardId($award->getId());
                    $casusAward->setAwardName($award->getName());
                    $casusAward->setAwardFee($award->getFee());
                    $casusAwardRepository->saveCasusAward($casusAward);
                    $totalFee += $award->getFee();
                }
            }
            $casus->setAwardList($awardList);
            $casus->setTotalFee(number_format($totalFee, 2));
            $casus->setAwardNumber(count($awardArray));
            // 第二次保存
            $casusRepository->saveCasus($casus);
            $entityManager->getConnection()->commit();
            // 设置返回数据
            $this->setSuccess($casus->toArray(), $newCasus ? LoveConstant::MESSAGE_CASUS_PUBLISH_SUCCESS
                : LoveConstant::MEESAGE_CASUS_UPDATE_SUCCESS);
        } catch (\Exception $e) {
            $this->setFailedMessage($e->getMessage());
            $entityManager->getConnection()->rollback();
        }
        $jsonResponse = $this->makeJsonResponse();
        return $jsonResponse;
    }
}