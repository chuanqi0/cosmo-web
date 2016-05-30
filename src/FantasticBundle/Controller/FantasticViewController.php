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
        $videoList = $videoRepository->getLatestVideoList();
        $totalVideoNumber = $videoRepository->getTotalVideoNumber();
        $dataOut = array(
            'index' => 'home',
            'totalVideoNumber' => $totalVideoNumber,
            'videoList' => $videoRepository->listToArray($videoList)
        );
        return $this->render('FantasticBundle::home.html.twig', $dataOut);
    }

    /**
     * @Route("/register")
     */
    public function registerAction()
    {
        return $this->render('FantasticBundle::register.html.twig', array('index' => 'register'));
    }
}