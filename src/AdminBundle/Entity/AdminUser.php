<?php

namespace AdminBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

use AppBundle\Entity\Base;
use UtilBundle\Service\UtilService;

/**
 * @ORM\Entity(repositoryClass="AdminBundle\Entity\AdminUserRepository")
 * @ORM\Table(name="admin_user")
 */
class AdminUser extends Base
{
    /**
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @ORM\Column(name="user_id", type="integer", nullable=false)
     */
    private $userId;

    /**
     * @ORM\Column(name="user_uuid", type="guid", nullable=false)
     */
    private $userUuid;

    /**
     * @ORM\Column(name="name", type="string", length=20, nullable=false)
     */
    private $name;

    /**
     * @ORM\Column(name="identity_card", type="string", length=18, nullable=false)
     */
    private $identityCard;

    /**
     * @ORM\Column(name="wechat", type="string", length=50, nullable=false)
     */
    private $wechat;

    /**
     * @ORM\Column(name="company", type="string", length=100, nullable=false)
     */
    private $company;

    /**
     * @ORM\Column(name="company_location", type="string", length=100, nullable=false)
     */
    private $companyLocation;

    /**
     * @ORM\Column(name="company_intro", type="string", length=2000, nullable=false)
     */
    private $companyIntro;

    /**
     * @ORM\Column(name="level", type="integer", nullable=false)
     */
    private $level;

    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Get id
     *
     * @return integer 
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set userId
     *
     * @param integer $userId
     * @return User
     */
    public function setUserId($userId)
    {
        $this->userId = $userId;

        return $this;
    }

    /**
     * Get userId
     *
     * @return integer
     */
    public function getUserId()
    {
        return $this->userId;
    }

    /**
     * Set name
     *
     * @param string $name
     * @return User
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Get name
     *
     * @return string 
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Set identityCard
     *
     * @param string $identityCard
     * @return User
     */
    public function setIdentityCard($identityCard)
    {
        $this->identityCard = $identityCard;

        return $this;
    }

    /**
     * Get identityCard
     *
     * @return string 
     */
    public function getIdentityCard()
    {
        return $this->identityCard;
    }

    /**
     * Set wechat
     *
     * @param string $wechat
     * @return User
     */
    public function setWechat($wechat)
    {
        $this->wechat = $wechat;

        return $this;
    }

    /**
     * Get wechat
     *
     * @return string 
     */
    public function getWechat()
    {
        return $this->wechat;
    }

    /**
     * Set company
     *
     * @param string $company
     * @return User
     */
    public function setCompany($company)
    {
        $this->company = $company;

        return $this;
    }

    /**
     * Get company
     *
     * @return string 
     */
    public function getCompany()
    {
        return $this->company;
    }

    /**
     * Set companyLocation
     *
     * @param string $companyLocation
     * @return User
     */
    public function setCompanyLocation($companyLocation)
    {
        $this->companyLocation = $companyLocation;

        return $this;
    }

    /**
     * Get companyLocation
     *
     * @return string 
     */
    public function getCompanyLocation()
    {
        return $this->companyLocation;
    }

    /**
     * Set companyIntro
     *
     * @param string $companyIntro
     * @return User
     */
    public function setCompanyIntro($companyIntro)
    {
        $this->companyIntro = $companyIntro;

        return $this;
    }

    /**
     * Get companyIntro
     *
     * @return string 
     */
    public function getCompanyIntro()
    {
        return $this->companyIntro;
    }

    /**
     * Set userUuid
     *
     * @param guid $userUuid
     * @return User
     */
    public function setUserUuid($userUuid)
    {
        $this->userUuid = $userUuid;

        return $this;
    }

    /**
     * Get userUuid
     *
     * @return guid 
     */
    public function getUserUuid()
    {
        return $this->userUuid;
    }

    /**
     * Set level
     *
     * @param integer $level
     * @return User
     */
    public function setLevel($level)
    {
        $this->level = $level;

        return $this;
    }

    /**
     * Get $level
     *
     * @return integer
     */
    public function getLevel()
    {
        return $this->level;
    }

    public function toArray() {
        return array(
            "userUuid" => $this->userUuid,
            "userId" => $this->userId,
            "name" => $this->name,
            "identityCard" => $this->identityCard,
            "wechat" => $this->wechat,
            "company" => $this->company,
            "companyLocation" => $this->companyLocation,
            "companyIntro" => $this->companyIntro,
            "level" => $this->level
        );
    }
}
