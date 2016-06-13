<?php

namespace FantasticBundle\Controller;

use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;

use AppBundle\Controller\BaseController;

class FantasticViewController extends BaseController
{
    /**
     * @Route("/")
     */
    public function homeAction()
    {
        $videoRepository = $this->getDoctrine()->getRepository('FantasticBundle:Video');
        $casusRepository = $this->getDoctrine()->getRepository('FantasticBundle:Casus');
        $videoList = $videoRepository->getLatestVideoList();
        $totalVideoNumber = $videoRepository->getTotalVideoNumber();
        $casusList = $casusRepository->getLatestPublicCasusList();
        $totalCasusNumber = $casusRepository->getTotalPublicCasusNumber();
        $dataOut = array(
            'index' => 'home',
            'totalVideoNumber' => $totalVideoNumber,
            'videoList' => $videoRepository->listToArray($videoList),
            'totalCasusNumber' => $totalCasusNumber,
            'casusList' => $casusRepository->listToArray($casusList)
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
        $casusOut = array();
        if ($casusGuid) {
            $casusRepository = $this->getDoctrine()->getRepository('FantasticBundle:Casus');
            $casus = $casusRepository->findCasusByGuid($casusGuid);
            if ($casus) {
                $casusOut = $casus->toArray();
            }
        }
        $dataOut = array(
            'casus' => $casusOut,
            'index' => 'join'
        );
        return $this->render('FantasticBundle::apply.html.twig', $dataOut);
    }

    /**
     * @Route("/register")
     */
    public function registerAction()
    {
        return $this->render('FantasticBundle::register.html.twig', array('index' => 'register'));
    }
}