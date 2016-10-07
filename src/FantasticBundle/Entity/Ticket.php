<?php

namespace FantasticBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

use AppBundle\Entity\Base;
use UtilBundle\Service\UtilService;

/**
 * @ORM\Entity(repositoryClass="FantasticBundle\Entity\TicketRepository")
 * @ORM\Table(name="cbwa_ticket")
 */
class Ticket extends Base
{
    /**
     * @ORM\Column(name="id", type="bigint")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @ORM\Column(name="guid", type="guid", nullable=false)
     */
    private $guid;

    /**
     * @ORM\Column(name="user_id", type="bigint", nullable=false)
     */
    private $userId;

    /**
     * @ORM\Column(name="name", type="string", length=20, nullable=false)
     */
    private $name;

    /**
     * @ORM\Column(name="telephone", type="string", length=20, nullable=false)
     */
    private $telephone;

    /**
     * @ORM\Column(name="address", type="string", length=100, nullable=false)
     */
    private $address;

    /**
     * @ORM\Column(name="total_fee", type="string", length=20, nullable=false)
     */
    private $totalFee;

    /**
     * @ORM\Column(name="paid", type="boolean", nullable=false)
     */
    private $paid;

    public function __construct()
    {
        parent::__construct();

        $this->guid = UtilService::getGUID();
        $this->paid = false;
        $this->totalFee = '0.00';
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
     * @return Ticket
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
     * @return Ticket
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
     * @return Ticket
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
     * @return Ticket
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
     * Set address
     *
     * @param string $address
     * @return Ticket
     */
    public function setAddress($address)
    {
        $this->address = $address;

        return $this;
    }

    /**
     * Get address
     *
     * @return string 
     */
    public function getAddress()
    {
        return $this->address;
    }

    /**
     * Set totalFee
     *
     * @param string $totalFee
     * @return Ticket
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
     * Set paid
     *
     * @param boolean $paid
     * @return Ticket
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

    public function toArray() {
        return array(
            "guid" => $this->guid,
            "name" => $this->name,
            "telephone" => $this->telephone,
            "address" => $this->address,
            "totalFee" => $this->totalFee,
            "paid" => $this->paid,
            "valid" => $this->valid
        );
    }
}
