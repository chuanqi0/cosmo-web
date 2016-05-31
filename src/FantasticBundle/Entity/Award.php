<?php

namespace FantasticBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

use AppBundle\Entity\Base;

/**
 * @ORM\Entity(repositoryClass="FantasticBundle\Entity\AwardRepository")
 * @ORM\Table(name="fantastic_award")
 */
class Award extends Base
{
    /**
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @ORM\Column(name="name", type="string", length=20, nullable=false)
     */
    private $name;

    /**
     * @ORM\Column(name="fee", type="decimal", scale=2, nullable=false)
     */
    private $fee;

    /**
     * @ORM\Column(name="casus_number", type="integer", nullable=false)
     */
    private $casusNumber;

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
     * Set name
     *
     * @param string $name
     * @return Award
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
     * Set fee
     *
     * @param integer $fee
     * @return Award
     */
    public function setFee($fee)
    {
        $this->fee = $fee;

        return $this;
    }

    /**
     * Get fee
     *
     * @return integer 
     */
    public function getFee()
    {
        return $this->fee;
    }

    /**
     * Set casusNumber
     *
     * @param integer $casusNumber
     * @return Award
     */
    public function setCasusNumber($casusNumber)
    {
        $this->casusNumber = $casusNumber;

        return $this;
    }

    /**
     * Get casusNumber
     *
     * @return integer 
     */
    public function getCasusNumber()
    {
        return $this->casusNumber;
    }
}
