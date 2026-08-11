<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Enseignant;
use App\Models\Edt;

class EnseignantController extends Controller
{
    public function index()
    {
        return Enseignant::all();
    }

    // ✅ Toutes les séances d'un coup avec les relations
    public function toutesLesSeances()
    {
        $seances = Edt::with(['cours', 'semaine', 'enseignant'])
            ->get();

        return response()->json($seances);
    }

    public function store(Request $request)
    {
        $enseignant = Enseignant::create($request->all());
        return response()->json($enseignant, 201);
    }

    public function update(Request $request, $id)
    {
        $enseignant = Enseignant::findOrFail($id);
        $enseignant->update($request->all());
        return response()->json($enseignant);
    }

    public function destroy($id)
    {
        Enseignant::findOrFail($id)->delete();
        return response()->json(['message' => 'Supprimé']);
    }
}