import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  constructor() { }

  alertSuccess(title: string) {
    Swal.fire({
      title: title,
      icon: 'success',
      confirmButtonText: 'Great!',
      confirmButtonColor: '#28a745',
      showCancelButton: false,
      showClass: {
        popup: `
          animate__animated
          animate__fadeInUp
          animate__faster
        `
      },
      hideClass: {
        popup: `
          animate__animated
          animate__fadeOutDown
          animate__faster
        `
      }
    });
  }

  alertError(title: string) {
    Swal.fire({
      title: title,
      icon: 'error',
      confirmButtonText: 'Cancel',
      confirmButtonColor: '#dc3545',
      showCancelButton: false,
      showClass: {
        popup: `
          animate__animated
          animate__fadeInUp
          animate__faster
        `
      },
      hideClass: {
        popup: `
          animate__animated
          animate__fadeOutDown
          animate__faster
        `
      }
    });
  }
}
