<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

use App\Models\User;
use App\Models\Etudiants;
use App\Models\Cours;
use App\Models\Enseignant;
use App\Models\Semaines;
use App\Models\Edt;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
   
        User::create([
            'nom' => 'Ba',
            'prenom' => 'Admin',
            'email' => 'admin@ugb.edu.sn',
            'password' => Hash::make('123456'),
            'role' => 'admin'
        ]);

   
        $etudiants = [
            ['nom'=>'Diop','prenom'=>'Awa','specialite'=>'GDIL','niveau'=>'L1'],
            ['nom'=>'Fall','prenom'=>'Moussa','specialite'=>'GDIL','niveau'=>'L2'],
            ['nom'=>'Sarr','prenom'=>'Fatou','specialite'=>'GDIL','niveau'=>'L3'],
            ['nom'=>'Ba','prenom'=>'Ibrahima','specialite'=>'Reseaux','niveau'=>'L1'],
            ['nom'=>'Ndiaye','prenom'=>'Khadija','specialite'=>'Reseaux','niveau'=>'L2'],
            ['nom'=>'Gaye','prenom'=>'Oumar','specialite'=>'Reseaux','niveau'=>'L3'],
        ];

        foreach ($etudiants as $e) {

            $user = User::create([
                'nom' => $e['nom'],
                'prenom' => $e['prenom'],
                'email' => strtolower($e['prenom']).'.'.strtolower($e['nom']).'@ugb.edu.sn',
                'password' => Hash::make('123456'),
                'role' => 'etudiant'
            ]);

            Etudiants::create([
                'user_id' => $user->id,
                'specialite' => $e['specialite'],
                'niveau' => $e['niveau'],
                'annee_univ' => '2025-2026',
                'numero_etudiant' => 'P' . rand(1000,9999)
            ]);
        }

      
        $cours = [
            ['intitule'=>'Algorithmique', 'description'=>'Base des algorithmes', 'credits'=>5],
            ['intitule'=>'Base de données', 'description'=>'SQL & conception', 'credits'=>4],
            ['intitule'=>'Réseaux informatiques', 'description'=>'TCP/IP', 'credits'=>4],
            ['intitule'=>'Développement Web', 'description'=>'HTML CSS JS', 'credits'=>3],
        ];

        $coursModels = [];
        foreach ($cours as $c) {
            $coursModels[] = Cours::create($c);
        }

     
        $enseignants = [
            ['nom'=>'Cheikh','prenom'=>'Ba','specialite'=>'GDIL'],
            ['nom'=>'David','prenom'=>'Faye','specialite'=>'GDIL'],
            ['nom'=>'Bamba','prenom'=>'Dione','specialite'=>'GDIL'],
            ['nom'=>'Mamadou','prenom'=>'Balde','specialite'=>'Reseaux'],
            ['nom'=>'Jean Marie','prenom'=>'Dembele','specialite'=>'Reseaux'],
            ['nom'=>'Cherif','prenom'=>'Diallo','specialite'=>'Reseaux'],
            ['nom'=>'Abdou Khadr','prenom'=>'Gueye','specialite'=>'Reseaux'],
        ];

        $ensModels = [];
        foreach ($enseignants as $ens) {
            $ensModels[] = Enseignant::create([
                'nom' => $ens['nom'],
                'prenom' => $ens['prenom'],
                'email' => strtolower($ens['prenom']).'.'.strtolower(str_replace(' ', '', $ens['nom'])).'@ugb.edu.sn',
                'specialite' => $ens['specialite']
            ]);
        }

   
        $semaines = [];

        for ($i = 1; $i <= 3; $i++) {
            $semaines[] = Semaines::create([
                'numero' => $i,
                'date_debut' => "2026-01-" . str_pad(($i - 1) * 7 + 1, 2, '0', STR_PAD_LEFT),
                'date_fin' => "2026-01-" . str_pad($i * 7, 2, '0', STR_PAD_LEFT),
            ]);
        }


        $jours = ['Lundi','Mardi','Mercredi','Jeudi','Vendredi'];

        foreach ($semaines as $sem) {
            foreach ($coursModels as $index => $c) {

                Edt::create([
                    'jour' => $jours[array_rand($jours)],
                    'heure_debut' => '08:00',
                    'heure_fin' => '10:00',
                    'specialite' => $index % 2 == 0 ? 'GDIL' : 'Reseaux',
                    'cours_id' => $c->id,
                    'enseignant_id' => $ensModels[array_rand($ensModels)]->id,
                    'semaine_id' => $sem->id,
                ]);

                Edt::create([
                    'jour' => $jours[array_rand($jours)],
                    'heure_debut' => '10:00',
                    'heure_fin' => '12:00',
                    'specialite' => $index % 2 == 0 ? 'GDIL' : 'Reseaux',
                    'cours_id' => $c->id,
                    'enseignant_id' => $ensModels[array_rand($ensModels)]->id,
                    'semaine_id' => $sem->id,
                ]);
            }
        }
    }
}