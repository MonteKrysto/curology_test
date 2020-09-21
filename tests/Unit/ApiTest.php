<?php

namespace Tests\Feature;

use App\User;
use Tests\TestCase;
use Faker\Generator as Faker;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Log;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ApiTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    public function setUp(): void
    {
        parent::setUp();

        $this->setBaseRoute('magic');
        $this->setBaseModel('App\Order');
    }

    /**
     * Create an order
     *
     * @return void
     */
    public function testUserCanCreateAnOrder()
    {
       $response = $this->create();
        $response->assertStatus(200);
    }

    /**
     * Update an order
     *
     * @return void
     */
    public function testUserCanUpdateAnOrder()
    {
        $attributes = [
            'firstName' => $this->faker->firstName(),
            'lastName' => $this->faker->lastName()
        ];

        $response = $this->update($attributes);
        $response->assertStatus(200)
                ->assertJson(['fulfilled' => true]);
    }

    /**
     * Delete a record.
     *
     * @return void
     */
    public function testUserCanDeleteAnOrder()
    {
        $this->destroy()->assertStatus(204);
    }

    /**
     * Try to delete a record that does not exist
     *
     * @return void
     */
    public function testUserCantDeleteAnOrderThatDoesNotExist()
    {
        $this->destroy('','',true)->assertStatus(404);
    }
}
