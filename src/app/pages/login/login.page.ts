import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule, ToastController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    FormsModule,
    CommonModule
  ]
})
export class LoginPage {
  usuario: string = '';
  contrasena: string = '';

  constructor(private router: Router, private toastCtrl: ToastController) {}

  async login() {
    if (!this.usuario || !this.contrasena) {
      this.showToast('Por favor, completa todos los campos');
      return;
    }

    // Obtener usuario guardado
    const usuarioGuardado = localStorage.getItem(this.usuario);

    if (!usuarioGuardado) {
      this.showToast('Usuario no registrado');
      return;
    }

    const datosUsuario = JSON.parse(usuarioGuardado);

    if (datosUsuario.contrasena !== this.contrasena) {
      this.showToast('Contraseña incorrecta');
      return;
    }

    this.showToast('Login exitoso');

    // Limpiar campos
    this.usuario = '';
    this.contrasena = '';

    // Redirigir a la página principal o dashboard
    this.router.navigate(['/home']); // Cambia '/home' por tu ruta
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  async showToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }
}
