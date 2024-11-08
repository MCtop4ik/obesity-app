import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-article-modal',
  templateUrl: './article-modal.component.html',
  styleUrls: ['./article-modal.component.scss'],
})
export class ArticleModalComponent implements OnInit, OnChanges {
  @Input() article: any;
  safeContent!: SafeHtml;

  constructor(private modalCtrl: ModalController, private sanitizer: DomSanitizer) {}

  ngOnInit() {
    if (this.article && this.article.content) {
      this.sanitizeContent();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['article'] && this.article && this.article.content) {
      this.sanitizeContent();
    }
  }

  sanitizeContent() {
    this.safeContent = this.sanitizer.bypassSecurityTrustHtml(this.article.content);
  }

  dismissModal() {
    this.modalCtrl.dismiss();
  }
}