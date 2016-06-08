<?php

namespace FantasticBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

use AppBundle\Entity\Base;
use UtilBundle\Service\UtilService;

/**
 * @ORM\Entity(repositoryClass="FantasticBundle\Entity\PaymentRepository")
 * @ORM\Table(name="fantastic_payment")
 */
class Payment extends Base
{
    /**
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @ORM\Column(name="payment", type="smallint", nullable=false)
     */
    private $payment;

    /**
     * @ORM\Column(name="fee", type="decimal", scale=2, nullable=false)
     */
    private $fee;

    /**
     * @ORM\Column(name="status", type="smallint", nullable=false)
     */
    private $status;

    /**
     * @ORM\Column(name="trade_number", type="string", length=100, nullable=false)
     */
    private $tradeNumber;

    /**
     * @ORM\Column(name="buyer_id", type="string", length=100, nullable=false)
     */
    private $buyerId;

    /**
     * @ORM\Column(name="buyer_email", type="string", length=100, nullable=false)
     */
    private $buyerEmail;

    /**
     * @ORM\Column(name="notify_message", type="string", length=4096, nullable=false)
     */
    private $notifyMessage;

    public function __construct()
    {
        parent::__construct();

        $this->status = -1;
        $this->buyerEmail = '';
        $this->notifyMessage = '';
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
     * Set payment
     *
     * @param integer $payment
     * @return Payment
     */
    public function setPayment($payment)
    {
        $this->payment = $payment;

        return $this;
    }

    /**
     * Get payment
     *
     * @return integer 
     */
    public function getPayment()
    {
        return $this->payment;
    }

    /**
     * Set fee
     *
     * @param string $fee
     * @return Payment
     */
    public function setFee($fee)
    {
        $this->fee = $fee;

        return $this;
    }

    /**
     * Get fee
     *
     * @return string 
     */
    public function getFee()
    {
        return $this->fee;
    }

    /**
     * Set status
     *
     * @param integer $status
     * @return Payment
     */
    public function setStatus($status)
    {
        $this->status = $status;

        return $this;
    }

    /**
     * Get status
     *
     * @return integer 
     */
    public function getStatus()
    {
        return $this->status;
    }

    /**
     * Set tradeNumber
     *
     * @param string $tradeNumber
     * @return Payment
     */
    public function setTradeNumber($tradeNumber)
    {
        $this->tradeNumber = $tradeNumber;

        return $this;
    }

    /**
     * Get tradeNumber
     *
     * @return string 
     */
    public function getTradeNumber()
    {
        return $this->tradeNumber;
    }

    /**
     * Set buyerId
     *
     * @param string $buyerId
     * @return Payment
     */
    public function setBuyerId($buyerId)
    {
        $this->buyerId = $buyerId;

        return $this;
    }

    /**
     * Get buyerId
     *
     * @return string 
     */
    public function getBuyerId()
    {
        return $this->buyerId;
    }

    /**
     * Set buyerEmail
     *
     * @param string $buyerEmail
     * @return Payment
     */
    public function setBuyerEmail($buyerEmail)
    {
        $this->buyerEmail = $buyerEmail;

        return $this;
    }

    /**
     * Get buyerEmail
     *
     * @return string 
     */
    public function getBuyerEmail()
    {
        return $this->buyerEmail;
    }

    /**
     * Set notifyMessage
     *
     * @param string $notifyMessage
     * @return Payment
     */
    public function setNotifyMessage($notifyMessage)
    {
        $this->notifyMessage = $notifyMessage;

        return $this;
    }

    /**
     * Get notifyMessage
     *
     * @return string 
     */
    public function getNotifyMessage()
    {
        return $this->notifyMessage;
    }
}
