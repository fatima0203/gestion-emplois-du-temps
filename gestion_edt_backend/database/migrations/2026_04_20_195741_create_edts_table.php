<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('edts', function (Blueprint $table) {
            $table->id();
            $table->enum('jour', ['Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi']);
            $table->time('heure_debut');
            $table->time('heure_fin');
            $table->string('specialite');
            $table->foreignId('cours_id')->constrained('cours')->onDelete('cascade');
            $table->foreignId('enseignant_id')->constrained('enseignants')->onDelete('cascade');
            $table->foreignId('semaine_id')->constrained('semaines')->onDelete('cascade');
            $table->timestamps();
            
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('edts');
    }
};
