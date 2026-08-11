<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class edt extends Model
{
    use HasFactory;
        protected $fillable = [
        'jour',
        'heure_debut',
        'heure_fin',
        'specialite',
        'niveau',
        'cours_id',
        'enseignant_id',
        'semaine_id'
    ];

    public function cours()
    {
        return $this->belongsTo(Cours::class);
    }

    public function enseignant()
    {
        return $this->belongsTo(Enseignant::class);
    }

    public function semaine()
    {
        return $this->belongsTo(Semaines::class);
    }
    
     public function verification_conflit(): bool
    {
        return Seance::where('jour', $this->jour)
            ->where('semaine_id', $this->semaine_id)
            ->where('enseignant_id', $this->enseignant_id)
            ->where(function ($q) {
                $q->whereBetween('heure_debut', [$this->heure_debut, $this->heure_fin])
                  ->orWhereBetween('heure_fin',  [$this->heure_debut, $this->heure_fin]);
            })
            ->exists();
    }
}
