import { Component, OnInit ,ChangeDetectorRef} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../core/services/user.service';
import { SeanceService } from '../../../core/services/seance.service';
import { User } from '../../../models/user';

@Component({
  selector: 'app-emploi-du-temps',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './emploi-du-temps.html',
  styleUrl: './emploi-du-temps.css'
})
export class EmploiDuTemps implements OnInit {

  user           : User | null = null;
  seances        : any[]       = [];
  filtre_semaine : any         = '';
  chargement     : boolean     = false;

  constructor(
    private userService   : UserService,
    private seanceService : SeanceService,
    private router        : Router,
    private cd            : ChangeDetectorRef
  ) {}

  ngOnInit() {
    
    this.user = this.userService.getUser();
    this.chargerSeances();
  }

  chargerSeances() {
    this.chargement = true;

    const specialite = this.user?.etudiant?.specialite || '';

    this.seanceService.getSeances(specialite, this.filtre_semaine).subscribe({
      next: (data) => {
        this.seances   = data;
        this.chargement = false;
        this.cd.detectChanges();
      },
      error: (err) => {
        console.error('Erreur chargement séances', err);
        this.chargement = false;
      }
    });
  }

  reinitialiserFiltre() {
    this.filtre_semaine = '';
    this.chargerSeances();
  }

  seDeconnecter() {
    this.userService.deconnexion();
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