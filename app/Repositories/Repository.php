<?php

namespace App\Repositories;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;

use Illuminate\Http\Request;


class Repository
{
    /**
     * Eloquent model instance.
     */
    protected $model;

    /**
     * load default class dependencies.
     *
     * @param Model $model Illuminate\Database\Eloquent\Model
     */
    public function __construct(Model $model)
    {
        $this->model = $model;
    }

    /**
     * Get all the items collection from database table using model.
     *
     * @return Collection of items.
     */
    public function get()
    {
        return $this->model->get();
    }


    /**
     * Create new record in database.
     *
     * @param Request $request Illuminate\Http\Request
     * @return saved model object with data.
     */
    public function store(Request $request)
    {
        $data = $this->setDataPayload($request);
        $item = $this->model;
        $item->fill($data);
        $item->save();

        return $item;
    }

    /**
     * Update existing item.
     *
     * @param  Integer $id integer item primary key.
     * @param Request $request Illuminate\Http\Request
     * @return send updated item object.
     */
    public function update($id, Request $request)
    {
        $data = $this->setDataPayload($request);
        $item = $this->model->findOrFail($id);
        $item->fill($data);
        $item->save();
        return $item;
    }

    /**
     * Get requested item and send back.
     *
     * @param  Integer $id: integer primary key value.
     * @return send requested item data.
     */
    public function show($id)
    {
        return $this->model->findOrFail($id);
    }

    /**
     * Delete item by primary key id.
     *
     * @param  Integer $id integer of primary key id.
     * @return boolean
     */
    public function delete(Request $request)
    {
        Log::info('In Repository here');
        Log::info(json_encode($request));

        // return $this->model->where('id', $id)->delete();
        // request()->validate([
        //     'id' => 'required'
        //   ]);
          Log::info('After validation');
          $record = $this->model->findOrFail($request->id);
          Log::info('did we find the record?');
          Log::info(json_encode($record));
          if($record->count() !== 0) {
            $record->delete($request->all());
            return $record;
          }
          abort(404, 'Record Not Found');
    }

    /**
     * Set data for saving
     *
     * @param  Request $request Illuminate\Http\Request
     * @return array of data.
     */
    protected function setDataPayload(Request $request)
    {
        return $request->all();
    }
}