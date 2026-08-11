import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../core/services/user.service';
import { RouterModule } from '@angular/router';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
    RouterOutlet
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  email      : string  = '';
  motDePasse : string  = '';
  erreur     : string  = '';
  chargement : boolean = false;

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  seConnecter() {
    this.erreur     = '';
    this.chargement = true;

    this.userService.connexion(this.email, this.motDePasse).subscribe({
      next: (res) => {
        
        this.chargement = false;
          console.log(res.role);
       
        if (res.user.role === 'admin') {
          this.router.navigate(['/admin/edt']);
        
        } else {
          this.router.navigate(['/etudiant/emploi-du-temps']);
        }
      },
      error: (err) => {
        this.chargement = false;
        this.erreur = err.error?.message || 'Email ou mot de passe incorrect';
      }
    });
  }
}