<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cours;

class CoursController extends Controller
{
    public function index()
    {
        return Cours::all();
    }

    public function store(Request $request)
    {
        $cours = Cours::create($request->all());
        return response()->json($cours, 201);
    }

    public function update(Request $request, $id)
    {
        $cours = Cours::findOrFail($id);
        $cours->update($request->all());

        return response()->json($cours);
    }

    public function destroy($id)
    {
        Cours::findOrFail($id)->delete();

        return response()->json(['message' => 'Supprimé']);
    }
}