<?php

namespace App\Controller;
use App\Entity\Transaccion;
use App\Repository\TransaccionRepository;
use Doctrine\DBAL\Exception\UniqueConstraintViolationException;
use Doctrine\ORM\EntityManagerInterface;
use Exception;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

  /**
 * @Route("/api/transaccion", name="api_transaccion")
 */
class TransaccionController extends AbstractController
{
    private $entityManager;
    private $transaccionRepository;
 
    public function __construct(EntityManagerInterface $entityManager, TransaccionRepository $transaccionRepository)
    {
        $this->entityManager = $entityManager;
        $this->transaccionRepository = $transaccionRepository;
    }

    /**
     * @Route("/read", name="api_transaccion_read", methods={"GET"})
     */

    public function read()
    {
        $todos = $this->getDoctrine()->getRepository(Transaccion::class, 'default');
        $todos = $this->transaccionRepository->Mostrar();
        return $this->json($todos);
    }

    
    /**
     * @Route("/create", name="api_transaccion_create", methods={"POST"})
     * @param Request $request
     * @return JsonResponse
     */
    public function create(Request $request)
    {
        $content = json_decode($request->getContent(), true);

        dd($content);

        $cod_transaccion=$content['cod_transaccion'];
        $tipo_trans=$content['tipo_trans'];
        $cuenta=$content['cuenta'];
        $cuenta_destino=$content['cuenta_destino'];
        $monto=$content['monto'];
        $fecha=$content['fecha'];
        $hora=$content['hora'];

        try {
            
            $todo = $this->getDoctrine()->getRepository(Transaccion::class, 'default');
            $todo = $this->transaccionRepository->Insertar($cod_transaccion,$tipo_trans,$cuenta,$cuenta_destino,$monto,$fecha,$hora);
            $todo = $this->transaccionRepository->Mostrar();
                
        } catch (Exception $exception) {
            return $this->json([ 
                'message' => ['text'=>['La transaccion no se ha podido realizar!'.$exception] , 'level'=>'error']
                ]);
        }  
            return $this->json([
                'todo'=>$todo,
                'message' => ['text'=>['La transaccion se ha realizaco con éxito!' ] , 'level'=>'success']      
                 ]);
    }
    

}
