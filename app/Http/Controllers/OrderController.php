<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Log;

use Illuminate\Http\Request;



use App\Http\Requests\CreateOrderRequest;
use App\Repositories\OrderRepository;
use Exception;

class OrderController extends Controller
{

    protected $repository;

    public function __construct(OrderRepository $repository)
    {
        $this->repository = $repository;
    }

    /**
     * Get list of all the orders.
     *
     * @param $request: Illuminate\Http\Request
     * @return json response
     */
    public function index(Request $request)
    {
        $items = $this->repository->paginate($request);
        return response()->json(['items' => $items]);
    }

    /**
     * Store order to database table.
     *
     * @param $request: App\Http\Requests\CreateOrderRequest
     * @return json response
     */
    public function store(Request $request)
    {
        try {
            $item = $this->repository->store($request);
            return response()->json(['item' => $item]);
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], 404);
        }
    }

    /**
     * Update order data to database table.
     *
     * @param $request: App\Http\Requests\UpdatePostRequest
     * @return json response
     */
    public function update(Request $request)
    {
        try {
            $order = $this->repository->update($request->id, $request);
            return response()->json(['id' => $order->id, 'fulfilled' => true]);
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], 404);
        }
    }

    /**
     * Get single order by id.
     *
     * @param integer $id: integer order id.
     * @return json response.
     */
    public function show($id)
    {
        try {
            $item = $this->repository->show($id);
            return response()->json(['item' => $item]);
        } catch (Exception $e) {
            return response()->json([], 404);
        }
    }

    /**
     * Delete order by id.
     *
     * @param integer $id: integer order id.
     * @return json response.
     */
    public function destroy(Request $request)
    {
        try {
            $order = $this->repository->delete($request);
            return response()->json([], 204);
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], 404);
        }
    }
}
