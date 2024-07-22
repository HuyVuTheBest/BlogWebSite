import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }
  showAlert(message:String): Promise<boolean> {
    return Swal.fire({
      title: message,
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Yes",
      denyButtonText: `No`
    }).then((result) => {
      if (result.isConfirmed) {
        return true;
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
        return false;
      } else {
        return false;
      }
    });
  }
}
