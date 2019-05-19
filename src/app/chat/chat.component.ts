import { Component, OnInit,AfterViewChecked, ElementRef, ViewChild } from '@angular/core';
import { ChatServiceService } from '../chat-service.service';
import { message } from '../message';
import { UUID } from 'angular2-uuid';
import { environment } from '../../environments/environment';
import Speech from 'speak-tts'

@Component({
  selector: 'chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  messages = [];
  chatmsg:string;
  res;
  myImgUrl = 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500';
  botImgUrl = 'https://symphony.com/images/web/icon/apps/chat-bot_1024.png';
  speech = new Speech();
  
  constructor(private ChatService:ChatServiceService) {
     // this.messages = [];

   }
 
   scrollToBottom(): void {
    try {
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }                 
}

  ngOnInit() {
    // will throw an exception if not browser supported
    if(this.speech.hasBrowserSupport()) { // returns a boolean
        console.log("speech synthesis supported")
    }
    
    console.log(this.messages)
    this.scrollToBottom(); 
    this.speech.init(
      {
        'volume': 1,
           'lang': 'en-GB',
           'rate': 1,
           'pitch': 1,
           'voice':'Google UK English Female',
           'splitSentences': false,
           'listeners': {
               'onvoiceschanged': (voices) => {
                   console.log("Event voiceschanged", voices)
               }
           }
        }
    ).then((data) => {
      // The "data" object contains the list of available voices and the voice synthesis params
      console.log("Speech is ready, voices are available", data)
    }).catch(e => {
        console.error("An error occured while initializing : ", e)
    })  

    this.speech.setVoice('Fiona')
  }

  ngAfterViewChecked() {        
    this.scrollToBottom();        
} 

  onSubmit(){
    console.log("my msg",this.chatmsg)
    //this.messages.push({msg:this.chatmsg,imgUrl:this.myImgUrl,name:'shezy'})
let date = new Date()

    let requestPayload = {     
	
        messageId:UUID.UUID(),
        message:this.chatmsg,
        sender:environment.sender,
        timestamp:date.getTime()
      
    }
    console.log(requestPayload)
    
    this.messages.push({...requestPayload,imgUrl:this.myImgUrl})

    this.ChatService.sendMessage(requestPayload).subscribe(response =>{
      console.log(response)
      this.messages.push({...response,imgUrl:this.botImgUrl});
      this.scrollToBottom();
      
     

            this.speech.speak({
              text: response.message,
          }).then(() => {
              console.log("Success !")
          }).catch(e => {
              console.error("An error occurred :", e)
          })

    })
    
    
    
    }

}
