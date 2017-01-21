<?php

namespace FantasticBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

use AppBundle\Entity\Base;
use UtilBundle\Service\UtilService;

/**
 * @ORM\Entity(repositoryClass="FantasticBundle\Entity\FaceRepository")
 * @ORM\Table(name="swap_face")
 */
class Face extends Base
{
    /**
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @ORM\Column(name="face_uuid", type="guid", nullable=false)
     */
    private $faceUuid;

    /**
     * @ORM\Column(name="type", type="string", length=20, nullable=false)
     */
    private $type;

    /**
     * @ORM\Column(name="tags", type="string", length=300, nullable=false)
     */
    private $tags;

    /**
     * @ORM\Column(name="crops", type="text", nullable=false)
     */
    private $crops;

}
