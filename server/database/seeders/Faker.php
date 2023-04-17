<?php

namespace Database\Seeders;

use Faker\Factory;
use Faker\Generator;

trait Faker
{
    /**
     * @var Generator
     */
    protected Generator $faker;

    /**
     * Return faker instance
     * @return Generator
     */
    public function getFaker(): Generator
    {
        return $this->faker ??= Factory::create();
    }
}
