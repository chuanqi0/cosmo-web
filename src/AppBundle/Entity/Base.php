<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\ORM\Mapping\MappedSuperclass;
use UtilBundle\Service\UtilService;

/** @MappedSuperclass */
class Base
{
    /**
     * @ORM\Column(name="valid", type="boolean", nullable=false)
     */
    protected $valid;

    /**
     * @ORM\Column(name="update_time", type="datetime", nullable=false)
     */
    protected $updateTime;

    /**
     * @ORM\Column(name="create_time", type="datetime", nullable=false)
     */
    protected $createTime;

    public function __construct()
    {
        $current = UtilService::getCurrentTime();
        $this->valid = false;
        $this->updateTime = $current;
        $this->createTime = $current;
    }

    /**
     * Set valid
     *
     * @param boolean $valid
     * @return Base
     */
    public function setValid($valid)
    {
        $this->valid = $valid;

        return $this;
    }

    /**
     * Get valid
     *
     * @return boolean
     */
    public function getValid()
    {
        return $this->valid;
    }

    /**
     * Set updateTime
     *
     * @param \DateTime $updateTime
     * @return Base
     */
    public function setUpdateTime($updateTime)
    {
        $this->updateTime = $updateTime;

        return $this;
    }

    /**
     * Get updateTime
     *
     * @return \DateTime
     */
    public function getUpdateTime()
    {
        return $this->updateTime;
    }

    /**
     * Set createTime
     *
     * @param \DateTime $createTime
     * @return Base
     */
    public function setCreateTime($createTime)
    {
        $this->createTime = $createTime;

        return $this;
    }

    /**
     * Get createTime
     *
     * @return \DateTime
     */
    public function getCreateTime()
    {
        return $this->createTime;
    }
}
