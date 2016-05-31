<?php

namespace FantasticBundle\Controller;

use Symfony\Component\Routing\Annotation\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Component\HttpFoundation\Request;

use AppBundle\Common\LoveException;
use AppBundle\Controller\BaseController;
use UtilBundle\Constant\LoveConstant;
use FantasticBundle\Entity\User;

class UserApiController extends BaseController
{
    /**
     * @Route("/api/fantastic/user/register")
     * @Method({"POST"})
     */
    public function userRegisterAction(Request $request)
    {
        try {
            $name = $request->get("name");
            $identityCard = $request->get("identityCard");
            $telephone = $request->get("telephone");
            $password = $request->get("password");
            $wechat = $request->get("wechat");
            $company = $request->get("company");
            $companyLocation = $request->get("companyLocation");
            $companyIntro = $request->get("companyIntro");
            // 处理业务
            $userRepository = $this->getDoctrine()->getRepository('FantasticBundle:User');
            $user = $userRepository->findUserByTelephone($telephone);
            if ($user) {
                throw new LoveException(LoveConstant::ERROR_TELEPHONE_EXIST);
            } else {
                $user = new User();
            }
            $user->setName($name);
            $user->setIdentityCard($identityCard);
            $user->setTelephone($telephone);
            $user->setPassword($password);
            $user->setWechat($wechat);
            $user->setCompany($company ? $company : '');
            $user->setCompanyLocation($companyLocation ? $companyLocation : '');
            $user->setCompanyIntro($companyIntro ? $companyIntro : '');
            $userRepository->saveUser($user);
            // 设置返回数据
            $this->setSuccess($user->toArray(), LoveConstant::MESSAGE_USER_REGISTER_SUCCESS);
        } catch (\Exception $e) {
            $this->setFailedMessage($e->getMessage());
        }
        $jsonResponse = $this->makeJsonResponse();
        return $jsonResponse;
    }

    /**
     * @Route("/api/fantastic/user/update")
     * @Method({"POST"})
     */
    public function userUpdateAction(Request $request)
    {
        try {
            $userGuid = $request->get("userGuid");
            $name = $request->get("name");
            $identityCard = $request->get("identityCard");
            $password = $request->get("password");
            $wechat = $request->get("wechat");
            $company = $request->get("company");
            $companyLocation = $request->get("companyLocation");
            $companyIntro = $request->get("companyIntro");
            // 处理业务
            $userRepository = $this->getDoctrine()->getRepository('FantasticBundle:User');
            $user = $userRepository->findUserByGuid($userGuid);
            if (!$user) {
                throw new LoveException(LoveConstant::ERROR_USER_NOT_EXIST);
            }
            $user->setName($name);
            $user->setIdentityCard($identityCard);
            $user->setPassword($password);
            $user->setWechat($wechat);
            $user->setCompany($company ? $company : '');
            $user->setCompanyLocation($companyLocation ? $companyLocation : '');
            $user->setCompanyIntro($companyIntro ? $companyIntro : '');
            $userRepository->saveUser($user);
            // 设置返回数据
            $this->setSuccess($user->toArray(), LoveConstant::MESSAGE_USER_UPDATE_SUCCESS);
        } catch (\Exception $e) {
            $this->setFailedMessage($e->getMessage());
        }
        $jsonResponse = $this->makeJsonResponse();
        return $jsonResponse;
    }

    /**
     * @Route("/api/fantastic/user/login")
     * @Method({"POST"})
     */
    public function userLoginAction(Request $request)
    {
        try {
            $telephone = $request->get("telephone");
            $password = $request->get("password");
            // 处理业务
            $userRepository = $this->getDoctrine()->getRepository('FantasticBundle:User');
            $user = $userRepository->findUserByTelephone($telephone);
            if (!$user) {
                throw new LoveException(LoveConstant::ERROR_TELEPHONE_NOT_EXIST);
            } else if ($user->getPassword() != $password) {
                throw new LoveException(LoveConstant::ERROR_USER_PASSWORD);
            }
            // 设置返回数据
            $this->setSuccess($user->toArray(), LoveConstant::MESSAGE_USER_LOGIN_SUCCESS);
        } catch (\Exception $e) {
            $this->setFailedMessage($e->getMessage());
        }
        $jsonResponse = $this->makeJsonResponse();
        return $jsonResponse;
    }
}