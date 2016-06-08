<?php

namespace FantasticBundle\Entity;

use Doctrine\ORM\EntityRepository;

class AwardRepository extends EntityRepository
{
    public function findAwardById($id)
    {
        return $this->findOneBy(array('id' => $id, 'valid' => true));
    }

    public function getAwardList()
    {
        return $this->findBy(array('valid' => true));
    }

    public function listToArray($awardList) {
        $awardListArray = array();
        foreach ($awardList as $award) {
            array_push($awardListArray, $award->toArray());
        }
        return $awardListArray;
    }
}
