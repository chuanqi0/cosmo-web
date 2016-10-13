<?php

namespace WebBundle\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Cookie;


use AppBundle\Controller\BaseController;

class WebViewController extends BaseController
{
    /**
     * @Route("/")
     */
    public function indexAction(Request $request)
    {
        $direct = $request->get('direct');
        $dataOut = array(
            'base' => $this->base,
            'domain' => $this->domain,
            'direct' => $direct
        );
        return $this->render('WebBundle::download.v1.html.twig', $dataOut);
    }

    /**
     * @Route("/download")
     */
    public function downloadAction(Request $request)
    {
        $direct = $request->get('direct');
        $dataOut = array(
            'base' => $this->base,
            'domain' => $this->domain,
            'direct' => $direct
        );
        return $this->render('WebBundle::download.v1.html.twig', $dataOut);
    }

    /**
     * @Route("/policy/user")
     */
    public function policyUserAction()
    {
        $dataOut = array(
            'base' => $this->base,
            'domain' => $this->domain
        );
        return $this->render('WebBundle::policy.user.html.twig', $dataOut);
    }

    /**
     * @Route("/symfony", name="symfony")
     */
    public function symfonyAction()
    {
        $dataOut = array(
            'base' => $this->base,
            'domain' => $this->domain,
            'base_dir' => realpath($this->container->getParameter('kernel.root_dir').'/..')
        );
        return $this->render('index.html.twig', $dataOut);
    }
}