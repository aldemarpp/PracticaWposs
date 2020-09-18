<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Transaccion
 *
 * @ORM\Table(name="transaccion", indexes={@ORM\Index(name="FK_2", columns={"cuenta"}), @ORM\Index(name="FK_3", columns={"tipo_trans"})})
 * @ORM\Entity
 */
class Transaccion
{
    /**
     * @var string
     *
     * @ORM\Column(name="cod_transaccion", type="string", length=50, nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $codTransaccion;

    /**
     * @var string|null
     *
     * @ORM\Column(name="cuenta_destino", type="string", length=50, nullable=true, options={"default"="NULL"})
     */
    private $cuentaDestino = 'NULL';

    /**
     * @var float
     *
     * @ORM\Column(name="monto", type="float", precision=10, scale=0, nullable=false)
     */
    private $monto;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="fecha", type="date", nullable=false)
     */
    private $fecha;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="hora", type="time", nullable=false)
     */
    private $hora;

    /**
     * @var \Cuenta
     *
     * @ORM\ManyToOne(targetEntity="Cuenta")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="cuenta", referencedColumnName="n_cuenta")
     * })
     */
    private $cuenta;

    /**
     * @var \TipoTransaccion
     *
     * @ORM\ManyToOne(targetEntity="TipoTransaccion")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="tipo_trans", referencedColumnName="cod_tipo")
     * })
     */
    private $tipoTrans;

    public function getCodTransaccion(): ?string
    {
        return $this->codTransaccion;
    }

    public function getCuentaDestino(): ?string
    {
        return $this->cuentaDestino;
    }

    public function setCuentaDestino(?string $cuentaDestino): self
    {
        $this->cuentaDestino = $cuentaDestino;

        return $this;
    }

    public function getMonto(): ?float
    {
        return $this->monto;
    }

    public function setMonto(float $monto): self
    {
        $this->monto = $monto;

        return $this;
    }

    public function getFecha(): ?\DateTimeInterface
    {
        return $this->fecha;
    }

    public function setFecha(\DateTimeInterface $fecha): self
    {
        $this->fecha = $fecha;

        return $this;
    }

    public function getHora(): ?\DateTimeInterface
    {
        return $this->hora;
    }

    public function setHora(\DateTimeInterface $hora): self
    {
        $this->hora = $hora;

        return $this;
    }

    public function getCuenta(): ?Cuenta
    {
        return $this->cuenta;
    }

    public function setCuenta(?Cuenta $cuenta): self
    {
        $this->cuenta = $cuenta;

        return $this;
    }

    public function getTipoTrans(): ?TipoTransaccion
    {
        return $this->tipoTrans;
    }

    public function setTipoTrans(?TipoTransaccion $tipoTrans): self
    {
        $this->tipoTrans = $tipoTrans;

        return $this;
    }


}
