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
        $dataOut = array(
            'base' => $this->base,
            'index' => 'home',
            'judgeList' => $judgeList
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
}