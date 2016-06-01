<?php

namespace FantasticBundle\Entity;

use Doctrine\ORM\EntityRepository;

class AwardRepository extends EntityRepository
{
    public function findAwardById($id)
    {
        return $this->findOneBy(array('id' => $id, 'valid' => true));
    }
}
