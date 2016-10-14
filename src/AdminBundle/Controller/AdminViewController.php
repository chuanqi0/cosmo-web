<?php

namespace AdminBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Cookie;

use AppBundle\Controller\BaseController;

/**
 * @Route("/admin")
 */
class AdminViewController extends BaseController
{
    /**
     * @Route("/", name="admin_home")
     */
    public function homeAction(Request $request)
    {
        // 处理业务
        $cookieUser = $request->cookies->get("user");
        if (!$cookieUser) {
            return $this->redirectToRoute('admin_login');
        }
        $dataOut = array(
            'base' => $this->base,
            'domain' => $this->domain,
            'index' => 'home'
        );
        return $this->render('AdminBundle::home.html.twig', $dataOut);
    }

    /**
     * @Route("/login", name="admin_login")
     */
    public function loginAction(Request $request)
    {
        // 处理业务
        $cookieUser = $request->cookies->get("user");
        if ($cookieUser) {
            return $this->redirectToRoute('admin_home');
        }
        $dataOut = array(
            'base' => $this->base,
            'domain' => $this->domain,
            'index' => 'login'
        );
        return $this->render('AdminBundle::login.html.twig', $dataOut);
    }

    /**
     * @Route("/reset")
     */
    public function resetAction(Request $request)
    {
        // 处理业务
        $cookieUser = $request->cookies->get("user");
        if ($cookieUser) {
            return $this->redirectToRoute('admin_home');
        }
        $dataOut = array(
            'base' => $this->base,
            'domain' => $this->domain,
            'index' => 'reset'
        );
        return $this->render('AdminBundle::reset.html.twig', $dataOut);
    }

    /**
     * @Route("/register", name="admin_register")
     */
    public function registerAction(Request $request)
    {
        // 处理业务
        $cookieUser = $request->cookies->get("user");
        if ($cookieUser) {
            return $this->redirectToRoute('admin_home');
        }
        $dataOut = array(
            'base' => $this->base,
            'domain' => $this->domain,
            'index' => 'register'
        );
        return $this->render('AdminBundle::register.html.twig', $dataOut);
    }
}
