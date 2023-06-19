import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GlobalConstants } from '@common/GlobalConstants';
import { AppService } from '@service/app.service';
import { ChatService } from '@service/chat.service';
import { EncryptDecryptService } from '@service/encrypt-decrypt.service';
import { UserService } from '@service/user.service';
import { Socket } from 'ngx-socket-io';
import { Chat, User } from 'c:/Megha/Learning/UMS clone/UMS/src/app/_modal/modal';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, ScrollingModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {
  loggedInUser: User;
  userList: User[];
  users: User[];  // socket;
  selectedChat: User;
  message: string = '';
  page = 1;
  limit = 10;
  chats: Chat[];

  //URL : https://codepen.io/robinllopis/pen/mLrRRB

  constructor(private appService: AppService, private socket: Socket, private userService: UserService, private chatService: ChatService, private encryptDecryptService: EncryptDecryptService) { }
  ngOnInit() {
    this.loggedInUser = this.encryptDecryptService.getDecryptedLocalStorage(GlobalConstants.user);
    this.appService.getMessage().subscribe((data) => {
      console.log(data);
    })

    this.appService.getMessageToServer().subscribe((data: any) => {
      console.log(data);
      if ((data.receiverId === this.loggedInUser._id && data.senderId === this.selectedChat._id) || (data.senderId === this.loggedInUser._id && data.receiverId === this.selectedChat._id))
        this.chats.push(data);
    })
    this.getUserData();
  }

  send(message) {
    // this.appService.sendMessage("test")
    console.log("message", message);
    let payload = {
      senderId: this.loggedInUser._id,
      receiverId: this.selectedChat._id,
      type: "DIRECT",
      message: message,
      // socketId: this.socket.ioSocket.id
    };
    this.appService.sendMessage(payload);
    this.message = '';
  }
  getUserData() {
    const userData = {
      page: 1,//this.page,
      limit: 10,//this.limit,
      searchKeyword: ''// this.searchKeyword
    };


    this.userService.getUserList(userData).subscribe(response => {
      // this.loadingSubject = new BehaviorSubject<boolean>(false);

      if (response.success) {
        this.users = response.body.users;
        this.userList = this.users;//this.users.filter((x) => x._id !== this.loggedInUser._id);
      }
      // this.showLoader$ = of(false);

    }, (err) => {
      console.log("err", err);
    });
  }

  selectChatPerson(item) {
    console.log("item", item);
    this.selectedChat = item;
    // this.chatService.getChatData()


    const userData = {
      page: this.page,
      limit: this.limit,
      senderId: item._id,
      searchKeyword: '',// this.searchKeyword
    };
    userData['sentBySelf'] = item._id === this.loggedInUser._id ? true : false

    this.chatService.getChatData(userData).subscribe(response => {
      // this.loadingSubject = new BehaviorSubject<boolean>(false);
      if (response.success) {
        this.chats = response.body.chats;
      }
    }, (err) => {
      console.log("err", err);
    });
  }

}

