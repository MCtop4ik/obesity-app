import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  messages = [
    { text: 'Привет! Как ты?', type: 'received' },
    { text: "Все хорошо! Подборки диет просто супер🤩", type: 'sent' },
    { text: "Продолжай в том же духе. Когда придешь на прием?", type: 'received' },
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