<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Order;
use Faker\Generator as Faker;

$factory->define(Order::class, function (Faker $faker) {
    $qty = $faker->numberBetween(1, 3);
    $tot = '';
    if ($qty === 1) {
        $tot = '4999';
    } elseif ($qty === 2) {
        $tot = '9998';
    } else {
        $tot = '14997';
    }

    return [];
    // return [
    //     'firstName' => $faker->firstName,
    //     'lastName' => $faker->lastName,
    //     'email' => $faker->safeEmail,
    //     // 'address' => [
    //         'street1' => $faker->streetAddress,
    //         'street2' => $faker->streetAddress,
    //         'city' => $faker->city,
    //         'state' => $faker->stateAbbr,
    //         'zip' => $faker->numerify('#####'),
    //     // ],
    //     'phone' => $faker->numerify('##########'),
    //     'quantity' => $qty,
    //     'total' => $tot,
    //     // 'payment' => [
    //         'ccNum' => $faker->creditCardNumber,
    //         'exp' => $faker->creditCardExpirationDateString
    //     // ]
    // ];
});

$factory->state(Order::class, 'create', function (Faker $faker) {
    $qty = $faker->numberBetween(1, 3);
    $tot = '';
    if ($qty === 1) {
        $tot = '4999';
    } elseif ($qty === 2) {
        $tot = '9998';
    } else {
        $tot = '14997';
    }
Log::info('IN CREWATE state');
    return [
        'firstName' => $faker->firstName,
        'lastName' => $faker->lastName,
        'email' => $faker->safeEmail,
        'address' => [
            'street1' => $faker->streetAddress,
            'street2' => $faker->streetAddress,
            'city' => $faker->city,
            'state' => $faker->stateAbbr,
            'zip' => $faker->numerify('#####'),
        ],
        'phone' => $faker->numerify('##########'),
        'quantity' => $qty,
        'total' => $tot,
        'payment' => [
            'ccNum' => $faker->creditCardNumber,
            'exp' => $faker->creditCardExpirationDateString
        ]
    ];
});

$factory->state(Order::class, 'update', function (Faker $faker) {
    Log::info('In Update State &&&&&&&&&&&&&&&');
    $qty = $faker->numberBetween(1, 3);
    $tot = '';
    if ($qty === 1) {
        $tot = '4999';
    } elseif ($qty === 2) {
        $tot = '9998';
    } else {
        $tot = '14997';
    }

    return [
        'firstName' => $faker->firstName,
        'lastName' => $faker->lastName,
        'email' => $faker->safeEmail,
        'street1' => $faker->streetAddress,
        'street2' => $faker->streetAddress,
        'city' => $faker->city,
        'state' => $faker->stateAbbr,
        'zip' => $faker->numerify('#####'),
        'phone' => $faker->numerify('##########'),
        'quantity' => $qty,
        'total' => $tot,
        'ccNum' => $faker->creditCardNumber,
        'exp' => $faker->creditCardExpirationDateString
    ];
});
