<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Cuenta
 *
 * @ORM\Table(name="cuenta", indexes={@ORM\Index(name="IDX_31C7BFCFC2F8F1C0", columns={"documento_usu"})})
 * @ORM\Entity
 */
class Cuenta
{
    /**
     * @var string
     *
     * @ORM\Column(name="n_cuenta", type="string", length=50, nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $nCuenta;

    /**
     * @var float
     *
     * @ORM\Column(name="saldo", type="float", precision=10, scale=0, nullable=false)
     */
    private $saldo;

    /**
     * @var string
     *
     * @ORM\Column(name="estado", type="string", length=20, nullable=false)
     */
    private $estado;

    /**
     * @var \Usuario
     *
     * @ORM\ManyToOne(targetEntity="Usuario")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="documento_usu", referencedColumnName="documento")
     * })
     */
    private $documentoUsu;

    public function getNCuenta(): ?string
    {
        return $this->nCuenta;
    }

    public function getSaldo(): ?float
    {
        return $this->saldo;
    }

    public function setSaldo(float $saldo): self
    {
        $this->saldo = $saldo;

        return $this;
    }

    public function getEstado(): ?string
    {
        return $this->estado;
    }

    public function setEstado(string $estado): self
    {
        $this->estado = $estado;

        return $this;
    }

    public function getDocumentoUsu(): ?Usuario
    {
        return $this->documentoUsu;
    }

    public function setDocumentoUsu(?Usuario $documentoUsu): self
    {
        $this->documentoUsu = $documentoUsu;

        return $this;
    }


}
