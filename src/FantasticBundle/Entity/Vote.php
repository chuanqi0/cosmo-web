<?php

namespace FantasticBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

use AppBundle\Entity\Base;
use UtilBundle\Service\UtilService;

/**
 * @ORM\Entity(repositoryClass="FantasticBundle\Entity\VoteRepository")
 * @ORM\Table(name="cbwa_vote")
 */
class Vote extends Base
{
    /**
     * @ORM\Column(name="id", type="bigint")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @ORM\Column(name="client_ip", type="string", length=15, nullable=false)
     */
    private $clientIp;

    /**
     * @ORM\Column(name="casus_guid", type="string", length=36, nullable=false)
     */
    private $casusGuid;

    /**
     * @ORM\Column(name="vote_number", type="integer", nullable=false)
     */
    private $voteNumber;

    public function __construct()
    {
        parent::__construct();
        $this->voteNumber = 0;
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
     * Set clientIp
     *
     * @param string $clientIp
     * @return Vote
     */
    public function setClientIp($clientIp)
    {
        $this->clientIp = $clientIp;

        return $this;
    }

    /**
     * Get clientIp
     *
     * @return string 
     */
    public function getClientIp()
    {
        return $this->clientIp;
    }

    /**
     * Set casusGuid
     *
     * @param string $casusGuid
     * @return Vote
     */
    public function setCasusGuid($casusGuid)
    {
        $this->casusGuid = $casusGuid;

        return $this;
    }

    /**
     * Get casusGuid
     *
     * @return string 
     */
    public function getCasusGuid()
    {
        return $this->casusGuid;
    }

    /**
     * Set voteNumber
     *
     * @param integer $voteNumber
     * @return Vote
     */
    public function setVoteNumber($voteNumber)
    {
        $this->voteNumber = $voteNumber;

        return $this;
    }

    /**
     * Get voteNumber
     *
     * @return integer 
     */
    public function getVoteNumber()
    {
        return $this->voteNumber;
    }
}
