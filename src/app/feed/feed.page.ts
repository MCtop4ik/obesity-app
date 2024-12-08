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
      userName: 'Людмила Пронина',
      postDate: 'Сегодня',
      image: 'assets/post.png',
      caption: 'Прекрасный день!',
      likes: 12,
      liked: false,
    },
    {
      userAvatar: 'assets/avatar2.jpg',
      userName: 'Мария Смирнова',
      postDate: 'Вчера',
      image: 'assets/post.png',
      caption: 'Вид из моего окна 🌇',
      likes: 45,
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