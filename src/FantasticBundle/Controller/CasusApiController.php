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
     * @Route("/casus/list")
     * @Method({"POST"})
     */
    public function casusListAction(Request $request)
    {
        try {
            $awardId = $request->get('awardId');
            $page = $request->get('page');
            // 处理业务
            $casusRepository = $this->getDoctrine()->getRepository('FantasticBundle:Casus');
            $casusList = $casusRepository->getCasusList($awardId, $page);
            $totalElements = $casusRepository->countCasusList($awardId);
            $this->totalPage = ceil($totalElements / LoveConstant::CBWA_CASUS_PAGE_SIZE);
            // 设置返回数据
            $this->setSuccess($casusRepository->listToArray($casusList), LoveConstant::MEESAGE_CASUS_LIST_SUCCESS);
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
            $find = strpos($content, 'src=');
            if ($find) {
                $start = 0;
                $end = 0;
                for ($i = $find; $i < strlen($content); $i++) {
                    if (substr($content, $i, 1) == '"') {
                        if ($start == 0) {
                            $start = $i;
                            continue;
                        } else if ($end == 0) {
                            $end = $i;
                            break;
                        }
                    }
                }
                if ($start > 0 && $end > 0) {
                    $cover = substr($content, $start + 1, $end - $start - 1);
                    if ($cover) {
                        $casus->setCover($cover);
                    } else {
                        throw new LoveException(LoveConstant::ERROR_COVER_NOT_EXIST);
                    }
                }
            }
            $casus->setContent($content);
            // 跳过选择参赛奖项的环节,发布的明星案例
            if ($casus->getTotalFee() == '0.00') {
                $casus->setPaid(true);
            }
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
     * @Route("/casus/vote")
     * @Method({"POST"})
     */
    public function casusVoteAction(Request $request)
    {
        try {
            $casusGuid = $request->get('casusGuid');
            // 处理业务
            $casusRepository = $this->getDoctrine()->getRepository('FantasticBundle:Casus');
            $casus = $casusRepository->findCasusByGuid($casusGuid);
            if (!$casus) {
                throw new LoveException(LoveConstant::ERROR_CASUS_NOT_EXIST);
            }
            $casus->setVoteNumber($casus->getVoteNumber() + 1);
            $casusRepository->saveCasus($casus);
            // 设置返回数据
            $ip = $this->getIp();
            $this->setSuccess($ip);
        } catch (\Exception $e) {
            $this->setFailedMessage($e->getMessage());
        }
        $jsonResponse = $this->makeJsonResponse();
        return $jsonResponse;
    }

    /**
     * @Route("/casus/cancel")
     * @Method({"POST"})
     */
    public function casusCancelAction(Request $request)
    {
        try {
            $casusGuid = $request->get('casusGuid');
            // 处理业务
            $casusRepository = $this->getDoctrine()->getRepository('FantasticBundle:Casus');
            $casus = $casusRepository->findCasusByGuid($casusGuid);
            if (!$casus) {
                throw new LoveException(LoveConstant::ERROR_CASUS_NOT_EXIST);
            }
            if ($casus->getPaid() == true) {
                throw new LoveException(LoveConstant::ERROR_CASUS_PAID);
            }
            $casus->setValid(false);
            $casusRepository->saveCasus($casus);
            // 设置返回数据
            $this->setSuccess($casus->toArray(), LoveConstant::MEESAGE_CASUS_CANCEL_SUCCESS);
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
            $casus->setTotalFee(str_replace(',', '', number_format($totalFee, 2)));
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