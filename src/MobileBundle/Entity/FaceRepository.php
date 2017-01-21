<?php

namespace MobileBundle\Entity;

use Doctrine\ORM\EntityRepository;
use UtilBundle\Service\UtilService;

class FaceRepository extends EntityRepository
{
    public function findFaceByUuid($faceUuid)
    {
        return $this->findOneBy(array('faceUuid' => $faceUuid, 'valid' => true));
    }

    public function saveFace($face)
    {
        $face->setUpdateTime(UtilService::getCurrentTime());
        $this->getEntityManager()->persist($face);
        $this->getEntityManager()->flush();
    }
}
