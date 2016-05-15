<?php

namespace EventBundle\Entity;

use Doctrine\ORM\EntityRepository;

class MikealRepository extends EntityRepository
{
    public function saveMikeal($mikeal)
    {
        $this->getEntityManager()->persist($mikeal);
        $this->getEntityManager()->flush();
    }
}
