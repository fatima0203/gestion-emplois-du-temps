import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { UserService } from '../services/user.service';



export const authGuard = () => {
  const token = localStorage.getItem('token');

  if (!token) {
    return false;
  }

  return true;
};