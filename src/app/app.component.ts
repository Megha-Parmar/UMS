import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SocketConstant } from '@common/GlobalConstants';
import { WebsocketService } from '@service/web-socket.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [RouterModule,]
})
export class AppComponent {
  title = 'UMS';
  constructor(private ws: WebsocketService) { }

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
