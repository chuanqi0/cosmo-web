<?php

namespace FantasticBundle\Entity;

use Doctrine\ORM\EntityRepository;
use UtilBundle\Service\UtilService;
use FantasticBundle\Entity\Casus;

class CasusRepository extends EntityRepository
{
    public function findCasusByGuid($guid) {
        return $this->findOneBy(array('guid' => $guid, 'valid' => true));
    }

    public function saveCasus($casus)
    {
        $casus->setUpdateTime(UtilService::getCurrentTime());
        $this->getEntityManager()->persist($casus);
        $this->getEntityManager()->flush();
    }

    public function getPersonalCasusList($userId)
    {
        return $this->findBy(array('userId' => $userId), array('valid' => 'DESC', 'createTime' => 'DESC'));
    }

    public function getCasusList($awardId) {
        if ($awardId == 0) {
            return $this->findBy(array('paid' => true, 'valid' => true), array('createTime' => 'DESC'));
        } else if ($awardId == -1) {
            return $this->findBy(array('paid' => true, 'valid' => true, 'awardList' => '[]'), array('createTime' => 'DESC'));
        } else {
            $keyword = '%:'.$awardId.'%';
            $qb = $this->getEntityManager()->createQueryBuilder();
            $qb->select('c')
                ->from('FantasticBundle\Entity\Casus', 'c')
                ->where('c.paid = true')
                ->andWhere('c.valid = true')
                ->andWhere($qb->expr()->like('c.awardList', ':awardList'))
                ->setParameter('awardList', $keyword);
            return $qb->getQuery()->getResult();
        }
    }

    public function listToArray($casusList) {
        $casusListArray = array();
        foreach ($casusList as $casus) {
            array_push($casusListArray, $casus->toArray());
        }
        return $casusListArray;
    }
}
