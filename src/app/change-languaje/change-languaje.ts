import { Component, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-change-languaje',
  imports: [],
  templateUrl: './change-languaje.html',
  styleUrl: './change-languaje.css',
})
export class ChangeLanguaje {

  lang = localStorage.getItem('lang') || 'es';
  private translate = inject(TranslateService);

  changeLang(lang: string) {
    this.translate.use(lang);
    localStorage.setItem('lang', lang);
    this.lang = lang;
  }

}
