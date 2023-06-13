import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalConstants, QueryParamsConstant } from '@common/GlobalConstants';
import { APIResponse, ChatListResponse, User } from '@modal/modal';
import { Observable } from 'rxjs';
import { EncryptDecryptService } from './encrypt-decrypt.service';


// import * as bcrypt from 'bcryptjs';
@Injectable({
  providedIn: 'root'
})
export class ChatService {
  loggedInUser: User;
  saltRounds = 10;

  constructor(private http: HttpClient, private encryptDecryptService: EncryptDecryptService) {
    this.loggedInUser = this.encryptDecryptService.getDecryptedLocalStorage(GlobalConstants.user);
  }

  getChatData(data: { page: number; limit: number; searchKeyword: string; senderId: string, sentBySelf?: boolean }): Observable<APIResponse<ChatListResponse>> {
    let url = '';
    this.loggedInUser = this.encryptDecryptService.getDecryptedLocalStorage(GlobalConstants.user);
    url = `${GlobalConstants.apiUrls.chat.getUserList}${data.senderId}?${QueryParamsConstant.page}=${data.page}&${QueryParamsConstant.limit}=${data.limit}`
    // sentBySelf
    url += data.sentBySelf ? `&sentBySelf=${data.sentBySelf}` : ''
    return this.http.get<APIResponse<ChatListResponse>>(url, {
      // headers: {
      //   senderId: data.senderId 
      // }
    });
  }
}