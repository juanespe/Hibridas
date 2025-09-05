import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular/standalone';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
  standalone: true,
  imports: [IonContent]
})
export class SplashPage implements OnInit, OnDestroy {

  private SplashTimer: any;

  constructor(private router: Router) {
    console.log('SplashPage: Inicializado');
  }

  ngOnInit() {
    console.log('SplashPage: Inicializa timer de 3 segundos---');

    // Inicia el timer y redirige a Home
    this.SplashTimer = setTimeout(() => {
      this.navigateToHome();
    }, 3000);
  }

  ngOnDestroy() {
    if (this.SplashTimer) {
      clearTimeout(this.SplashTimer);
    }
  }

  private navigateToHome() {
    this.router.navigate(['/home'], {
      replaceUrl: true
    });
  }
}
