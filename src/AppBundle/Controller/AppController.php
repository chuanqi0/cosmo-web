<?php

namespace AppBundle\Controller;

use AppBundle\Common\EventsException;
use AppBundle\Entity\Mikeal;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class AppController extends BaseController
{
    /**
     * @Route("/", name="homepage")
     */
    public function indexAction(Request $request)
    {
        // replace this example code with whatever you need
        return $this->render('default/index.html.twig', array(
            'base_dir' => realpath($this->container->getParameter('kernel.root_dir').'/..'),
        ));
    }

    /**
     * @Route("/api/guomao/vote/{id}")
     */
    public function guomaoVoteAction(Request $request, $id)
    {
        try {
            $guomaoRepo = $this->getDoctrine()->getRepository('AppBundle:Guomao');
            $guomao = $guomaoRepo->find($id);
            $guomao->setVotes($guomao->getVotes() + 1);
            $guomaoRepo->saveGuomao($guomao);
            $this->setSuccess();
        } catch (EventsException $e) {
            $this->setFailedMessage($e->getMessage());
        }
        $jsonResponse = $this->makeJsonResponse();
        $jsonResponse->headers->set('Access-Control-Allow-Origin', '*');
        return $jsonResponse;
    }

    /**
     * @Route("/api/mikeal/vote/{id}/{telephone}/{name}")
     */
    public function mikealVoteAction(Request $request, $id, $telephone, $name)
    {
        try {
            $mikealRepo = $this->getDoctrine()->getRepository('AppBundle:Mikeal');
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

    /**
     * @Route("/api/db/test")
     */
    public function dbAction()
    {
        try {
            var_dump($this->getDoctrine()->getConnection()->getParams());
            $this->setSuccess();
        } catch (EventsException $e) {
            $this->setFailedMessage($e->getMessage());
        }
        return $this->makeJsonResponse();
    }
}
