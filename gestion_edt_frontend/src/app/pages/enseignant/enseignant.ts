import { Component, OnInit ,ChangeDetectorRef} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EnseignantService } from '../../core/services/enseignant.service';
import { SeanceService } from '../../core/services/seance.service';

@Component({
  selector: 'app-enseignant',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './enseignant.html',
  styleUrl: './enseignant.css'
})
export class Enseignant implements OnInit {

  enseignants          : any[] = [];
  seances              : any[] = [];
  seancesFiltrees      : any[] = [];
  enseignantSelectionne: any   = null;
  chargement           : boolean = false;
  filtre_semaine       : any   = '';

  constructor(
    private enseignantService : EnseignantService,
    private seanceService     : SeanceService,
    private cd                : ChangeDetectorRef
  ) {}

    ngOnInit() {
    this.chargerSeances();  
  }

  chargerSeances() {
    this.chargement = true;
    this.seanceService.getToutesLesSeances().subscribe({
      next: (data) => {
        this.seances        = data;
        this.seancesFiltrees = data;   
        this.chargement     = false;
        this.cd.detectChanges();
      },
      error: (err) => {
        console.error('Erreur chargement séances', err);
        this.chargement = false;
      }
    });
  }


  voirSeances(enseignant: any) {
    this.enseignantSelectionne = enseignant;
    this.filtre_semaine        = '';
    this.chargement            = true;

    this.seanceService.getSeancesParEnseignant(enseignant.id).subscribe({
      next: (data) => {
        this.seances        = data;
        this.seancesFiltrees = data;
        this.chargement     = false;
      },
      error: (err) => {
        console.error('Erreur', err);
        this.chargement = false;
      }
    });
  }

  filtrerSeances() {
    if (!this.filtre_semaine) {
      this.seancesFiltrees = this.seances;
      return;
    }
    this.seancesFiltrees = this.seances.filter(s =>
      s.semaine?.numero == this.filtre_semaine
    );
  }

  reinitialiserFiltre() {
    this.filtre_semaine  = '';
    this.seancesFiltrees = this.seances;
  }

  retourListe() {
    this.enseignantSelectionne = null;
    this.seances               = [];
    this.seancesFiltrees       = [];
  }

  couleurJour(jour: string): string {
    const couleurs: any = {
      'Lundi'   : '#1A365D',
      'Mardi'   : '#276749',
      'Mercredi': '#1A365D',
      'Jeudi'   : '#276749',
      'Vendredi': '#1A365D',
      'Samedi'  : '#276749'
    };
    return couleurs[jour] || '#2B6CB0';
  }

  
}