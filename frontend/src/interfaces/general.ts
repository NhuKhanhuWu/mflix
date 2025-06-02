/** @format */

export interface PaginationParams {
  page?: number | string;
  limit?: number | string;
}

export type SetState<T> = React.Dispatch<React.SetStateAction<T>>;
