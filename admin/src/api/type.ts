export interface ResultResponse<T> {
  code: string;
  message: string;
  data: T;
}
