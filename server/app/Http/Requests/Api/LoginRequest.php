<?php

namespace App\Http\Requests\Api;

class LoginRequest extends Request
{
    public function rules(): array
    {
        return [
            'email' => 'required|string|min:1',
            'password' => 'required|string|min:1'
        ];
    }
}
