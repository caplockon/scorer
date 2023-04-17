<?php

namespace App\Contracts;

use Illuminate\Support\Collection;

interface RepositoryInterface
{
    /**
     * @param string|int $id
     * @return mixed|null
     */
    public function getOneByID($id);

    /**
     * Return list of model records by the given list of ids.
     * @param array $ids
     * @return Collection
     */
    public function getListByIDs(array $ids): Collection;

    /**
     * Get all records of the model
     * @return Collection
     */
    public function getAll(): Collection;

    /**
     * Persist model into the database
     * @param $model
     * @return mixed
     */
    public function persist($model);

    /**
     * @param $model
     * @return mixed
     */
    public function delete($model);
}
