// import { Pipe, PipeTransform } from '@angular/core';
// import { IPostFiltered } from '../components/shared/posts/post/post.interface';
//
// @Pipe({
//   name: 'paginator',
//   standalone: true,
// })
// export class PaginatorPipe implements PipeTransform {
//   transform(
//     posts: IPostFiltered[],
//     currentPage: number,
//     itemsPerPage: number
//   ): IPostFiltered[] {
//     console.log(posts);
//     // if (!posts || posts.length === 0 || !currentPage || !itemsPerPage) {
//     //   return [];
//     // }
//
//     const startIndex = (currentPage - 1) * itemsPerPage;
//     const endIndex = startIndex + itemsPerPage;
//
//     return posts.slice(startIndex, endIndex);
//   }
// }
