<?php

namespace App\Interfaces;

use Illuminate\Database\Eloquent\Model;

/**
 * Interface EloquentRepositoryInterface
 * @package App\Repositories
 */
interface RepositoryInterface
{
   public function all();

   public function create(array $data);

   public function update(array $order);

   public function delete($id);

   public function show($id);
}
