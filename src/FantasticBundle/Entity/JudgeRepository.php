<?php

namespace FantasticBundle\Entity;

use Doctrine\ORM\EntityRepository;

class JudgeRepository extends EntityRepository
{
    public function getJudgeList()
    {
        return $this->findBy(array('valid' => true), array('weight' => 'DESC'));
    }

    public function listToArray($judgeList) {
        $judgeListArray = array();
        foreach ($judgeList as $judge) {
            array_push($judgeListArray, $judge->toArray());
        }
        return $judgeListArray;
    }
}
