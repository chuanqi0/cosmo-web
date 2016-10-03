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
     * @Route("/guomao/vote/{id}")
     */
    public function guomaoVoteAction($id)
    {
        try {
            $guomaoRepo = $this->getDoctrine()->getRepository('EventBundle:Guomao');
            $guomao = $guomaoRepo->find($id);
            if ($guomao) {
                $guomao->setVotes($guomao->getVotes() + 1);
                $guomaoRepo->saveGuomao($guomao);
                $this->setSuccess();
            }
        } catch (LoveException $e) {
            $this->setFailedMessage($e->getMessage());
        }
        $jsonResponse = $this->makeJsonResponse();
        $jsonResponse->headers->set('Access-Control-Allow-Origin', '*');
        return $jsonResponse;
    }

    /**
     * @Route("/mikeal/vote/{id}/{telephone}/{name}")
     */
    public function mikealVoteAction($id, $telephone, $name)
    {
        try {
            $mikealRepo = $this->getDoctrine()->getRepository('EventBundle:Mikeal');
            $mikeal = new Mikeal();
            $mikeal->setName($name);
            $mikeal->setTelephone($telephone);
            $mikeal->setVote($id);
            $mikealRepo->saveMikeal($mikeal);
            $this->setSuccess();
        } catch (EventsException $e) {
            $this->setFailedMessage($e->getMessage());
        }
        $jsonResponse = $this->makeJsonResponse();
        $jsonResponse->headers->set('Access-Control-Allow-Origin', '*');
        return $jsonResponse;
    }
}
