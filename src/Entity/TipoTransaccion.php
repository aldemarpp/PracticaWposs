<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * TipoTransaccion
 *
 * @ORM\Table(name="tipo_transaccion")
 * @ORM\Entity
 */
class TipoTransaccion
{
    /**
     * @var string
     *
     * @ORM\Column(name="cod_tipo", type="string", length=50, nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $codTipo;

    /**
     * @var string
     *
     * @ORM\Column(name="nombre", type="string", length=50, nullable=false)
     */
    private $nombre;

    /**
     * @var string
     *
     * @ORM\Column(name="detalle", type="string", length=100, nullable=false)
     */
    private $detalle;

    public function getCodTipo(): ?string
    {
        return $this->codTipo;
    }

    public function getNombre(): ?string
    {
        return $this->nombre;
    }

    public function setNombre(string $nombre): self
    {
        $this->nombre = $nombre;

        return $this;
    }

    public function getDetalle(): ?string
    {
        return $this->detalle;
    }

    public function setDetalle(string $detalle): self
    {
        $this->detalle = $detalle;

        return $this;
    }


}
