<?php

namespace App;

use App\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use GoldSpecDigital\LaravelEloquentUUID\Database\Eloquent\Uuid;

class Order extends Model
{
    use Uuid, SoftDeletes;

    protected $keyType = 'string';
    public $incrementing = false;
    protected $fillable = ['firstName', 'total', 'phone', 'lastName', 'email', 'quantity', 'street1', 'street2', 'city', 'state', 'zip', 'ccNum', 'exp'];
    protected $guarded = [];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Because the requirement was a bit ambiguous the assumption
     * here is that a user can only place one order
     */
    public function insertIfLessThanFourPerMonth($record = [])
    {
        // Check to see if the user at this address has already placed an order
        $currentOrders = $this->where('firstName',  $record->input('firstName'))
            ->where('lastName',  $record->input('lastName'))
            ->where('street1', $record->input('address.street1'))
            ->where('zip', $record->input('address.zip'))
            ->sum('quantity');

        if ($currentOrders < 4) {
            $order = $this->create([
                'firstName' => $record->input('firstName'),
                'lastName' => $record->input('lastName'),
                'email' => $record->input('email'),
                'street1' => $record->input('address.street1'),
                'street2' => $record->input('address.street2'),
                'city' => $record->input('address.city'),
                'state' => $record->input('address.state'),
                'zip' => $record->input('address.zip'),
                'phone' => $record->input('phone'),
                'quantity' => $record->input('quantity'),
                'total' => $record->input('total'),
                'ccNum' => $record->input('payment.ccNum'),
                'exp' => $record->input('payment.exp'),
            ]);
            return response()->json([
                // 'message' => 'Your order has been placed!',
                'id' => $order->id
            ], 201);
        }

        // return ['id' => $order->id];
        return response()->json([
            'message' => 'A user with that same name at this address already exists'
        ], 404);
    }
}
