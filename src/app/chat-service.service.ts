import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { ApiAiClient } from 'api-ai-javascript/es6/ApiAiClient'
import { message } from './message';
import { Observable, of } from 'rxjs';
import { Subject }    from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatServiceService {

  token = environment.client;
  client = new ApiAiClient({accessToken: this.token})
  //public messages:message[] = [];
  private messages = new Subject<message>();
  messages$ = this.messages.asObservable();
  constructor() { 
   
  }

  talk(msg:any){
    this.client.textRequest(msg).then(response =>{
      console.log(response);
      this.messages.next(response.result.fulfillment.messages[0].speech);
    })
  }

  getMessages():Observable<any>{
    return this.messages;
  }
}
