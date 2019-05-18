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
  myImgUrl = 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500';
  botImgUrl = 'https://symphony.com/images/web/icon/apps/chat-bot_1024.png';
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
    this.messages.push({msg:this.chatmsg,imgUrl:this.myImgUrl,name:'shezy'})
    this.ChatService.talk(this.chatmsg);
    this.ChatService.getMessages().subscribe(msgs =>{
      
        //this.res = msgs;
        console.log(msgs);
        
       let found = this.messages.findIndex(f => f.msg === msgs);
        console.log(found)
         if(found == -1){
           this.messages.push({msg:msgs,imgUrl:this.botImgUrl,name:'Bot'});
       
         } 
        
     
      console.log(this.messages)
    })
  }

}
