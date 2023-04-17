<?php

namespace App\Repositories;

use App\Contracts\RepositoryInterface;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;

abstract class Repository implements RepositoryInterface
{
    /**
     * @var string
     */
    protected string $modelClass;

    /**
     * @var Model Model object
     */
    protected Model $model;

    /**
     * @param string|null $modelClass
     */
    public function __construct(?string $modelClass = null)
    {
        if ($modelClass) {
            $this->modelClass = $modelClass;
        }

        $this->model = app($this->modelClass);
    }

    /**
     * @inheritDoc
     */
    public function getOneByID($id)
    {
        return $this->model->find($id);
    }

    /**
     * @inheritDoc
     */
    public function getListByIDs(array $ids): Collection
    {
        return $this->model->find($ids);
    }

    /**
     * @inheritDoc
     */
    public function getAll(): Collection
    {
        return $this->model->all();
    }

    /**
     * @inheritDoc
     */
    public function persist($model)
    {
        if ($model instanceof Model) {
            $model->save();
        } else {
            $object = app($this->modelClass);
            $object->fill($model);
            $object->save();
            $model = $object;
        }

        return $model;
    }

    /**
     * @inheritDoc
     */
    public function delete($model)
    {
        if ($model instanceof Model) {
            $model->delete();
        } else {
            $model = $this->model->find($model);
            $model->delete();
        }
    }
}
