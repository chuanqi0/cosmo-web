<?php

namespace FantasticBundle\Entity;

use Doctrine\ORM\EntityRepository;
use UtilBundle\Service\UtilService;

class CasusRepository extends EntityRepository
{
    public function findCasusByGuid($guid) {
        return $this->findOneBy(array('guid' => $guid));
    }

    public function saveCasus($casus)
    {
        $casus->setUpdateTime(UtilService::getCurrentTime());
        $this->getEntityManager()->persist($casus);
        $this->getEntityManager()->flush();
    }
}
