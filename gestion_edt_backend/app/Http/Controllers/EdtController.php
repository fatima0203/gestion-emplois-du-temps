<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Edt;

class EdtController extends Controller
{
   
    public function index()
    {
        return Edt::with(['cours', 'enseignant', 'semaine'])->get();
    }

    public function store(Request $request)
    {
        $seance = Edt::create([
            'jour' => $request->jour,
            'heure_debut' => $request->heure_debut,
            'heure_fin' => $request->heure_fin,
            'specialite' => $request->specialite,
            'cours_id' => $request->cours_id,
            'enseignant_id' => $request->enseignant_id,
            'semaine_id' => $request->semaine_id,
        ]);

        return response()->json($seance, 201);
    }


    public function update(Request $request, $id)
    {
        $seance = Edt::findOrFail($id);

        $seance->update($request->all());

        return response()->json($seance);
    }

    public function destroy($id)
    {
        $seance = Edt::findOrFail($id);
        $seance->delete();

        return response()->json(['message' => 'Supprimé']);
    }

    public function edtEtudiant()
    {
        $user = User::user();
        $etudiant = $user->etudiant;

        return Edt::with(['cours', 'enseignant', 'semaine'])
            ->where('specialite', $etudiant->specialite)
            ->where('niveau', $etudiant->niveau)
            ->get();
    }


    public function edtEnseignant($id)
{
    $seances = Edt::with(['cours', 'enseignant', 'semaine'])
        ->where('enseignant_id', $id)
        ->get();

    return response()->json($seances);
}

    
}