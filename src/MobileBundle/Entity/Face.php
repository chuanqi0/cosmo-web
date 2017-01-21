<?php

namespace MobileBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

use AppBundle\Entity\Base;
use UtilBundle\Service\UtilService;

/**
 * @ORM\Entity(repositoryClass="MobileBundle\Entity\FaceRepository")
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
     * Set faceUuid
     *
     * @param guid $faceUuid
     * @return Face
     */
    public function setFaceUuid($faceUuid)
    {
        $this->faceUuid = $faceUuid;

        return $this;
    }

    /**
     * Get faceUuid
     *
     * @return guid 
     */
    public function getFaceUuid()
    {
        return $this->faceUuid;
    }

    /**
     * Set type
     *
     * @param string $type
     * @return Face
     */
    public function setType($type)
    {
        $this->type = $type;

        return $this;
    }

    /**
     * Get type
     *
     * @return string 
     */
    public function getType()
    {
        return $this->type;
    }

    /**
     * Set tags
     *
     * @param string $tags
     * @return Face
     */
    public function setTags($tags)
    {
        $this->tags = $tags;

        return $this;
    }

    /**
     * Get tags
     *
     * @return string 
     */
    public function getTags()
    {
        return $this->tags;
    }

    /**
     * Set crops
     *
     * @param string $crops
     * @return Face
     */
    public function setCrops($crops)
    {
        $this->crops = $crops;

        return $this;
    }

    /**
     * Get crops
     *
     * @return string 
     */
    public function getCrops()
    {
        return $this->crops;
    }
}
