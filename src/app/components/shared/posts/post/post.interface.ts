export interface IPost {
  id: string;
  title: string;
  description: string;
  lang: {
    eng: string;
    ukr: string;
  };
}
export type currentPageRequest = number;
