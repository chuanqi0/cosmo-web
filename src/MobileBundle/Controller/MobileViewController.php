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
     * @Route("/test")
     */
    public function testAction()
    {
        $dataOut = array(
            'base' => $this->base,
            'domain' => $this->domain
        );
        return $this->render('MobileBundle::test.html.twig', $dataOut);
    }

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

    /**
     * @Route("/share/video/{posterUuid}")
     */
    public function shareVideoAction($posterUuid)
    {
        $dataOut = array(
            'base' => $this->base,
            'domain' => $this->domain,
            'posterUuid' => $posterUuid
        );
        return $this->render('MobileBundle::share.video.html.twig', $dataOut);
    }

    /**
     * @Route("/share/photo/{photoUuid}")
     */
    public function sharePhotoAction($photoUuid)
    {
        $dataOut = array(
            'base' => $this->base,
            'domain' => $this->domain,
            'photoUuid' => $photoUuid
        );
        return $this->render('MobileBundle::share.photo.html.twig', $dataOut);
    }

    /**
     * @Route("/share/poster/{posterUuid}")
     */
    public function sharePosterAction($posterUuid)
    {
        $dataOut = array(
            'base' => $this->base,
            'domain' => $this->domain,
            'posterUuid' => $posterUuid
        );
        return $this->render('MobileBundle::share.poster.html.twig', $dataOut);
    }
}
