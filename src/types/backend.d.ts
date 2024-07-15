import { extract } from "query-string/base";

export {};
// https://bobbyhadz.com/blog/typescript-make-types-global#declare-global-types-in-typescript

declare global {
  interface ITrackTop {
    _id: string;
    title: string;
    description: string;
    imgUrl: string;
    trackUrl: string;
    countLike: number;
    countPlay: number;
    uploader: {
      _id: string;
      email: string;
      name: string;
      role: string;
      type: string;
    };
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
  }
  interface IRequest {
    url: string;
    method: string;
    body?: { [key: string]: any };
    queryParams?: any;
    useCredentials?: boolean;
    headers?: any;
    nextOption?: any;
  }

  interface IBackendRes<T> {
    error?: string | string[];
    message: string;
    statusCode: number | string;
    data?: T;
  }

  interface IModelPaginate<T> {
    meta: {
      current: number;
      pageSize: number;
      pages: number;
      total: number;
    };
    result: T[];
  }

  interface IShareTrack extends ITrackTop {
    isPlaying: boolean;
  }
  interface ITrackContext {
    currentTrack: IShareTrack;
    setCurrentTrack: (v: IShareTrack) => void;
  }
  interface ITrackComment {
    id: string;
    content: string;
    moment: number;
    user?: User;
    track: string;
    isDeleted: boolean;
    __v: number;
    createdAt: Date;
    updatedAt: Date;
  }
  export interface User {
    _id: string;
    email: string;
    name: string;
    role: string;
    type: string;
  }
  interface ITrackLike {
    _id: string;
    title: string;
    description: string;
    category: string;
    imgUrl: string;
    trackUrl: string;
    countLike: number;
    countPlay: number;
    createdAt: string;
    updatedAt: string;
  }
  interface IPlaylist {
    _id: string;
    title: string;
    isPublic: boolean;
    user: string;
    tracks: IShareTrack[];
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
  }
}
