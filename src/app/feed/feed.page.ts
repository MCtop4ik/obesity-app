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
      caption: 'Прекрасный день!',
      likes: 12,
      liked: false,
    },
    {
      userAvatar: 'assets/avatar2.jpg',
      userName: 'CareAI | Анонимный доктор',
      postDate: 'Вчера',
      image: 'assets/post2.jpg',
      caption: 'Вид из моего окна 🌇',
      likes: 65,
      liked: true,
    },
    {
      userAvatar: 'assets/avatar1.jpg',
      userName: 'CareAI | Анонимный доктор',
      postDate: 'Вчера',
      image: 'assets/post3.jpg',
      caption: 'Вид из моего окна 🌇',
      likes: 15,
      liked: false,
    },
    {
      userAvatar: 'assets/icon/favicon.png',
      userName: 'Реклама',
      postDate: 'Реклама',
      image: 'assets/post4.jpg',
      caption: 'Реклама клиники какой-то',
      likes: 35,
      liked: true,
    },
    {
      userAvatar: 'assets/avatar2.jpg',
      userName: 'CareAI | Анонимный доктор',
      postDate: 'Вчера',
      image: 'assets/post5.jpg',
      caption: 'Вид из моего окна 🌇',
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