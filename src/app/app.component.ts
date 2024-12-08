import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { StorageService } from './services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  userTasks: any;

  constructor(private http: HttpClient, private storageService: StorageService) {}

  ngOnInit() {
    // this.ping();
    this.doctor();
  }

  // private ping(): void {
  //   interval(5000)
  //     .pipe(
  //       switchMap(() => this.http.get(`https://careai-hylta.ru/ping`))
  //     )
  //     .subscribe();
  // }

  private doctor(): void {
    interval(5000)
    .pipe(
      switchMap(() => this.http.get(`https://careai-hylta.ru/all_diets`))
    )
    .subscribe((data) => {
      this.storageService.set('all_diets', data).then();
    });
  }
}