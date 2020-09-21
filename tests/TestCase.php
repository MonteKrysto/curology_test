<?php

namespace Tests;

use Utils\Helpers;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\TestCase as BaseTestCase;

abstract class TestCase extends BaseTestCase
{
    use CreatesApplication, DatabaseMigrations;

    protected $base_route = null;
    protected $base_model = null;

    protected function setBaseRoute($route)
    {
        $this->base_route = $route;
    }

    protected function setBaseModel($model)
    {
        $this->base_model = $model;
    }

    protected function create($attributes = [], $model = '', $route = '')
    {
        $this->withoutExceptionHandling();

        $route = $this->base_route ? "{$this->base_route}.store" : $route;
        $model = $this->base_model ?? $model;

        $atts = raw($model, $attributes);

        $response = $this->postJson(route($route), $atts)->assertSuccessful();

        $model = new $model;

        $this->assertDatabaseHas($model->getTable(), $attributes);

        return $response;
    }

    protected function update($attributes = [], $model = '', $route = '', $flatten = false)
    {
        $this->withoutExceptionHandling();

        $route = $this->base_route ? "{$this->base_route}.update" : $route;
        $model = $this->base_model ?? $model;


        $model = create($model, 'update');

        $attributes['id'] = $model->id;

        $response = $this->patchJson(route($route, $model), $attributes);

        tap($model->fresh(), function ($model) use ($attributes) {
            collect($attributes)->each(function($value, $key) use ($model) {
                $this->assertEquals($value, $model[$key]);
            });
        });

        return $response;
    }

    protected function destroy($model = '', $route = '', $useNonExistentId = false)
    {
        $this->withoutExceptionHandling();

        $route = $this->base_route ? "{$this->base_route}.destroy" : $route;
        $model = $this->base_model ?? $model;

        $model = create($model, 'update');

        $id = '';
        if($useNonExistentId === true) {
           $id = '123-fake-id';
         } else {
            $id = $model->id;
         }

         $response = $this->deleteJson(route($route, $id));

        $this->assertDatabaseMissing($model->getTable(), $model->toArray())
            ->assertDeleted('orders', $model->toArray());

        return $response;
    }
}
