<?php

namespace App\Http\Resources\Gallery;

use App\Models\Gallery\Album;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AlbumResource extends JsonResource
{
    public function toArray(Request $request)
    {
        $thumbnail = $this->thumbnail;
        $thumbnail = $thumbnail ? $thumbnail->system_path : null;

        /** @var Album $this */
        return [
            'uuid' => $this->uuid,
            'name' => $this->name,
            'description' => $this->description,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'thumbnail' => $thumbnail
        ];
    }
}
