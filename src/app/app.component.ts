import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SocketConstant } from '@common/GlobalConstants';
import { TranslateService } from '@ngx-translate/core';
import { TranslateLoaderService } from '@service/translate-loader.service';
import { WebsocketService } from '@service/web-socket.service';
import { locale as englishLocale } from 'src/assets/i18n/en';
// import { locale as englishLocale } from '@translate/en';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [RouterModule]
})
export class AppComponent {
  constructor(private translateService: TranslateService, private ws: WebsocketService, private translationLoaderService: TranslateLoaderService,
  ) {
    this.translationLoaderService.loadTranslations(englishLocale);

    this.translateService.addLangs(['en']);
    this.translateService.setDefaultLang('en');
    this.translateService.use('en');
  }

  ngOnInit() {
    // Listen to websocket event
    this.ws.listen(SocketConstant.msgToClient).subscribe((data) => {
      console.log(data);
    })

    this.ws.listen(SocketConstant.msgToServer).subscribe((data) => {
      console.log(SocketConstant.msgToServer, data);
    })
  }
}
