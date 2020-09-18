<?php

namespace App\Repository;

use App\Entity\Transaccion;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Transaccion|null find($id, $lockMode = null, $lockVersion = null)
 * @method Transaccion|null findOneBy(array $criteria, array $orderBy = null)
 * @method Transaccion[]    findAll()
 * @method Transaccion[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class TransaccionRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Transaccion::class);
    }

    public function Mostrar(){
        try {
            $conn = $this->getEntityManager()->getConnection();
            $stm = $conn->prepare(" SELECT tra.cod_transaccion, tra.tipo_trans, tra.cuenta, tra.cuenta_destino, tra.monto, tra.fecha, tip.cod_tipo, usu.nombre, usu.documento, cue.n_cuenta, cue.documento_usu 
            FROM transaccion tra, tipo_transaccion tip, usuario usu, cuenta cue 
            WHERE usu.documento=1091674950 AND tra.cuenta=cue.n_cuenta AND cue.documento_usu = usu.documento AND tra.tipo_trans=tip.cod_tipo 
            GROUP BY tra.cod_transaccion 
            ORDER BY tra.fecha DESC");
            $stm->execute([]);
            $res = $stm->fetchAll();
            return $res;
        } catch (Exception $e) {
            return $e;
        }
    }

    public function Insertar($cod_transaccion,$tipo_trans,$cuenta,$cuenta_destino,$monto,$fecha,$hora){
        try {
            $conn = $this->getEntityManager()->getConnection();
            $stm = $conn->prepare(" INSERT INTO transaccion (cod_transaccion,tipo_trans,cuenta,cuenta_destino,monto,fecha,hora) 
            VALUES (:cod, :tip, :cue, :dest, :mon, :fec, :hor)");
            if($stm->execute(array(':cod'=>$cod_transaccion, ':tip'=>$tipo_trans, ':cue'=>$cuenta, ':dest'=>$cuenta_destino, ':mon'=>$monto, ':fec'=>$fecha, ':hor'=>$hora)));
        } catch (Exception $e) {
            return $e;
        }
    }


    public function MostrarTipo(){
        try {
            $conn = $this->getEntityManager()->getConnection();
            $stm = $conn->prepare(" SELECT cod_tipo, nombre, detalle
            FROM tipo_transaccion");
            $stm->execute([]);
            $res = $stm->fetchAll();
            return $res;
        } catch (Exception $e) {
            return $e;
        }
    }

    public function Cuenta(){
        try {
            $conn = $this->getEntityManager()->getConnection();
            $stm = $conn->prepare(" SELECT n_cuenta, documento_usu, saldo, estado
            FROM cuenta");
            $stm->execute([]);
            $res = $stm->fetchAll();
            return $res;
        } catch (Exception $e) {
            return $e;
        }
    }

    // /**
    //  * @return Transaccion[] Returns an array of Transaccion objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('e')
            ->andWhere('e.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('e.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Transaccion
    {
        return $this->createQueryBuilder('e')
            ->andWhere('e.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
