import { Component, OnInit, ChangeDetectorRef} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SeanceService } from '../../../core/services/seance.service';
import { CoursService } from '../../../core/services/cours.service';
import { EnseignantService } from '../../../core/services/enseignant.service';
import { SemaineService } from '../../../core/services/semaines.service';
import { UserService } from '../../../core/services/user.service';

import { RouterModule } from '@angular/router';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-edt',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterModule,RouterOutlet],
  templateUrl: './edt.html',
  styleUrl: './edt.css'
})
export class Edt implements OnInit {

 
  seances     : any[] = [];
  cours       : any[] = [];
  enseignants : any[] = [];
  seancesFiltrees : any[] = [];
  semaines    : any[] = [];

  modalOuvert        : boolean = false;
  seanceSelectionnee : any     = null;
  erreur             : string  = '';

 
  filtre_semaine    : any    = '';
  filtre_specialite : string = '';

  
  jours = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];


  form: any = {
    jour          : 'Lundi',
    heure_debut   : '',
    heure_fin     : '',
    specialite    : '',
    cours_id      : null,
    enseignant_id : null,
    semaine_id    : null
  };

  constructor(
    private seanceService     : SeanceService,
    private coursService      : CoursService,
    private enseignantService : EnseignantService,
    private semaineService    : SemaineService,
    private userService       : UserService,
    private cd                :ChangeDetectorRef

  ) {}

  ngOnInit() {
    this.chargerDonnees();
  }

  
  chargerDonnees() {
    this.chargerSeances();
    this.coursService.getCours().subscribe(data => this.cours = data);
    this.enseignantService.getEnseignants().subscribe(data => this.enseignants = data);
    this.semaineService.getSemaines().subscribe(data => this.semaines = data);

  }

chargerSeances() {
  this.seanceService.getSeances(
    this.filtre_specialite,
    this.filtre_semaine,
  ).subscribe({
    next: (data) => {
      this.seances         = data;
      this.seancesFiltrees = data;     
      this.cd.detectChanges();        
    },
    error: (err) => console.error('Erreur chargement séances', err)
  });
}

 
  ouvrirModal() {
    this.seanceSelectionnee = null;
    this.erreur = '';
    this.form = {
      jour          : 'Lundi',
      heure_debut   : '',
      heure_fin     : '',
      specialite    : '',
      cours_id      : null,
      enseignant_id : null,
      semaine_id    : null
    };
    this.modalOuvert = true;
  }

  
  modifierSeance(s: any) {
    this.seanceSelectionnee = s;
    this.erreur = '';
    this.form = {
      jour          : s.jour,
      heure_debut   : s.heure_debut,
      heure_fin     : s.heure_fin,
      specialite    : s.specialite,
      cours_id      : s.cours?.id,
      enseignant_id : s.enseignant?.id,
      semaine_id    : s.semaine?.id
    };
    this.modalOuvert = true;
  }

 
  fermerModal() {
    this.modalOuvert = false;
    this.erreur = '';
  }

  
sauvegarder() {
  this.erreur = '';

 
  const data = {
    jour          : this.form.jour,
    heure_debut   : this.form.heure_debut,
    heure_fin     : this.form.heure_fin,
    specialite    : this.form.specialite,
    cours_id      : Number(this.form.cours_id),
    enseignant_id : Number(this.form.enseignant_id),
    semaine_id    : Number(this.form.semaine_id)
  };

  
  if (!data.cours_id || !data.enseignant_id || !data.semaine_id) {
    this.erreur = 'Veuillez remplir tous les champs obligatoires.';
    return;
  }

  if (this.seanceSelectionnee) {
    this.seanceService.updateSeance(this.seanceSelectionnee.id, data).subscribe({
      next: () => { this.fermerModal(); this.chargerSeances(); },
      error: (err) => this.erreur = err.error?.message || 'Erreur modification'
    });
  } else {
    this.seanceService.createSeance(data).subscribe({
      next: () => { this.fermerModal(); this.chargerSeances(); },
      error: (err) => this.erreur = err.error?.message || 'Erreur création'
    });
  }
}

  
  supprimerSeance(id: number) {
    if (confirm('Confirmer la suppression de cette séance ?')) {
      this.seanceService.deleteSeance(id).subscribe({
        next: () => this.chargerSeances(),
       
        error: (err) => console.error('Erreur suppression', err)
      });
    }
  }

  
  seDeconnecter() {
    this.userService.deconnexion();
  }

  
  couleurJour(jour: string): string {
    const couleurs: any = {
      'Lundi'   : '#2B6CB0',
      'Mardi'   : '#276749',
      'Mercredi': '#2B6CB0',
      'Jeudi'   : '#276749',
      'Vendredi': '#2B6CB0',
      'Samedi'  : '#276749'
    };
    return couleurs[jour] || '#2B6CB0';
  }

reinitialiserFiltres() {
  this.filtre_semaine    = '';
  this.filtre_specialite = '';
  this.chargerSeances();
}









}