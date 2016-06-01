<?php

namespace FantasticBundle\Entity;

use Doctrine\ORM\EntityRepository;
use UtilBundle\Service\UtilService;

class VideoRepository extends EntityRepository
{
    public function findVideoByGuid($guid)
    {
        return $this->findOneBy(array('guid' => $guid));
    }

    public function saveVideo($video)
    {
        $video->setUpdateTime(UtilService::getCurrentTime());
        $this->getEntityManager()->persist($video);
        $this->getEntityManager()->flush();
    }

    public function getLatestVideoList()
    {
        return $this->findBy(array('valid' => true), array('createTime' => 'DESC'), 5, 0);
    }

    public function getTotalVideoNumber()
    {
        $queryStr = "select count(v) from FantasticBundle:Video v where v.valid = true";
        $query = $this->getEntityManager()->createQuery($queryStr);
        $result = $query->getResult();
        if ($result[0][1]) {
            return $result[0][1];
        } else {
            return 0;
        }
    }

    public function listToArray($videoList) {
        $videoListArray = array();
        foreach ($videoList as $video) {
            array_push($videoListArray, $video->toArray());
        }
        return $videoListArray;
    }
}
