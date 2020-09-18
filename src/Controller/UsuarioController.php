<?php

namespace App\Controller;
use App\Entity\Usuario;
use App\Repository\UsuarioRepository;
use Doctrine\DBAL\Exception\UniqueConstraintViolationException;
use Doctrine\ORM\EntityManagerInterface;
use Exception;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

  /**
 * @Route("/api/usuario", name="api_usuario")
 */
class UsuarioController extends AbstractController
{
    private $entityManager;
    private $usuarioRepository;
 
    public function __construct(EntityManagerInterface $entityManager, UsuarioRepository $usuarioRepository)
    {
        $this->entityManager = $entityManager;
        $this->usuarioRepository = $usuarioRepository;
    }

     /**
     * @Route("/read", name="api_usuario_read", methods={"GET"})
     */
    public function read()
    {
        $todos = $this->getDoctrine()->getRepository(Usuario::class, 'default');
        $todos = $this->usuarioRepository->Mostrar();
        return $this->json($todos);
    }

     /**
     * @Route("/read", name="api_transaccion_read", methods={"GET"})
     */
    public function readTransaccion()
    {
        $todos = $this->getDoctrine()->getRepository(Usuario::class, 'default');
        $todos = $this->usuarioRepository->MostrarTra();
        return $this->json($todos);
    }
    
      /**
     * @Route("/readCuenta", name="api_usuario_readCuenta", methods={"GET"})
     */
    public function readCuenta()
    {
        $todos = $this->getDoctrine()->getRepository(Usuario::class, 'default');
        $todos = $this->usuarioRepository->Cuenta();
        return $this->json($todos);
    }

    /**
     * @Route("/create", name="api_usuario_create", methods={"POST"})
     * @param Request $request
     * @return JsonResponse
     */
    public function create(Request $request)
    {
        $content = json_decode($request->getContent(), true);
                      
        $documento=$content['documento'];
        $nombre=$content['nombre'];
        $apellidos=$content['apellidos'];
        $email=$content['email'];
        $password=$content['password'];
        $estado=$content['estado'];
        $n_cuenta=$content['n_cuenta'];
        $saldo=$content['saldo'];

        try {
            
            $todo = $this->getDoctrine()->getRepository(Usuario::class, 'default');
            $todo = $this->usuarioRepository->Insertar($documento, $nombre, $apellidos, $email, $password, $estado);
            $documento_usu = $documento;
                                   
            $todo = $this->usuarioRepository->InsertarCuenta($n_cuenta, $documento_usu, $saldo, $estado);
            $usuario = $this->usuarioRepository->BuscarUsuario($nombre); 
            $todo = $this->usuarioRepository->Buscar($documento);
            
            //$todo = $this->usuarioRepository->Mostrar();
                
        } catch (Exception $exception) {
            return $this->json([ 
                'message' => ['text'=>['El usuario no se ha podido registrar!'.$exception] , 'level'=>'error']
                ]);
        }  
            return $this->json([
                'todo'=>$todo,
                'message' => ['text'=>['El usuario '.$usuario['nombre'], ' ha sido registrado exitosamente!' ] , 'level'=>'success']      
                 ]);
    }


    /**
     * @Route("/update/{documento}", name="api_usuario_update", methods={"PUT"})
     * @param Request $request
     * @return JsonResponse
     */
    public function update(Request $request)
    {
        $content = json_decode($request->getContent());
        
        $documento=$content->documento;
        $nombre=$content->nombre;
        $apellidos=$content->apellidos;
        $email=$content->email;
        $password=$content->password;
        $estado=$content->estado;
        
        $todo = $this->getDoctrine()->getRepository(Usuario::class, 'default');
        $todo = $this->usuarioRepository->Buscar($documento);
        
        
        $documento_bd=$todo['documento'];
        $nombre_bd=$todo['nombre'];
        $apellidos_bd=$todo['apellidos'];
        $email_bd=$todo['email'];
        $password_bd=$todo['password'];
        $estado_bd=$todo['estado'];

        if ($documento===$documento_bd && $nombre===$nombre_bd && $apellidos===$apellidos_bd && $email===$email_bd && $password===$password_bd && $estado===$estado_bd) {
            return $this->json([
                'message' => ['text'=>['No se realizaron cambios al usuario: '.$nombre_bd] , 'level'=>'warning']
            ]);
        }
        
        try {
            $todo = $this->getDoctrine()->getRepository(Usuario::class, 'default');
            $todo = $this->usuarioRepository->Actualizar($documento, $nombre, $apellidos, $email, $password, $estado);
            $todo = $this->usuarioRepository->Buscar($documento);

        } catch (Exception $exception) {
            return $this->json([ 
                'message' => ['text'=>['No se pudo acceder a la Base de datos mientras se actualizaba la información del usuario!'] , 'level'=>'error']
                ]);
        }
 
        return $this->json([
            'todo'    => $todo,
            'message' => ['text'=>['La información del usuario '.$todo['nombre'], ' se ha actualizado' ] , 'level'=>'success']      
        ]);
 
    }

    /**
     * @Route("/delete/{documento}", name="api_usuario_delete", methods={"DELETE"})
     * @param Request $request
     * @param Usuario $todo
     * @return JsonResponse
     */
    public function delete(Request $request,Usuario $todo)
    {       

        try {
            $this->entityManager->remove($todo);
            $this->entityManager->flush();
        } catch (Exception $exception) {
            return $this->json([ 
                'message' => ['text'=>['No se pudo acceder a la Base de datos mientras se eliminaba al usuario!'] , 'level'=>'error']
                ]);
        }
 
        return $this->json([
            'message' => ['text'=>['Se ha eliminado la informacion del usuario: '.$todo->getNombre()] , 'level'=>'success']
        ]);
 
    }

}
