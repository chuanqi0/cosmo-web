<?php

namespace FantasticBundle\Entity;

use Doctrine\ORM\EntityRepository;

class CasusAwardRepository extends EntityRepository
{
    public function saveCasusAward($casusAward)
    {
        $casusAward->setUpdateTime(UtilService::getCurrentTime());
        $this->getEntityManager()->persist($casusAward);
        $this->getEntityManager()->flush();
    }
}
