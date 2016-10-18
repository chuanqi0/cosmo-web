<?php

namespace AdminBundle\Entity;

use Doctrine\ORM\EntityRepository;
use UtilBundle\Service\UtilService;

class AdminUserRepository extends EntityRepository
{
    public function findAdminUserByUserUuid($userUuid)
    {
        return $this->findOneBy(array('userUuid' => $userUuid, 'valid' => true));
    }

    public function findAdminUserByUserId($userId)
    {
        return $this->findOneBy(array('userId' => $userId, 'valid' => true));
    }

    public function saveAdminUser($adminUser)
    {
        $adminUser->setUpdateTime(UtilService::getCurrentTime());
        $this->getEntityManager()->persist($adminUser);
        $this->getEntityManager()->flush();
    }

    public function getAdminUserList() {
        return $this->findBy(array('level' => [1, 2]));
    }

    public function listToArray($adminUserList) {
        $adminUserListArray = array();
        foreach ($adminUserList as $adminUser) {
            array_push($adminUserListArray, $adminUser->toArray());
        }
        return $adminUserListArray;
    }
}
