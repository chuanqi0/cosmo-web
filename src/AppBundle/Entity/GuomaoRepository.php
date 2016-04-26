<?php

namespace AppBundle\Entity;

use Doctrine\ORM\EntityRepository;

class GuomaoRepository extends EntityRepository
{
    public function saveGuomao($guomao)
    {
        $this->getEntityManager()->persist($guomao);
        $this->getEntityManager()->flush();
    }
}
