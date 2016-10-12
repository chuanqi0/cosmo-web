<?php

namespace MobileBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

use AppBundle\Controller\BaseController;

/**
 * @Route("/mobile")
 */
class MobileViewController extends BaseController
{
    /**
     * @Route("/consult")
     */
    public function consultAction()
    {
        $dataOut = array(
            'base' => $this->base,
            'domain' => $this->domain
        );
        return $this->render('MobileBundle::consult.html.twig', $dataOut);
    }
}
