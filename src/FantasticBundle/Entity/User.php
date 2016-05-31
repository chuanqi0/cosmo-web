<?php

namespace FantasticBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

use AppBundle\Entity\Base;
use UtilBundle\Service\UtilService;

/**
 * @ORM\Entity(repositoryClass="FantasticBundle\Entity\UserRepository")
 * @ORM\Table(name="fantastic_user")
 */
class User extends Base
{
    /**
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @ORM\Column(name="guid", type="guid", nullable=false)
     */
    private $guid;

    /**
     * @ORM\Column(name="name", type="string", length=20, nullable=false)
     */
    private $name;

    /**
     * @ORM\Column(name="identity_card", type="string", length=18, unique=true, nullable=false)
     */
    private $identityCard;

    /**
     * @ORM\Column(name="telephone", type="string", length=20, unique=true, nullable=false)
     */
    private $telephone;

    /**
     * @ORM\Column(name="password", type="string", length=100, nullable=false)
     */
    private $password;

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

    public function __construct()
    {
        parent::__construct();

        $this->guid = UtilService::getGUID();
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
     * Set guid
     *
     * @param guid $guid
     * @return User
     */
    public function setGuid($guid)
    {
        $this->guid = $guid;

        return $this;
    }

    /**
     * Get guid
     *
     * @return guid 
     */
    public function getGuid()
    {
        return $this->guid;
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
     * Set telephone
     *
     * @param string $telephone
     * @return User
     */
    public function setTelephone($telephone)
    {
        $this->telephone = $telephone;

        return $this;
    }

    /**
     * Get telephone
     *
     * @return string 
     */
    public function getTelephone()
    {
        return $this->telephone;
    }

    /**
     * Set password
     *
     * @param string $password
     * @return User
     */
    public function setPassword($password)
    {
        $this->password = $password;

        return $this;
    }

    /**
     * Get password
     *
     * @return string 
     */
    public function getPassword()
    {
        return $this->password;
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

    public function toArray() {
        return array(
            "guid" => $this->guid,
            "name" => $this->name
        );
    }
}
