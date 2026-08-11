<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class cours extends Model
{
    use HasFactory;

    protected $fillable = [
        'intitule',
        'description',
        'credits'
    ];

    public function seances()
    {
        return $this->hasMany(Seance::class);
    }
}
