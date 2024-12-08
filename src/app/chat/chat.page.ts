import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  messages = [
    { text: 'Hello! How are you?', type: 'received' },
    { text: "I'm doing great, thanks! What about you?", type: 'sent' },
    { text: "I'm good too. Let's catch up later?", type: 'received' },
  ];
  messageText = '';

  constructor() { }

  ngOnInit() { }

  sendMessage() {
    if (this.messageText.trim()) {
      this.messages.push({ text: this.messageText, type: 'sent' });
      this.messageText = '';
    }
  }
}