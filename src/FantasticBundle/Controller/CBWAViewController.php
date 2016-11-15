<?php

namespace FantasticBundle\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Cookie;


use AppBundle\Controller\BaseController;

use UtilBundle\Constant\LoveConstant;

/**
 * @Route("/cbwa")
 */
class CBWAViewController extends BaseController
{
    /**
     * @Route("/", name="cbwa_home")
     */
    public function homeAction()
    {
        // 处理业务
        $judgeRepository = $this->getDoctrine()->getRepository('FantasticBundle:Judge');
        $judgeList = $judgeRepository->getJudgeList();
        $judgeListArray = $judgeRepository->listToArray($judgeList);
        $dataOut = array(
            'base' => $this->base,
            'domain' => $this->domain,
            'index' => 'home',
            'judgeList' => $judgeListArray
        );
        return $this->render('FantasticBundle::home.html.twig', $dataOut);
    }

    /**
     * @Route("/browser")
     */
    public function browserAction()
    {
        // 处理业务
        $dataOut = array(
            'base' => $this->base,
            'domain' => $this->domain,
            'index' => 'browser'
        );
        return $this->render('FantasticBundle::browser.html.twig', $dataOut);
    }

    /**
     * @Route("/join/success")
     */
    public function joinSuccessAction(Request $request)
    {
        // 处理业务
        $cookieUserStr = $request->cookies->get("user");
        if (!$cookieUserStr) {
            return $this->redirectToRoute('cbwa_register');
        }
        $dataOut = array(
            'base' => $this->base,
            'domain' => $this->domain,
            'index' => 'join'
        );
        return $this->render('FantasticBundle::join.success.html.twig', $dataOut);
    }

    /**
     * @Route("/ceremony/success")
     */
    public function ceremonySuccessAction(Request $request)
    {
        // 处理业务
        $cookieUserStr = $request->cookies->get("user");
        if (!$cookieUserStr) {
            return $this->redirectToRoute('cbwa_register');
        }
        $dataOut = array(
            'base' => $this->base,
            'domain' => $this->domain,
            'index' => 'ceremony'
        );
        return $this->render('FantasticBundle::ceremony.success.html.twig', $dataOut);
    }

    /**
     * @Route("/join", name="cbwa_join")
     */
    public function joinAction(Request $request)
    {
        // 处理业务
        $cookieUserStr = $request->cookies->get("user");
        if (!$cookieUserStr) {
            return $this->redirectToRoute('cbwa_register');
        }
        $cookieUser = json_decode($cookieUserStr);
        // 是否已经补充信息
        $userRepository = $this->getDoctrine()->getRepository('FantasticBundle:User');
        $cbwaUser = $userRepository->findUserByUserUuid($cookieUser->uuid);
        $dataOut = array(
            'base' => $this->base,
            'domain' => $this->domain,
            'index' => 'join'
        );
        if ($cbwaUser) {
            $awardRepository = $this->getDoctrine()->getRepository('FantasticBundle:Award');
            $awardList = $awardRepository->getAwardList();
            $dataOut['awardList'] = $awardRepository->listToArray($awardList);
            $dataOut['cbwaUser'] = $cbwaUser->toArray();
            return $this->render('FantasticBundle::join.html.twig', $dataOut);
        } else {
            return $this->render('FantasticBundle::extra.html.twig', $dataOut);
        }
    }

    /**
     * @Route("/ceremony")
     */
    public function ceremonyAction(Request $request)
    {
        // 处理业务
        $ceremonyStep = $request->cookies->get("ceremonyStep");
        $dataOut = array(
            'base' => $this->base,
            'domain' => $this->domain,
            'index' => 'ceremony'
        );
        if ($ceremonyStep == 4) {
            $cookieUserStr = $request->cookies->get("user");
            if (!$cookieUserStr) {
                return $this->redirectToRoute('cbwa_register');
            }
            $cookieUser = json_decode($cookieUserStr);
            // 是否已经补充信息
            $userRepository = $this->getDoctrine()->getRepository('FantasticBundle:User');
            $cbwaUser = $userRepository->findUserByUserUuid($cookieUser->uuid);
            if (!$cbwaUser) {
                return $this->render('FantasticBundle::extra.html.twig', $dataOut);
            } else {
                $dataOut['cbwaUser'] = $cbwaUser->toArray();
                $casusRepository = $this->getDoctrine()->getRepository('FantasticBundle:Casus');
                $casusList = $casusRepository->findPaidCasusByUserId($cbwaUser->getUserId());
                if ($casusList && sizeof($casusList) > 0) {
                    $dataOut['ceremonyPrice'] = LoveConstant::CBWA_TICKET_FEE_1;
                } else {
                    $dataOut['ceremonyPrice'] = LoveConstant::CBWA_TICKET_FEE_2;
                }
                return $this->render('FantasticBundle::ceremony.ticket.html.twig', $dataOut);
            }
        } else {
            return $this->render('FantasticBundle::ceremony.html.twig', $dataOut);
        }
    }

    /**
     * @Route("/casus/{guid}")
     */
    public function casusAction($guid)
    {
        // 处理业务
        $casusRepository = $this->getDoctrine()->getRepository('FantasticBundle:Casus');
        $casus = $casusRepository->findCasusByGuid($guid);
        if (!$casus) {
            return $this->redirectToRoute('cbwa_home');
        }
        $userRepository = $this->getDoctrine()->getRepository('FantasticBundle:User');
        $cbwaUser = $userRepository->findUserByUserId($casus->getUserId());
        if (!$cbwaUser) {
            return $this->redirectToRoute('cbwa_home');
        }
        $dataOut = array(
            'base' => $this->base,
            'domain' => $this->domain,
            'index' => 'casus',
            'casus' => $casus->toDetailArray(),
            'cbwaUser' => $cbwaUser->toArray()
        );
        return $this->render('FantasticBundle::casus.html.twig', $dataOut);
    }

    /**
     * @Route("/info")
     */
    public function infoAction()
    {
        $dataOut = array(
            'base' => $this->base,
            'domain' => $this->domain,
            'index' => 'info'
        );
        return $this->render('FantasticBundle::info.html.twig', $dataOut);
    }

    /**
     * @Route("/awards")
     */
    public function awardsAction()
    {
        $dataOut = array(
            'base' => $this->base,
            'domain' => $this->domain,
            'index' => 'awards'
        );
        return $this->render('FantasticBundle::awards.html.twig', $dataOut);
    }

    /**
     * @Route("/works")
     */
    public function worksAction()
    {
        $awardRepository = $this->getDoctrine()->getRepository('FantasticBundle:Award');
        $awardList = $awardRepository->getAwardList();
        $dataOut = array(
            'base' => $this->base,
            'domain' => $this->domain,
            'index' => 'works',
            'awardList' => $awardRepository->listToArray($awardList)
        );
        return $this->render('FantasticBundle::works.html.twig', $dataOut);
    }

    /**
     * @Route("/register", name="cbwa_register")
     */
    public function registerAction(Request $request)
    {
        // 处理业务
        $cookieUser = $request->cookies->get("user");
        if ($cookieUser) {
            return $this->redirectToRoute('cbwa_home');
        }
        $dataOut = array(
            'base' => $this->base,
            'domain' => $this->domain,
            'index' => 'register'
        );
        return $this->render('FantasticBundle::register.html.twig', $dataOut);
    }

    /**
     * @Route("/login")
     */
    public function loginAction(Request $request)
    {
        // 处理业务
        $cookieUser = $request->cookies->get("user");
        if ($cookieUser) {
            return $this->redirectToRoute('cbwa_home');
        }
        $dataOut = array(
            'base' => $this->base,
            'domain' => $this->domain,
            'index' => 'login'
        );
        return $this->render('FantasticBundle::login.html.twig', $dataOut);
    }

    /**
     * @Route("/reset")
     */
    public function resetAction(Request $request)
    {
        // 处理业务
        $cookieUser = $request->cookies->get("user");
        if ($cookieUser) {
            return $this->redirectToRoute('cbwa_home');
        }
        $dataOut = array(
            'base' => $this->base,
            'domain' => $this->domain,
            'index' => 'reset'
        );
        return $this->render('FantasticBundle::reset.html.twig', $dataOut);
    }

    /**
     * @Route("/personal")
     */
    public function personalAction(Request $request)
    {
        // 处理业务
        $cookieUserStr = $request->cookies->get("user");
        if (!$cookieUserStr) {
            return $this->redirectToRoute('cbwa_home');
        }
        $cookieUser = json_decode($cookieUserStr);
        // 是否已经补充信息
        $userRepository = $this->getDoctrine()->getRepository('FantasticBundle:User');
        $cbwaUser = $userRepository->findUserByUserUuid($cookieUser->uuid);
        $dataOut = array(
            'base' => $this->base,
            'domain' => $this->domain,
            'index' => 'personal'
        );
        if (!$cbwaUser) {
            return $this->render('FantasticBundle::extra.html.twig', $dataOut);
        } else {
            $personalStep = $request->cookies->get("personalStep");
            if ($personalStep == null || $personalStep == 1) {
                $dataOut['cbwaUser'] = $cbwaUser->toArray();
                return $this->render('FantasticBundle::personal.info.html.twig', $dataOut);
            } else if ($personalStep == 2) {
                $dataOut['cbwaUser'] = $cbwaUser->toArray();
                return $this->render('FantasticBundle::personal.casus.html.twig', $dataOut);
            } else {
                return $this->render('FantasticBundle::personal.ticket.html.twig', $dataOut);
            }
        }
    }
}