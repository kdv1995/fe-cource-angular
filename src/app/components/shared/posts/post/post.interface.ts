export interface IPostData {
  translation: string;
  language: string;
}
// export interface IPostCommentsData extends IPostData {}
export interface IPostEditResponse {}
export interface IPostCreateRequest extends IPostCreateForm {}
export interface IPostCreateResponse {}
export interface IPostCreateForm extends IPost {}

export interface IPostEditRequest {
  id: string;
  language: string;
  title: IPostData;
  content: IPostData;
}
export interface IPost {
  _id: string;
  title: IPostData[];
  content: IPostData[];
  favourite: number;
  createdAt: Date;
  updatedAt: Date;
}
export interface IPostFiltered {
  _id: string;
  title: IPostData;
  content: IPostData;
  favourite: number;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface IPostResponse {
  currentPageNumber: number;
  totalPages: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  countOfPosts: number;
  postsByPage: number;
  posts: IPost[];
}

export interface currentPageRequest {
  currentPage: number;
  postsPerPage: number;
}
export interface IPaginationPostsData {
  pageSize: number;
  pageIndex: number;
  length: number;
}
