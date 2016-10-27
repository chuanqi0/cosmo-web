<?php

namespace FantasticBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

use AppBundle\Entity\Base;

/**
 * @ORM\Entity(repositoryClass="FantasticBundle\Entity\AwardRepository")
 * @ORM\Table(name="cbwa_award")
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
     * @ORM\Column(name="short_name", type="string", length=20, nullable=false)
     */
    private $shortName;

    /**
     * @ORM\Column(name="fee", type="decimal", scale=2, nullable=false)
     */
    private $fee;

    private $apply;

    public function __construct()
    {
        parent::__construct();

        $this->apply = false;
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

    public function setApply($apply)
    {
        $this->apply = $apply;

        return $this;
    }

    public function getApply() {
        return $this->apply;
    }

    public function setShortName($shortName)
    {
        $this->shortName = $shortName;

        return $this;
    }

    public function getShortName() {
        return $this->shortName;
    }

    public function toArray() {
        return array(
            "id" => $this->id,
            "name" => $this->name,
            "shortName" => $this->shortName,
            "fee" => $this->fee,
            "apply" => $this->apply
        );
    }
}
