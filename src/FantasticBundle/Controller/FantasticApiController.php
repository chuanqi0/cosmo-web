<?php

namespace FantasticBundle\Controller;

use FantasticBundle\Entity\Video;
use Symfony\Component\Routing\Annotation\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Component\HttpFoundation\Request;

use AppBundle\Controller\BaseController;

class FantasticApiController extends BaseController
{
    /**
     * @Route("/api/fantastic/video/add")
     * @Method({"POST"})
     */
    public function videoAddAction(Request $request)
    {
        try {
            $videoGuid = $request->get("videoGuid");
            $title = $request->get("title");
            $cover = $request->get("cover");
            $url = $request->get("url");
            $videoRepository = $this->getDoctrine()->getRepository('FantasticBundle:Video');
            $video = $videoRepository->findVideoByGuid($videoGuid);
            if (!$video) {
               $video = new Video();
            }
            $video->setTitle($title);
            $video->setCover($cover);
            $video->setUrl($url);
            $videoRepository->saveVideo($video);
            // 设置返回数据
            $this->setSuccess($video->toArray());
        } catch (LoveException $e) {
            $this->setFailedMessage($e->getMessage());
        }
        $jsonResponse = $this->makeJsonResponse();
        return $jsonResponse;
    }
}