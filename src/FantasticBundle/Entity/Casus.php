<?php

namespace FantasticBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

use AppBundle\Entity\Base;
use UtilBundle\Service\UtilService;

/**
 * @ORM\Entity(repositoryClass="FantasticBundle\Entity\CasusRepository")
 * @ORM\Table(name="fantastic_casus")
 */
class Casus extends Base
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
     * @ORM\Column(name="user_id", type="integer", nullable=false)
     */
    private $userId;

    /**
     * @ORM\Column(name="title", type="string", length=20, nullable=false)
     */
    private $title;

    /**
     * @ORM\Column(name="description", type="string", length=2000, nullable=false)
     */
    private $description;

    /**
     * @ORM\Column(name="content", type="text", nullable=false)
     */
    private $content;

    /**
     * @ORM\Column(name="price", type="string", length=20, nullable=false)
     */
    private $price;

    /**
     * @ORM\Column(name="region", type="string", length=20, nullable=false)
     */
    private $region;

    /**
     * @ORM\Column(name="place", type="string", length=20, nullable=false)
     */
    private $place;

    /**
     * @ORM\Column(name="total_fee", type="decimal", scale=2, nullable=false)
     */
    private $totalFee;

    /**
     * @ORM\Column(name="award_number", type="integer", nullable=false)
     */
    private $awardNumber;

    /**
     * @ORM\Column(name="paid", type="boolean", nullable=false)
     */
    private $paid;

    /**
     * @ORM\Column(name="public", type="boolean", nullable=false)
     */
    private $public;

    /**
     * @ORM\Column(name="cover", type="string", length=100, nullable=false)
     */
    private $cover;

    public function __construct()
    {
        parent::__construct();

        $this->guid = UtilService::getGUID();
        $this->content = '';
        $this->paid = false;
        $this->awardNumber = 0;
        $this->totalFee = 0.00;
        $this->public = false;
        $this->cover = '';
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
     * @return Casus
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
     * Set userId
     *
     * @param integer $userId
     * @return Casus
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
     * Set title
     *
     * @param string $title
     * @return Casus
     */
    public function setTitle($title)
    {
        $this->title = $title;

        return $this;
    }

    /**
     * Get title
     *
     * @return string 
     */
    public function getTitle()
    {
        return $this->title;
    }

    /**
     * Set description
     *
     * @param string $description
     * @return Casus
     */
    public function setDescription($description)
    {
        $this->description = $description;

        return $this;
    }

    /**
     * Get description
     *
     * @return string 
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * Set content
     *
     * @param string $content
     * @return Casus
     */
    public function setContent($content)
    {
        $this->content = $content;

        return $this;
    }

    /**
     * Get content
     *
     * @return string
     */
    public function getContent()
    {
        return $this->content;
    }

    /**
     * Set price
     *
     * @param string $price
     * @return Casus
     */
    public function setPrice($price)
    {
        $this->price = $price;

        return $this;
    }

    /**
     * Get price
     *
     * @return string 
     */
    public function getPrice()
    {
        return $this->price;
    }

    /**
     * Set region
     *
     * @param string $region
     * @return Casus
     */
    public function setRegion($region)
    {
        $this->region = $region;

        return $this;
    }

    /**
     * Get region
     *
     * @return string 
     */
    public function getRegion()
    {
        return $this->region;
    }

    /**
     * Set place
     *
     * @param string $place
     * @return Casus
     */
    public function setPlace($place)
    {
        $this->place = $place;

        return $this;
    }

    /**
     * Get place
     *
     * @return string 
     */
    public function getPlace()
    {
        return $this->place;
    }

    /**
     * Set totalFee
     *
     * @param string $totalFee
     * @return Casus
     */
    public function setTotalFee($totalFee)
    {
        $this->totalFee = $totalFee;

        return $this;
    }

    /**
     * Get totalFee
     *
     * @return string
     */
    public function getTotalFee()
    {
        return $this->totalFee;
    }

    /**
     * Set awardNumber
     *
     * @param integer $awardNumber
     * @return Casus
     */
    public function setAwardNumber($awardNumber)
    {
        $this->awardNumber = $awardNumber;

        return $this;
    }

    /**
     * Get awardNumber
     *
     * @return integer 
     */
    public function getAwardNumber()
    {
        return $this->awardNumber;
    }

    /**
     * Set paid
     *
     * @param boolean $paid
     * @return Casus
     */
    public function setPaid($paid)
    {
        $this->paid = $paid;

        return $this;
    }

    /**
     * Get paid
     *
     * @return boolean 
     */
    public function getPaid()
    {
        return $this->paid;
    }

    /**
     * Set public
     *
     * @param boolean $public
     * @return Casus
     */
    public function setPublic($public)
    {
        $this->public = $public;

        return $this;
    }

    /**
     * Get public
     *
     * @return boolean
     */
    public function getPublic()
    {
        return $this->public;
    }

    /**
     * Set cover
     *
     * @param string $cover
     * @return Casus
     */
    public function setCover($cover)
    {
        $this->cover = $cover;

        return $this;
    }

    /**
     * Get cover
     *
     * @return string
     */
    public function getCover()
    {
        return $this->cover;
    }

    public function toArray() {
        return array(
            "guid" => $this->guid,
            "title" => $this->title,
            'description' => $this->description,
            'cover' => $this->cover
        );
    }
}
