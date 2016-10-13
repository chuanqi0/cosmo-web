<?php

namespace AppBundle\Controller;

use AppBundle\Common\EventsException;
use AppBundle\Entity\Mikeal;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Component\HttpFoundation\Request;

use UtilBundle\Constant\LoveConstant;

class AppController extends BaseController
{
    /**
     * @Route("/api/region/list")
     * @Method({"GET"})
     */
    public function regionAction()
    {
        try {
            // 处理业务
            $regionRepository = $this->getDoctrine()->getRepository('AppBundle:Region');
            $regionList = $regionRepository->findAll();
            $regionArray = array();
            foreach ($regionList as $region) {
                $city = $region->getCity();
                $province = $region->getProvince();
                if (!array_key_exists($province, $regionArray)) {
                    $regionArray[$province] = array();
                }
                array_push($regionArray[$province], $city);
            }
            // 设置返回数据
            $this->setSuccess($regionArray, LoveConstant::MEESAGE_REGION_SUCCESS);
        } catch (\Exception $e) {
            $this->setFailedMessage($e->getMessage());
        }
        $jsonResponse = $this->makeJsonResponse();
        return $jsonResponse;
    }
}
