<?php

namespace MobileBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

use AppBundle\Controller\BaseController;

class MobileViewController extends BaseController
{
    /**
     * @Route("/consultant")
     */
    public function consultantAction()
    {
        return $this->render('MobileBundle:Default:index.html.twig');
    }
}
