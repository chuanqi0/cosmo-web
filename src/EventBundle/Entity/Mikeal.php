<?php

namespace EventBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

use AppBundle\Entity\Base;

/**
 * @ORM\Entity(repositoryClass="EventBundle\Entity\MikealRepository")
 * @ORM\Table(name="event_mikeal")
 */
class Mikeal extends Base
{
    /**
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @ORM\Column(name="name", type="string", length=100, nullable=false)
     */
    private $name;

    /**
     * @ORM\Column(name="telephone", type="string", length=100, nullable=false)
     */
    private $telephone;

    /**
     * @ORM\Column(name="vote", type="integer", nullable=false)
     */
    private $vote;



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
     * @return Guomao
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
     * Set telephone
     *
     * @param string $telephone
     * @return Mikeal
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
     * Set vote
     *
     * @param integer $vote
     * @return Mikeal
     */
    public function setVote($vote)
    {
        $this->vote = $vote;

        return $this;
    }

    /**
     * Get vote
     *
     * @return integer 
     */
    public function getVote()
    {
        return $this->vote;
    }
}
