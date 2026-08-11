import { Component, OnInit, ChangeDetectorRef} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CoursService } from '../../../core/services/cours.service';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-cours',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cours.component.html',
  styleUrl: './cours.component.css'
})
export class Cours implements OnInit {

  cours            : any[]    = [];
  chargement       : boolean  = false;
  modalOuvert      : boolean  = false;
  coursSelectionne : any      = null;
  erreur           : string   = '';

  
  toast = {
    visible : false,
    message : '',
    type    : 'success'
  };

  form = {
    intitule    : '',
    description : '',
    credits     : null as any
  };

  constructor(
    private coursService : CoursService,
    private userService  : UserService,
    private cd :ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.chargerCours();
  }

  chargerCours() {
    this.chargement = true;
    this.coursService.getCours().subscribe({
      next: (data) => {
        this.cours      = data;
        this.chargement = false;
        this.cd.detectChanges();
      },
      error: (err) => {
        console.error('Erreur chargement cours', err);
        this.chargement = false;
      }
    });
  }


  ouvrirModal() {
    this.coursSelectionne = null;
    this.erreur           = '';
    this.form = {
      intitule    : '',
      description : '',
      credits     : null
    };
    this.modalOuvert = true;
  }

  modifierCours(c: any) {
    this.coursSelectionne = c;
    this.erreur           = '';
    this.form = {
      intitule    : c.intitule,
      description : c.description,
      credits     : c.credits
    };
    this.modalOuvert = true;
  }

 
  fermerModal() {
    this.modalOuvert = false;
    this.erreur      = '';
  }

  
  sauvegarder() {
    this.erreur = '';

    const data = {
      intitule    : this.form.intitule,
      description : this.form.description,
      credits     : Number(this.form.credits)
    };

    if (this.coursSelectionne) {
     
      this.coursService.updateCours(this.coursSelectionne.id, data).subscribe({
        next: (coursModifie) => {
          const index = this.cours.findIndex(c => c.id === this.coursSelectionne.id);
          if (index !== -1) {
            this.cours[index] = coursModifie; 
          }
          this.fermerModal();
          this.afficherToast('Cours modifié avec succès', 'success');
        },
        error: (err) => {
          this.erreur = err.error?.message || 'Erreur lors de la modification';
        }
      });
    } else {
     
      this.coursService.createCours(data).subscribe({
        next: (nouveauCours) => {
          this.cours.unshift(nouveauCours);
          this.fermerModal();
          this.afficherToast('Cours créé avec succès', 'success');
        },
        error: (err) => {
          this.erreur = err.error?.message || 'Erreur lors de la création';
        }
      });
    }
  }


  supprimerCours(id: number) {
    if (confirm('Confirmer la suppression de ce cours ?')) {
      this.coursService.deleteCours(id).subscribe({
        next: () => {
          this.cours = this.cours.filter(c => c.id !== id); 
          this.afficherToast('Cours supprimé avec succès', 'success');
        },
        error: (err) => {
          this.afficherToast('Erreur lors de la suppression', 'error');
          console.error(err);
        }
      });
    }
  }


  afficherToast(message: string, type: 'success' | 'error') {
    this.toast = { visible: true, message, type };
    setTimeout(() => {
      this.toast.visible = false;
    }, 3000);
  }

  seDeconnecter() {
    this.userService.deconnexion();
  }
}