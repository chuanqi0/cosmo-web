<?php

namespace FantasticBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

use AppBundle\Entity\Base;

/**
 * @ORM\Entity(repositoryClass="FantasticBundle\Entity\JudgeRepository")
 * @ORM\Table(name="cbwa_judge")
 */
class Judge extends Base
{
    /**
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @ORM\Column(name="nickname", type="string", length=30, nullable=false)
     */
    private $nickname;

    /**
     * @ORM\Column(name="cover", type="string", length=100, nullable=false)
     */
    private $cover;

    /**
     * @ORM\Column(name="intro", type="string", length=30, nullable=false)
     */
    private $intro;

    /**
     * @ORM\Column(name="weight", type="integer", nullable=false)
     */
    private $weight;

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
     * Set nickname
     *
     * @param string $nickname
     * @return Judge
     */
    public function setNickname($nickname)
    {
        $this->nickname = $nickname;

        return $this;
    }

    /**
     * Get nickname
     *
     * @return string 
     */
    public function getNickname()
    {
        return $this->nickname;
    }

    /**
     * Set intro
     *
     * @param string $intro
     * @return Judge
     */
    public function setIntro($intro)
    {
        $this->intro = $intro;

        return $this;
    }

    /**
     * Get intro
     *
     * @return string 
     */
    public function getIntro()
    {
        return $this->intro;
    }

    /**
     * Set weight
     *
     * @param integer $weight
     * @return Judge
     */
    public function setWeight($weight)
    {
        $this->weight = $weight;

        return $this;
    }

    /**
     * Get weight
     *
     * @return integer 
     */
    public function getWeight()
    {
        return $this->weight;
    }

    /**
     * Set cover
     *
     * @param string $cover
     * @return Judge
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
            "id" => $this->id,
            "nickname" => $this->nickname,
            "intro" => $this->intro
        );
    }
}
