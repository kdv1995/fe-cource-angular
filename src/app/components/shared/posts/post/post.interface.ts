interface IPostData {
  value: string;
  language: string;
}
export interface IPostCommentsData extends IPostData {}
export interface IPostEditRequest extends IPost {}
export interface IPostEditResponse {}
export interface IPostCreateRequest extends IPost {}
export interface IPostCreateResponse {}

export interface IPost {
  _id: string;
  title: IPostData[];
  content: IPostData[];
  favourite: number;
  createdAt?: Date;
  updatedAt?: Date;
  comments?: IPostCommentsData[];
}
export interface IPostFiltered
  extends Pick<
    IPost,
    | '_id'
    | 'title'
    | 'content'
    | 'favourite'
    | 'createdAt'
    | 'updatedAt'
    | 'comments'
  > {}
export interface IPostResponse {
  currentPageNumber: number;
  totalPages: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  countOfPosts: number;
  postsByPage: number;
  posts: IPost[];
}

export type currentPageRequest = number;
