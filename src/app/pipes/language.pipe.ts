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
    if (!language) posts;

    return posts.map((post: IPostFiltered) => {
      const filteredTitle = post.title.filter(
        (data) => data.language === language
      );
      const filteredContent = post.content.filter(
        (data) => data.language === language
      );
      const filteredComments = post.comments.filter(
        (data) => data.language === language
      );

      return {
        ...post,
        title: filteredTitle,
        content: filteredContent,
        comments: filteredComments,
      };
    });
  }
}
