<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class enseignant extends Model
{
    use HasFactory;
    protected $fillable = [
        'nom',
        'prenom',
        'email',
        'specialite'
    ];

    public function seances()
    {
        return $this->hasMany(Seance::class);
    }

     public function estDisponible(string $jour, string $heureDebut, string $heureFin, int $semaineId): bool
    {
        return !Seance::where('enseignant_id', $this->id)
            ->where('jour', $jour)
            ->where('semaine_id', $semaineId)
            ->where(function ($q) use ($heureDebut, $heureFin) {
                $q->whereBetween('heure_debut', [$heureDebut, $heureFin])
                  ->orWhereBetween('heure_fin',  [$heureDebut, $heureFin]);
            })
            ->exists();
    }
}
