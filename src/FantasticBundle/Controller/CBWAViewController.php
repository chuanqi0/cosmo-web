<?php

namespace FantasticBundle\Controller;

use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;

use AppBundle\Controller\BaseController;

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
            'index' => 'home',
            'judgeList' => $judgeListArray
        );
        return $this->render('FantasticBundle::home.html.twig', $dataOut);
    }

    /**
     * @Route("/join")
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
            'index' => 'join'
        );
        if ($cbwaUser) {
            $awardRepository = $this->getDoctrine()->getRepository('FantasticBundle:Award');
            $awardList = $awardRepository->getAwardList();
            $dataOut['awardList'] = $awardRepository->listToArray($awardList);
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
            'index' => 'ceremony'
        );
        if (!$cbwaUser) {
            return $this->render('FantasticBundle::extra.html.twig', $dataOut);
        } else {
            return $this->render('FantasticBundle::ceremony.html.twig', $dataOut);
        }
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
                return $this->render('FantasticBundle::personal.casus.html.twig', $dataOut);
            } else {
                return $this->render('FantasticBundle::personal.order.html.twig', $dataOut);
            }
        }
    }
}