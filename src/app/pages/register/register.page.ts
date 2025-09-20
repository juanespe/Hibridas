import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,  // ahora es standalone
  imports: [
    IonicModule,   // para ion-input, ion-button, etc.
    FormsModule,   // para ngModel
    CommonModule   // para ngIf, ngFor, etc.
  ]
})
export class RegisterPage {
  nombre: string = '';
  apellido: string = '';
  correo: string = '';
  telefono: string = '';
  contrasena: string = '';
  confirmarContrasena: string = '';

  constructor(private toastCtrl: ToastController, private router: Router) {}

  async register() {
    if (!this.nombre || !this.apellido || !this.correo || !this.telefono || !this.contrasena || !this.confirmarContrasena) {
      this.showToast('Por favor, completa todos los campos');
      return;
    }

    if (this.contrasena !== this.confirmarContrasena) {
      this.showToast('Las contraseñas no coinciden');
      return;
    }

    const usuario = {
      nombre: this.nombre,
      apellido: this.apellido,
      correo: this.correo,
      telefono: this.telefono,
      contrasena: this.contrasena
    };

    localStorage.setItem(this.correo, JSON.stringify(usuario));
    this.showToast('Registro exitoso');

    this.nombre = '';
    this.apellido = '';
    this.correo = '';
    this.telefono = '';
    this.contrasena = '';
    this.confirmarContrasena = '';

    this.router.navigate(['/login']);
  }

  async showToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
