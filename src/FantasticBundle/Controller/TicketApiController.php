<?php

namespace FantasticBundle\Controller;

use AppBundle\Common\LoveException;
use Symfony\Component\Routing\Annotation\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Component\HttpFoundation\Request;

use AppBundle\Controller\BaseController;
use FantasticBundle\Entity\Ticket;
use UtilBundle\Constant\LoveConstant;

/**
 * @Route("/api/cbwa")
 */
class TicketApiController extends BaseController
{
    /**
     * @Route("/ticket/create")
     * @Method({"POST"})
     */
    public function ticketCreateAction(Request $request)
    {
        $entityManager = $this->getDoctrine()->getManager();
        try {
            $entityManager->getConnection()->beginTransaction();
            $userUuid = $request->get('userUuid');
            $ticketGuid = $request->get('ticketGuid');
            $name = $request->get('name');
            $telephone = $request->get('telephone');
            $address = $request->get('address');
            // 处理业务
            $userRepository = $this->getDoctrine()->getRepository('FantasticBundle:User');
            $ticketRepository = $this->getDoctrine()->getRepository('FantasticBundle:Ticket');
            $cbwaUser = $userRepository->findUserByUserUuid($userUuid);
            if (!$cbwaUser) {
                throw new LoveException(LoveConstant::ERROR_USER_NOT_EXIST);
            }
            $ticket = $ticketRepository->findTicketByGuid($ticketGuid);
            $newTicket = false;
            if (!$ticket) {
                $ticket = new Ticket();
                $newTicket = true;
            }
            $ticket->setUserId($cbwaUser->getUserId());
            $ticket->setName($name);
            $ticket->setTelephone($telephone);
            $ticket->setAddress($address);
            $ticket->setTotalFee(LoveConstant::CBWA_TICKET_FEE);
            // 保存
            $ticketRepository->saveTicket($ticket);
            $entityManager->getConnection()->commit();
            // 设置返回数据
            $this->setSuccess($ticket->toArray(), $newTicket == true ? LoveConstant::MESSAGE_TICKET_CREATE_SUCCESS :
                LoveConstant::MESSAGE_TICKET_UPDATE_SUCCESS);
        } catch (\Exception $e) {
            $this->setFailedMessage($e->getMessage());
            $entityManager->getConnection()->rollback();
        }
        $jsonResponse = $this->makeJsonResponse();
        return $jsonResponse;
    }

    /**
     * @Route("/ticket/personal")
     * @Method({"POST"})
     */
    public function ticketPersonalAction(Request $request)
    {
        try {
            $userUuid = $request->get('userUuid');
            $userRepository = $this->getDoctrine()->getRepository('FantasticBundle:User');
            $cbwaUser = $userRepository->findUserByUserUuid($userUuid);
            if (!$cbwaUser) {
                throw new LoveException(LoveConstant::ERROR_USER_NOT_EXIST);
            }
            // 处理业务
            $ticketRepository = $this->getDoctrine()->getRepository('FantasticBundle:Ticket');
            $ticketList = $ticketRepository->getPersonalTicketList($cbwaUser->getUserId());
            // 设置返回数据
            $this->setSuccess($ticketRepository->listToArray($ticketList), LoveConstant::MEESAGE_TICKET_PERSONAL_SUCCESS);
        } catch (\Exception $e) {
            $this->setFailedMessage($e->getMessage());
        }
        $jsonResponse = $this->makeJsonResponse();
        return $jsonResponse;
    }

    /**
     * @Route("/ticket/cancel")
     * @Method({"POST"})
     */
    public function ticketCancelAction(Request $request)
    {
        try {
            $ticketGuid = $request->get('ticketGuid');
            // 处理业务
            $ticketRepository = $this->getDoctrine()->getRepository('FantasticBundle:Ticket');
            $ticket = $ticketRepository->findTicketByGuid($ticketGuid);
            if (!$ticket) {
                throw new LoveException(LoveConstant::ERROR_TICKET_NOT_EXIST);
            }
            if ($ticket->getPaid() == true) {
                throw new LoveException(LoveConstant::ERROR_TICKET_PAID);
            }
            $ticket->setValid(false);
            $ticketRepository->saveTicket($ticket);
            // 设置返回数据
            $this->setSuccess($ticket->toArray(), LoveConstant::MEESAGE_TICKET_CANCEL_SUCCESS);
        } catch (\Exception $e) {
            $this->setFailedMessage($e->getMessage());
        }
        $jsonResponse = $this->makeJsonResponse();
        return $jsonResponse;
    }

    /**
     * @Route("/ticket/detail")
     * @Method({"POST"})
     */
    public function ticketDetailAction(Request $request)
    {
        try {
            $ticketGuid = $request->get('ticketGuid');
            // 处理业务
            $ticketRepository = $this->getDoctrine()->getRepository('FantasticBundle:Ticket');
            $ticket = $ticketRepository->findTicketByGuid($ticketGuid);
            if (!$ticket) {
                throw new LoveException(LoveConstant::ERROR_TICKET_NOT_EXIST);
            }
            // 设置返回数据
            $this->setSuccess($ticket->toArray(), LoveConstant::MEESAGE_TICKET_DETAIL_SUCCESS);
        } catch (\Exception $e) {
            $this->setFailedMessage($e->getMessage());
        }
        $jsonResponse = $this->makeJsonResponse();
        return $jsonResponse;
    }
}