<?php

namespace App\Repositories;

use App\Models\User;

class UserRepository extends Repository
{
    protected string $modelClass = User::class;

    /**
     * @param string $email
     * @return User|null
     */
    public function getOneByEmail(string $email)
    {
        return $this->model->where('email', $email)->first();
    }
}
