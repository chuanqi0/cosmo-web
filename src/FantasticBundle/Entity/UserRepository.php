<?php

namespace FantasticBundle\Entity;

use Doctrine\ORM\EntityRepository;
use UtilBundle\Service\UtilService;

class UserRepository extends EntityRepository
{
    public function findUserByUserUuid($userUuid)
    {
        return $this->findOneBy(array('userUuid' => $userUuid, 'valid' => true));
    }

    public function findUserByUserId($userId)
    {
        return $this->findOneBy(array('userId' => $userId, 'valid' => true));
    }

    public function saveUser($user)
    {
        $user->setUpdateTime(UtilService::getCurrentTime());
        $this->getEntityManager()->persist($user);
        $this->getEntityManager()->flush();
    }
}
