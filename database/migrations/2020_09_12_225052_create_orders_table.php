<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orders', function (Blueprint $t) {
            $t->uuid('id')->primary();
            $t->string('firstName');
            $t->string('lastName');
            $t->string('email');
            $t->string('street1');
            $t->string('street2')->nullable();
            $t->string('city');
            $t->string('state');
            $t->string('zip');
            $t->string('phone');
            $t->integer('quantity');
            $t->string('total');
            $t->string('ccNum');
            $t->string('exp');
            $t->softDeletes();
            $t->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('orders');
    }
}
