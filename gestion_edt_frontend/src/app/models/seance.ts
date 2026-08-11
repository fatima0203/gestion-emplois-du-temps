import { Cours } from './cours';
import { Enseignant } from './enseignant';
import { Semaines } from './semaines'


export interface Seance {
  id: number;
  jour: 'Lundi' | 'Mardi' | 'Mercredi' | 'Jeudi' | 'Vendredi' | 'Samedi';
  heure_debut: string;
  heure_fin: string;
  specialite: string;
  cours: Cours;
  enseignant: Enseignant;
  semaine: Semaines;
}