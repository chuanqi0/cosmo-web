<?php

namespace FantasticBundle\Entity;

use Doctrine\ORM\EntityRepository;
use UtilBundle\Service\UtilService;

class ReceiptRepository extends EntityRepository
{
    public function saveReceipt($receipt)
    {
        $receipt->setUpdateTime(UtilService::getCurrentTime());
        $this->getEntityManager()->persist($receipt);
        $this->getEntityManager()->flush();
    }
}
