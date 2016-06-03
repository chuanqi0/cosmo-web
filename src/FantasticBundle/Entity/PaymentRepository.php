<?php

namespace FantasticBundle\Entity;

use Doctrine\ORM\EntityRepository;

class PaymentRepository extends EntityRepository
{
    public function savePayment($payment)
    {
        $this->getEntityManager()->persist($payment);
        $this->getEntityManager()->flush();
    }
}
