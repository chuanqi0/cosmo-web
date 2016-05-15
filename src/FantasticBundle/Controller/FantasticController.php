<?php

namespace FantasticBundle\Controller;

use Symfony\Component\Routing\Annotation\Route;

use AppBundle\Controller\BaseController;
use AppBundle\Common\LoveException;

class FantasticController extends BaseController
{
    /**
     * @Route("/")
     */
    public function homeAction()
    {
        return $this->makeJsonResponse();
    }
}