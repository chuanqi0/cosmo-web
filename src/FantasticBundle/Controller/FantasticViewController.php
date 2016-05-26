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
        return $this->render('FantasticBundle::home.html.twig');
    }
}