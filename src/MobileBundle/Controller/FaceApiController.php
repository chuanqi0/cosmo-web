<?php
/**
 * Created by PhpStorm.
 * User: ZLF
 * Date: 2017/1/21
 * Time: 15:22
 */

namespace MobileBundle\Controller;

use FantasticBundle\Entity\Face;
use Symfony\Component\HttpFoundation\Request;

use AppBundle\Controller\BaseController;

class FaceApiController extends BaseController
{
    /**
     * @Route("/face/create")
     * @Method({"POST"})
     */
    public function ticketCreateAction(Request $request)
    {
        $faceUuid = $request->get('faceUuid');
        $tags = $request->get('tags');
        $crops = $request->get('crops');
        // 处理业务
        $faceRepository = $this->getDoctrine()->getRepository('MobileBundle:Face');

        $face = new Face();
        $jsonResponse = $this->makeJsonResponse();
        return $jsonResponse;
    }

}