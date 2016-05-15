<?php

namespace AppBundle\Common;

use UtilBundle\Constant\LoveConstant;

class LoveException extends \Exception
{
    public function __construct($message = LoveConstant::MESSAGE_FAILED)
    {
        parent::__construct($message);
    }
}