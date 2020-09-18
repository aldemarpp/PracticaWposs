<?php

namespace App\Repository;

use App\Entity\Usuario;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Usuario|null find($id, $lockMode = null, $lockVersion = null)
 * @method Usuario|null findOneBy(array $criteria, array $orderBy = null)
 * @method Usuario[]    findAll()
 * @method Usuario[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class UsuarioRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Usuario::class);
    }

    public function Mostrar(){
        try {
            $conn = $this->getEntityManager()->getConnection();
            $stm = $conn->prepare(" SELECT usu.documento, usu.nombre, usu.apellidos, usu.email, usu.password, usu.estado, cue.n_cuenta
            FROM usuario usu, cuenta cue
            WHERE usu.documento=cue.documento_usu GROUP BY usu.documento
            ORDER BY usu.documento");
            $stm->execute([]);
            $res = $stm->fetchAll();
            return $res;
        } catch (Exception $e) {
            return $e;
        }
    }

    public function MostrarTra(){
        try {
            $conn = $this->getEntityManager()->getConnection();
            $stm = $conn->prepare(" SELECT cod_transaccion, tipo_trans, cuenta, cuenta_destino, monto, fecha, hora
            FROM transaccion");
            $stm->execute([]);
            $res = $stm->fetchAll();
            return $res;
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

    public function Insertar($documento, $nombre, $apellidos, $email, $password, $estado){
        try {
            $conn = $this->getEntityManager()->getConnection();
            $stm = $conn->prepare(" INSERT INTO usuario (documento, nombre, apellidos, email, password,  estado) VALUES (:cod, :nom, :pro, :ema, :tip, :est)");
            if($stm->execute(array(':cod'=>$documento, ':nom'=>$nombre, ':pro'=>$apellidos, ':ema'=>$email, ':tip'=>$password, ':est'=>$estado)));
        } catch (Exception $e) {
            return $e;
        }
    }

    public function InsertarCuenta($n_cuenta, $documento_usu, $saldo, $estado){
        try {
            $conn = $this->getEntityManager()->getConnection();
            $stm = $conn->prepare(" INSERT INTO cuenta (n_cuenta, documento_usu, saldo, estado) VALUES (:cue, :doc, :sal, :est)");
            if($stm->execute(array(':cue'=>$n_cuenta, ':doc'=>$documento_usu, ':sal'=>$saldo, ':est'=>$estado)));
        } catch (Exception $e) {
            return $e;
        }
    }

    public function Buscar($documento){
        try {
            $conn = $this->getEntityManager()->getConnection();
            $stm = $conn->prepare(" SELECT usu.documento, usu.nombre, usu.apellidos, usu.email, usu.estado, cue.n_cuenta           
            FROM usuario usu, cuenta cue
            WHERE usu.documento=:documento AND usu.documento=cue.documento_usu ORDER BY usu.documento");
            if($stm->execute(array(':documento'=>$documento)))
            $res = $stm->fetch();
            return $res;
        } catch (Exception $e) {
            return $e;
        }
    }

    public function BuscarUsuario($nombre){
        try {
            $conn = $this->getEntityManager()->getConnection();
            $stm = $conn->prepare(" SELECT nombre
            FROM usuario
            WHERE nombre=:nombre");
            if($stm->execute(array(':nombre'=>$nombre)))
            $res = $stm->fetch();
            return $res;
        } catch (Exception $e) {
            return $e;
        }
    }


    public function BuscarUsu($documento){
        try {
            $conn = $this->getEntityManager()->getConnection();
            $stm = $conn->prepare(" SELECT usu.documento, usu.nombre, usu.apellidos, usu.email, usu.estado
            FROM usuario usu
            WHERE usu.documento=:usu ORDER BY usu.documento");
            $usu=$documento;
            if($stm->execute(array(':usu'=>$usu)))
            $res = $stm->fetch();
            return $res;
        } catch (Exception $e) {
            return $e;
        }
    }
    
    
    public function Actualizar($documento, $nombre, $apellidos, $email, $password, $estado){
        try {
            $conn = $this->getEntityManager()->getConnection();
            $stm = $conn->prepare(" UPDATE usuario SET  documento=:documento, nombre=:nombre, apellidos=:apellidos, email=:email, password=:password, estado=:estado WHERE usuario.documento =:documento");
            if($stm->execute(array(':documento' =>$documento, ':nombre' =>$nombre, ':apellidos' =>$apellidos, ':email'=>$email, ':password'=>$password, ':estado'=>$estado)));
        } catch (Exception $e) {
            return $e;
        }
    }

    public function Eliminar($documento){
        try {
            $conn = $this->getEntityManager()->getConnection();
            $stm = $conn->prepare(" DELETE FROM usuario WHERE usuario.documento =:documento");
            if($stm->execute(array(':documento'=>$documento)));
        } catch (Exception $e) {
            return $e;
        }
    }

    

    // /**
    //  * @return Usuario[] Returns an array of Usuario objects
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
    public function findOneBySomeField($value): ?Usuario
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
