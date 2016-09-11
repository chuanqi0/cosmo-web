<?php

namespace WebBundle\Controller;

use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;

use AppBundle\Controller\BaseController;

class WebViewController extends BaseController
{
    /**
     * @Route("/")
     */
    public function homeAction()
    {
        return $this->render('WebBundle::home.html.twig');
    }
}