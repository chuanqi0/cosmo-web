<?php

namespace FantasticBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

use AppBundle\Entity\Base;

/**
 * @ORM\Entity(repositoryClass="FantasticBundle\Entity\CasusAwardRepository")
 * @ORM\Table(name="fantastic_casus_award")
 */
class CasusAward extends Base
{
    /**
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @ORM\Column(name="casus_id", type="integer", nullable=false)
     */
    private $casusId;

    /**
     * @ORM\Column(name="award_id", type="integer", nullable=false)
     */
    private $awardId;

    /**
     * @ORM\Column(name="award_name", type="string", length=20, nullable=false)
     */
    private $awardName;

    /**
     * @ORM\Column(name="award_fee", type="decimal", scale=2, nullable=false)
     */
    private $awardFee;

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
     * Set casusId
     *
     * @param integer $casusId
     * @return CasusAward
     */
    public function setCasusId($casusId)
    {
        $this->casusId = $casusId;

        return $this;
    }

    /**
     * Get casusId
     *
     * @return integer 
     */
    public function getCasusId()
    {
        return $this->casusId;
    }

    /**
     * Set awardId
     *
     * @param integer $awardId
     * @return CasusAward
     */
    public function setAwardId($awardId)
    {
        $this->awardId = $awardId;

        return $this;
    }

    /**
     * Get awardId
     *
     * @return integer 
     */
    public function getAwardId()
    {
        return $this->awardId;
    }

    /**
     * Set awardName
     *
     * @param string $awardName
     * @return CasusAward
     */
    public function setAwardName($awardName)
    {
        $this->awardName = $awardName;

        return $this;
    }

    /**
     * Get awardName
     *
     * @return string 
     */
    public function getAwardName()
    {
        return $this->awardName;
    }

    /**
     * Set awardFee
     *
     * @param string $awardFee
     * @return CasusAward
     */
    public function setAwardFee($awardFee)
    {
        $this->awardFee = $awardFee;

        return $this;
    }

    /**
     * Get awardFee
     *
     * @return string 
     */
    public function getAwardFee()
    {
        return $this->awardFee;
    }
}
