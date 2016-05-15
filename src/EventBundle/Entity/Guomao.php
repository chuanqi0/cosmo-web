<?php

namespace EventBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

use AppBundle\Entity\Base;

/**
 * @ORM\Entity(repositoryClass="EventBundle\Entity\GuomaoRepository")
 * @ORM\Table(name="event_guomao")
 */
class Guomao extends Base
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
     * @ORM\Column(name="votes", type="integer", nullable=false)
     */
    private $votes;

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
     * Set votes
     *
     * @param integer $votes
     * @return Guomao
     */
    public function setVotes($votes)
    {
        $this->votes = $votes;

        return $this;
    }

    /**
     * Get votes
     *
     * @return integer 
     */
    public function getVotes()
    {
        return $this->votes;
    }
}
