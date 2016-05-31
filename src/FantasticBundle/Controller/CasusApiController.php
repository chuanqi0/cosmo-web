<?php

namespace FantasticBundle\Controller;

use AppBundle\Common\LoveException;
use Symfony\Component\Routing\Annotation\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Component\HttpFoundation\Request;

use AppBundle\Controller\BaseController;
use FantasticBundle\Entity\Casus;
use FantasticBundle\Entity\Award;
use FantasticBundle\Entity\CasusAward;
use UtilBundle\Constant\LoveConstant;

class VideoApiController extends BaseController
{
    /**
     * @Route("/api/fantastic/casus/publish")
     * @Method({"POST"})
     */
    public function videoPublishAction(Request $request)
    {
        try {
            $userGuid = $request->get('userGuid');
            $title = $request->get('title');
            $description = $request->get('description');
            $awardList = $request->get('awardList');
            $price = $request->get('price');
            $region = $request->get('region');
            $place = $request->get('place');
            // 处理业务
            $userRepository = $this->getDoctrine()->getRepository('FantasticBundle:User');
            $awardRepository = $this->getDoctrine()->getRepository('FantasticBundle:Award');
            $user = $userRepository->findUserByGuid($userGuid);
            if (!$user) {
                throw new LoveException(LoveConstant::ERROR_USER_NOT_EXIST);
            }
            $casus = new Casus();
            $casus->setUserId($user->getId());
            $casus->setTitle($title);
            $casus->setDescription($description);
            $casus->setPrice($price);
            $casus->setRegion($region);
            $casus->setPlace($place);
            // 第一次保存
            $awardArray = json_decode($awardList, true);
            $totalFee = 0.00;
            foreach ($awardArray as $awardId) {
                $award = $awardRepository->findAwardById($awardId);
                if (!$award) {
                    throw new LoveException(LoveConstant::ERROR_AWARD_NOT_EXIST);
                } else {
                    $totalFee += $award->getFee();
                }
            }
            $casus->setTotalFee($totalFee);
            $casus->setAwardNumber(count($awardArray));
        } catch (\Exception $e) {
            $this->setFailedMessage($e->getMessage());
        }
        $jsonResponse = $this->makeJsonResponse();
        return $jsonResponse;
    }
}