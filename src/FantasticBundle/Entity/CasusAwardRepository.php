<?php

namespace FantasticBundle\Entity;

use Doctrine\ORM\EntityRepository;
use UtilBundle\Service\UtilService;

class CasusAwardRepository extends EntityRepository
{
    public function saveCasusAward($casusAward)
    {
        $casusAward->setUpdateTime(UtilService::getCurrentTime());
        $this->getEntityManager()->persist($casusAward);
        $this->getEntityManager()->flush();
    }

    public function deleteCasusAwardByCasusId($casusId)
    {
        $queryStr = "delete from FantasticBundle:CasusAward ca where ca.casusId = :casusId";
        $query = $this->getEntityManager()->createQuery($queryStr);
        $query->setParameter('casusId', $casusId);
        $query->execute();
    }
}
