<?php

namespace FantasticBundle\Controller;

use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;

use AppBundle\Controller\BaseController;

class CBWAViewController extends BaseController
{
    /**
     * @Route("/")
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
     * @Route("/apply")
     */
    public function applyAction(Request $request)
    {
        $casusGuid = $request->cookies->get('casusGuid');
        $casusGuid = preg_replace('/\"/', '', $casusGuid);
        $casusArray = array();
        if ($casusGuid) {
            $casusRepository = $this->getDoctrine()->getRepository('FantasticBundle:Casus');
            $casus = $casusRepository->findCasusByGuid($casusGuid);
            if ($casus) {
                $casusArray = $casus->toArray();
            }
        }
        $dataOut = array(
            'base' => $this->base,
            'casus' => $casusArray,
            'index' => 'join'
        );
        return $this->render('FantasticBundle::apply.html.twig', $dataOut);
    }

    /**
     * @Route("/register")
     */
    public function registerAction()
    {
        $dataOut = array(
            'base' => $this->base,
            'index' => 'register'
        );
        return $this->render('FantasticBundle::register.html.twig', $dataOut);
    }

    /**
     * @Route("/login")
     */
    public function loginAction()
    {
        $dataOut = array(
            'base' => $this->base,
            'index' => 'login'
        );
        return $this->render('FantasticBundle::login.html.twig', $dataOut);
    }

    /**
     * @Route("/reset")
     */
    public function resetAction()
    {
        $dataOut = array(
            'base' => $this->base,
            'index' => 'reset'
        );
        return $this->render('FantasticBundle::reset.html.twig', $dataOut);
    }
}