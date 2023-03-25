import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getPaginatedResult, getPaginationHeader } from './paginationHelper';
import { Message } from '../_models/message';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getMessages(pageNumber,pageSize,container){
    let params = getPaginationHeader(pageNumber,pageSize);
    params = params.append('Container',container);
    return getPaginatedResult<Message[]>(this.baseUrl+'messages',params,this.http);
  }

  getMessageThread(username: string)
  {
    return this.http.get<Message[]>(this.baseUrl+'messages/thread/'+username)
  }

  sendMessage(username: string,content: string){
    return this.http.post<Message>(this.baseUrl+'messages',{recipientUsername: username,content})
  }

  deleteMessage(id: number){
    return this.http.delete(this.baseUrl+'messages/'+id);
  }
}
