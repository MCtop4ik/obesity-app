import { Component } from '@angular/core';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage {
  posts = [
    {
      userAvatar: 'assets/avatar1.jpg',
      userName: 'CareAI | Анонимный доктор',
      postDate: 'Сегодня',
      image: 'assets/post1.jpg',
      caption: 'Внимание хочу рассказать про лучший медицинмкий совет',
      likes: 12,
      liked: false,
    },
    {
      userAvatar: 'assets/avatar2.jpg',
      userName: 'CareAI | Анонимный доктор',
      postDate: 'Вчера',
      image: 'assets/post2.jpg',
      caption: 'Кадры с хирургической операции',
      likes: 65,
      liked: true,
    },
    {
      userAvatar: 'assets/avatar1.jpg',
      userName: 'CareAI | Анонимный доктор',
      postDate: 'Вчера',
      image: 'assets/post3.jpg',
      caption: 'Очень интересные факты о медицине',
      likes: 15,
      liked: false,
    },
    {
      userAvatar: 'assets/icon/favicon.png',
      userName: 'Реклама',
      postDate: 'Реклама',
      image: 'assets/post4.jpg',
      caption: 'Invitro inc',
      likes: 35,
      liked: true,
    },
    {
      userAvatar: 'assets/avatar2.jpg',
      userName: 'CareAI | Анонимный доктор',
      postDate: 'Вчера',
      image: 'assets/post5.jpg',
      caption: 'Анатомия важна как никогда все медики должны знать',
      likes: 27,
      liked: true,
    },
  ];

  likePost(post: any) {
    post.liked = !post.liked;
    post.liked ? post.likes++ : post.likes--;
  }

  moreOptions(post: any) {
    console.log('More options for post:', post);
  }
}