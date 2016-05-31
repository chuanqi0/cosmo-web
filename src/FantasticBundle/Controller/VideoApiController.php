<?php

namespace FantasticBundle\Controller;

use Symfony\Component\Routing\Annotation\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Component\HttpFoundation\Request;

use AppBundle\Controller\BaseController;
use FantasticBundle\Entity\Video;

class VideoApiController extends BaseController
{
    /**
     * @Route("/api/fantastic/video/publish")
     * @Method({"POST"})
     */
    public function videoPublishAction(Request $request)
    {
        try {
            $videoGuid = $request->get("videoGuid");
            $title = $request->get("title");
            $cover = $request->get("cover");
            $url = $request->get("url");
            // 处理业务
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
        } catch (\Exception $e) {
            $this->setFailedMessage($e->getMessage());
        }
        $jsonResponse = $this->makeJsonResponse();
        return $jsonResponse;
    }
}