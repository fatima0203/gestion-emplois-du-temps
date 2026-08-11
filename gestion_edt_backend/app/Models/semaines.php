<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class semaines extends Model
{
    use HasFactory;
     protected $fillable = [
        'numero',
        'date_debut',
        'date_fin'
    ];

    public function seances()
    {
        return $this->hasMany(Seance::class);
    }
}
