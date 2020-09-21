<?php
namespace App\Repositories;

use App\Repositories\Repository;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Log;

use App\Order;


class OrderRepository extends Repository
{
    protected $model;

    public function __construct(Order $model)
    {
        $this->model = $model;
    }


    public function store(Request $request)
    {
      return $this->model->insertIfLessThanFourPerMonth($request);
    }

    public function update($id, Request $request)
    {
      request()->validate([
        'id' => 'required'
      ]);

      $record = $this->model->findOrFail($id);
      if($record->count() !== 0) {
        $record->update($request->all());
        return $record;
      }
      abort(404, 'Record Not Found');
    }


    /**
     * set payload data for posts table.
     *
     * @param Request $request [description]
     * @return array of data for saving.
     */
    protected function setDataPayload(Request $request)
    {
        return [
          'firstName' => $request->input('firstName'),
          'lastName' => $request->input('lastName'),
          'email' => $request->input('email'),
          'street1' => $request->input('address.street1'),
          'street2' => $request->input('address.street2'),
          'city' => $request->input('address.city'),
          'state' => $request->input('address.state'),
          'zip' => $request->input('address.zip'),
          'phone' => $request->input('phone'),
          'quantity' => $request->input('quantity'),
          'total' => $request->input('total'),
          'ccNum' => $request->input('payment.ccNum'),
          'exp' => $request->input('payment.exp'),
        ];
    }
}