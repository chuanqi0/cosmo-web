<?php

namespace FantasticBundle\Entity;

use Doctrine\ORM\EntityRepository;

class VideoRepository extends EntityRepository
{

    public function findVideoByGuid($videoGuid)
    {
        return $this->findOneBy(array('guid' => $videoGuid));
    }

    public function saveVideo($video)
    {
        $this->getEntityManager()->persist($video);
        $this->getEntityManager()->flush();
    }
}
