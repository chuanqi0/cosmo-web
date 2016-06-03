<?php

namespace FantasticBundle\Controller;

use Symfony\Component\Routing\Annotation\Route;

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
     * @Route("/join")
     */
    public function joinAction()
    {
        return $this->render('FantasticBundle::join.html.twig', array('index' => 'join'));
    }

    /**
     * @Route("/register")
     */
    public function registerAction()
    {
        return $this->render('FantasticBundle::register.html.twig', array('index' => 'register'));
    }
}