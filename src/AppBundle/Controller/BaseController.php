<?php

namespace AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;

use UtilBundle\Constant\LoveConstant;

class BaseController extends Controller
{
    protected $status;
    protected $message;
    protected $data;

    function __construct()
    {
        $this->status = LoveConstant::STATUS_FAILED;
        $this->message = LoveConstant::MESSAGE_FAILED;
        $this->data = array();
    }

    protected function makeJsonResponse()
    {
        $data = array(
            'status' => $this->status,
            'message' => $this->message,
            'data' => $this->data
        );
        return new JsonResponse($data);
    }

    protected function setFailedMessage($message)
    {
        $this->message = $message;
    }

    protected function setSuccess($data = array(), $message = LoveConstant::MESSAGE_SUCCESS)
    {
        $this->status = LoveConstant::STATUS_SUCCESS;
        $this->message = LoveConstant::MESSAGE_SUCCESS;
        $this->data = $data;
    }
}