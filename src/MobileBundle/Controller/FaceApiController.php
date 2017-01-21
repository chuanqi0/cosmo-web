<?php
/**
 * Created by PhpStorm.
 * User: ZLF
 * Date: 2017/1/21
 * Time: 15:22
 */

namespace MobileBundle\Controller;

use AppBundle\Common\LoveException;
use FantasticBundle\Entity\Face;
use Symfony\Component\Routing\Annotation\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Component\HttpFoundation\Request;
use UtilBundle\Constant\LoveConstant;

use AppBundle\Controller\BaseController;

/**
 * @Route("/api")
 */
class FaceApiController extends BaseController
{
    /**
     * @Route("/face/create")
     * @Method({"POST"})
     */
    public function faceCreateAction(Request $request)
    {
        try {
            $faceUuid = $request->get('faceUuid');
            $type = $request->get('type');
            $tags = $request->get('tags');
            $crops = $request->get('crops');
            // 处理业务
            $faceRepository = $this->getDoctrine()->getRepository('MobileBundle:Face');

            $face = new Face();
            $face->setFaceUuid($faceUuid);
            $face->setType($type);
            $face->setTags($tags);
            $face->setCrops($crops);

            $faceRepository->saveFace($face);
            $this->setSuccess($face->toArray(), LoveConstant::MESSAGE_SUCCESS);
        } catch (\Exception $e) {
            $this->setFailedMessage($e->getMessage());
        }

        $jsonResponse = $this->makeJsonResponse();
        return $jsonResponse;
    }

    /**
     * @Route("/face/detail")
     * @Method({"POST"})
     */
    public function faceDetailAction(Request $request)
    {
        try {
            $faceUuid = $request->get('faceUuid');
            // 处理业务
            $faceRepository = $this->getDoctrine()->getRepository('MobileBundle:Face');
            $face = $faceRepository->findTicketByGuid($faceUuid);
            if (!$face) {
                throw new LoveException(LoveConstant::MESSAGE_FAILED);
            }
            // 设置返回数据
            $this->setSuccess($face->toArray(), LoveConstant::MESSAGE_SUCCESS);
        } catch (\Exception $e) {
            $this->setFailedMessage($e->getMessage());
        }
        $jsonResponse = $this->makeJsonResponse();
        return $jsonResponse;
    }

}