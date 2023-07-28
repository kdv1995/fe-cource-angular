//Core
import { Pipe, PipeTransform } from '@angular/core';

//Interfaces
import {
  IPost,
  IPostData,
  IPostFiltered,
} from '../components/shared/posts/post/post.interface';

@Pipe({
  name: 'language',
  standalone: true,
})
export class LanguagePipe implements PipeTransform {
  transform(posts: IPost[], language: string): IPostFiltered[] | IPost[] {
    if (!language) {
      return posts;
    }

    return posts.map((post: IPost) => {
      const title = post.title.find(
        (elem: IPostData) => elem.language === language
      );
      const content = post.content.find(
        (elem: IPostData) => elem.language === language
      );

      return {
        ...post,
        title: title ?? { language: '', translation: '' },
        content: content ?? { language: '', translation: '' },
      };
    });
  }
}
