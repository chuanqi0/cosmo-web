<?php

namespace AppBundle\Common;

use UtilBundle\Constant\EventsConstant;

class EventsException extends \Exception
{
    public function __construct($message = EventsConstant::MESSAGE_FAILED)
    {
        parent::__construct($message);
    }
}