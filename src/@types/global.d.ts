export {};

declare global {
  interface JwtPayload {
    sub: string;
    email: string;
    username: string;
  }

  interface SignPayload {
    type: string;
    accessToken: string;
    refreshToken: string;
    expiresIn?: string;
  }

  interface ResponsePaginate {
    page: number;
    limit: number;
    total: number;
  }

  interface ResponseAllWithPaginate {
    pagination: ResponsePaginate;
    items: any;
  }

  interface FindAllResponse<T> {
    pagination: ResponsePaginate;
    items: T[];
  }

  interface Pagination {
    page: number;
    limit: number;
    skip?: number;
  }

  interface PaginationResponse {
    page: number;
    limit: number;
    total: number;
  }

  interface ToNumberOptions {
    default?: number;
    min?: number;
    max?: number;
  }

  interface ResponseCheckContent {
    status: boolean;
    message: string;
    keywordStatus?: string;
    createdTimeStatus?: string;
    validDate?: string;
  }
}
