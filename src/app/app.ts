import { Component, inject, signal } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { TranslateDirective, TranslatePipe, _ } from '@ngx-translate/core';
import { ChangeLanguaje } from './change-languaje/change-languaje';
import { Auth } from './services/auth';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, TranslateDirective, TranslatePipe, ChangeLanguaje],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('cochesproject');
  authService = inject(Auth);
}
