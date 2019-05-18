import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { ApiAiClient } from 'api-ai-javascript/es6/ApiAiClient'
import { message } from './message';
import { Observable, of } from 'rxjs';
import { Subject }    from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChatServiceService {

   url = environment.baseUrl;
  // client = new ApiAiClient({accessToken: this.token})
  // //public messages:message[] = [];
  // private messages = new Subject<message>();
  // messages$ = this.messages.asObservable();
  
  constructor(private http: HttpClient) { 
   
  }

  sendMessage(requestPayload): Observable<any>{
      return this.http.post(this.url,requestPayload)
  }

}
