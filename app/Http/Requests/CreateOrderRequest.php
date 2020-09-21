<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateOrderRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'firstName' => 'required|min:2',
            'lastName' => 'required|min:2',
            'email' => 'required|email',
            'street1' => 'required|alpha_num',
            'city' => 'required|alpha_num',
            'state' => 'required|max:2|alpha',
            'zip' => 'required|numeric',
            'phone' => 'required|digits:10',
            'quantity' => 'required|lte:3',
            'total' => 'required',
            'ccNum' => 'required|digits:16',
            'exp' => 'required|after:tomorrow',
        ];
    }
}
