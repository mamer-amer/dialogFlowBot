import { Component, OnInit } from '@angular/core';
import { ChatServiceService } from '../chat-service.service';
import { message } from '../message';

@Component({
  selector: 'chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  messages = [];
  chatmsg:string;
  res;
  constructor(private ChatService:ChatServiceService) {
     // this.messages = [];

   }
 
  ngOnInit() {
    console.log("em sending")
    //this.ChatService.talk("Hi");
    // this.ChatService.getMessages().subscribe(req => {
    //     this.messages = req
    // });
    
    console.log(this.messages)
  }

  onSubmit(){
    console.log("my msg",this.chatmsg)
    this.messages.push(this.chatmsg)
    this.ChatService.talk(this.chatmsg);
    this.ChatService.getMessages().subscribe(msgs =>{
      
        //this.res = msgs;
        console.log(msgs);
        
       let found = this.messages.findIndex(f => f === msgs);
        console.log(found)
         if(found == -1){
           this.messages.push(msgs);
       
         } 
        
     
      console.log(this.messages)
    })
  }

}
