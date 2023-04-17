<?php

namespace App\Http\Resources\Gallery;

use App\Models\Gallery\Picture;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PictureResource extends JsonResource
{
    public function toArray(Request $request)
    {
        /** @var Picture $this */
        return [
            'uuid' => $this->uuid,
            'title' => $this->title,
            'description' => $this->description,
            'system_path' => $this->system_path,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
