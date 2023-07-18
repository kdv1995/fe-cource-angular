//Core
import { Pipe, PipeTransform } from '@angular/core';

//Interfaces
import {
  IPost,
  IPostFiltered,
} from '../components/shared/posts/post/post.interface';

@Pipe({
  name: 'language',
  standalone: true,
})
export class LanguagePipe implements PipeTransform {
  transform(posts: IPost[], language: string): IPostFiltered[] {
    if (!language) {
      return posts;
    }

    return posts.map((post: IPost) => {
      return {
        ...post,
        title: post.title.filter((ps) => ps.language === language),
        content: post.content.filter((ps) => ps.language === language),
        comments: post.comments.filter((ps) => ps.language === language),
      };
    });
  }
}
