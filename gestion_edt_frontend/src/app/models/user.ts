export interface User {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  role: 'admin' | 'etudiant';
  etudiant?: Etudiant;
}

export interface Etudiant {
  id: number;
  user_id: number;
  specialite: string;
  niveau: string;
  annee_univ: string;
  numero_etudiant: string;
}