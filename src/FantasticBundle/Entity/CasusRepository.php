<?php

namespace FantasticBundle\Entity;

use Doctrine\ORM\EntityRepository;
use UtilBundle\Constant\LoveConstant;
use UtilBundle\Service\UtilService;

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

    public function getCasusList($awardId, $page) {
        $page = $page - 1;
        if ($awardId == 0) {
            return $this->findBy(array('paid' => true, 'valid' => true), array('createTime' => 'DESC'), LoveConstant::CBWA_CASUS_PAGE_SIZE, $page * LoveConstant::CBWA_CASUS_PAGE_SIZE);
        } else if ($awardId == -1) {
            return $this->findBy(array('paid' => true, 'valid' => true, 'awardNumber' => 0), array('createTime' => 'DESC'), LoveConstant::CBWA_CASUS_PAGE_SIZE, $page * LoveConstant::CBWA_CASUS_PAGE_SIZE);
        } else {
            $keyword = '%:'.$awardId.'%';
            $qb = $this->getEntityManager()->createQueryBuilder();
            $qb->select('c')
                ->from('FantasticBundle\Entity\Casus', 'c')
                ->where('c.paid = true')
                ->andWhere('c.valid = true')
                ->andWhere($qb->expr()->like('c.awardList', ':awardList'))
                ->setParameter('awardList', $keyword)
                ->orderBy('c.createTime', 'DESC')
                ->setMaxResults(LoveConstant::CBWA_CASUS_PAGE_SIZE)
                ->setFirstResult($page * LoveConstant::CBWA_CASUS_PAGE_SIZE);
            return $qb->getQuery()->getResult();
        }
    }

    public function countCasusList($awardId) {
        if ($awardId == 0) {
            $qb = $this->getEntityManager()->createQueryBuilder();
            $qb->select($qb->expr()->count('c'))
                ->from('FantasticBundle\Entity\Casus', 'c')
                ->where('c.paid = true')
                ->andWhere('c.valid = true');
            return $qb->getQuery()->getSingleScalarResult();
        } else if ($awardId == -1) {
            $qb = $this->getEntityManager()->createQueryBuilder();
            $qb->select($qb->expr()->count('c'))
                ->from('FantasticBundle\Entity\Casus', 'c')
                ->where('c.paid = true')
                ->andWhere('c.valid = true')
                ->andWhere('c.awardNumber = 0');
            return $qb->getQuery()->getSingleScalarResult();
        } else {
            $keyword = '%:'.$awardId.'%';
            $qb = $this->getEntityManager()->createQueryBuilder();
            $qb->select($qb->expr()->count('c'))
                ->from('FantasticBundle\Entity\Casus', 'c')
                ->where('c.paid = true')
                ->andWhere('c.valid = true')
                ->andWhere($qb->expr()->like('c.awardList', ':awardList'))
                ->setParameter('awardList', $keyword);
            return $qb->getQuery()->getSingleScalarResult();
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
