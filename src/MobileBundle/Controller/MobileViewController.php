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

    /**
     * @Route("/cbwa/casus/{guid}")
     */
    public function cbwaCasusAction($guid)
    {
        // 处理业务
        $casusRepository = $this->getDoctrine()->getRepository('FantasticBundle:Casus');
        $casus = $casusRepository->findCasusByGuid($guid);
        if (!$casus) {
            return $this->redirectToRoute('mobile_cbwa_works');
        }
        $dataOut = array(
            'base' => $this->base,
            'domain' => $this->domain,
            'casus' => $casus->toDetailArray()
        );
        return $this->render('MobileBundle::cbwa.casus.html.twig', $dataOut);
    }

    /**
     * @Route("/cbwa/works", name="mobile_cbwa_works")
     */
    public function cbwaHomeAction()
    {
        $dataOut = array(
            'base' => $this->base,
            'domain' => $this->domain
        );
        return $this->render('MobileBundle::cbwa.works.html.twig', $dataOut);
    }

    /**
     * @Route("/face/home")
     */
    public function faceHomeAction()
    {
        $dataOut = array(
            'base' => $this->base,
            'domain' => $this->domain
        );
        return $this->render('MobileBundle::face.home.html.twig', $dataOut);
    }

    /**
     * @Route("/face/model")
     */
    public function faceModelAction()
    {
        $dataOut = array(
            'base' => $this->base,
            'domain' => $this->domain
        );
        return $this->render('MobileBundle::face.model.html.twig', $dataOut);
    }

    /**
     * @Route("/face/step/fill/{type}")
     */
    public function faceStepFillAction($type)
    {
        $dataOut = array(
            'base' => $this->base,
            'domain' => $this->domain,
            'type' => $type
        );
        return $this->render('MobileBundle::face.step.fill.html.twig', $dataOut);
    }

    /**
     * @Route("/face/step/photo/{type}/{tag1}/{tag2}/{tag3}/{tag4}/{tag5}/{tag6}")
     */
    public function faceStepPhotoAction($type, $tag1, $tag2, $tag3, $tag4, $tag5, $tag6)
    {
        $dataOut = array(
            'base' => $this->base,
            'domain' => $this->domain,
            'type' => $type,
            'tag1' => $tag1,
            'tag2' => $tag2,
            'tag3' => $tag3,
            'tag4' => $tag4,
            'tag5' => $tag5,
            'tag6' => $tag6
        );
        return $this->render('MobileBundle::face.step.photo.html.twig', $dataOut);
    }

    /**
     * @Route("/face/show/{uuid}")
     */
    public function faceShowAction($uuid)
    {
        $dataOut = array(
            'base' => $this->base,
            'domain' => $this->domain,
            'uuid' => $uuid
        );
        return $this->render('MobileBundle::face.show.html.twig', $dataOut);
    }
}
