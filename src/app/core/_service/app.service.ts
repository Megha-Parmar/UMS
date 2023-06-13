import { Injectable } from "@angular/core";
import { SocketConstant } from "@common/GlobalConstants";
import { Socket } from "ngx-socket-io";
import { map } from "rxjs/operators";
@Injectable({
    providedIn: 'root'
})
export class AppService {
    constructor(private socket: Socket) { }

    sendMessage(msg) {
        this.socket.emit(SocketConstant.msgToServer, msg);
    }
    getMessageToServer() {
        return this.socket.fromEvent(SocketConstant.msgToServer).pipe(map((data: {}) => data));
    }

    getMessage() {
        return this.socket.fromEvent(SocketConstant.msgToClient).pipe(map((data: {}) => data));
    }
}