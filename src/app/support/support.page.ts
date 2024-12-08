import { Component } from '@angular/core';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-support',
  templateUrl: './support.page.html',
  styleUrls: ['./support.page.scss'],
})
export class SupportPage {

  subject: string = '';  // Subject of the message
  question: string = ''; // Question text

  constructor(
    private httpService: HttpService
  ) { }

  submitSupportRequest() {
    // Check if subject and question are provided
    if (this.subject.trim() && this.question.trim()) {
      // Submit the request (you can replace this with an API call to send data to the server)
      console.log('Subject:', this.subject);
      console.log('Question:', this.question);

      let data = {
        'subject': this.subject,
        'question': this.question
      }
      this.httpService.techProblem(data).subscribe(
        () => {
          alert('Ваш запрос отправлен. Мы свяжемся с вами в ближайшее время.');
          this.subject = '';
          this.question = '';
        }
      );
    } else {
      alert('Пожалуйста, заполните все поля.');
    }
  }
}