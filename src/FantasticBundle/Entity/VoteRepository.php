<?php

namespace FantasticBundle\Entity;

use Doctrine\ORM\EntityRepository;
use UtilBundle\Service\UtilService;

class VoteRepository extends EntityRepository
{
    public function findVoteOfToday($clientIp, $casusGuid)
    {
        $today = date('Y-m-d H:i:s', strtotime(date('Y-m-d', time())));
        $qb = $this->getEntityManager()->createQueryBuilder();
        $qb->select('v')
            ->from('FantasticBundle\Entity\Vote', 'v')
            ->where('v.clientIp = :clientIp')
            ->andWhere('v.casusGuid = :casusGuid')
            ->andWhere('v.createTime > :today')
            ->setParameter('clientIp', $clientIp)
            ->setParameter('casusGuid', $casusGuid)
            ->setParameter('today', $today);
        $results = $qb->getQuery()->getResult();
        if (count($results) > 0) {
            return $results[0];
        } else {
            return null;
        }
    }

    public function saveVote($vote)
    {
        $vote->setUpdateTime(UtilService::getCurrentTime());
        $this->getEntityManager()->persist($vote);
        $this->getEntityManager()->flush();
    }
}
