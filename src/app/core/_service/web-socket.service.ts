import { Injectable } from "@angular/core";
import { SOCKET_ENDPOINT } from "@common/GlobalConstants";

import { Observable } from "rxjs";
import { Socket, io } from "socket.io-client";
@Injectable({
    providedIn: 'root'
})
export class WebsocketService {

    socket: Socket;
    constructor() {
        this.socket = io(`ws://${SOCKET_ENDPOINT}`)
    }


    listen(eventName: string) {
        return new Observable((subscriber) => {
            this.socket.on(eventName, (data) => {
                subscriber.next(data);
            })
        });
    }

    emit(eventName: string, data: any) {
        this.socket.emit(eventName, data);
    }

}