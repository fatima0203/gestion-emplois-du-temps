import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { UserService } from '../services/user.service';

export const adminGuard = () => {

  try {
    const userData = localStorage.getItem('user');

    if (!userData) return false;

    const user = JSON.parse(userData);

    return user?.role === 'admin';

  } catch (e) {
    return false;
  }
};