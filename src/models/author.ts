export interface AuthorCreateRequest {
  middlename?: string;
  name: string;
  surname?: string;
}

export interface AuthorResponse {
  authorId: number;
  middlename?: string;
  name: string;
  surname?: string;
}

export interface AuthorUpdateRequest {
  middlename?: string;
  name: string;
  surname?: string;
}
