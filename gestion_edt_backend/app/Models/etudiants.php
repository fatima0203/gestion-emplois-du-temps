<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class etudiants extends Model
{
    use HasFactory;
     protected $fillable = [
        'user_id',
        'specialite',
        'niveau',
        'annee_univ',
        'numero_etudiant'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function seances()
    {
        return Seance::where('specialite', $this->specialite)->get();
    }
}
