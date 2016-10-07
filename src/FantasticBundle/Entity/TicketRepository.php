<?php

namespace FantasticBundle\Entity;

use Doctrine\ORM\EntityRepository;
use UtilBundle\Service\UtilService;

class TicketRepository extends EntityRepository
{
    public function findTicketByGuid($guid) {
        return $this->findOneBy(array('guid' => $guid, 'valid' => true));
    }

    public function saveTicket($ticket)
    {
        $ticket->setUpdateTime(UtilService::getCurrentTime());
        $this->getEntityManager()->persist($ticket);
        $this->getEntityManager()->flush();
    }

    public function getPersonalTicketList($userId)
    {
        return $this->findBy(array('userId' => $userId), array('valid' => 'DESC', 'createTime' => 'DESC'));
    }

    public function listToArray($ticketList) {
        $ticketListArray = array();
        foreach ($ticketList as $ticket) {
            array_push($ticketListArray, $ticket->toArray());
        }
        return $ticketListArray;
    }
}
