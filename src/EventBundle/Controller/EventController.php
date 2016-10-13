<?php

namespace EventBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

use AppBundle\Controller\BaseController;
use AppBundle\Common\LoveException;
use EventBundle\Entity\Mikeal;

/**
 * @Route("/api/event")
 */
class EventController extends BaseController
{
    /**
     * @Route("/guomao")
     */
    public function guomaoVoteAction($id)
    {
        $jsonResponse = $this->makeJsonResponse();
        $jsonResponse->headers->set('Access-Control-Allow-Origin', '*');
        return $jsonResponse;
    }
}
