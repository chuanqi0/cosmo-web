<?php

namespace AppBundle\Controller;

use AppBundle\Common\EventsException;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;

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
        return $this->makeJsonResponse();
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
