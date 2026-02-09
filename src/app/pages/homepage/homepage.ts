import { Component, inject } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { TranslateDirective, TranslatePipe, _ } from '@ngx-translate/core';
import { ChangeLanguaje } from '../../change-languaje/change-languaje';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-homepage',
  imports: [RouterLink, TranslateDirective, TranslatePipe, ChangeLanguaje],
  templateUrl: './homepage.html',
  styleUrl: './homepage.css',
})
export class Homepage {
  username: string = '';
  password: string = '';
  private router = inject(Router);
  private authService = inject(Auth);
  login(username: string, password: string) {
    console.log("username:", username);
    console.log("password:", password);
if (username && password) {
      this.authService.login(username, password).subscribe();
    } else {
      alert('Por favor, introduce usuario y contraseña');
    }
  }
}
